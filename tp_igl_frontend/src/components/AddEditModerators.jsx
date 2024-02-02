import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';


function AddEditModerators({ HandleExitAddModeratorMenu, moderatorsList, showEditModeratorsMenu, showAddModeratorsMenu, moderatorId, updateNewModeratorAdded }) {

    const selectedModerator = moderatorsList.find((moderator) => moderator.id === moderatorId);
    const [ModeratorUserName, setModeratorUserName] = useState(() => {
        if (showEditModeratorsMenu) { return selectedModerator.username }
        else { return '' }
    })
    const [ModeratorName, setModeratorName] = useState(() => {
        if (showEditModeratorsMenu) { return selectedModerator.name }
        else { return '' }
    })

    const [ModeratorEmail, setModeratorEmail] = useState(() => {
        if (showEditModeratorsMenu) { return selectedModerator.email }
        else { return '' }
    })

    const [ModeratorPassword, setModeratorPassword] = useState('')

    const [isValidEmail, setIsValidEmail] = useState(false);
    const [nameIsFilled, setNameIsFilled] = useState(false)
    const [userNameIsFilled, setUserNameIsFilled] = useState(false)
    const [isClickedSave, setIsClickedSave] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [passwordIsFilled, setPasswordIsFilled] = useState(false)
    const [passwordStrength, setPasswordStrength] = useState("weak")
    const [postError, setPostError] = useState(false)
    const [postErrortemp, setPostErrortemp] = useState(false)






    const HandleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const HandleUserNameChange = (e) => {
        setModeratorUserName(e.target.value)
    }

    const HandleNameChange = (e) => {
        setModeratorName(e.target.value)
    }

    const HandleEmailChange = (e) => {
        setModeratorEmail(e.target.value)
    }


    const HandlePasswordChange = (e) => {
        setModeratorPassword(e.target.value)
    }

    useEffect(() => {
        setPasswordIsFilled(ModeratorPassword !== '')
    }, [ModeratorPassword]);

    useEffect(() => {
        setUserNameIsFilled(ModeratorUserName !== '')
    }, [ModeratorUserName]);

    useEffect(() => {
        setNameIsFilled(ModeratorName !== '')
    }, [ModeratorName]);

    useEffect(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsValidEmail(emailRegex.test(ModeratorEmail));
    }, [ModeratorEmail]);

    useEffect(() => {
        const minLength = 8;
        const hasUppercase = /[A-Z]/.test(ModeratorPassword);
        const hasLowercase = /[a-z]/.test(ModeratorPassword);
        const hasNumber = /\d/.test(ModeratorPassword);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(ModeratorPassword);
        if (ModeratorPassword.length >= minLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar) {
            setPasswordStrength('Strong');
        } else {
            if (ModeratorPassword.length >= minLength && (hasUppercase || hasLowercase) && (hasNumber || hasSpecialChar)) {
                setPasswordStrength('Moderate');
            } else {
                setPasswordStrength('weak')
            }
        }

    }, [ModeratorPassword])






    const handleSave = async () => {
        if (!isClickedSave) {
            setIsClickedSave(true)
            console.log(isClickedSave)
            if (!isClickedSave && isValidEmail && nameIsFilled && userNameIsFilled) {
                if (showEditModeratorsMenu) {
                    const modifiedDATA = {
                        id: moderatorId,
                        email: ModeratorEmail,
                        username: ModeratorUserName,
                        name: ModeratorName,
                        password: ModeratorPassword,
                    }
                    const ModeratorUserNameprev=selectedModerator.username
                    const ModeratorEmailprev=selectedModerator.email
                    const ModeratorNameprev=selectedModerator.name
                    const filteredData = Object.fromEntries(
                        Object.entries(modifiedDATA).filter(([key, value]) => {
                            return !(key === 'email' && value === ModeratorEmailprev) && !(key === 'username' && value === ModeratorUserNameprev) && !(key === 'name' && value === ModeratorNameprev) && !(key === 'password' && value === '')
                        })
                    );
                    const updateUrl = `http://127.0.0.1:8000/update_user/${moderatorId}/`;
                    try {
                        const response = await axios.post(updateUrl, filteredData);
                        updateNewModeratorAdded()
                        HandleExitAddModeratorMenu()
                        setIsClickedSave(false)


                    } catch (error) {
                        setPostErrortemp(true)
                        setIsClickedSave(false)
                    }

                }
                if (showAddModeratorsMenu) {
                    try {
                        const response = await axios.post('http://127.0.0.1:8000/register', {
                            email: ModeratorEmail,
                            username: ModeratorUserName,
                            name: ModeratorName,
                            role: 'moderator',
                            password: ModeratorPassword,

                        });
                        updateNewModeratorAdded()
                        HandleExitAddModeratorMenu()
                        setIsClickedSave(false)


                    } catch (error) {
                        setPostErrortemp(true)
                        setIsClickedSave(false)
                    }
                }


            }
        }

    }
    useEffect(() => {
        if (postErrortemp) { setPostError(postErrortemp) }

    }, [postErrortemp])


    return (

        <div className='flex flex-col w-[489px] justify-center items-center flex-shrink-0 rounded-md border border-solid border-blue-200 bg-Mono-White shadow-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10' style={{ height: (!nameIsFilled || !userNameIsFilled || !passwordIsFilled || (passwordStrength === 'weak')) ? "585px" : "473px" }} >
            <div id='header' className=' flex w-full  h-[60px] px-[38px] '>
                {showAddModeratorsMenu && (<p className=" text-Text-Active font-montserrat my-auto text-[20px] font-semibold">Add a new moderator</p>)}
                {showEditModeratorsMenu && (<p className=" text-Text-Active font-montserrat my-auto text-[20px] font-semibold">Edit moderator</p>)}
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
            <div id='Body' className=' w-full h-full border border-t-[1px] border-b-[1px] px-[38px] '>
                <p className="text-gray-600  font-roboto text-[10px] font-light leading-1 mt-[7px] mb-[9px] " hidden={showEditModeratorsMenu}>Fill in the registration data to add a new moderator.<br />It will take a couple of minutes. </p>
                <div id='Data list' className='w-full  px-[20px] pt-[12px] pb-[9px]   rounded-lg border border-solid border-Border bg-White' style={{ height: (!nameIsFilled || !userNameIsFilled || !passwordIsFilled) && isClickedSave ? "385px" : "310px" }} >
                    <div className='w-full flex flex-col gap-[11px] mb-[10px] items-start p-0  border-b border-solid border-custom'>
                        <p className="h-[20px] justify-center flex-shrink-0 self-stretch text-gray-700 font-roboto text-[15px] font-bold leading-5 ">UserName</p>
                        <input type="text" className="ml-[10px] w-full text-gray-700 font-roboto bg-white text-[15px] font-light leading-5 outline-none" placeholder={showAddModeratorsMenu ? "write your UserName" : ""} defaultValue={showEditModeratorsMenu ? selectedModerator.username : ""} onChange={HandleUserNameChange} />
                    </div>
                    {isClickedSave && !userNameIsFilled && (<div className='text-red-500 mb-[2px] font-roboto text-[15px] z-10 ml-[10px]'>UserName is not defined</div>)}
                    <div className='w-full flex flex-col gap-[11px] mb-[10px] items-start p-0  border-b border-solid border-custom'>
                        <p className="h-[20px] justify-center flex-shrink-0 self-stretch text-gray-700 font-roboto text-[15px] font-bold leading-5 ">Name</p>
                        <input type="text" className="ml-[10px] w-full text-gray-700 font-roboto bg-white text-[15px] font-light leading-5 outline-none" placeholder={showAddModeratorsMenu ? "write your Name" : ""} defaultValue={showEditModeratorsMenu ? selectedModerator.name : ""} onChange={HandleNameChange} />
                    </div>
                    {isClickedSave && !nameIsFilled && (<div className='text-red-500 mb-[2px] font-roboto text-[15px] z-10 ml-[10px]'>Name is not defined</div>)}
                    <div className='w-full flex flex-col gap-[11px] mb-[10px] items-start p-0  border-b border-solid border-custom'>
                        <p className="h-[20px] justify-center flex-shrink-0 self-stretch text-gray-700 font-roboto text-[15px] font-bold leading-5 ">Email</p>
                        {showAddModeratorsMenu && (<input type="email" className="ml-[10px] w-full text-gray-700 font-roboto bg-white text-[15px] font-light leading-5 outline-none" placeholder="write your Email" onChange={HandleEmailChange} />)}
                        {showEditModeratorsMenu && (<input type="email" className="ml-[10px] w-full text-gray-700 font-roboto bg-white text-[15px] font-light leading-5 outline-none" defaultValue={selectedModerator.email} onChange={HandleEmailChange} />)}

                    </div>
                    {isClickedSave && !isValidEmail && (<div className='text-red-500 mb-[2px] font-roboto text-[15px] z-10 ml-[10px]'>Invalide Email</div>)}
                    <div className='w-full flex flex-col gap-[11px] mb-[10px] items-start p-0 '>
                        <p className="h-[20px] justify-center flex-shrink-0 self-stretch text-gray-700 font-roboto text-[15px] font-bold leading-5 ">PassWord</p>
                        <div className="w-full h-full flex inline-flex justify-center items-center">
                            <input type={showPassword ? 'text' : 'password'} className="ml-[10px] w-full text-gray-700 font-roboto bg-white text-[15px] font-light leading-5 outline-none" placeholder={showAddModeratorsMenu ? "write your Password" : ""} defaultValue={showEditModeratorsMenu ? selectedModerator.password : ""} onChange={HandlePasswordChange} />
                            <svg className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 10 7" fill="none" onClick={HandleShowPassword}>
                                <path d="M5.05569 0.0180664C2.99558 0.0180664 1.23624 1.29946 0.523437 3.10824C1.23624 4.91702 2.99558 6.19841 5.05569 6.19841C7.11581 6.19841 8.87514 4.91702 9.58794 3.10824C8.87514 1.29946 7.11581 0.0180664 5.05569 0.0180664ZM5.05569 5.16835C3.91851 5.16835 2.99558 4.24542 2.99558 3.10824C2.99558 1.97106 3.91851 1.04812 5.05569 1.04812C6.19287 1.04812 7.11581 1.97106 7.11581 3.10824C7.11581 4.24542 6.19287 5.16835 5.05569 5.16835ZM5.05569 1.87217C4.37173 1.87217 3.81962 2.42428 3.81962 3.10824C3.81962 3.7922 4.37173 4.34431 5.05569 4.34431C5.73965 4.34431 6.29176 3.7922 6.29176 3.10824C6.29176 2.42428 5.73965 1.87217 5.05569 1.87217Z" fill="#D4D4D4" />
                            </svg>
                        </div>
                    </div>
                    {!showEditModeratorsMenu&&isClickedSave && !passwordIsFilled && (<div className='text-red-500 mb-[2px] font-roboto text-[15px] z-10 ml-[10px]'>PassWord is not defined</div>)}
                    {!postError && passwordIsFilled && (<div className=' mb-[2px] font-roboto text-[15px] z-10 ml-[10px]' style={{ color: (passwordStrength === 'weak') ? 'red' : (passwordStrength === 'Moderate') ? 'orange' : 'green' }}>{passwordStrength} {(passwordStrength === 'weak') && (<div className="text-[10px]">Ensure your password is a minimum of 8 characters, at least one number, and the inclusion of special characters and uppercase letters </div>)} </div>)}
                    {postError && (<div className='text-red-500 mb-[2px] font-roboto text-[15px] z-10 ml-[10px]'>Username already existe or invalide Email adresse </div>)}
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