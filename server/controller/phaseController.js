import Phase from '../models/phaseModel.js';
import Task from '../models/taskModel.js';

// Move to the next phase
export const moveToNextPhase = async (req, res) => {
  try {
    const { currentPhaseId } = req.params;

    const currentPhase = await Phase.findById(currentPhaseId).populate('tasks');
    if (!currentPhase) return res.status(404).json({ error: 'Current phase not found' });

    // Check if all tasks in the current phase are completed
    const allCompleted = currentPhase.tasks.every(task => task.status === 'completed');
    if (!allCompleted) {
      return res.status(400).json({ error: 'Not all tasks in current phase are completed' });
    }

    const phaseOrder = ['Requirement', 'Design', 'Implementation', 'Validation', 'Deployment'];
    const currentIndex = phaseOrder.indexOf(currentPhase.phaseName);
    if (currentIndex === -1 || currentIndex === phaseOrder.length - 1) {
      return res.status(400).json({ error: 'Cannot move to next phase' });
    }

    // Mark current phase as completed
    currentPhase.completed = true;
    currentPhase.completedAt = new Date();
    await currentPhase.save();

    // Create the next phase
    const newPhase = await Phase.create({
      phaseName: phaseOrder[currentIndex + 1]
    });

    res.status(201).json({ message: 'Moved to next phase', nextPhase: newPhase });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
