const express = require('express')
const app = express()
const port = 3000
const Login = require('./routes/loginRoute')
const {Provider} = require('./models')
const ProviderRouter = require('./routes/providerRoute')
const registerRouter = require("./routes/registerRoute")
const LoginRouter = require('./routes/loginRoute')
const profileRouter = require('./routes/profileRoute')
const session = require('express-session')


app.use(express.urlencoded({extended : false}))

let sess = {
    secret : "commonheroes",
    cookie : {}
}

app.use(session(sess)) 

app.get('/', function(req, res){
    Provider.findAll()
        .then(function(read){
            res.render('home.ejs',{
                dataProviders : read
            })
        })
        .catch(function(err){
            console.log(err);
            
            res.send(err)
        })
})

app.use("/provider", ProviderRouter)

app.use ("/register", registerRouter)
app.use('/login', LoginRouter)
app.use ("/profile", profileRouter)





app.listen(port, () => console.log(`running port ${port}`))