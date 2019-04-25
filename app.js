const express = require('express')
const app = express()
const port = 3000


app.use(express.urlencoded({extended : false}))

app.get('/', function(req, res){
    res.render('home.ejs')
})




app.listen(port, () => console.log(`running port ${port}`))