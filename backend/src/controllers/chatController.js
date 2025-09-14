// backend/src/controllers/chatController.js
const channels = require('../models/Channel');
const messages = require('../models/Message');
const chatService = require('../services/chatService');

// channels
const getChannels = (req, res) => {
  try {
    const userChannels = Array.from(channels.values())
      .filter(c => c.isActive && (c.type === 'public' || (c.members && c.members.includes(req.user.id))));
    res.json(userChannels);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch channels' });
  }
};

const createChannel = (req, res) => {
  try {
    const { name, description, type = 'public' } = req.body;
    const id = channels.size + 1;
    const newChannel = {
      id,
      name,
      description,
      type,
      createdBy: req.user.id,
      createdAt: new Date(),
      members: [req.user.id],
      isActive: true
    };
    channels.set(id, newChannel);
    res.status(201).json(newChannel);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create channel' });
  }
};

const joinChannel = (req, res) => {
  try {
    const channel = channels.get(parseInt(req.params.id));
    if (!channel || !channel.isActive) return res.status(404).json({ error: 'Channel not found' });
    if (!channel.members.includes(req.user.id)) channel.members.push(req.user.id);
    res.json({ message: 'Joined channel successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to join channel' });
  }
};

const leaveChannel = (req, res) => {
  try {
    const channel = channels.get(parseInt(req.params.id));
    if (!channel) return res.status(404).json({ error: 'Channel not found' });
    channel.members = channel.members.filter(m => m !== req.user.id);
    res.json({ message: 'Left channel successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to leave channel' });
  }
};

// messages
const getMessages = (req, res) => {
  try {
    const channelId = parseInt(req.params.channelId);
    const channel = channels.get(channelId);
    if (!channel || !channel.members.includes(req.user.id)) {
      return res.status(403).json({ error: 'Access denied' });
    }
    const channelMessages = Array.from(messages.values())
      .filter(m => m.channelId === channelId && m.isActive)
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    res.json(channelMessages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

const sendMessage = (req, res) => {
  try {
    const { content, channelId, threadId = null, type = 'text' } = req.body;
    if (!content) return res.status(400).json({ error: 'Message content required' });
    const channel = channels.get(channelId);
    if (!channel || !channel.members.includes(req.user.id)) {
      return res.status(403).json({ error: 'Cannot send message to this channel' });
    }

    const newMessage = chatService.createMessage({
      content, channelId, senderId: req.user.id, threadId, type
    });

    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: 'Failed to send message' });
  }
};

module.exports = {
  getChannels,
  createChannel,
  joinChannel,
  leaveChannel,
  getMessages,
  sendMessage
};
