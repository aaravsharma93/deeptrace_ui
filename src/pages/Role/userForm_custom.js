import { useState, useEffect } from 'react';
import { getValidationErrors } from '../../utils/yup.common';
import roleModel from './role.model';

export default function useForm(props, editId) {

    var [ state, setTheState ] = useState({
        fields: {},
        errors: {},
        postLoading: false,
    });
    const setState = state => setTheState(prev => ({...prev, ...state }));

    useEffect(() => {
        setRole();
    }, [editId]); // eslint-disable-line react-hooks/exhaustive-deps

    const setFieldState = (name, value) => {
        let { fields } = state;
        let _fields = { ...fields, [name]: value};
        setState({ fields: _fields });
    }

    const setRole = async() => {
        let fields = {};
        if(editId !== '') {
            fields = await getRole();
        }
        setState({ fields });
    }

    const getRole = () => {
        return {};
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        let { fields } = state;
        const errors = getValidationErrors({ state: fields, schema: roleModel });
        if (errors?.latest) {
            setState({ errors });
            return;
        }
        setState({ postLoading: true });
    }

    return { ...state, setFieldState, handleFormSubmit };
}