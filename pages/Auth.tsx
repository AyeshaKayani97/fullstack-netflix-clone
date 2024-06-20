
"use client"
import React, { useState, useCallback } from 'react';
import Input from '@/components/Input'
import Image from 'next/image'
import axios from 'axios';
import Link from 'next/link'


const Auth = () => {
    const [name, setName ] = useState("");
    const [email, setEmail ] = useState("")
    const [password, setPassword ] = useState("")
    const [variant, setVariant] = useState("login");
    const handleVariantToggle = useCallback(() => {
        setVariant((currentValue) => currentValue === "login" ? "register" : "login");
    }, [setVariant]); // Add setVa

    // register api

    const register = useCallback(async ()=>{
        await axios.post("/app/api/register",{
            name,
            email,
            password,
        })

    },[name, email, password])

    // Login Api

    

  return (
    <div className='relative w-full h-full'>
     <div className='bg-black w-full h-full lg:bg-opacity-50'>
        <nav>
            <Image
            src="/images/logo.jpg"
            width={100}
            height={12}
            alt="logo"

            />
        </nav>
        <div className='flex justify-center'>
            <div className='bg-black bg-opacity-20 px-16 py-16 mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full'>
                <h2 className='text-xl font-semibold text-white'>
                { variant == "login" ? "Sign in" : "Sign up" }
                </h2>
                <div className='flex flex-col gap-3 mt-4'>
                    {
                        variant === "register" && (
                            <Input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e:any) => setName(e.target.value)}
                            label="Username"
                            
                        />

                        )
                    }
               

               
                    <Input 
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e:any)=>setEmail(e.target.value)}
                    label="Email"

                    
                    />
                    <Input
                     id="password"
                     type="password"
                     value={password}
                     onChange={(e:any)=>setPassword(e.target.value)}
                     label="Password"
                    
                    />
                </div>
                <button
                onClick={register}
                className="
                bg-red-500  py-3 text-white rounded-md mt-3 hover:bg-red-700 transition w-full text-center
                "
                >
                {
                    variant === "login" ? "Login" : "Register"
                }
                </button>
                <p className='text-neutral-500 mt-2'>
                    {
                        variant === "login" ? " First time using netflix" : "Already have an account"
                    }
                   
                    <span className="
                    text-white ml-2 cursor-pointer hover:underline
                    "
                    onClick ={handleVariantToggle}
                    
                    >
                        {
                            variant === "login" ? " Create an account" : "Login"
                        }
                   </span>
                </p>

            </div>

        </div>

     </div>

    </div>
  )
}

export default Auth
