import Chat from '../models/Chat.mjs';
import User from '../models/User.mjs';

// Initialize or get existing chat
const initializeChat = async (req, res) => {
    try {
        const { productId, sellerId, buyerId, initialMessage } = req.body;

        // Check if chat already exists
        let chat = await Chat.findOne({
            productId,
            sellerId,
            buyerId
        });

        if (!chat) {
            // Create new chat
            chat = new Chat({
                productId,
                sellerId,
                buyerId,
                messages: [{
                    senderId: buyerId,
                    content: initialMessage || "Hi! I'm interested in your product."
                }]
            });
            await chat.save();
        }

        // Populate user details for the messages
        await chat.populate([
            { path: 'messages.senderId', select: 'name email' },
            { path: 'sellerId', select: 'name email' },
            { path: 'buyerId', select: 'name email' }
        ]);

        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all chats for a user (either as seller or buyer)
const getUserChats = async (req, res) => {
    try {
        const userId = req.params.userId;

        const chats = await Chat.find({
            $or: [{ sellerId: userId }, { buyerId: userId }],
            isActive: true
        })
            .sort({ lastMessage: -1 })
            .populate('productId', 'title thumbnail')
            .populate('sellerId', 'name email')
            .populate('buyerId', 'name email')
            .populate('messages.senderId', 'name email');

        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get messages for a specific chat
const getChatMessages = async (req, res) => {
    try {
        const chatId = req.params.chatId;

        const chat = await Chat.findById(chatId)
            .populate('messages.senderId', 'name email')
            .populate('productId', 'title thumbnail')
            .populate('sellerId', 'name email')
            .populate('buyerId', 'name email');

        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }

        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Send a new message
const sendMessage = async (req, res) => {
    try {
        const { chatId } = req.params;
        const { senderId, content } = req.body;

        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }

        // Add new message
        chat.messages.push({
            senderId,
            content,
            timestamp: new Date()
        });

        // Update last message timestamp
        chat.lastMessage = new Date();
        await chat.save();

        // Populate the new message with sender details
        await chat.populate('messages.senderId', 'name email');

        // Get the last message
        const lastMessage = chat.messages[chat.messages.length - 1];

        res.status(200).json(lastMessage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mark messages as read
const markMessagesAsRead = async (req, res) => {
    try {
        const { chatId } = req.params;
        const { userId } = req.body;

        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }

        // Mark all messages from other user as read
        chat.messages.forEach(message => {
            if (message.senderId.toString() !== userId && !message.isRead) {
                message.isRead = true;
            }
        });

        await chat.save();
        res.status(200).json({ message: 'Messages marked as read' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    initializeChat,
    getUserChats,
    getChatMessages,
    sendMessage,
    markMessagesAsRead
};