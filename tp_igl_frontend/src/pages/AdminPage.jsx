import { useEffect, useState, useSyncExternalStore } from 'react'
import BodyAdmin from '../Components/BodyAdmin';
import HeaderAdmin from '../Components/HeaderAdmin';
import ManageModerators from '../Components/ManageModerators';
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
    const [showUploadArticles,setShowUploadArticles]=useState(false);//fenetre d'upload articles 
    const [filesList,setFilesList]=useState([]);
    const [showInvalideUrl,setShowINvalideUrl]=useState(false)
    const [showAddModeratorePage,setShowAddModertorePage]=useState(false)
    const [showAdminMainPage,setShowAdminMainPage]=useState(true)
    const [moderatorsList,setModeratorsList]=useState([
      { id: 1, userName: 'JohnDoe', name: 'John', surname: 'Doe',phoneNumber:'0658081195' ,email: 'john.doe@example.com' },
      { id: 2, userName: 'JaneSmith', name: 'Jane', surname: 'Smith',phoneNumber:'0658081195' ,email: 'jane.smith@example.com' },
      { id: 3, userName: 'BobJohnson', name: 'Bob', surname: 'Johnson',phoneNumber:'0658081195' ,email: 'bob.johnson@example.com' },
      { id: 4, userName: 'AliceWilliams', name: 'Alice', surname: 'Williams',phoneNumber:'0658081195' ,email: 'alice.williams@example.com' },
      { id: 5, userName: 'CharlieBrown', name: 'Charlie', surname: 'Brown',phoneNumber:'0658081195' ,email: 'charlie.brown@example.com' },
      { id: 6, userName: 'EvaDavis', name: 'Eva', surname: 'Davis',phoneNumber:'0658081195' ,email: 'eva.davis@example.com' },
      { id: 7, userName: 'MichaelMiller', name: 'Michael', surname: 'Miller',phoneNumber:'0658081195' ,email: 'michael.miller@example.com' },
      { id: 8, userName: 'SophiaMoore', name: 'Sophia', surname: 'Moore',phoneNumber:'0658081195' ,email: 'sophia.moore@example.com' },
      { id: 9, userName: 'WilliamWilson', name: 'William', surname: 'Wilson',phoneNumber:'0658081195' ,email: 'william.wilson@example.com' },
      { id: 10, userName: 'OliviaJones', name: 'Olivia', surname: 'Jones',phoneNumber:'0658081195' ,email: 'olivia.jones@example.com' },
    ])

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
      }
      
    }

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
          setUrlInputValue('')
          document.querySelector('input').value = '';          
        }

     
      };

      return (
        <>
            <HeaderAdmin largeurEcran={largeurEcran} handleUploadArticles ={handleUploadArticles} handleManageModeratore={handleManageModeratore} showAddModeratorePage={showAddModeratorePage}/>
            {showAdminMainPage&&!showAddModeratorePage&& (<BodyAdmin largeurEcran={largeurEcran} UrlInputValue={urlInputValue} handleUrlSubmit={handleUrlSubmit} handleUrlChange={handleUrlChange} usersNumber={usersNumber} authorsNumber={authorsNumber} articlesNumber={articlesNumber} showInvalideUrl={showInvalideUrl} showUploadArticles={showUploadArticles} filesList={filesList} handleShowUploadArticles={handleShowUploadArticles}/>)}
            {!showAdminMainPage&&showAddModeratorePage&&(<ManageModerators largeurEcran={largeurEcran} moderatorsList={moderatorsList}/>)}
        
        </>
      )



}

export default AdminPage
