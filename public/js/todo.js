// Add Todo Script
document.getElementById('todoForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const todoInputElement = document.getElementById('todoInput');
    const todoInput = todoInputElement.value.trim();

    if (!todoInput) {
        return Swal.fire({
            icon: 'warning',
            title: 'Empty',
            text: "Todo cannot be empty"
        });
    } else if (todoInput.length <= 3) {
        return Swal.fire({
            icon: 'warning',
            title: 'Invalid Input',
            text: "Todo input must be greater than 3 characters"
        });
    }

    const formData = new FormData();
    formData.append('newtodo', todoInput);

    try {
        const response = await fetch('/api/todos', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const result = await response.json();
            console.log(result);
            fetchTodos();  // Fetch updated todos
            Swal.fire({
                icon: 'success',
                title: 'Added',
                text: "New todo added successfully..."
            });
        } else {
            console.error("An error occurred while adding the todo");
        }
    } catch (error) {
        console.error("Failed to add todo", error);
    }

    // Clear input after submission
    todoInputElement.value = "";
});

// Fetch Todos Script
async function fetchTodos() {
    try {
        const response = await fetch('/api/todos');

        if (!response.ok) {
            throw new Error("Network interrupted while fetching todos");
        }

        const todosData = await response.json();
        const todosContainer = document.querySelector('.show-todos');
        todosContainer.innerHTML = "";  // Clear existing todos

        todosData.forEach(item => {
            const todoElement = `
                <div class="d-flex justify-content-between align-items-center mb-3" data-id="${item.id}">
                    <input type="checkbox" class="form-check-input" ${item.check === 1 ? 'checked' : ''}>
                    <li class="list-unstyled" style="${item.check === 1 ? 'text-decoration: line-through' : ''}">${item.todo}</li>
                    <i class="bi bi-x-circle-fill text-danger deleteIcon"></i>
                </div>
            `;
            todosContainer.innerHTML += todoElement;
        });

        // Initialize event listeners
        initializeCheckboxListeners();
        initializeDeleteListeners();
    } catch (error) {
        console.error("Failed to fetch todos", error);
    }
}

// Checkbox Script for Marking Todos as Complete/Incomplete
function initializeCheckboxListeners() {
    const todosContainer = document.querySelector('.show-todos');

    todosContainer.addEventListener('change', async function (e) {
        if (e.target && e.target.matches('input[type="checkbox"]')) {
            const checkbox = e.target;
            const todoElement = checkbox.closest('div');
            const todoId = todoElement.getAttribute('data-id');
            const todoText = todoElement.querySelector('li');
            const isChecked = checkbox.checked;

            try {
                const response = await fetch('/api/checktodos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        todoId: todoId,
                        checked: isChecked ? 1 : 0
                    })
                });

                if (!response.ok) {
                    throw new Error("Failed to update todo status");
                }

                const result = await response.json();
                console.log(result.data);

                todoText.style.textDecoration = isChecked ? "line-through" : "none";

                Swal.fire({
                    icon: 'success',
                    title: 'Task Updated',
                    text: result.msg
                });

            } catch (error) {
                console.error("Error updating todo status", error);
            }
        }
    });
}

// Delete Todo Script
function initializeDeleteListeners() {
    const deleteIcons = document.querySelectorAll('.deleteIcon');

    deleteIcons.forEach(icon => {
        icon.addEventListener('click', async function () {
            const todoItem = this.parentElement;
            const todoId = todoItem.getAttribute('data-id');

            try {
                const response = await fetch(`/api/todos/${todoId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const result = await response.json();
                    todoItem.remove();
                    Swal.fire({
                        icon: 'success',
                        title: 'Deleted',
                        text: result.msg
                    });
                    fetchTodos();  // Refresh todos after deletion
                } else {
                    console.error("Error occurred while deleting the todo");
                }
            } catch (error) {
                console.error("Failed to delete todo", error);
            }
        });
    });
}

// Initial call to fetch and display todos on page load
fetchTodos();
