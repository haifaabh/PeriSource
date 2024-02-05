
import React from 'react';
import { useEffect, useState, useSyncExternalStore } from 'react'
import BodyAdmin from '../components/BodyAdmin';
import HeaderAdmin from '../components/HeaderAdmin';
import ManageModerators from '../components/ManageModerators';
import axios from 'axios';
function AdminPage() {
   
    const [largeurEcran, setLargeurEcran] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => {                          /*recuperer la largeur de l'ecran*/
            setLargeurEcran(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const [usersNumber, setUsersNumber] = useState(985454);
    const [authorsNumber, setAuthorsNumber] = useState(0);
    const [articlesNumber, setArticlesNumber] = useState(0);
    const [urlInputValue,setUrlInputValue]=useState("");
    const [urlFilled,setUrlFilled]=useState(false); 
    const [filesList,setFilesList]=useState([]);
    const [showInvalideUrl,setShowINvalideUrl]=useState(false)
    const [showAddModeratorePage,setShowAddModertorePage]=useState(false)
    const [showAdminMainPage,setShowAdminMainPage]=useState(true)
    const [moderatorsList,setModeratorsList]=useState([])
    const [newModeratorAdded,setNewModeratorAdded]=useState(false)
    const [tempList,setTemplist]=useState([])
    const updateNewModeratorAdded=()=>{
      setNewModeratorAdded(true)
    }

    const fetchModeratorlist = async()=>{
      if(newModeratorAdded){
         axios.get('http://127.0.0.1:8000/get_moderators')
        .then((res)=>{setModeratorsList(res.data)})
        setNewModeratorAdded(false)
      }

    }
    useEffect(()=>{
      fetchModeratorlist()

    },[newModeratorAdded])



    const UpdatemoderatorsList=(newlist)=>{
      setModeratorsList(newlist)
    }
    const handleUploadArticles =()=>{
      if(showAddModeratorePage){
        setShowAdminMainPage(true)
        setShowAddModertorePage(false)
      }
    }
    const handleManageModeratore=()=>{
      if(showAdminMainPage){
        setShowAddModertorePage(true)
        setShowAdminMainPage(false)
        axios.get('http://127.0.0.1:8000/get_moderators')
        .then((res)=>{setModeratorsList(res.data)})
      }
      
    }

   


    const handleUrlChange = (event) => {
        setUrlInputValue(event.target.value);

      };
      useEffect(() => {
        setUrlFilled(urlInputValue !== '');
      }, [urlInputValue]);
    
    const handleUrlSubmit = (e) => {
        e.preventDefault();

        if(!urlFilled){
          setShowINvalideUrl(true)
        }else{
          setShowINvalideUrl(false)
          setUrlInputValue('')
          document.querySelector('input').value = '';          
        }

     
      };

      return (
        <div>
            <HeaderAdmin largeurEcran={largeurEcran} handleUploadArticles ={handleUploadArticles} handleManageModeratore={handleManageModeratore} updatemoderatorsList={UpdatemoderatorsList} showAddModeratorePage={showAddModeratorePage}/>
            {showAdminMainPage&&!showAddModeratorePage&& (<BodyAdmin largeurEcran={largeurEcran} UrlInputValue={urlInputValue} handleUrlSubmit={handleUrlSubmit} handleUrlChange={handleUrlChange} usersNumber={usersNumber} authorsNumber={authorsNumber} articlesNumber={articlesNumber} showInvalideUrl={showInvalideUrl} filesList={filesList}/>)}
            {!showAdminMainPage&&showAddModeratorePage&&(<ManageModerators largeurEcran={largeurEcran} moderatorsList={moderatorsList} updateNewModeratorAdded={updateNewModeratorAdded}/>)}
        
        </div>
      )



}

export default AdminPage