// models/User.js
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String,
    role: { type: String, default: 'user' },
    submittedDeals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Deal' }],
    votedDeals: [{ dealId: mongoose.Schema.Types.ObjectId, vote: Number }]
});