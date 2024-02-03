import React from 'react'
import { useEffect, useState, useSyncExternalStore } from 'react'
import AddEditModerators from './AddEditModerators'
import axios from 'axios'
import '../index.css'

function ManageModerators({ largeurEcran, moderatorsList,updateNewModeratorAdded })  {
    const [showAddModeratorsMenu, setShowAddModeratorsMenu] = useState(false)
    const [showEditModeratorsMenu, setShowEditModeratorsMenu] = useState(false)
    const [ModeratorId,setModeratorId]=useState(0)
    const [ModeratorNotDeleted,setModeratorNotDeleted]=useState(false)


    const HandleEditModerator=(id)=>{
        setShowEditModeratorsMenu(true)
        setModeratorId(id)
    }

    const HandleAddModerator=()=>{
        setShowAddModeratorsMenu(true)
    }

    const HandleExitAddModeratorMenu=()=>{
        if(showAddModeratorsMenu){setShowAddModeratorsMenu(false)}
        else{
            if(showEditModeratorsMenu){setShowEditModeratorsMenu(false)}
        
        }    
    }
    const HandleDeleteModerator = async (id)=>{
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/delete_moderator/${id}/`);
            console.log('Réponse de la requête :', response.data);
            updateNewModeratorAdded()
            setModeratorNotDeleted(false)
        } catch (error) {
            setModeratorNotDeleted(true)
        }

    }






    return (
        <div>
            {(showAddModeratorsMenu||showEditModeratorsMenu) && (<AddEditModerators HandleExitAddModeratorMenu={HandleExitAddModeratorMenu} moderatorsList={moderatorsList} showAddModeratorsMenu={showAddModeratorsMenu} showEditModeratorsMenu={showEditModeratorsMenu} moderatorId={ModeratorId} updateNewModeratorAdded={updateNewModeratorAdded} />)}
            {ModeratorNotDeleted&&(<div className='text-red-500 text-center mb-[2px] font-roboto text-[15px] z-10 ml-[10px]'>The moderator has not been deleted, please try again.</div>)}
            <div className="  items-center flex flex-col w-screen bg-bgblue shadow-md px-[110px] py-[45px] max-[990px]:px-[70px] max-[920px]:px-[50px] max-[700px]:px-[20px] max-[500px]:px-0  "  style={{opacity:(showAddModeratorsMenu||showEditModeratorsMenu) ? '0.4':'1',backdropFilter:(showAddModeratorsMenu||showEditModeratorsMenu) ? 'blur(2px)':'none' }}>
                <div id='Top' className='bg-white relative flex flex-col w-full justify-center items-center rounded-lg border border-solid border-blue-300 border-opacity-40 p-4 max-[500px]:rounded-0'>
                    <p className="text-blue-900 font-montserrat text-3xl font-bold max-[600px]:text-2xl max-[500px]:text-xl ">Welcome to Moderator Management</p>
                    <p className="text-gray-700 font-montserrat text-base font-normal mb-[25px]  max-[600px]:text-[15px] ">View and manage your team here</p>
                    <div className='absolute -bottom-10 inline-flex bg-white justify-center items-center rounded-[12px] p-[10px]  border border-solid border-blue-300 border-opacity-40 cursor-pointer ' style={{ width: largeurEcran > 1000 ? largeurEcran / 4 : 250 }} onClick={HandleAddModerator} >
                        <p className="text-gray-800 font-roboto text-center text-base font-medium max-[500px]:text-[15px]">Add New Moderator</p>
                        <svg className='ml-auto' xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45" fill="none">
                            <rect width="45" height="45" rx="12" fill="#002366" />
                            <path d="M26.375 33.7368H35M30.6875 29.4737V38M12 36.5789V33.7368C12 32.2293 12.6058 30.7835 13.6841 29.7175C14.7625 28.6515 16.225 28.0526 17.75 28.0526H23.5M14.875 16.6842C14.875 18.1918 15.4808 19.6376 16.5591 20.7036C17.6375 21.7696 19.1 22.3684 20.625 22.3684C22.15 22.3684 23.6125 21.7696 24.6909 20.7036C25.7692 19.6376 26.375 18.1918 26.375 16.6842C26.375 15.1767 25.7692 13.7309 24.6909 12.6649C23.6125 11.5989 22.15 11 20.625 11C19.1 11 17.6375 11.5989 16.5591 12.6649C15.4808 13.7309 14.875 15.1767 14.875 16.6842Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
                <div id='Moderators table' className='w-full h-[450px] px-[20px] py-[12px] mt-[70px] bg-white rounded-lg border border-solid border-custom mb-0 max-[500px]:rounded-0'>
                    <div id='list Header' className='w-full h-[54px] px-[12px]  py-[18px] flex gap-[30px] border-b border-solid border-custom'>
                        <p className="text-Primary font-Roboto text-base font-medium leading-6 w-[170px] max-[1220px]:w-[100px]  max-[1130px]:w-[70px] ">ID</p>
                        <p className="text-Primary font-Roboto text-base font-medium leading-6 w-[170px] max-[630px]:w-[500px] ">UserName</p>
                        <p className="text-Primary font-Roboto text-base font-medium leading-6 w-[170px] max-[1160px]:w-[100px] max-[890px]:hidden">Name</p>
                        <p className="text-Primary font-Roboto text-base font-medium leading-6 w-[515px] max-[630px]:hidden">Email</p>
                    </div>
                    <div className='w-full h-[380px] overflow-x-hidden overflow-y-auto scrollbar'>
                        {moderatorsList.map((modertor,key) => (
                            <div key={key+1} className='relative w-full h-[54px] px-[12px] py-[18px]  flex gap-[30px] border-b border-solid border-custom'>
                                <p className="text-Primary font-Roboto text-base font-medium leading-6 w-[170px] max-[1220px]:w-[100px]  max-[1130px]:w-[70px] ">{modertor.id}</p>
                                <p className="text-Primary font-Roboto text-base font-medium leading-6 w-[170px] h-[35px] overflow-y-hidden overflow-x-auto scrollbar max-[630px]:w-[250px] ">{modertor.username}</p>
                                <p className="text-Primary font-Roboto text-base font-medium leading-6 w-[170px] h-[35px] max-[1160px]:w-[100px] overflow-y-hidden overflow-x-auto scrollbar max-[890px]:hidden ">{modertor.name}</p>
                               
                                <div className='relative w-[500px] flex flex-row items-center p-0 max-[630px]:w-[150px]'>
                                    <p className="text-Primary font-Roboto text-base font-medium leading-6 w-[300px] overflow-y-hidden overflow-x-auto scrollbar max-[1100px]:w-[195px] max-[890px]:w-[350px] max-[890px]:w-[195px] max-[630px]:hidden">{modertor.email}</p>
                                    <div className='absolute inline-flex gap-[27px] right-0 max-[1100px]:gap-[15px]'>
                                        <div className='rounded-md bg-white shadow-md px-[12px] text-blue-800 font-roboto text-[12px] font-medium leading-6 cursor-pointer' onClick={() => HandleEditModerator(modertor.id)} >Edit</div>
                                        <div className='rounded-md bg-white shadow-md px-[12px] text-blue-800 font-roboto text-[12px] font-medium leading-6 cursor-pointer' onClick={() => HandleDeleteModerator(modertor.id)} >Delete</div>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>

                </div>

            </div>
        </div>
    )

}

export default ManageModerators

