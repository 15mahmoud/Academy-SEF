const Jop = require('../../models/jops/jop');

// Create a new Job
exports.createJob = async (req, res) => {
    try {
        const job = new Jop(req.body);
        await job.save();
        res.status(201).json(job);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all Jobs
exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Jop.find({});
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    
};

// Get a Job by ID
exports.getJobById = async (req, res) => {
    try {
        const job = await Jop.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a Job by ID
exports.updateJobById = async (req, res) => {
    try {
        const job = await Jop.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json(job);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a Job by ID
exports.deleteJobById = async (req, res) => {
    try {
        const job = await Jop.findByIdAndDelete(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
