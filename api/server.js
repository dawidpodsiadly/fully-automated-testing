const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(db => console.log('DB is connected'))
.catch(err => console.log(err));

app.use(userRoutes);

const PORT = process.env.PORT || 3033;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});