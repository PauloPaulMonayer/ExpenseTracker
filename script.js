document
  .getElementById("expense-form")
  .addEventListener("submit", function (e) {
    e.preventDefault(); // מונע רענון של הדף

    const description = document.getElementById("description").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const category = document.getElementById("category").value;

    // שליחת הנתונים לשרת
    fetch("http://localhost:3000/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description,
        amount,
        category,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        loadExpenses(); // עדכון הרשימה לאחר ההוספה
      })
      .catch((error) => console.error("Error:", error));
  });

const ws = new WebSocket("ws://localhost:3000");

// Handle incoming WebSocket messages (new expense added)
ws.onmessage = function (event) {
  const expense = JSON.parse(event.data);
  const expenseList = document.getElementById("expense-list");

  // Add the new expense to the list
  const listItem = document.createElement("li");
  listItem.innerHTML = `${expense[0].description} - ${
    expense[0].category
  }: $${expense[0].amount.toFixed(2)}
                        <button onclick="deleteExpense(${
                          expense[0].id
                        })">Delete</button>`;
  expenseList.appendChild(listItem);
};

function addExpense(description, amount, category) {
  const expenseList = document.getElementById("expense-list");

  // Create new list item
  const listItem = document.createElement("li");
  listItem.innerHTML = `${description} - ${category}: $${amount.toFixed(
    2
  )} <button class="delete-btn">Delete</button>`;

  expenseList.appendChild(listItem);

  // Update total amount
  totalAmount += amount;
  document.getElementById("total-amount").textContent = totalAmount.toFixed(2);

  // Add event listener to the delete button
  listItem.querySelector(".delete-btn").addEventListener("click", function () {
    // Remove the list item
    expenseList.removeChild(listItem);

    // Subtract the amount from the total
    totalAmount -= amount;
    document.getElementById("total-amount").textContent =
      totalAmount.toFixed(2);
  });
}

// Function to delete an expense
function deleteExpense(id) {
  fetch(`http://localhost:3000/expenses/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Deleted successfully:", data);
      loadExpenses(); // Reload the list after deletion
    })
    .catch((error) => console.error("Error deleting expense:", error));
}

function loadExpenses() {
  fetch("http://localhost:3000/expenses")
    .then((response) => response.json())
    .then((data) => {
      const expenseList = document.getElementById("expense-list");
      expenseList.innerHTML = ""; // נקה את הרשימה לפני טעינה מחדש

      data.forEach((expense) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `${expense.description} - ${
          expense.category
        }: $${expense.amount.toFixed(2)}`;
        expenseList.appendChild(listItem);
      });
    })
    .catch((error) => console.error("Error loading expenses:", error));
}

// טען את ההוצאות ברגע שהאתר נטען
loadExpenses();

// Function to delete an expense
