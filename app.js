const express = require('express')
const app = express()
const port = 3000
const registerRouter = require("./routes/registerRoute")
const LoginRouter = require('./routes/loginRoute')
const profileRouter = require('./routes/profileRoute')

app.use(express.urlencoded({extended : false}))

app.get('/', function(req, res){
    res.render('home.ejs')
})

app.use ("/register", registerRouter)
app.use('/login', LoginRouter)
app.use ("/profile", profileRouter)





app.listen(port, () => console.log(`running port ${port}`))