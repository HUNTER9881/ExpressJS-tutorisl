const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');



app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use('/lesson_1', require('./demo/index'))




app.listen(3000, () => {
    console.log('Server ishlayapti')
})