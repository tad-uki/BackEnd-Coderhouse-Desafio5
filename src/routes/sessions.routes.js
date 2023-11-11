import { Router } from "express";
import { UsersManager } from "../persistence/classes/UsersManager.js";

const router = Router()

const usersService = new UsersManager()

router.post("/signup", async (req, res)=>{
    try {
        const userSignUp = req.body
        const result = await usersService.createUser(userSignUp)
        res.render("login", {message: "User Registered succesfully"})
    } catch (error) {
        res.render("signup", {error: "Failed to Register user."})
    }
})

router.post("/login", async (req, res)=>{
    try {
        const userLogin = req.body
        const loginData = await usersService.logInUser(userLogin)

        if(!loginData.status){
            return res.render("login", {error: loginData.report})
        }
        else{
            const user = loginData.result
            req.session.name = user.name
            req.session.email = user.email
            req.session.role = user.role
            res.redirect("/")
        }


    } catch (error) {
        res.render("login", {error: "Failed to Log In user."})
    }
})

router.get("/logout", async (req, res)=>{
    try {
        req.session.destroy(err=>{
            if(err) return res.render("/", {error: "Unable to logout"})
        })
        res.redirect("/login")
    } catch (error) {
        res.render("/", {error: "Unable to logout"})
    }
})

export {router as sessionsRouter}