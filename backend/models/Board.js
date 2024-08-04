const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    labels: [{ text: String, color: String }]
});

const listSchema = new mongoose.Schema({
    title: { type: String, required: true },
    cards: [cardSchema],
});

const BoardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    cover: {
        type: String,
        required: false
    },
    lists: [listSchema],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Reference to User
});

module.exports = mongoose.model('Board', BoardSchema);
