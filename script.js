
// =====================================
// SPENDWISE - EXPENSE MANAGEMENT SYSTEM
// =====================================

let expenses = JSON.parse(
    localStorage.getItem("spendwiseExpenses") || "[]"
);

let budget = Number(
    localStorage.getItem("spendwiseBudget") || 0
);

// Format Kenyan currency
function money(amount) {
    return "KES " + Number(amount).toLocaleString("en-KE", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// Get today's local date
function getToday() {
    const today = new Date();
    const offset = today.getTimezoneOffset();
    return new Date(today.getTime() - offset * 60000)
        .toISOString().slice(0, 10);
}

// Display current date
const todayElement = document.getElementById("today");

if (todayElement) {
    todayElement.textContent = new Date().toLocaleDateString("en-KE", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}

// Set default expense date
const dateInput = document.getElementById("expenseDate");

if (dateInput && !dateInput.value) {
    dateInput.value = getToday();
}

// Save expenses
function saveExpenses() {
    localStorage.setItem(
        "spendwiseExpenses",
        JSON.stringify(expenses)
    );

    updateDashboard();
}

// Save budget
function saveBudget() {
    localStorage.setItem("spendwiseBudget", budget);
    updateDashboard();
}

// Set monthly budget
const budgetForm = document.getElementById("budgetForm");

if (budgetForm) {
    budgetForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const input = document.getElementById("budgetInput");
        const newBudget = Number(input.value);

        if (!Number.isFinite(newBudget) || newBudget < 0) {
            alert("Please enter a valid budget.");
            return;
        }

        budget = newBudget;
        saveBudget();
        input.value = "";

        alert("Monthly budget updated successfully!");
    });
}

// Add new expense
const expenseForm = document.getElementById("expenseForm");

if (expenseForm) {
    expenseForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("expenseName").value.trim();
        const amount = Number(
            document.getElementById("expenseAmount").value
        );
        const category = document.getElementById("expenseCategory").value;
        const date = document.getElementById("expenseDate").value;

        if (!name || !Number.isFinite(amount) ||
            amount <= 0 || !category || !date) {
            alert("Please complete all expense fields correctly.");
            return;
        }

        const newExpense = {
            id: Date.now() + Math.random(),
            name: name,
            amount: amount,
            category: category,
            date: date
        };

        expenses.push(newExpense);

        saveExpenses();

        expenseForm.reset();

        if (dateInput) {
            dateInput.value = getToday();
        }
    });
}

// Delete an expense
function deleteExpense(id) {
    if (!confirm("Are you sure you want to delete this expense?")) {
        return;
    }

    expenses = expenses.filter(function(expense) {
        return expense.id !== id;
    });

    saveExpenses();
}

// Update financial dashboard
function updateDashboard() {
    const currentMonth = getToday().slice(0, 7);

    const monthlyExpenses = expenses.filter(function(expense) {
        return expense.date.slice(0, 7) === currentMonth;
    });

    const totalExpenses = monthlyExpenses.reduce(function(total, expense) {
        return total + Number(expense.amount);
    }, 0);

    const remaining = budget - totalExpenses;
    const savings = Math.max(0, remaining);

    document.getElementById("budgetDisplay").textContent =
        money(budget);

    document.getElementById("expenseDisplay").textContent =
        money(totalExpenses);

    document.getElementById("remainingDisplay").textContent =
        money(remaining);

    document.getElementById("savingsDisplay").textContent =
        money(savings);

    // Budget progress
    const percentage = budget > 0
        ? Math.min((totalExpenses / budget) * 100, 100)
        : 0;

    const progressBar = document.getElementById("progressBar");

    if (progressBar) {
        progressBar.style.width = percentage + "%";
        progressBar.style.background =
            percentage >= 100 ? "#dc2626" : "#16a34a";
    }

    // Budget message
    const message = document.getElementById("budgetMessage");

    if (message) {
        if (budget === 0) {
            message.textContent =
                "Your monthly budget is currently KES 0.00.";
        } else if (remaining < 0) {
            message.textContent =
                "Warning! You have exceeded your monthly budget.";
        } else {
            message.textContent =
                "You have used " + percentage.toFixed(1) +
                "% of your monthly budget.";
        }
    }

    // Display expense history
    const table = document.getElementById("expenseTable");
    const emptyMessage = document.getElementById("emptyMessage");

    if (!table) return;

    table.innerHTML = "";

    const sortedExpenses = [...expenses].sort(function(a, b) {
        return b.date.localeCompare(a.date);
    });

    if (emptyMessage) {
        emptyMessage.style.display =
            expenses.length === 0 ? "block" : "none";
    }

    sortedExpenses.forEach(function(expense) {
        const row = document.createElement("tr");

        const values = [
            expense.name,
            money(expense.amount),
            expense.category,
            expense.date
        ];

        values.forEach(function(value) {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        const actionCell = document.createElement("td");
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.className = "delete";

        deleteButton.addEventListener("click", function() {
            deleteExpense(expense.id);
        });

        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);

        table.appendChild(row);
    });
}

// Load dashboard when website opens
updateDashboard();
