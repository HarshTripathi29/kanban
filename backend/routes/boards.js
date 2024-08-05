const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Board = require('../models/Board');
const User = require('../models/User'); // Import the User model
const authenticate = require('../middleware/auth');

// Get all boards for the authenticated user
router.get('/', authenticate, async (req, res) => {
    try {
        const boards = await Board.find({ user: req.user._id }); // Use req.user._id to get user's boards
        res.json(boards);
    } catch (error) {
        console.error('Error fetching boards:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get a specific board by ID for the authenticated user
router.get('/:id', authenticate, async (req, res) => {
    try {
        const boardId = req.params.id;
        
        // Validate the board ID
        if (!mongoose.Types.ObjectId.isValid(boardId)) {
            console.error('Invalid board ID:', boardId);
            return res.status(400).json({ message: 'Invalid board ID' });
        }
        
        // Find the board for the authenticated user
        const board = await Board.findOne({ _id: boardId, user: req.user._id });
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

// Create a new board for the authenticated user
router.post('/', authenticate, async (req, res) => {
    try {
        const { title, cover } = req.body;

        // Create a new board associated with the authenticated user
        const newBoard = new Board({ title, cover, user: req.user._id });
        await newBoard.save();

        // Add the board to the user's boards array
        await User.findByIdAndUpdate(req.user._id, {
            $push: { boards: newBoard._id }
        });

        res.status(201).json(newBoard);
    } catch (error) {
        console.error('Error creating board:', error);
        res.status(500).json({ message: 'Error creating board', error });
    }
});

// Update a board by ID for the authenticated user
router.put('/:id', authenticate, async (req, res) => {
    try {
        const boardId = req.params.id;

        // Update the board for the authenticated user
        const updatedBoard = await Board.findOneAndUpdate(
            { _id: boardId, user: req.user._id },
            req.body,
            { new: true }
        );

        if (!updatedBoard) {
            return res.status(404).json({ message: 'Board not found' });
        }

        res.json(updatedBoard);
    } catch (err) {
        console.error('Error updating board:', err);
        res.status(400).json({ message: 'Error updating board', error: err.message });
    }
});

// Delete a board by ID for the authenticated user
router.delete('/:id', authenticate, async (req, res) => {
    try {
        const boardId = req.params.id;

        // Delete the board for the authenticated user
        const board = await Board.findOneAndDelete({ _id: boardId, user: req.user._id });
        if (!board) {
            return res.status(404).json({ message: 'Board not found' });
        }

        // Remove the board from the user's boards array
        await User.findByIdAndUpdate(req.user._id, {
            $pull: { boards: board._id }
        });

        res.json({ message: 'Board deleted' });
    } catch (err) {
        console.error('Error deleting board:', err);
        res.status(500).json({ message: 'Error deleting board', error: err.message });
    }
});

module.exports = router;
