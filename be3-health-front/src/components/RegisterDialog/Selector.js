import React, { useRef, useEffect } from 'react';
import ReactSelect from 'react-select';
import { useField } from '@unform/core';
import { Typography } from '@material-ui/core'
import styles from './styles';


const Select = ({ name, label, ...rest }) => {

  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  const classes = styles();


  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'state.value',

      getValue: (ref) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option) => option.value);
        } else {
          if (!ref.state.value) {
            return '';
          }
          return ref.state.value.value;
        }
      },
    });

  }, [fieldName, registerField, rest.isMulti]);

  return (
    
    <div>
        <Typography className={classes.font}>{`${label}:`}</Typography>
        <ReactSelect
          menuPlacement="top"
          className={classes.selectorInput}
          ref={selectRef}
          classNamePrefix="react-select"
          {...rest}
        />
    </div>
    
  );
};

export default Select;