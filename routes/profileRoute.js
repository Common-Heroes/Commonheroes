const router = require("express").Router()
const Model = require("../models")
const Item = Model.Item
const Category = Model.Category
const Provider = Model.Provider
const ServiceRecord = Model.ServiceRecord


// edit profile feature

//edit user profile
router.get ("/edit", (req,res)=> {
    //mengedit profil siuser tersebut
    res.send ('edit profile')

})


router.post( "/edit", (req,res) => {

})

//item list of user
router.get ("/item", (req,res)=> {
    //user id dibutuhkan didalam sini
    let id = 3
    // res.send ('list of item')
    Item.findAll ({
        where : {
            userId : id
        }
    },{
        hooks :false
    })

    .then ( data => {
        // console.log (data)
        // res.send (data)
        res.render("profileListItem.ejs", {
            userItem :data
        })
    })
    .catch ( err => {
        res.send (err)
    })
})


//edit users item

router.get ("/addItem", (req,res) => {
    res.render ("addItem.ejs")
})
router.post ("/addItem", (req,res)=> {
    let itemObj = {
        name : req.body.itemName,
        status: "rusak",
        userId : Math.floor(Math.random()*5)+1
    }

    Item.create (itemObj)
    .then (success => {
        console.log (itemObj)
            res.redirect("/profile")
        })
        .catch (err => {
            res.send (err)
        })
    
})

//profile info
router.get ("/", (req,res)=> {
    //find all user`s item and show it
    //find users data
    res.render ("profile.ejs")
})


module.exports = router