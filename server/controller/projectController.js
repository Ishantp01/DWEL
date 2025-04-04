const Project = require('../models/Project');
const { generateRequirements } = require('../services/gemini.service');

exports.createProject = async (req, res) => {
  try {
    const { title, description, clientId } = req.body;

    if (!title || !description || !clientId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Use Gemini to generate requirements
    const aiData = await generateRequirements(description);

    // Parse Gemini response
    const structuredReq = {
      title: `AI Generated for ${title}`,
      description: aiData.summary || description,
      userStories: aiData.userStories || [],
      functional: aiData.functionalRequirements || [],
      nonFunctional: aiData.nonFunctionalRequirements || [],
      techStack: aiData.techStack || []
    };

    const newProject = new Project({
      clientId,
      title,
      description,
      requirements: [structuredReq]
    });

    const saved = await newProject.save();

    return res.status(201).json({ message: 'Project created', data: saved });

  } catch (err) {
    console.error('Error creating project:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
