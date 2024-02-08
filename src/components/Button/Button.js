import React from "react";
import styles from './button.module.css';

const CustomButton = ({ children, onClick = () => {}, disabled = false, customStyle = {} }) => {
    return(
        <button onClick={onClick} disabled={disabled} className={styles.btn} style={customStyle}>
            {children}
        </button>
    )
}

export default CustomButton;