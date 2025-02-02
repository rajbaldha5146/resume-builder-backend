const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    templateId: {
        type: String,
        required: true,
    },
    sections: {
        name : String,
        email : String,
        phone : Number,
        summary: String,
        skills: [String],
        experience: [
            {
                title: String,
                company: String,
                duration: String,
                description: String,
            },
        ],
        education: [
            {
                degree: String,
                institution: String,
                duration: String,
            },
        ],
    },
    feedback: [
        {
            type: String,
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Resume', resumeSchema);