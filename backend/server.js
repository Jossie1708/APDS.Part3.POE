const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');

app.use(cors()); // Allow all origins


app.get('/', (req, res) => {
    res.send('Hello from Node.js!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
