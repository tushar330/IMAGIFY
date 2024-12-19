/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion } from "motion/react"
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {

    const [state, setState] = useState('Login')

    const {backendUrl , setShowLogin, setToken, setUser} = useContext(AppContext)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitHandler = async (e)=>{
        e.preventDefault()
        try {
            
            if(state === 'Login'){

                const {data} = await axios.post(backendUrl + '/api/user/login', {email,password})

                if(data.success){
                    setToken(data.token)
                    setUser(data.user)
                    localStorage.setItem('token', data.token)
                    setShowLogin(false)
                }else{
                    toast.error(data.message)
                }

                
            }else{
                const {data} = await axios.post(backendUrl + '/api/user/register', {name, email,password})

                if(data.success){
                    setToken(data.token)
                    setUser(data.user)
                    localStorage.setItem('token', data.token)
                    setShowLogin(false)
                }else{
                    toast.error(data.message)
                }
            }

        } catch (error) {
            toast.error(error.response ? error.response.data.message : error.message);
        }
    }

    useEffect(()=>{
        document.body.style.overflow = 'hidden'

        return(()=>{
            document.body.style.overflow = 'unset'
        })
    },[])

  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>

        <motion.form onSubmit={onSubmitHandler}
        initial={{opacity:0.2, y:50}}
        transition={{duration:0.3}}
        whileInView={{opacity: 1, y:0}}
        viewport={{once:true}}
        className='relative bg-white p-10 rounded-xl text-slate-500'>
            <h1 className='text-center text-2xl text-neutral-700 font-medium'>{state}</h1>
            <p className='text-sm text-center mt-1'>Welcome back! Please sign in to continue</p>

{state !== 'Login' &&
            <div className='border px-5 py-2 flex items-center gap-0 rounded-full mt-5'>
                <img src={assets.profile_icon} alt="" width={25} />
                <input onChange={e => setName(e.target.value)} value={name} type="text" placeholder='Full Name' required className='outline-none text-sm '/>
            </div>
}

            <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                <img src={assets.email_icon} alt="" />
                <input onChange={e => setEmail(e.target.value)} value={email} type="email" placeholder='Email Id' required className='outline-none text-sm'/>
            </div>

            <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                <img src={assets.lock_icon} alt=""/>
                <input onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder='Password' required className='outline-none text-sm'/>
            </div>

            <p className='text-sm text-blue-600 my-4 cursor-pointer'>Forgot password?</p>

            <button className='bg-blue-500 w-full text-white py-2 rounded-full'>{state === 'Login' ? "login" : 'create account'}</button>

{ state === 'Login' ? 
            <p className='mt-5 text-center text-sm'>Don&apos;t have an account? 
                <span onClick={()=> setState("Sign Up")} className='text-blue-600 cursor-pointer'> Sign up</span></p>
:
            <p className='mt-5 text-center text-sm'>Already have an account? 
                <span onClick={()=> setState("Login")} className='text-blue-600 cursor-pointer'> Login</span></p>
}

            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} className='absolute top-5 right-5 cursor-pointer' alt="" />

        </motion.form>

    </div>
  )
}

export default Login