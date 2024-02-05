import React from 'react';
import { useEffect, useState, useSyncExternalStore } from 'react'
import BodyAdmin from '../components/BodyAdmin';
import HeaderAdmin from '../components/HeaderAdmin';
import ManageModerators from '../components/ManageModerators';
import axios from 'axios';
import { useAuth } from '../AuthContext';

function AdminPage() {

   const { userId } = useAuth();

  React.useEffect(() => {
    if (!userId) {
      console.log('Navigating to /signin...');
      window.location.href = '/signin';
      console.log('Navigation executed.');
    }
  }, [userId]);
   
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
    const [authorsNumber, setAuthorsNumber] = useState(132);
    const [articlesNumber, setArticlesNumber] = useState(241);
    const [urlInputValue,setUrlInputValue]=useState("");
    const [urlFilled,setUrlFilled]=useState(false); 
    const [filesList,setFilesList]=useState("");
    const [showInvalideUrl,setShowINvalideUrl]=useState(false)
    const [showUploadArticles,setShowUploadArticles]=useState(false);//fenetre d'upload articles 
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
    const handleShowUploadArticles =()=>{
      setShowUploadArticles(false)

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
    
      const handleUrlSubmit = async (e) => {
        e.preventDefault();

        if (!urlFilled) {
            setShowINvalideUrl(true);
            
        }
        else{
        try {
            console.log(urlInputValue)
            const response = await axios.post(`http://localhost:8000/ArticleStock/upload/`,{ url: urlInputValue });
            console.log(response.data); 
            setShowINvalideUrl(false)
            setShowUploadArticles(urlFilled)
            setFilesList(response.data)
            setUrlInputValue('');
            document.querySelector('input').value = '';
            

        } catch (error) {
            console.error('Error uploading URL:', error.message);
        }}
    };






      return (
        <div>
          
            <HeaderAdmin largeurEcran={largeurEcran} handleUploadArticles ={handleUploadArticles} handleManageModeratore={handleManageModeratore} updatemoderatorsList={UpdatemoderatorsList} showAddModeratorePage={showAddModeratorePage}/>
            {showAdminMainPage&&!showAddModeratorePage&& (<BodyAdmin largeurEcran={largeurEcran} UrlInputValue={urlInputValue} handleUrlSubmit={handleUrlSubmit} handleUrlChange={handleUrlChange} usersNumber={usersNumber} authorsNumber={authorsNumber} articlesNumber={articlesNumber} showInvalideUrl={showInvalideUrl} showUploadArticles={showUploadArticles} filesList={filesList} handleShowUploadArticles={handleShowUploadArticles}/>)}
            {!showAdminMainPage&&showAddModeratorePage&&(<ManageModerators largeurEcran={largeurEcran} moderatorsList={moderatorsList} updateNewModeratorAdded={updateNewModeratorAdded}/>)}
           

        </div>
      )



}

export default AdminPage
