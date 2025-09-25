const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const recipeRoutes = require('./routes/recipeRoutes');

const app = express();
const PORT = 3000;

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/recipeDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) =>  {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});











