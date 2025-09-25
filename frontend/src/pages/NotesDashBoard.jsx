import React, { useEffect } from 'react'
import { useState } from 'react';
import { Label } from '../components/ui/label.jsx';
import { Input } from '../components/ui/input.jsx';
import { Textarea } from '../components/ui/textarea.jsx';
import { Button } from '../components/ui/button.jsx';
import { Edit, Trash2 } from 'lucide-react';
import axios from 'axios';


export const NotesDashBoard = () => {

    const[isModalOpen,setIsModalOpen]=useState(false);
    const[updateStatus, setUpdateStatus] = useState(false);
    const[notes,setNotes] = useState([]);
    const [updateNoteId, setUpdateNoteId] = useState();
    const[noteCount,setNoteCount] = useState();
    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("userId");
    const tenantId = localStorage.getItem("tenantId")
    const token = localStorage.getItem("token")
    const subscriptionPlan = localStorage.getItem("subscriptionPlan");
    const[title,setTitle] = useState("");
    const[content,setContent] = useState("");


useEffect(() => {
  console.log(localStorage);
  
},[])

    //Cancelling Modal

    const handleCancel = () => {
        setIsModalOpen(false);
        setUpdateStatus(false);
        setTitle("");
        setContent("");
    }
    
    //Single function to handle both Create and Update

    const handleNote = async () => {
      setIsModalOpen(true);
      //create note only if updateStatus is false
      if(!updateStatus){
        const response = await axios.post("https://saas-notes-app-abav.onrender.com/notes/",{
          title,
          content,
          userId,
          tenantId
       },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      setNoteCount(response?.data?.noteCount);
       console.log("Received",response.data);
       
    }
      //update note only if updateStatus is true
      else{
        const response = await axios.put(`https://saas-notes-app-abav.onrender.com/notes/${updateNoteId}`,{
          title,
          content,
       },{
        headers:{
          Authorization:`Bearer ${token}` 
        }
      })
       console.log("Updated",response.data);
      }
      setIsModalOpen(false);
      setTitle("");
      setContent("");
      getNotes();
    }


    //Upgrading Notes
    const handleUpgrade = async () => {
    try {
       const response = await axios.get("https://saas-notes-app-abav.onrender.com/notes/", {
          params: { role, userId, tenantId },
          headers: { Authorization: `Bearer ${token}` }
         });
        localStorage.setItem("subscriptionPlan", "Pro");
        console.log(response.data);

    } catch (error) {
      console.log("Error upgrading ", error);
    } 
    }
    
    //Fetching Notes
    const getNotes = async () => {
      try {
        const response = await axios.get("https://saas-notes-app-abav.onrender.com/notes/", {
          params: { role, userId, tenantId },
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log(response.data);
        setNotes(response?.data?.notes);
        setNoteCount(response?.data?.noteCount);
      } catch (error) {
        console.log("Error fetching notes:", error);
      }
    }

 //Deleting Notes
   const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`https://saas-notes-app-abav.onrender.com/notes/${id}`, {
            params:{tenantId},
            headers: { Authorization: `Bearer ${token}` }
            });
            setNoteCount(response?.data?.noteCount);
      // console.log(response.data);
    } catch (error) {
      console.log("Error deleting note:", error);
    }
    getNotes();
   }

    useEffect(() => {
      getNotes();
    },[])

  return (
    <div className='bg-gray-900 min-h-screen relative'>

        <div className='flex justify-between items-center p-8'>
            <div>
                <h1 className='font-bold text-2xl text-white'>{role == "Admin" ? "Notes created by members of your tenant" : "Notes"}</h1>
                <p className='text-gray-700'>{ noteCount > 3  ? "Free Plan limit reached, Upgrade to Pro" : `${noteCount} notes used`}</p>
            </div>
            <Button
                onClick={() => setIsModalOpen(true)}
                disabled={role === "Admin" || (role === "User" && subscriptionPlan === "Free" && noteCount >= 3)}
                className="flex items-center gap-2 px-4 py-2 
                           bg-green-600 text-white font-semibold 
                           rounded-xl shadow-md">
                <p className="text-xl font-bold">+</p>
                <p>New Note</p>
              </Button>
        </div>

       {role == "Admin" && (
         <Button
             disabled={subscriptionPlan === "Pro"}
             onClick={handleUpgrade}
             className="ml-8 mb-6 flex w-[200px] items-center gap-2 px-4 py-2 
             bg-purple-600 text-white font-semibold 
             rounded-xl shadow-md cursor-pointer ">
             <p className="text-xl font-bold">^</p>
             <p>Upgrade to Pro</p>
           </Button>
       )}

{/* Notes Card */}
<div className='flex flex-wrap gap-6 mb-8'>
   {notes?.map((note,index) => (
     <div key={index} className="mx-8 bg-white rounded-xl shadow-md border border-gray-200 p-4 w-full sm:w-[300px] relative">
      <div className="absolute top-3 right-3 flex gap-2">
        <Button
          disabled={role === "Admin"}
          onClick={() => {
          setIsModalOpen(true)
          setUpdateStatus(true);
          setTitle(note.title);
          setUpdateNoteId(note._id);
          setContent(note.description);
          }} 
          className="p-1 rounded-md hover:bg-gray-100"
        >
        <Edit size={18} className="text-gray-600" />
        </Button>
        <Button 
        disabled={role === "Admin"}
        onClick ={() => handleDelete(note._id)}
          className="p-1 rounded-md hover:bg-gray-100"
        >
          <Trash2 size={18} className="text-red-500" />
        </Button>
      </div>

      <h3 className="text-lg font-semibold text-gray-900">{note.title}</h3>
      <p className="text-sm text-gray-600 mt-2 line-clamp-3">{note.description}</p>
    </div>
   ))
  }
  </div>

        {/* Notes Modal */}

        {isModalOpen && (
             <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className='bg-gray-700 p-6 rounded-md w-[300px] sm:w-[420px] flex flex-col gap-4'>
                <div>
                   <h2 className='text-white text-center '>{updateStatus ? "Update your note" : "Create New Note"}</h2>
                   <p className=' text-center text-gray-400 text-sm'>{updateStatus ? "Make changes to your note" : "Add a new note to your collection."}</p>
                </div>
            <div className='w-full text-white flex flex-col gap-1'>
                <Label>Title</Label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} className='w-full' type='text'/>
            </div>

            <div className='w-full text-white flex flex-col gap-1'>
                <Label>Content</Label>
                <Textarea value={content} onChange={(e) => setContent(e.target.value)}  className='w-full' type='text'/>
            </div>

            <div className="flex flex-col gap-3">
               <Button onClick={handleNote} className="bg-green-600 hover:bg-green-700 text-white font-semibold">
                 {updateStatus ? "Update your note" : "Create New Note"}
               </Button>
               <Button onClick={handleCancel} variant="secondary" className="bg-gray-200 hover:bg-gray-300 text-gray-800">
                 Cancel
               </Button>
             </div>
            </div>
        </div>
        )}

   
    </div>
  )
}
