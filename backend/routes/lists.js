// routes/lists.js
const express = require('express');
const router = express.Router();
const Board = require('../models/Board');
const authenticate = require('../middleware/auth');

// Create a new list in a board
router.post('/:boardId/lists', authenticate, async (req, res) => {
    try {
        const { title } = req.body;
        const board = await Board.findOne({ _id: req.params.boardId, user: req.user._id });
        if (!board) return res.status(404).json({ message: 'Board not found' });

        const newList = { title, cards: [] };
        board.lists.push(newList);
        await board.save();
        res.status(201).json(board);
    } catch (error) {
        res.status(500).json({ message: 'Error creating list', error });
    }
});

// Update a card in a list
router.put('/:boardId/lists/:listId/cards/:cardId', authenticate, async (req, res) => {
    try {
        const { boardId, listId, cardId } = req.params;
        const { title, description, labels } = req.body;

        const board = await Board.findOne({ _id: boardId, user: req.user._id });
        if (!board) return res.status(404).json({ message: 'Board not found' });

        const list = board.lists.id(listId);
        if (!list) return res.status(404).json({ message: 'List not found' });

        const card = list.cards.id(cardId);
        if (!card) return res.status(404).json({ message: 'Card not found' });

        card.title = title;
        card.description = description;
        card.labels = labels;

        await board.save();
        res.status(200).json(board);
    } catch (error) {
        res.status(500).json({ message: 'Error updating card', error });
    }
});

// Delete a list in a board
router.delete('/:boardId/lists/:listId', authenticate, async (req, res) => {
    try {
        const board = await Board.findOne({ _id: req.params.boardId, user: req.user._id });
        if (!board) {
            return res.status(404).json({ message: 'Board not found' });
        }
        const listIndex = board.lists.findIndex(list => list._id.toString() === req.params.listId);
        if (listIndex === -1) {
            return res.status(404).json({ message: 'List not found' });
        }
        board.lists.splice(listIndex, 1); // Remove the list from the array
        await board.save();
        res.status(200).json(board);
    } catch (error) {
        console.error('Error deleting list:', error);
        res.status(500).json({ message: 'Error deleting list', error });
    }
});

// Create a new card in a list
router.post('/:boardId/lists/:listId/cards', authenticate, async (req, res) => {
    try {
        const { title, description, labels } = req.body;
        const board = await Board.findOne({ _id: req.params.boardId, user: req.user._id });
        if (!board) return res.status(404).json({ message: 'Board not found' });

        const list = board.lists.id(req.params.listId);
        if (!list) return res.status(404).json({ message: 'List not found' });

        const newCard = { title, description, labels };
        list.cards.push(newCard);
        await board.save();
        res.status(201).json(board);
    } catch (error) {
        res.status(500).json({ message: 'Error creating card', error });
    }
});

// Delete a card in a list
router.delete('/:boardId/lists/:listId/cards/:cardId', authenticate, async (req, res) => {
    try {
        const { boardId, listId, cardId } = req.params;
        const board = await Board.findOne({ _id: boardId, user: req.user._id });
        if (!board) return res.status(404).json({ message: 'Board not found' });

        const list = board.lists.id(listId);
        if (!list) return res.status(404).json({ message: 'List not found' });

        const cardIndex = list.cards.findIndex(card => card._id.toString() === cardId);
        if (cardIndex === -1) {
            return res.status(404).json({ message: 'Card not found' });
        }

        list.cards.splice(cardIndex, 1);
        await board.save();
        res.status(200).json(board);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting card', error });
    }
});

module.exports = router;
