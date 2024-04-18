const express = require('express')
const app = express()
const port = 8080
var api = require('./controllers/APIcontroller.js');

app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/api/withdraw', api.withdraw);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})