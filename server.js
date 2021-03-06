const express = require('express');
const logger = require('morgan');
const app = express();
const userRoutes = require('./routes/userRouter');
const hyggeItemRoutes = require('./routes/hyggeItemRouter');
const categoryRoutes = require('./routes/categoryRouter');

app.use(logger('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(`${__dirname}/client/build`));

app.use('/api/users', userRoutes);
app.use('/api/items', hyggeItemRoutes);
app.use('/api/categories', categoryRoutes);


app.get('/*', (req, res) => {
    res.sendFile(`${__dirname}/client/build/index.html`)
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log('App is up and running on port ' + PORT)
});
