
import { useState } from "react";
import { Droppable, Draggable, DragDropContext } from "@hello-pangea/dnd";
import { MoreHorizontal, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

// Define task and column types
type Task = {
  id: string;
  content: string;
  assignee: string;
  priority: "low" | "medium" | "high";
  dueDate: string;
};

type Column = {
  id: string;
  title: string;
  tasks: Task[];
};

type BoardData = {
  columns: {
    [key: string]: Column;
  };
  columnOrder: string[];
};

// Sample data
const initialData: BoardData = {
  columns: {
    "column-1": {
      id: "column-1",
      title: "To Do",
      tasks: [
        {
          id: "task-1",
          content: "Research competitor apps",
          assignee: "Alex J.",
          priority: "high",
          dueDate: "Apr 10",
        },
        {
          id: "task-2",
          content: "Create wireframes for dashboard",
          assignee: "Taylor C.",
          priority: "medium",
          dueDate: "Apr 12",
        },
        {
          id: "task-3",
          content: "Prepare Q2 marketing plan",
          assignee: "Jamie S.",
          priority: "low",
          dueDate: "Apr 15",
        },
      ],
    },
    "column-2": {
      id: "column-2",
      title: "In Progress",
      tasks: [
        {
          id: "task-4",
          content: "Implement authentication system",
          assignee: "Sam W.",
          priority: "high",
          dueDate: "Apr 8",
        },
        {
          id: "task-5",
          content: "Fix navigation responsiveness",
          assignee: "Riley P.",
          priority: "medium",
          dueDate: "Apr 9",
        },
      ],
    },
    "column-3": {
      id: "column-3",
      title: "Review",
      tasks: [
        {
          id: "task-6",
          content: "Code review: Payment integration",
          assignee: "Morgan L.",
          priority: "medium",
          dueDate: "Apr 7",
        },
      ],
    },
    "column-4": {
      id: "column-4",
      title: "Completed",
      tasks: [
        {
          id: "task-7",
          content: "Set up CI/CD pipeline",
          assignee: "Sam W.",
          priority: "high",
          dueDate: "Apr 5",
        },
        {
          id: "task-8",
          content: "Define user personas",
          assignee: "Alex J.",
          priority: "medium",
          dueDate: "Apr 3",
        },
      ],
    },
  },
  columnOrder: ["column-1", "column-2", "column-3", "column-4"],
};

const KanbanBoard = () => {
  const [boardData, setBoardData] = useState<BoardData>(initialData);

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    // If there's no destination or if the item was dropped in the same place
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }

    const sourceColumn = boardData.columns[source.droppableId];
    const destColumn = boardData.columns[destination.droppableId];
    const taskToMove = sourceColumn.tasks.find((task) => task.id === draggableId);

    if (!taskToMove) return;

    // Create new arrays
    const newSourceTasks = Array.from(sourceColumn.tasks);
    newSourceTasks.splice(source.index, 1);

    // If moving within the same column
    if (source.droppableId === destination.droppableId) {
      newSourceTasks.splice(destination.index, 0, taskToMove);

      const newColumn = {
        ...sourceColumn,
        tasks: newSourceTasks,
      };

      setBoardData({
        ...boardData,
        columns: {
          ...boardData.columns,
          [newColumn.id]: newColumn,
        },
      });
    } else {
      // Moving to a different column
      const newDestTasks = Array.from(destColumn.tasks);
      newDestTasks.splice(destination.index, 0, taskToMove);

      const newSourceColumn = {
        ...sourceColumn,
        tasks: newSourceTasks,
      };

      const newDestColumn = {
        ...destColumn,
        tasks: newDestTasks,
      };

      setBoardData({
        ...boardData,
        columns: {
          ...boardData.columns,
          [newSourceColumn.id]: newSourceColumn,
          [newDestColumn.id]: newDestColumn,
        },
      });
    }
  };

  return (
    <div className="overflow-x-auto pb-8">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4" style={{ minWidth: '750px' }}>
          {boardData.columnOrder.map((columnId) => {
            const column = boardData.columns[columnId];
            return (
              <div key={column.id} className="flex-1">
                <div className="glass mb-3 rounded-lg p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-medium">{column.title}</h3>
                    <div className="flex items-center space-x-2">
                      <div className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary/20 px-1.5 text-xs font-semibold text-primary">
                        {column.tasks.length}
                      </div>
                      <button className="rounded p-1 hover:bg-secondary">
                        <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </div>
                  </div>

                  <Droppable droppableId={column.id}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={cn(
                          "min-h-[200px] rounded-md transition-colors",
                          snapshot.isDraggingOver ? "bg-secondary/30" : "bg-transparent"
                        )}
                      >
                        {column.tasks.map((task, index) => (
                          <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={cn(
                                  "mb-2 rounded-lg border border-border bg-card p-3 shadow-sm transition-all hover:shadow",
                                  snapshot.isDragging && "shadow-md ring-1 ring-primary"
                                )}
                              >
                                <div className="mb-2">
                                  <p className="text-sm">{task.content}</p>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-muted-foreground">{task.assignee}</span>
                                  <div className="flex items-center space-x-2">
                                    <span
                                      className={cn(
                                        "rounded-full px-2 py-0.5 text-xs font-medium",
                                        task.priority === "high" && "bg-red-500/20 text-red-400",
                                        task.priority === "medium" && "bg-amber-500/20 text-amber-400",
                                        task.priority === "low" && "bg-green-500/20 text-green-400"
                                      )}
                                    >
                                      {task.priority}
                                    </span>
                                    <span className="text-muted-foreground">{task.dueDate}</span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>

                  <button className="mt-2 flex w-full items-center justify-center rounded-md border border-dashed border-border p-2 text-xs text-muted-foreground hover:border-primary hover:text-primary">
                    <Plus className="mr-1 h-3 w-3" />
                    Add Task
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
