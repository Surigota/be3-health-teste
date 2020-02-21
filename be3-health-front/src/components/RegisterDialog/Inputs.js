import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import { Typography } from '@material-ui/core'
import styles from './styles';


function Input({ name, label, ...rest }) {
    const inputRef = useRef(null);
    const {fieldName, registerField, defaultValue, error } = useField(name);

    const classes = styles();

    useEffect(() => {
        registerField({
            name:fieldName,
            ref: inputRef.current,
            path:'value'
        })
    }, [fieldName, registerField])

    return(
        <div>
            <Typography className={classes.font}>{`${label}:`}</Typography>
            <input className={classes.input} 
                ref={inputRef} 
                defaultValue={defaultValue}
                {...rest}
            />
        </div>
        
    );
}

export { Input };