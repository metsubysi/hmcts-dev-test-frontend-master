document.addEventListener("DOMContentLoaded", () => {
    console.log("App started");

    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const API_URL = "http://localhost:4000/tasks";

    // ===== LOAD TASKS =====
    function loadTasks() {
        console.log("Loading tasks...");
        fetch(API_URL)
            .then(res => res.json())
            .then(tasks => {
                console.log("Tasks from server:", tasks);
                taskList.innerHTML = "";
                tasks.forEach(task => {
                    const div = document.createElement("div");
                    div.className = "card";
                    div.innerHTML =
                        `<h3>${task.title}</h3>
                        <p><strong>Due:</strong> ${task.dueDate || ""}</p>
                        <div class="task-actions">
                            <select class="status-select">
                                <option value="TODO" ${task.status === "TODO" ? "selected" : ""}>TODO</option>
                                <option value="IN_PROGRESS" ${task.status === "IN_PROGRESS" ? "selected" : ""}>IN_PROGRESS</option>
                                <option value="COMPLETED" ${task.status === "COMPLETED" ? "selected" : ""}>COMPLETED</option>
                                <option value="CANCELLED" ${task.status === "CANCELLED" ? "selected" : ""}>CANCELLED</option>
                            </select>
                            <button class="btn-detail">Detail</button>
                            <button class="btn-delete">Delete</button>
                        </div>`
                        ;

                    // ===== UPDATE STATUS =====
                    const statusSelect = div.querySelector(".status-select");
                    statusSelect.addEventListener("change", () => {
                        const newStatus = statusSelect.value;
                        fetch(`${API_URL}/${task.id}/status`, {
                            method: "PATCH",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ status: newStatus })
                        })
                            .then(() => {
                                console.log(`Task ${task.id} status updated to ${newStatus}`);
                            })
                            .catch(err => console.error("Error updating status:", err));
                    });

                    // ===== DETAIL DESCRIPTION =====
                    let currentlyShownDetail = null;
                    const detailBtn = div.querySelector(".btn-detail");
                    detailBtn.addEventListener("click", () => {
                        fetch(`${API_URL}/${task.id}`)
                            .then(res => res.json())
                            .then(data => {
                                if (currentlyShownDetail) {
                                    currentlyShownDetail.remove();
                                    if (currentlyShownDetail.dataset.taskId == task.id) {
                                        currentlyShownDetail = null;
                                        return;
                                    }
                                }

                                const descP = document.createElement("p");
                                descP.className = "task-description";
                                descP.dataset.taskId = task.id;
                                descP.textContent = data.description || "No description";

                                div.appendChild(descP);
                                currentlyShownDetail = descP;
                            })
                            .catch(err => console.error("Error fetching task detail:", err));
                    });

                    // ===== DELETE TASK =====
                    const deleteBtn = div.querySelector(".btn-delete");
                    deleteBtn.addEventListener("click", () => {
                        fetch(`${API_URL}/${task.id}`, { method: "DELETE" })
                            .then(() => {
                                console.log(`Task ${task.id} deleted`);
                                loadTasks(); // refresh task list
                            })
                            .catch(err => console.error("Error deleting task:", err));
                    });

                    taskList.appendChild(div);
                });
            })
            .catch(err => {
                console.error("GET error:", err);
            });
    }

    // ===== ADD TASK =====
    addTaskBtn.addEventListener("click", () => {
        console.log("Add Task clicked");
        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const status = document.getElementById("status").value;
        const dueDateInput = document.getElementById("dueDate").value;
        const dueDate = dueDateInput ? new Date(dueDateInput).toISOString() : null;

        const newTask = { title, description, status, dueDate };

        fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTask)
        })
            .then(() => {
                console.log("Task created");
                // clear form
                document.getElementById("title").value = "";
                document.getElementById("dueDate").value = "";
                document.getElementById("description").value = "";
                loadTasks();
            })
            .catch(err => console.error("POST error:", err));
    });

    // ===== INITIAL LOAD =====
    loadTasks();
});