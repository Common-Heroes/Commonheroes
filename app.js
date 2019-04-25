const express = require('express')
const app = express()
const port = 3000
const Login = require('./routes/loginRoute')
const {Provider} = require('./models')
const ProviderRouter = require('./routes/providerRoute')
const registerRouter = require("./routes/registerRoute")

app.use(express.urlencoded({extended : false}))

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

app.use('/login', Login)





app.listen(port, () => console.log(`running port ${port}`))