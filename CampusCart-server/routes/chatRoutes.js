import express from 'express';
import {
    initializeChat,
    getUserChats,
    getChatMessages,
    sendMessage,
    markMessagesAsRead
} from '../controllers/chatController.js';
import { chatBotImage } from '../chatbot/chatImage.js';

const router = express.Router();

// Initialize or get existing chat
router.post('/', initializeChat);

// Get all chats for a user
router.get('/user/:userId', getUserChats);

// Get messages for a specific chat
router.get('/:chatId/messages', getChatMessages);

// Send a new message
router.post('/:chatId/messages', sendMessage);

// Image-based chat endpoint
router.post('/image', async (req, res) => {
    try {
        const { imageUrl, prompt } = req.body;
        if (!imageUrl || !prompt) {
            return res.status(400).json({ message: 'Image URL and prompt are required' });
        }
        const response = await chatBotImage(imageUrl, prompt);
        res.json(response);
    } catch (error) {
        console.error('Error in image chat:', error);
        res.status(500).json({ message: 'Error processing image chat request' });
    }
});

// Mark messages as read
router.post('/:chatId/read', markMessagesAsRead);

export default router;