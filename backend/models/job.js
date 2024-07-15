const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const jobSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    qualifications: { type: String, required: true },
    responsibilities: { type: String, required: true },
    location: { type: String, required: true },
    salaryRange: { type: String, required: true },
    employer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})

module.exports = mongoose.model('Job', jobSchema);