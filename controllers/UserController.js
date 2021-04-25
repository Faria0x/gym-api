const User = require("../models/User")
const faker = require("faker")


class UserController {
    async create(req,res){
        let user = {
            name: faker.name.findName(),
            email: faker.internet.email(),
            birthdate: faker.date.past(31),
            height: faker.datatype.float({min: 1, max: 2.4}),
            weight: faker.datatype.number({min: 40, max: 300})
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
        } catch (error){
            console.log(error)
        }
    }

    async searchName(req,res){
        let search = req.query.name
        let result = await User.searchName(search)
        res.json(result)
    }
}

module.exports = new UserController()