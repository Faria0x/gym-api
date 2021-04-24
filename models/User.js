const knex = require("../database/connection")

class User {
    async create(user){
        try {
            await knex.insert(user).table("user")
        } catch (error) {
            console.log(error)
        }
        
    }


    async findAll(){
        try {
           let users = await knex.select("*").table("user")
           return users
        } catch (error) {
            console.log(error)
        }
        
    }

    async delete(userId){
        try {
           let result = await knex.select("*").where({id: userId}).table("user")
           if(result.length > 0){
               await knex.delete().where({id: userId}).table("user")
           }else{
               return false
           }
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new User()