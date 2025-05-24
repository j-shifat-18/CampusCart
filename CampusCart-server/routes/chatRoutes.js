import express from 'express';
import {
    initializeChat,
    getUserChats,
    getChatMessages,
    sendMessage,
    markMessagesAsRead
} from '../controllers/chatController.js';

const router = express.Router();

// Initialize or get existing chat
router.post('/', initializeChat);

// Get all chats for a user
router.get('/user/:userId', getUserChats);

// Get messages for a specific chat
router.get('/:chatId/messages', getChatMessages);

// Send a new message
router.post('/:chatId/messages', sendMessage);

// Mark messages as read
router.post('/:chatId/read', markMessagesAsRead);

export default router;