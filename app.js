const express = require('express')
const app = express();
const port = process.env.PORT || 3000
const db = require('./models')
const apiRoutes = require('./routes/apiRoutes')

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api', apiRoutes);

db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`server listening on http://localhost:${port}`)
    });
});


