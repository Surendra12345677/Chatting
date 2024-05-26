// Require the library
const mongoose = require('mongoose');

// Connect to the database
mongoose.connect('mongodb://127.0.0.1:27017/contact_list_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Successfully connected to the database");
})
.catch((error) => {
  console.error("Error connecting to the database:", error);
});

// Acquire the connection (to check if it's successful)
const db = mongoose.connection;

// Error handling
db.on('error', function(err) {
  console.error("MongoDB connection error:", err.message);
});

// Set up the once 'open' event listener
db.once('open', function() {
  console.log("MongoDB connection established");
});
