import React from 'react'
import { Login } from '../components/Login.jsx'


export const LandingPage = () => {
  return (
   <>
    <div className='bg-gray-900 min-h-screen w-full flex flex-col items-center p-8 gap-10'>
        <h1 className='text-center text-white text-3xl sm:text-4xl md:text-5xl font-bold '>Secure Multi-Tenant Notes Application</h1>
        <p className='text-center text-2xl text-gray-600 sm:text-3xl md:text-4xl font-light'>Organize your thoughts with enterprise-grade security, role-based access control, and flexible subscription plans.</p>
        <Login/>
    </div>
   </>
  )
}
