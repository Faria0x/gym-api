const express = require("express")
const ejs = require("ejs")
const UserController = require("./controllers/UserController")

const app = express()

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get("/",UserController.findAll)
app.get("/search", UserController.searchName)
app.post("/user",UserController.create)
app.delete("/user",UserController.remove)



app.listen(8000,()=> {
    console.log("Server running")
})
