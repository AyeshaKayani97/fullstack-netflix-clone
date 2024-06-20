import NextAuth from "next-auth/next";
// import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import prismadb from '@/lib/prismadb'
import {compare} from "bcrypt";
// All requests to /api/auth/* (signIn, callback, signOut, etc.) will automatically be handled by NextAuth.js.


// export const authOptions = {
//     providers:[
//         GithubProvider({
//             clientId: process.env.GITHUB_ID,
//             clientSecret: process.env.GITHUB_SECRET,
//           }),
//     ]
// }

export  default NextAuth({
    providers:[
        CredentialsProvider({
            name: "Credentials",
            credentials:{
                email:{
                    label:"Email",
                    type:"email"

                },
                password:{
                    label:"Password",
                    type:"password"
                }

            }, 
            async authorize(credentials){
                if(!credentials?.email || !credentials?.password){
                    // any object returned will be saved in  the user property of the jwt
                    throw new Error("Email and password are required");
                }
                const user = await prismadb.user.findUnique({
                    where:{
                        email: credentials.email
                    }
                    
                })
                if(!user || !user.hashedPassword){
                    throw new Error("Email does not exist")
                }
                
                // here we are comparing the plain text password provided by user with that of password stored in db 
                const isCorrectPassword = await compare(credentials.password, user.hashedPassword);
                if(!isCorrectPassword){
                    throw new Error("Invalid Password");

                }
                return user;

            }
            
        })

    ],
    pages:{
        signIn:"/auth"
    },
    debug:process.env.NODE_ENV === "development",
    session:{
        strategy: 'jwt'

    },
    jwt:{
        secret:process.env.NEXTAUTH_JWT_SECRET

    },
    secret:process.env.NEXTAUTH_SECRET

});