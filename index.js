const express = require('express');
const postsUsersRoutes = require('./routes/routes');

const app = express();

app.use(express.json());
app.use('/', postsUsersRoutes);

app.listen(3000, () => {
    console.log('The server is listening at port 3000.');
});