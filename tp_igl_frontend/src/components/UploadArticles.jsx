import { useEffect, useState } from 'react';
import '../index.css';

function UploadArticles({ filesList, handleShowUploadArticles }) {
    const popupStyles = {
        width: '300px',
        height: '150px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#fff', // White background color
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        zIndex: '10',
        maxWidth: '100%',
    };

    const headerStyles = {
        width: '100%',
        height: '40px',
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    };

    const closeIconStyles = {
        width: '12px',
        height: '12px',
        cursor: 'pointer',
    };

    const contentStyles = {
        flex: '1',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
    };

    const messageStyles = {
        color: '#333', // Change the text color to your preference
        fontSize: '16px',
        fontWeight: 'bold',
        textAlign: 'center', // Center the text
    };

    return (
        <div style={popupStyles}>
            <div style={headerStyles}>
                <div onClick={handleShowUploadArticles} style={closeIconStyles}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 12 12" fill="none">
                        <g clipPath="url(#clip0_210_3623)">
                            <path d="M2.33861 1.37356L2.19719 1.23214L2.05577 1.37356L1.37327 2.05606L1.23184 2.19748L1.37327 2.33891L5.03448 6.00012L1.35063 9.6912L1.20948 9.83262L1.35077 9.97391L2.02577 10.6489L2.16705 10.7902L2.30847 10.649L5.99955 6.96519L9.68327 10.6489L9.82469 10.7903L9.96611 10.6489L10.6486 9.96641L10.79 9.82499L10.6486 9.68356L6.96503 5.99998L10.6261 2.33891L10.7675 10.7902L10.6261 2.05606L9.94361 1.37356L9.80219 1.23214L9.66077 1.37356L5.99969 5.03464L2.33861 1.37356Z" fill="#666D73" stroke="#666D73" strokeWidth="0.4" />
                        </g>
                    </svg>
                </div>
                {/* Add other header content here */}
            </div>
            <div style={contentStyles}>
                <p style={messageStyles}>{filesList.message}</p>
            </div>
        </div>
    );
}

export default UploadArticles;
