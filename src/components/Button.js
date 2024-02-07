import React from "react";

const CustomButton = ({children, onClick = () => {}, disabled = false}) => {
    return(
        <button onClick={onClick} disabled={disabled}
        style={{backgroundColor: '#36D4FF', border: '0', borderRadius: '5px', padding: '10px 25px', color: 'white', cursor: 'pointer'}}>
            {children}
        </button>
    )
}

export default CustomButton;