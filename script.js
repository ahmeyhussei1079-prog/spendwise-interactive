"use strict";

// ========================================
// 1. STORE APPLICATION DATA
// ========================================

let monthlyBudget = 50000;

let expenses = [
    {
        name: "Lunch",
        category: "Food",
        amount: 500
    }
];


// ========================================
// 2. CALCULATE TOTAL EXPENSES
// ========================================

function calculateTotalExpenses(expenseList) {

    let total = 0;

    for (let expense of expenseList) {
        total = total + expense.amount;
    }

    return total;
}


// ========================================
// 3. CALCULATE REMAINING BALANCE
// ========================================

function calculateRemainingBalance(budget, totalExpenses) {

    return budget - totalExpenses;
}


// ========================================
// 4. FORMAT MONEY
// ========================================

function formatCurrency(amount) {

    return "KES " + amount.toLocaleString("en-KE");
}


// ========================================
// 5. DISPLAY RESULTS
// ========================================

function displayResults() {

    let totalExpenses = calculateTotalExpenses(expenses);

    let remainingBalance = calculateRemainingBalance(
        monthlyBudget,
        totalExpenses
    );

    // Update dashboard

    document.getElementById("monthlyBudget").textContent =
        formatCurrency(monthlyBudget);

    document.getElementById("totalExpenses").textContent =
        formatCurrency(totalExpenses);

    document.getElementById("remainingBalance").textContent =
        formatCurrency(remainingBalance);


    // Update budget information

    document.getElementById("budgetInfo").textContent =
        formatCurrency(monthlyBudget);

    document.getElementById("spendingInfo").textContent =
        formatCurrency(totalExpenses);

    document.getElementById("balanceInfo").textContent =
        formatCurrency(remainingBalance);


    // Display expenses

    let expenseList = document.getElementById("expenseList");

    expenseList.innerHTML = "";

    for (let expense of expenses) {

        let expenseItem = document.createElement("div");

        expenseItem.className = "expense-item";

        expenseItem.innerHTML = `
            <div>
                <p class="expense-name">${expense.name}</p>
                <p class="expense-category">${expense.category}</p>
            </div>

            <span class="expense-amount">
                ${formatCurrency(expense.amount)}
            </span>
        `;

        expenseList.appendChild(expenseItem);
    }


    // Update budget status

    let status = document.getElementById("budgetStatus");

    status.classList.remove("warning", "negative");

    if (remainingBalance < 0) {

        status.textContent =
            "You have exceeded your budget by " +
            formatCurrency(Math.abs(remainingBalance));

        status.classList.add("negative");

    } else if (remainingBalance === 0) {

        status.textContent =
            "Your budget has been fully spent.";

        status.classList.add("warning");

    } else {

        status.textContent =
            "You have " +
            formatCurrency(remainingBalance) +
            " remaining in your budget.";
    }


    // ========================================
    // 6. DISPLAY RESULTS IN CONSOLE
    // ========================================

    console.log("========== SPENDWISE BUDGET REPORT ==========");
    console.log("Monthly Budget:", formatCurrency(monthlyBudget));
    console.log("Total Expenses:", formatCurrency(totalExpenses));
    console.log("Remaining Balance:", formatCurrency(remainingBalance));
    console.log("Expense Details:", expenses);
    console.log("=============================================");
}


// ========================================
// 7. COLLECT USER INPUT USING PROMPT
// ========================================

function updateBudgetAndAddExpense() {

    let budgetInput = prompt(
        "Enter your monthly budget in KES:",
        monthlyBudget
    );

    if (budgetInput === null) {
        return;
    }

    let newBudget = Number(budgetInput);

    if (
        budgetInput.trim() === "" ||
        !Number.isFinite(newBudget) ||
        newBudget < 0
    ) {
        alert("Please enter a valid budget.");
        return;
    }


    let expenseName = prompt("Enter the expense name:");

    if (expenseName === null || expenseName.trim() === "") {
        alert("Please enter an expense name.");
        return;
    }


    let expenseInput = prompt(
        "Enter the expense amount in KES:"
    );

    if (expenseInput === null) {
        return;
    }

    let expenseAmount = Number(expenseInput);

    if (
        expenseInput.trim() === "" ||
        !Number.isFinite(expenseAmount) ||
        expenseAmount < 0
    ) {
        alert("Please enter a valid expense amount.");
        return;
    }


    let category = prompt(
        "Enter the expense category:",
        "General"
    );

    if (category === null || category.trim() === "") {
        category = "General";
    }


    // Store the new budget

    monthlyBudget = newBudget;


    // Store the new expense

    expenses.push({
        name: expenseName.trim(),
        category: category.trim(),
        amount: expenseAmount
    });


    // Recalculate everything

    displayResults();
}


// ========================================
// 8. CONNECT BUTTON TO JAVASCRIPT
// ========================================

document
    .getElementById("addExpenseButton")
    .addEventListener("click", updateBudgetAndAddExpense);


// ========================================
// 9. RUN JAVASCRIPT WHEN PAGE LOADS
// ========================================

displayResults();