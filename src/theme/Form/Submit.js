import React from 'react';
import FormContext from './Context';
import { Button } from '@material-ui/core';

const Submit = ({ label, onChange, ...props}) => {

    return <FormContext.Consumer>
        {context => {
            return <Button color="primary" variant="contained" size="large" className="my-2" type="submit">
                {label}
            </Button>
        }}
    </FormContext.Consumer>
}
export default Submit;