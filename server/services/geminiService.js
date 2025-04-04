// Mocked Gemini response for dev purposes

async function generateRequirements(description) {
    // Simulate structured output
    return {
      summary: `Requirements for: ${description}`,
      userStories: [
        "As a user, I want to log in securely.",
        "As a client, I want to track project status easily."
      ],
      functionalRequirements: [
        "User authentication module",
        "Project status dashboard"
      ],
      nonFunctionalRequirements: [
        "System should be scalable",
        "Responses within 300ms"
      ],
      techStack: ["Node.js", "Express", "MongoDB", "React"]
    };
  }
  
  module.exports = { generateRequirements };
  