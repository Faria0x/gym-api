const User = require("../models/User")
const faker = require("faker")


class UserController {
    async create(req,res){
        let user = {
            name: faker.name.findName(),
            email: faker.internet.email(),
            birthdate: faker.date.past(31),
            height: faker.datatype.float({min: 1.0, max: 2.4}),
            weight: faker.datatype.number({min: 40, max: 300})
        }
        await User.create(user)
        res.send("Usuário criado")
    }

    async findById(req,res){
        let userId = req.params.id
        let user = await User.findById(userId)
        if(user){
            res.render("examples/user",{user})
        }else{
           
            res.send("Não encontrado")
        }
        
    }

    async findAll(req,res){
        let users = await User.findAll()
        let danger = []
        
        res.render("examples/tables",{users})
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

    async imc(req,res){
        let userId = req.query.id
        let user = await User.calculateImc(userId)
        let weight = user.weight
        let height = user.height
        let imc = weight / (height * height)
        res.send(`O IMC de ${user.name} é ${imc}`)
    }

    async highImc(req,res){
        let users = await User.findAll()
        let danger = []
        await users.forEach((user)=> {
            if(user.weight / (user.height * user.height) >=18.5 && user.weight / (user.height * user.height) <= 24.9 ){
               return;
                // console.log(`${user.name} está normal`)
            }else{
                danger.push(user)
                // console.log(`${user.name} não está normal`)
            }
           
        })
        res.send(danger)
        res.status(200)
        
    }
}

module.exports = new UserController()