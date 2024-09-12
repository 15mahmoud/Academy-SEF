const JopApplication = require('../../models/jops/jopApplication');
 
// Create a new Application
exports.createApplication = async (req, res) => {
    try {
        const application = new JopApplication(req.body);
        await application.save();
        res.status(201).json(application);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all Applications
exports.getAllApplications = async (req, res) => {
    try {
        const applications = await JopApplication.find({});
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get an Application by ID
exports.getApplicationById = async (req, res) => {
    try {
        const application = await JopApplication.findById(req.params.id);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        res.status(200).json(application);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an Application by ID
exports.updateApplicationById = async (req, res) => {
    try {
        const application = await JopApplication.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        res.status(200).json(application);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete an Application by ID
exports.deleteApplicationById = async (req, res) => {
    try {
        const application = await JopApplication.findByIdAndDelete(req.params.id);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        res.status(200).json({ message: 'Application deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
