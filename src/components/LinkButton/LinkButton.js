import React from "react";
import { Link } from "react-router-dom";
import styles from './linkbutton.module.css';

const CustomLinkButton = ({ text = 'Link', linkTo = '', dataToPass = {}, buttonAction = () => {}, customStyle = {} }) => {
    
    return(
        <button className={styles.btn} style={customStyle} onClick={buttonAction} >
            <Link to={linkTo} state={dataToPass} className={styles.linkCss}>
                {text}
            </Link>
        </button>
    )
}

export default CustomLinkButton;