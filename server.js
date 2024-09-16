const express = require("express");
const { createClient } = require("@supabase/supabase-js");
const WebSocket = require("ws"); // Import WebSocket
const app = express();

// Supabase configuration
const supabaseUrl = "https://aycphwlndmsycbtwhpti.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5Y3Bod2xuZG1zeWNidHdocHRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY0MzA5NjYsImV4cCI6MjA0MjAwNjk2Nn0.BKClh8bonCkgXfVuOdnsojQCxNHcZS5_ixMctMRwDc4";
const supabase = createClient(supabaseUrl, supabaseKey);

const cors = require("cors");
app.use(cors());

// Middleware to parse JSON
app.use(express.json()); // זה נדרש כדי לקרוא את גוף הבקשה בפורמט JSON

// WebSocket server
const server = require("http").createServer(app);
const wss = new WebSocket.Server({ server });

// Notify all connected clients about new expense
const notifyClients = (expense) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(expense));
    }
  });
};

app.get("/expenses", async (req, res) => {
  try {
    const { data, error } = await supabase.from("expenses").select("*"); // שליפת כל ההוצאות

    if (error) throw error;
    res.status(200).json(data); // החזרת הנתונים בפורמט JSON
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// POST /expenses - Add new expense
app.post("/expenses", async (req, res) => {
  console.log(req.body); // הדפסת גוף הבקשה לטרמינל כדי לוודא שהנתונים מגיעים

  const { description, amount, category } = req.body;

  try {
    const { data, error } = await supabase
      .from("expenses")
      .insert([{ description, amount, category }]);

    if (error) {
      console.error("Error inserting data:", error); // הדפסת השגיאה
      throw error;
    }
    res.status(201).send(data); // החזרת הנתונים שנשמרו
  } catch (err) {
    res.status(400).send(err.message); // החזרת הודעת השגיאה
  }
});

// DELETE /expenses/:id - מחיקת הוצאה לפי ID
app.delete("/expenses/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from("expenses")
      .delete()
      .eq("id", id); // מחיקת הוצאה לפי ID

    if (error) throw error;
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
