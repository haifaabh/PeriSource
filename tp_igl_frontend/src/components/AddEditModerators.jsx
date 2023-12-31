import { useState,useEffect } from "react";


function AddEditModerators({HandleExitAddModeratorMenu,moderatorsList, showEditModeratorsMenu,showAddModeratorsMenu,moderatorId}){

    const selectedModerator = moderatorsList.find((moderator) => moderator.id === moderatorId);
    const [ModeratorUserName,setModeratorUserName]=useState(()=>{
        if(showEditModeratorsMenu){ return selectedModerator.userName}
        else {return''}})
    const [ModeratorName,setModeratorName]=useState(()=>{
        if(showEditModeratorsMenu){ return selectedModerator.name}
        else {return''}})
    const [ModeratorSurname,setModeratorSurname]=useState(()=>{
        if(showEditModeratorsMenu){ return selectedModerator.surname}
        else {return''}})
    const [ModeratorEmail,setModeratorEmail]=useState(()=>{
        if(showEditModeratorsMenu){ return selectedModerator.email}
        else {return''}})
    const [ModeratorPhoneNumber,setModeratorPhoneNumber]=useState(()=>{
        if(showEditModeratorsMenu){ return selectedModerator.phoneNumber}
        else {return''}})
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [nameIsFilled,setNameIsFilled]=useState(false)
    const [userNameIsFilled,setUserNameIsFilled]=useState(false)
    const [surnameIsFilled,setSurnameIsFilled]=useState(false)
    const [isValidePhoneNumber,setIsValidePhoneNumber]=useState(false)
    const [isClickedSave,setIsClickedSave]=useState(false)
        console.log(ModeratorName)

    
    const HandleUserNameChange=(e)=>{
        setModeratorUserName(e.target.value)


    }
    const HandleNameChange=(e)=>{
        setModeratorName(e.target.value)

    }
    const HandleSurnameChange=(e)=>{
        setModeratorSurname(e.target.value)

    }
    const HandleEmailChange=(e)=>{
        setModeratorEmail(e.target.value)


    }
    const HandlePhoneNumberChange=(e)=>{
        setModeratorPhoneNumber(e.target.value)

    }
    useEffect(() => {
        setSurnameIsFilled(ModeratorSurname!=='')
    }, [ModeratorSurname]);
    useEffect(() => {
        setUserNameIsFilled(ModeratorUserName!=='')
    }, [ModeratorUserName]);
    useEffect(() => {
        setNameIsFilled(ModeratorName!=='')
    }, [ModeratorName]);
    useEffect(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsValidEmail(emailRegex.test(ModeratorEmail));
    }, [ModeratorEmail]);
    useEffect(() => {
        const phoneRegex = /^(06|07|05)[0-9]{8}$/;
        setIsValidePhoneNumber(phoneRegex.test(ModeratorPhoneNumber))
    }, [ModeratorPhoneNumber]);
    
    
          
    const handleSave=()=>{
        console.log(ModeratorName)
        console.log(ModeratorSurname)
        console.log(ModeratorUserName)
        console.log(ModeratorEmail)
        console.log(ModeratorPhoneNumber)
        if(!isClickedSave){setIsClickedSave(true)}
        if(isValidEmail &&nameIsFilled&&userNameIsFilled&&surnameIsFilled&&isValidePhoneNumber ){
            HandleExitAddModeratorMenu()
            setIsClickedSave(false)
        }
        
         
    }

    return (
       
            <div className='flex flex-col w-[489px] justify-center items-center flex-shrink-0 rounded-md border border-solid border-blue-200 bg-Mono-White shadow-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10' style={{height:(!nameIsFilled||!surnameIsFilled||!userNameIsFilled)?"540px":"473px"}} >
                <div id='header' className=' flex w-full  h-[60px] px-[38px] '>
                    {showAddModeratorsMenu&&(<p className=" text-Text-Active font-montserrat my-auto text-[20px] font-semibold">Add a new moderator</p>)}
                    {showEditModeratorsMenu&&(<p className=" text-Text-Active font-montserrat my-auto text-[20px] font-semibold">Edit moderator</p>)}
                    <div onClick={HandleExitAddModeratorMenu} className='w-[12px] h-[12px] ml-auto my-[24px] cursor-pointer '>
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 12 12" fill="none">
                            <g clipPath="url(#clip0_210_3623)">
                                <path d="M2.33861 1.37356L2.19719 1.23214L2.05577 1.37356L1.37327 2.05606L1.23184 2.19748L1.37327 2.33891L5.03448 6.00012L1.35063 9.6912L1.20948 9.83262L1.35077 9.97391L2.02577 10.6489L2.16705 10.7902L2.30847 10.649L5.99955 6.96519L9.68327 10.6489L9.82469 10.7903L9.96611 10.6489L10.6486 9.96641L10.79 9.82499L10.6486 9.68356L6.96503 5.99998L10.6261 2.33891L10.7675 2.19748L10.6261 2.05606L9.94361 1.37356L9.80219 1.23214L9.66077 1.37356L5.99969 5.03464L2.33861 1.37356Z" fill="#666D73" stroke="#666D73" strokeWidth="0.4" />
                            </g>
                            <defs>
                                <clipPath id="clip0_210_3623">
                                    <rect width="12" height="12" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                </div>
                <div id='Body' className=' w-full border border-t-[1px] border-b-[1px] px-[38px] '>
                    <p className="text-gray-600  font-roboto text-[10px] font-light leading-1 mt-[7px] mb-[9px] " hidden={showEditModeratorsMenu}>Fill in the registration data to add a new moderator.<br/>It will take a couple of minutes. </p>
                    <div id='Data list' className='w-full  px-[20px] pt-[12px] pb-[9px]   rounded-lg border border-solid border-Border bg-White 'style={{height:(!nameIsFilled||!surnameIsFilled||!userNameIsFilled)?"350px":"280px"}} >
                        <div className='w-full flex flex-col gap-[11px] mb-[2px] items-start p-0  border-b border-solid border-custom'>
                            <p className="h-[8.24px] justify-center flex-shrink-0 self-stretch text-gray-700 font-roboto text-[12px] font-bold leading-5 ">UserName</p>
                            <input type="text" className="ml-[10px] w-full text-gray-700 font-roboto bg-white text-[12px] font-light leading-5 outline-none" placeholder={showAddModeratorsMenu?"write your UserName":""} defaultValue={showEditModeratorsMenu? selectedModerator.userName :""} onChange={HandleUserNameChange}/>
                        </div>
                        {isClickedSave&&!userNameIsFilled&&(<div className='text-red-500 font-roboto text-[12px] z-10 ml-[10px]'>UserName is not defined</div>)}
                        <div className='w-full flex flex-col gap-[11px] mb-[2px] items-start p-0  border-b border-solid border-custom'>
                            <p className="h-[8.24px] justify-center flex-shrink-0 self-stretch text-gray-700 font-roboto text-[12px] font-bold leading-5 ">Name</p>
                            <input type="text" className="ml-[10px] w-full text-gray-700 font-roboto bg-white text-[12px] font-light leading-5 outline-none" placeholder={showAddModeratorsMenu?"write your Name":""} defaultValue={showEditModeratorsMenu? selectedModerator.name :""} onChange={HandleNameChange}/>
                        </div>
                        {isClickedSave&&!nameIsFilled&&(<div className='text-red-500 font-roboto text-[12px] z-10 ml-[10px]'>Name is not defined</div>)}
                        <div className='w-full flex flex-col gap-[11px] mb-[2px] items-start p-0  border-b border-solid border-custom'>
                            <p className="h-[8.24px] justify-center flex-shrink-0 self-stretch text-gray-700 font-roboto text-[12px] font-bold leading-5 ">Surame</p>
                            <input type="text" className="ml-[10px] w-full text-gray-700 font-roboto bg-white text-[12px] font-light leading-5 outline-none" placeholder={showAddModeratorsMenu?"write your Surname":""} defaultValue={showEditModeratorsMenu? selectedModerator.surname :""} onChange={HandleSurnameChange}/>
                        </div>
                        {isClickedSave&&!surnameIsFilled&&(<div className='text-red-500 font-roboto text-[12px] z-10 ml-[10px]'>Surname is not defined</div>)}
                        <div className='w-full flex flex-col gap-[11px] mb-[2px] items-start p-0  border-b border-solid border-custom'>
                            <p className="h-[8.24px] justify-center flex-shrink-0 self-stretch text-gray-700 font-roboto text-[12px] font-bold leading-5 ">Email</p>
                            {showAddModeratorsMenu&&(<input type="email" className="ml-[10px] w-full text-gray-700 font-roboto bg-white text-[12px] font-light leading-5 outline-none" placeholder="write your Email"  onChange={HandleEmailChange}/>)}
                            {showEditModeratorsMenu&&(<input type="email" className="ml-[10px] w-full text-gray-700 font-roboto bg-white text-[12px] font-light leading-5 outline-none"  defaultValue={ selectedModerator.email} onChange={HandleEmailChange}/>)}

                        </div>
                        {isClickedSave&&!isValidEmail&&(<div className='text-red-500 font-roboto text-[12px] z-10 ml-[10px]'>Invalide Email</div>)}
                        <div className='w-full flex flex-col gap-[11px] mb-[2px] items-start p-0  border-b border-solid border-custom'>
                            <p className="h-[8.24px] justify-center flex-shrink-0 self-stretch text-gray-700 font-roboto text-[12px] font-bold leading-5 ">Phone number</p>
                            <input type="text" className="ml-[10px] w-full text-gray-700 font-roboto bg-white text-[12px] font-light leading-5 outline-none" placeholder={showAddModeratorsMenu?"write your Phone Number":""} defaultValue={showEditModeratorsMenu? selectedModerator.phoneNumber :""} onChange={HandlePhoneNumberChange}/>
                        </div>
                        {isClickedSave&&!isValidePhoneNumber&&(<div className='text-red-500 font-roboto text-[12px] z-10 ml-[10px]'>Invalide phone Number</div>)}
                        <div className='w-full flex flex-col gap-[11px] mb-[2px] items-start p-0 '>
                            <p className="h-[8.24px] justify-center flex-shrink-0 self-stretch text-gray-700 font-roboto text-[12px] font-bold leading-5 ">PassWord</p>
                            <input type="text" className="ml-[10px] w-full text-gray-700 font-roboto bg-white text-[12px] font-light leading-5 outline-none" placeholder="write her"/>
                        </div>
                        

                    </div>


                </div>
                <div id='footer' className='bg-Mono-White py-[20px] px-[40px] items-center mt-auto'>
                    <div className='w-[379px] h-[39px] items-center flex justify-center rounded-[5px] bg-Primary-Default cursor-pointer ' onClick={handleSave}>
                        <p className='text-Mono-White text-center font-Roboto text-16 font-bold'>Save</p>
                    </div>

                </div>
            </div>
        

    )




}

export default AddEditModerators