import express from 'express';
import { getDbConnection } from '../database.js';
import { messageLimiter } from '../middleware/security.js';
import { verifyAdminToken } from '../middleware/auth.js';

const router = express.Router();

// POST /api/messages
// Public endpoint, rate limited
router.post('/', messageLimiter, async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ status: 'error', message: 'All form fields are required.' });
  }

  // Simple email regex validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ status: 'error', message: 'Please provide a valid email address.' });
  }

  try {
    const db = await getDbConnection();
    await db.run(
      'INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)',
      [name, email, subject, message]
    );

    return res.status(201).json({
      status: 'success',
      message: 'Message sent successfully.'
    });
  } catch (error) {
    console.error('Error saving message:', error);
    return res.status(500).json({ status: 'error', message: 'Failed to send message.' });
  }
});

// GET /api/messages
// Admin endpoint to read inbox
router.get('/', verifyAdminToken, async (req, res) => {
  try {
    const db = await getDbConnection();
    const messages = await db.all('SELECT * FROM messages ORDER BY created_at DESC');
    return res.json({ status: 'success', data: messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return res.status(500).json({ status: 'error', message: 'Internal server error.' });
  }
});

// PUT /api/messages/:id/read
// Admin endpoint to mark read/unread
router.put('/:id/read', verifyAdminToken, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // 'read' or 'unread'

  if (status !== 'read' && status !== 'unread') {
    return res.status(400).json({ status: 'error', message: 'Invalid status. Must be "read" or "unread".' });
  }

  try {
    const db = await getDbConnection();
    const message = await db.get('SELECT * FROM messages WHERE id = ?', [id]);
    
    if (!message) {
      return res.status(404).json({ status: 'error', message: 'Message not found.' });
    }

    await db.run('UPDATE messages SET status = ? WHERE id = ?', [status, id]);
    return res.json({ status: 'success', message: `Message marked as ${status}.` });
  } catch (error) {
    console.error('Error updating message status:', error);
    return res.status(500).json({ status: 'error', message: 'Internal server error.' });
  }
});

// DELETE /api/messages/:id
// Admin endpoint to delete message
router.delete('/:id', verifyAdminToken, async (req, res) => {
  const { id } = req.params;

  try {
    const db = await getDbConnection();
    const message = await db.get('SELECT * FROM messages WHERE id = ?', [id]);

    if (!message) {
      return res.status(404).json({ status: 'error', message: 'Message not found.' });
    }

    await db.run('DELETE FROM messages WHERE id = ?', [id]);
    return res.json({ status: 'success', message: 'Message deleted successfully.' });
  } catch (error) {
    console.error('Error deleting message:', error);
    return res.status(500).json({ status: 'error', message: 'Internal server error.' });
  }
});

export default router;
