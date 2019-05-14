const express = require('express');
const logger = require('morgan');
const app = express();
const userRoutes = require('./routes/userRouter');
const hyggeItemRoutes = require('./routes/hyggeItem');
// const categoryRoutes = require('./routes/categoryRouter');

app.use(logger('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
// app.use(express.static(`${__dirname}/client/build`));

app.use('/users', userRoutes);
app.use('/items', hyggeItemRoutes);

app.get('/',(req, res) => {
    res.send('Hello World')
})
// app.get('/*', (req, res) => {
//     res.sendFile(`${__dirname}/client/build/index.html`)
// });

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log('App is up and running on port ' + PORT)
});
