import React from 'react';
import FormContext from './Context';
import { TextField, FormHelperText } from '@material-ui/core';

const Input = ({ label, value, name, onChange, ...props}) => {

    function changeHandler(e) {
        onChange(e.target.name, e.target.value);
    }

    return (
        <FormContext.Consumer>
            {context => {
                const errors = context? context.errors: {};
                const errMsgShow = context? context.errMsgShow: true;
                return <>
                    <TextField
                        label={label}
                        defaultValue={value}
                        variant="outlined"
                        name={name}
                        {...props}
                        onChange={changeHandler}
                        error={errors.details && errors.details[name]? true: false}
                        // validateOnBlur={true}
                    />
                {(errMsgShow && errors.details && errors.details[name]) && 
                    <FormHelperText error id="email-error">
                        {errors.details[name]}
                    </FormHelperText>
                    
                    }
                </>
            }}
        </FormContext.Consumer>
    )
}
export default Input;