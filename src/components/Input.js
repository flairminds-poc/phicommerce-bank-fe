import React from "react";

const CustomInput = ({onChange, placeholder = '', value = ''}) => {
    return(
        <input type='text'
            onChange={onChange}
            placeholder={placeholder}
            value={value}
            style={{padding: '5px', outline: 'none', borderRadius: '5px', width: '200px', height: '20px', border: '1px solid black'}} />
    )
}

export default CustomInput;