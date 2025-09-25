import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../App.jsx'
import axios from 'axios'
import { toast,Zoom } from 'react-toastify'

export const Login = () => {

    const[formData,setFormData] = useState({
        email:"",
        password:""
      })
    const[invalidPassword,setInvalidPassword] = useState(false);
    const navigate = useNavigate();
    const{ setIsSignedIn } = useContext(AuthContext);
    
    const handleFomChange = (e)=> {
        setFormData((prev)=> {
          return{
            ...prev,
            [e.target.name]:e.target.value
          }
        })
      }

    const handleLogin = async (e) => {
        e.preventDefault();
        let token;
        let role;
        let tenantId;
        let userId;
        let toastStatus;
        let subscriptionPlan
        let noteCount;
        try {
           toastStatus=  toast.loading('Please wait...', {
                           position: "top-center",
                           autoClose: 2000,
                           hideProgressBar: false,
                           closeOnClick: false,
                           pauseOnHover: true,
                           draggable: true,
                           progress: undefined,
                           theme: "light",
                           transition: Zoom,
                           });
          const response = await axios.post("http://localhost:3000/login", formData);
          toast.dismiss(toastStatus);

          token = localStorage.setItem("token", response.data.token);
          role = localStorage.setItem("role", response.data.role);
          tenantId = localStorage.setItem("tenantId", response.data.tenantId._id);
          userId = localStorage.setItem("userId", response.data.userId);
          noteCount = localStorage.setItem("noteCount", response.data.noteCount);
          subscriptionPlan = localStorage.setItem("subscriptionPlan", response.data.tenantId.subscriptionPlan);

          setIsSignedIn(true);

          toast.success('Login successful!', {
                           position: "top-center",
                           autoClose: 2000,
                           hideProgressBar: false,
                           closeOnClick: false,
                           pauseOnHover: true,
                           draggable: true,
                           progress: undefined,
                           theme: "light",
                           transition: Zoom,
                           });
          navigate('/dashboard');
          // console.log(response.data);
          
        } catch (error) {
          toast.dismiss(toastStatus);
          if(error.response){
            console.log(error.message);
            if(error.response.status == 401){
              setInvalidPassword(true);
            }
            if(error.response.status == 404){
              // navigate('/signup');
              console.log("User not found");
              
            }
          }
        }
      }

      useEffect(() => {
        console.log(formData);
        
      },[formData])

  return (
  
    <>
    <div className='w-[310px] sm:w-[450px] border-2 border-gray-600 py-6 px-10 flex flex-col gap-4 rounded-md'>
        <div className='text-white flex flex-col gap-1'>
         <h2 className='text-center text-2xl'>Welcome Back</h2>
         <p className='text-center'>Sign in to access your notes</p>
    </div>

       <form className='w-full flex flex-col gap-4' onSubmit={handleLogin}>
        <div className='w-full text-gray-700 flex flex-col gap-1'>
            <Label>Email</Label>
            <Input className='w-full' type='email' name='email' value={formData.email}  onChange={handleFomChange}/>
        </div>

    <div className="mb-4">
       <Label className={invalidPassword ? "text-red-500" : "text-gray-700"}>
        {invalidPassword ? "Invalid Password" : "Password"}
      </Label>
      <Input
       type="password"
       value={formData.password}
       name='password'
       onChange={handleFomChange}
       className={`mt-1 block w-full px-3 py-2 border-gray-300
           ${invalidPassword 
           ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
           : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            }`}
         />
        {invalidPassword && (
          <p className="text-sm text-red-500 mt-1">Please enter the correct password.</p>
        )}
    </div>
        <Button variant="outline" className='bg-green-600 border-2 border-green-600 text-white' type="submit">Log in</Button>
       </form>

       <div className='text-gray-500 text-sm'>
        <p>Demo accounts:</p>
        <p>admin@globex.test / password </p>   
        <p>user@globex.test / password </p>
       </div>

    </div>
    </>
  )
}
