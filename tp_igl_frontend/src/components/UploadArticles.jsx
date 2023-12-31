import { useEffect, useState } from 'react'


import '../index.css'




function UploadArticles({filesList,handleShowUploadArticles}) {



    return (
       
            <div className='flex flex-col w-[460px] h-[428px] justify-center items-center flex-shrink-0 rounded-md border border-solid border-blue-200 bg-Mono-White shadow-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 max-[500px]:w-full' >
                <div id='header' className='flex w-full  h-[60px] px-[38px]  '>
                    <p className="mt-[21px] mb-[15px] text-Text-Active font-montserrat text-20 font-semibold max-[500px]:text-10"> Upload Articles</p>
                    <div onClick={handleShowUploadArticles} className='w-[12px] h-[12px] ml-auto my-[24px] cursor-pointer '>
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
                <div id='Body' className='w-full border border-t-[1px] border-b-[1px] px-[38px] py-[35px] max-[502px]:px-0'>
                    <div id='Articles list' className='w-[384px] h-[221px] py-[20px] pt-[12px] pb-[9px]   rounded-lg border border-solid border-Border bg-White max-[502px]:w-full' >
                        <div className='flex w-[384px]   flex-col p-0 max-[502px]:w-full'>
                            <div id='list Header' className='w-full h-[46px] px-[12px] pt-[18px] pb-[10px] grid grid-cols-2 mr-auto'>
                                <p className="text-Primary font-Roboto text-base font-medium leading-6">No</p>
                                <p className="text-Primary font-Roboto text-base font-medium leading-6 whitespace-nowrap mr-auto ">File Name</p>
                            </div>
                            <div className='w-[384px] h-[1px] bg-gray-200 max-[502px]:w-full'></div>
                        </div>
                        <div className='w-full h-[154px] overflow-x-hidden overflow-y-auto scrollbar'>
                            {filesList.map((file, index) => (
                                <div className='flex w-full  flex-col p-0'>
                                    <div id='list ligne' className='w-full h-[46px] px-[12px] pt-[18px] pb-[10px] grid grid-cols-2  mr-auto'>
                                        <p className="text-Primary font-Roboto text-base font-medium leading-6 ">{index + 1}</p>
                                        <div className='flex flex-row items-center p-0 '>
                                            <p className="text-Primary font-Roboto text-base font-medium leading-6 whitespace-nowrap w-[120px] overflow-hidden ">{file.fileName}</p>
                                            <div className='w-[12px] h-[12px] ml-auto  '>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 12 12" fill="none">
                                                    <g clipPath="url(#clip0_102_2072)">
                                                        <path d="M2.33861 1.37356L2.19719 1.23214L2.05577 1.37356L1.37327 2.05606L1.23184 2.19748L1.37327 2.33891L5.03448 6.00012L1.35063 9.6912L1.20948 9.83262L1.35077 9.97391L2.02577 10.6489L2.16705 10.7902L2.30847 10.649L5.99955 6.96519L9.68327 10.6489L9.82469 10.7903L9.96611 10.6489L10.6486 9.96641L10.79 9.82499L10.6486 9.68356L6.96503 5.99998L10.6261 2.33891L10.7675 2.19748L10.6261 2.05606L9.94361 1.37356L9.80219 1.23214L9.66077 1.37356L5.99969 5.03464L2.33861 1.37356Z" fill="#666D73" stroke="#666D73" strokeWidth="0.4" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_102_2072">
                                                            <rect width="12" height="12" fill="white" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>

                                            </div>
                                        </div>
                                    </div>
                                    <div className='w-[384px] h-[1px] bg-gray-200 max-[502px]:w-full'></div>
                                </div>

                            ))}
                        </div>
                    </div>


                </div>
                <div id='footer' className='bg-Mono-White py-[20px] px-[40px] items-center'>
                    <div className='w-[379px] h-[39px] items-center flex justify-center rounded-[5px] bg-Primary-Default '>
                        <p className='text-Mono-White text-center font-Roboto text-16 font-bold'>Save</p>
                    </div>

                </div>
            </div>
        

    )


}

export default UploadArticles
