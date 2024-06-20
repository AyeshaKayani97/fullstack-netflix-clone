import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {

    if(req.method !== "POST"){
        res.status(401).end();
    }
    try{
        const {name, email, password} = req.body;
        console.log("----------register body------------------")
        console.log(req.body)
        const user = await prismadb.user.findUnique({
            where:{
                email
            }
        });
    
        if(user){
            res.status(401).json({error:"Email already exists"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const createUser = await prismadb.user.create({
            data:{
                name,
                img:"",
                email,
                hashedPassword,
                emailVerified:new Date()

            }
    
        })
        console.log(createUser);
        res.status(201).json(createUser);

    }catch(e){
        console.log(e)

    }


}