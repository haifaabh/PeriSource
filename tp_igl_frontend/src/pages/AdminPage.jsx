import { useEffect, useState, useSyncExternalStore } from 'react'
import BodyAdmin from '../components/BodyAdmin';
import HeaderAdmin from '../components/HeaderAdmin';

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
    const [showUploadArticles,setShowUploadArticles]=useState(false);
    const [filesList,setFilesList]=useState([]);
    const [showInvalideUrl,setShowINvalideUrl]=useState(false)

    const handleShowUploadArticles =()=>{
          setShowUploadArticles(false)

    }


    const handleUrlChange = (event) => {
        setUrlInputValue(event.target.value);

      };
      useEffect(() => {
        setUrlFilled(urlInputValue !== '');
      }, [urlInputValue]);
    
    const handleUrlSubmit = (e) => {
        e.preventDefault();
                  /*traitement de la valeur de urlFilled 
                  si urlFilled=vrai: afficher la fenetre de upload 
                  sinon afficher le message "URL value does'nt exist"
                  */ 
        setShowUploadArticles(urlFilled)
        if(!urlFilled){
          setShowINvalideUrl(true)
        }else{
          setShowINvalideUrl(false)
        }
        console.log(urlFilled)
        console.log('URL saisie :', urlInputValue);
        

      };
      return (
        <>
            <HeaderAdmin largeurEcran={largeurEcran} handleUrlSubmit={handleUrlSubmit}/>
            <BodyAdmin largeurEcran={largeurEcran} handleUrlSubmit={handleUrlSubmit} handleUrlChange={handleUrlChange} usersNumber={usersNumber} authorsNumber={authorsNumber} articlesNumber={articlesNumber} showInvalideUrl={showInvalideUrl} showUploadArticles={showUploadArticles} filesList={filesList} handleShowUploadArticles={handleShowUploadArticles}/>
        
        </>
      )



}

export default AdminPage
