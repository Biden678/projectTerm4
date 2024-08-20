import React from 'react';

function Input({id,type,label,name,placeholder,register,errorMessage,className,labelclassName,labelStyle,value,style}) {
    return (
        <div>
            <label htmlFor={id} className={labelclassName} style={labelStyle} >{label}</label>
            <span className='text-danger'>{errorMessage}</span>
                <input type={type} style={style} name={name} placeholder={placeholder} className={className} value={value} {...register} />
        </div>
    );
}

export default Input;