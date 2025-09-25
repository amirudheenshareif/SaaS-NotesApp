import React, { useContext, useEffect } from 'react'
import { Button } from './ui/button.jsx'
import { AuthContext } from '../App.jsx'
import { toast,Zoom } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const Header = () => {

  const { isSignedIn,setIsSignedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsSignedIn(false);
    localStorage.clear();
    toast.error('You are logged out!', {
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
              navigate("/");

  }

  useEffect(() => {
    if(localStorage.getItem("token")){
      setIsSignedIn(true);
    }},[])
  return (
    <div className='bg-gray-900 text-white flex justify-between p-8'>
        <div className='flex justify-center items-center gap-1'>
           <p className='font-bold text-green-600 text-sm'>Notes App</p>
        </div>

       <div className='flex gap-4'>
        {/* <Button className="px-3 sm:px-5 py-1 sm:py-2 rounded-xl border border-green-600 text-green-600 hover:bg-blue-50 font-medium transition" variant='outline'>Login</Button> */}
        {(isSignedIn) ? (
          <Button 
          onClick={handleLogout}
          className="px-3 sm:px-5 py-1 sm:py-2 rounded-md bg-red-600 text-white font-semibold shadow-sm hover:bg-red-700" >Logout</Button>
        ):(
          <Button className="px-3 sm:px-5 py-1 sm:py-2 rounded-md bg-green-600 text-white font-semibold shadow-sm hover:bg-green-700" >SignUp</Button>
        )}
      </div>

    </div>
  )
}
