const Job = require('../../models/jobs/job');
const Company = require ('../../models/jobs/company')
const Application = require ('../../models/jobs/application')

// Create a new Job
exports.create = async (req, res) => {
   try  {
       const companies = await Company.find({});
       res.status(200).send({companies, success: 'Welcome'})

   } catch (error) {

       res.status(400).json({ error: error.message });
       res.status(500).json({ error: error.message });
   }
};


// Create a new Job
exports.save = async (req, res) => {
    const {company, Title, Type, currency, brief, Requirements, skills, publishDate,} = req.body
    const newJob =new Job (
        {
            company, Title, Type, salaryRange: {
                from: req.body.salaryMin,
                to: req.body.salaryMax,
            }, currency, brief, Requirements, 
            skills})
    try  {
       const savedJob = await newJob.save()
       console.log(savedJob)
       res.status(200).send(savedJob)

   } catch (error) {

       res.status(400).json({ error: error.message });
       res.status(500).json({ error: error.message });
   }
};

// Get all Jobs
exports.index = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    try {
        const companies = await Company.find({})
        companies.forEach((company)=>{
            company.jobs = Job.find({company: company.id});
        })
        
        res.status(200).json({companies});
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


// Apply to Job
exports.apply = async (req, res) => {
    // Application schema {applyToJob: 1, disApplyToJob: 0, acceptApplication: 3, rejectApplication: 4}
    const application = new Application ({
        userId: req.body.userId,
        jobId: req.body.jobId,
        offer: req.body.offer
    });
    try {
        const applied = await application.save();
        res.status(200).json(applied)    
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Apply to Job
exports.disApply = async (req, res) => {
    // Application schema {applyToJob: 1, disApplyToJob: 0, acceptApplication: 3, rejectApplication: 4}
    const app = await Application.findByIdAndUpdate(
        req.body.application, 
        {status: 0}, 
        {new: true}
    )
    .then(disApplied=> {
        res.status(200).send(disApplied)
    }) .catch(err=> {
        res.status(400).send({msg: 'Application Update Failed'})
    })
}

// Apply to Job
exports.accept = async (req, res) => {
        // Application schema {applyToJob: 1, disApplyToJob: 0, acceptApplication: 3, rejectApplication: 4}
    const app = await Application.findByIdAndUpdate(
        req.body.application, 
        {status: 3}, 
        {new: true}
    )
    .then(accepted=> {
        res.status(200).send(accepted)
    }) .catch(err=> {
        res.status(400).send({msg: 'Application Update Failed'})
    })
   
}

// Apply to Job
exports.reject = async (req, res) => {
        // Application schema {applyToJob: 1, disApplyToJob: 0, acceptApplication: 3, rejectApplication: 4}
    const app = await Application.findByIdAndUpdate(
        req.body.application, 
        {status: 4}, 
        {new: true}
    )
    .then(rejected=> {
        res.status(200).send(rejected)
    }) .catch(err=> {
        res.status(400).send({msg: 'Application Update Failed'})
    })
}

// Apply to Job
exports.hire = async (req, res) => {
        // Application schema {applyToJob: 1, disApplyToJob: 0, acceptApplication: 3, rejectApplication: 4}
    const app = await Application.findByIdAndUpdate(
        req.body.application, 
        {status: 5}, 
        {new: true}
    )
    .then(hired=> {
        res.status(200).send(hired)
    }) .catch(err=> {
        res.status(400).send({msg: 'Application Update Failed'})
    })
}


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
