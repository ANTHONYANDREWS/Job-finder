import mongoose from 'mongoose';
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

const Job = mongoose.model('Job', jobSchema);

export default Job;