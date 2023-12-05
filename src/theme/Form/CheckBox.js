import React from 'react';
import FormContext from './Context';
import { FormControlLabel, FormHelperText, Checkbox } from '@material-ui/core';

const CheckBox = ({ title, name, value, checked, onChange, ...props }) => {
    
    function changeHandler(e) {
        onChange(e.target.name, e.target.checked);
    }

    return <FormContext.Consumer>
        {context => {
            const errors = context? context.errors: {};
            const errMsgShow = context? context.errMsgShow: true;
            return(<>
            <FormControlLabel
                control={
                    <Checkbox name={name} value={value} checked={checked} onChange={changeHandler} 
                        color="primary" />
                }
                label={title}/>
                {(errMsgShow && errors.details && errors.details[name]) && 
                    <FormHelperText error id="email-error">
                        {errors.details.email}
                    </FormHelperText>}
            </>)
        }}
        </FormContext.Consumer>
}
export default CheckBox;