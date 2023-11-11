import { usersModel } from "../mongo/users.model.js";


class UsersManager{
    constructor(){
        this.model = usersModel;
    };

    async createUser(newUser){
        try {
            const result = await this.model.create(newUser)
            return result
        } catch (error) {
            throw new Error(`Failed to create user: ${error}`)
        }
        
    }

    async logInUser(userData){
        try {
            if((userData.email === "adminCoder@coder.com") && (userData.password === "adminCod3r123")){
                const adminUser = {
                    name: "Coderhouse",
                    email: userData.email,
                    password: userData.password,
                    role: "admin"
                }
                return {status:true, result: adminUser}
            }
            else{
                const user = await this.model.findOne({email:userData.email})
                if(!user){
                    return {status:false, result: "User does not exist"}
                }
                else if(user.password != userData.password){
                    return {status:false, result: "Incorrect Password"}
                }
                else{
                    user.role = "user"
                    return {status:true, result: user}
                }
            }

        } catch (error) {
            throw new Error(`Failed to log in user: ${error}`)
        }
    }

};

export {UsersManager}