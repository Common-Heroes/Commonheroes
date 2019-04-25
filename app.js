const express = require('express')
const app = express()
const port = 3000
const Login = require('./routes/loginRoute')


app.use(express.urlencoded({extended : false}))

app.get('/', function(req, res){
    res.render('home.ejs')
})


app.use('/login', Login)





app.listen(port, () => console.log(`running port ${port}`))