# SpendWise – Make SpendWise Interactive

## Project Overview

SpendWise is an interactive budgeting application built using HTML, CSS, and JavaScript. This week, the project was improved to make it more interactive by adding decision making, arrays, loops, DOM manipulation, and event listeners.

## Improvements Made This Week

The following improvements were made to SpendWise:

* Added conditional statements to evaluate the user's budget.
* Used an array to store multiple expense records.
* Used loops to calculate total expenses and display expense records.
* Added DOM manipulation to update the dashboard directly on the webpage.
* Added event listeners to respond to button clicks.
* Added user input for budgets, expenses, amounts, and categories.
* Added budget status messages when the user has money remaining, reaches the budget, or exceeds the budget.

## How Conditionals Are Used

Conditional statements are used to check the user's remaining budget.

For example, if the remaining balance is below zero, SpendWise informs the user that they have exceeded their budget. If the balance is zero, the application informs the user that the budget has been fully spent. Otherwise, it displays the amount remaining.

```javascript
if (remainingBalance < 0) {
    status.textContent =
        "You have exceeded your budget by " +
        formatCurrency(Math.abs(remainingBalance));
} else if (remainingBalance === 0) {
    status.textContent =
        "Your budget has been fully spent.";
} else {
    status.textContent =
        "You have " +
        formatCurrency(remainingBalance) +
        " remaining in your budget.";
}
```

## How Arrays Are Used

An array called `expenses` is used to store multiple expense records.

Each expense is stored as an object containing:

* Expense name
* Category
* Amount

Example:

```javascript
let expenses = [
    {
        name: "Lunch",
        category: "Food",
        amount: 500
    }
];
```

When a new expense is entered, it is added to the array using `push()`.

```javascript
expenses.push({
    name: expenseName.trim(),
    category: category.trim(),
    amount: expenseAmount
});
```

## How Loops Are Used

A `for...of` loop is used to process all stored expenses.

The loop adds each expense amount together to calculate the total spending.

```javascript
for (let expense of expenseList) {
    total = total + expense.amount;
}
```

Another loop is used to display each expense on the webpage.

This makes it possible to work with multiple expense records efficiently.

## How the DOM Is Updated

DOM manipulation is used to display JavaScript results directly on the webpage.

For example, the monthly budget, total expenses, and remaining balance are updated using `textContent`.

```javascript
document.getElementById("monthlyBudget").textContent =
    formatCurrency(monthlyBudget);

document.getElementById("totalExpenses").textContent =
    formatCurrency(totalExpenses);

document.getElementById("remainingBalance").textContent =
    formatCurrency(remainingBalance);
```

The expense list is also dynamically created and displayed using JavaScript.

## How User Interactions Are Handled

An event listener is used to detect when the user clicks the **Update Budget and Add Expense** button.

```javascript
document
    .getElementById("addExpenseButton")
    .addEventListener("click", updateBudgetAndAddExpense);
```

When the button is clicked, JavaScript asks the user for their budget and expense information, stores the information, recalculates the totals, and updates the dashboard.

## Challenges Encountered and Solutions

One challenge was making sure that the dashboard updated after a new expense was added.

This was solved by calling the `displayResults()` function after storing the new expense. The function recalculates the total expenses and remaining balance and then updates the webpage.

Another challenge was handling invalid user input. Conditional statements were used to check whether the entered budget and expense amounts were valid before adding them to the application.

## Testing

The application was tested by:

* Adding different expenses.
* Checking that expense totals were calculated correctly.
* Testing a budget that was exceeded.
* Checking that the remaining balance updated correctly.
* Confirming that new expenses appeared on the webpage.

For example, when the budget was KES 1,000 and total expenses were KES 2,000, SpendWise correctly displayed that the budget had been exceeded by KES 1,000.

## Technologies Used

* HTML
* CSS
* JavaScript
* Git
* GitHub

## Conclusion

The SpendWise application now demonstrates decision making, arrays, loops, DOM manipulation, and event listeners. User actions trigger JavaScript logic, update the stored data, recalculate the budget, and display the results directly on the webpage.
