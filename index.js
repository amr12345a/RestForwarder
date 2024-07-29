const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Sample data
let items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' }
];

// GET endpoint to fetch all items
app.get('/items', (req, res) => {
  res.json(items);
});

// GET endpoint to fetch a single item by ID
app.get('/items/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const item = items.find(i => i.id === id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).send('Item not found');
  }
});

// POST endpoint to create a new item
app.post('/items', (req, res) => {
  const newItem = {
    id: items.length + 1,
    name: req.body.name
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

// PUT endpoint to update an existing item
app.put('/items/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const itemIndex = items.findIndex(i => i.id === id);
  if (itemIndex !== -1) {
    items[itemIndex].name = req.body.name;
    res.json(items[itemIndex]);
  } else {
    res.status(404).send('Item not found');
  }
});


// DELETE endpoint to delete an item by ID
app.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const itemIndex = items.findIndex(i => i.id === id);
  if (itemIndex !== -1) {
    const deletedItem = items.splice(itemIndex, 1);
    res.json(deletedItem);
  } else {
    res.status(404).send('Item not found');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
