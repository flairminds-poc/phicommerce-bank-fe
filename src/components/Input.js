import React from "react";

const CustomInput = ({onChange, placeholder = '', value = '',customStyle}) => {
    return(
        <input type='text'
            onChange={onChange}
            placeholder={placeholder}
            value={value}
            className="form-control"
            style={{...customStyle,width: '200px'}} />
    )
}

export default CustomInput;