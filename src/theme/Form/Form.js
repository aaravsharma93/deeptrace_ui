import React from 'react';
import FormContext from './Context';

const ContextForm = ({ source, errMsgShow, errors, onSubmit, children, method="POST" }) => {
    errors = errors? errors: {};
    errMsgShow = errMsgShow? errMsgShow: true;
    return (
        <form method={method} onSubmit={onSubmit}>
            <FormContext.Provider value={{ source, errMsgShow, errors }}>
                {children}
            </FormContext.Provider>
        </form>
    )
}
export default ContextForm;