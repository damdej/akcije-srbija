const notificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    type: { type: String, enum: ['price_drop', 'new_deal', 'deal_expiring'] },
    dealId: { type: mongoose.Schema.Types.ObjectId, ref: 'Deal' },
    message: String,
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});