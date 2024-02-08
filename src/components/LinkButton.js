import React from "react";
import { Link } from "react-router-dom";

const CustomLinkButton = ({ text = 'Link', linkTo = '', dataToPass = {}, buttonAction = () => {} }) => {
    return(
        <button style={{backgroundColor: '#36D4FF', border: '0', borderRadius: '5px', cursor: 'pointer'}} onClick={buttonAction} >
            <Link to={linkTo} state={dataToPass} style={{textDecoration: 'none', color: 'white', display: 'block', padding: '10px 25px', fontWeight: 'bold'}}>
                {text}
            </Link>
        </button>
    )
}

export default CustomLinkButton;