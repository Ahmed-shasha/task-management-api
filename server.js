const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let tasks = [
    {
        id: 1,
        title: "Learn Docker",
        completed: false
    },
    {
        id: 2,
        title: "Deploy on AWS",
        completed: true
    }
];

// Health Check
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        service: "task-api"
    });
});

// Get all tasks
app.get("/api/tasks", (req, res) => {
    res.status(200).json(tasks);
});

// Get task by ID
app.get("/api/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const task = tasks.find(task => task.id === id);

    if (!task) {
        return res.status(404).json({
            error: "Task not found"
        });
    }

    res.status(200).json(task);
});

// Create task
app.post("/api/tasks", (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({
            error: "Title is required"
        });
    }

    const newTask = {
        id: tasks.length + 1,
        title: title,
        completed: false
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
});

// Update task
app.put("/api/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const task = tasks.find(task => task.id === id);

    if (!task) {
        return res.status(404).json({
            error: "Task not found"
        });
    }

    const { title, completed } = req.body;

    if (title !== undefined) {
        task.title = title;
    }

    if (completed !== undefined) {
        task.completed = completed;
    }

    res.status(200).json(task);
});

// Delete task
app.delete("/api/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({
            error: "Task not found"
        });
    }

    const deletedTask = tasks.splice(taskIndex, 1);

    res.status(200).json({
        message: "Task deleted successfully",
        task: deletedTask[0]
    });
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Task API running on port ${PORT}`);
});
