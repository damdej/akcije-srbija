const mongoose = require('mongoose');

const dealSchema = new mongoose.Schema({
    title: { type: String, required: true },
    store: { type: String, required: true },
    price: { type: Number, required: true },
    oldPrice: { type: Number },
    discount: { type: Number },
    link: { type: String, required: true },
    image: { type: String },
    category: { type: String, required: true },
    description: { type: String },
    dealExpiry: { type: Date },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    isActive: { type: Boolean, default: false },
    submittedBy: { type: String, default: 'anonymous' },
    votes: {
        positive: { type: Number, default: 0 },
        negative: { type: Number, default: 0 }
    },
    commentsCount: { type: Number, default: 0 }
}, {
    timestamps: true
});

module.exports = mongoose.model('Deal', dealSchema);