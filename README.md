# ExpenseTracker

ExpenseTracker is a simple and efficient web application designed to help users track and manage their expenses. It offers a user-friendly interface for adding, viewing, and deleting expenses. Whether you're managing personal finances or tracking your business expenses, ExpenseTracker provides a convenient solution.

## Features

- **Add Expenses:** Enter a description, amount, and category for each expense.
- **View Total Expenses:** See a list of all expenses along with a running total.
- **Delete Expenses:** Easily remove expenses from the list.
- **Responsive Design:** Works on both desktop and mobile devices.
- **Real-time Updates:** Expenses are updated in real time using WebSockets.

## Technologies Used

- **Frontend:**
  - HTML5
  - CSS3
  - JavaScript

- **Backend:**
  - Node.js
  - Express.js

- **Database:**
  - Supabase (PostgreSQL)

- **Real-time Communication:**
  - WebSockets

## How It Works

1. **Frontend:**
   The user interacts with a simple form on the main page to input their expense data (description, amount, and category). Expenses are displayed in a list below the form, with a running total of all expenses.

2. **Backend:**
   The server, built using Node.js and Express, handles requests to add new expenses, fetch existing expenses, and delete expenses from the list. The server interacts with the Supabase database to store and retrieve expense data.

3. **Database:**
   The expense data is stored in a Supabase (PostgreSQL) database, which provides an easy-to-use, scalable solution for storing and managing the data.

4. **Real-time Updates:**
   WebSockets are used to update all connected clients when a new expense is added or an existing expense is deleted. This ensures that all users see the most up-to-date data without having to refresh the page.

## Installation

To run the application locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ExpenseTracker.git
   cd ExpenseTracker
