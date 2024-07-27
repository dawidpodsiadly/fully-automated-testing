const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const userRoutes = require('./routes/userRoutes');
const auth = require('./auth');

const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

mongoose
  .connect('Your connection to database', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(db => console.log('DB is connected'))
  .catch(err => console.log(err));

app.use(userRoutes);

const PORT = process.env.PORT || 3050;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
