import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage';
import { NotesDashBoard } from './pages/NotesDashBoard';
import { AppLayout  } from './layout/AppLayout';
import { createContext, useState } from 'react';
import { ProtectedRoute } from './components/ProtectedRoute';


export const AuthContext = createContext();

function App() {
  const[isSignedIn,setIsSignedIn] = useState(false);

  const router = createBrowserRouter([{
    element:<AppLayout/>,
    children:[
      {
      path:"/",
      element:<LandingPage/>
    },{
      path:"/dashboard",
      element:<ProtectedRoute><NotesDashBoard/></ProtectedRoute>
    }
    ]
  },])

  return (
    <>
     <AuthContext.Provider value={{isSignedIn,setIsSignedIn}}>
     <RouterProvider router={router}></RouterProvider>
     </AuthContext.Provider>
    </>
  )
}

export default App
