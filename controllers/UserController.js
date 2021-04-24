const User = require("../models/User")
const faker = require("faker")


class UserController {
    async create(req,res){
        let user = {
            name: faker.name.findName(),
            email: faker.internet.email(),
            birthdate: faker.date.past(31),
            height: 1.81,
            weight: 79
        }
        await User.create(user)
        res.send("Usuário criado")
    }

    async findAll(req,res){
        let users = await User.findAll()
        res.json(users)
    }
    

    async remove(req,res){
        let userId = req.body.id
        try {
            await User.delete(userId)
            res.send("Usuário deletado")
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new UserController()