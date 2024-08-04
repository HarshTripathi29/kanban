const express = require('express');
const router = express.Router();
const Board = require('../models/Board');
const mongoose = require('mongoose');
const authenticate = require('../middleware/auth');

// Get boards for a specific user
router.get('/', authenticate, async (req, res) => {
    try {
        const boards = await Board.find({ user: req.user._id }); // Use req.user._id
        res.json(boards);
    } catch (error) {
        console.error('Error fetching boards:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get one board
router.get('/:id', authenticate, async (req, res) => {
    try {
        const boardId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(boardId)) {
            console.error('Invalid board ID:', boardId);
            return res.status(400).json({ message: 'Invalid board ID' });
        }
        const board = await Board.findOne({ _id: boardId, user: req.user._id }); // Use req.user._id
        if (!board) {
            console.error('Board not found with ID:', boardId);
            return res.status(404).json({ message: 'Board not found' });
        }
        res.json(board);
    } catch (error) {
        console.error('Error fetching board:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create a new board
router.post('/', authenticate, async (req, res) => {
    try {
        const { title, cover } = req.body;
        const newBoard = new Board({ title, cover, user: req.user._id }); // Use req.user._id
        await newBoard.save();
        res.status(201).json(newBoard);
    } catch (error) {
        res.status(500).json({ message: 'Error creating board', error });
    }
});

// Update a board
router.put('/:id', authenticate, async (req, res) => {
    try {
        const updatedBoard = await Board.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id }, // Use req.user._id
            req.body,
            { new: true }
        );
        if (!updatedBoard) {
            return res.status(404).json({ message: 'Board not found' });
        }
        res.json(updatedBoard);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a board
router.delete('/:id', authenticate, async (req, res) => {
    try {
        const board = await Board.findOneAndDelete({ _id: req.params.id, user: req.user._id }); // Use req.user._id
        if (!board) {
            return res.status(404).json({ message: 'Board not found' });
        }
        res.json({ message: 'Board deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
