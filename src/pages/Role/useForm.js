import { useState, useEffect } from 'react';
import { getValidationErrors } from '../../utils/yup.common';
import roleModel from './role.model';
import { postCall, getCall } from '../../api';
import { tsConstructSignatureDeclaration } from '@babel/types';
import { toast } from 'react-toastify';

export default function useForm(props, editId) {

    var [state, setTheState] = useState({
        fields: {},
        errors: {},
        postLoading: false,
        roles: []
    });
    const setState = state => setTheState(prev => ({ ...prev, ...state }));

    useEffect(() => {
        getRole();
    }, [editId]); // eslint-disable-line react-hooks/exhaustive-deps

    const setFieldState = (name, value) => {
        let { fields } = state;
        let _fields = { ...fields, [name]: value };
        setState({ fields: _fields });
    }

    // const setRole = async () => {
    //     let fields = {};
    //     if (editId !== '' && editId !== undefined && editId !== 'undefined') {
    //         fields = await getRole();
    //         return setState({ roles: fields.roles });
    //     }
    // }

    const getRole = () => {
        // let resp = getCall(`/role/${props.match.params.company_id}/get/${editId}`, {}, true);
        let resp = getCall(`role/list/${localStorage.company_id}`, {}, true).then((res) => {
            let roles = res.roles
            setState({ roles })
        });
        return resp;
    }
    const updateUser = (id, data) => {
        return postCall('role/update', { 'title': data.title }, true);
    }
    const DeleteRole = async (id) => {
        let _roles = state.roles.filter((r) =>
            r.role_id !== id);
        setState({ roles: _roles })
        let resp = await postCall('role/delete', { 'ids': ['' + id] }, true);
        if (resp.success) {
            if(resp.message === 'ROLE_DELETED') {
                toast.success('Role deleted sucessfully.')
            }
            if(resp.message === 'ROLE_ASSIGNED') {
                toast.error('Can not delete this already assigned role.')
            }
            getRole()
        }
    }
    const StatusChange = async (roleID) => {
        let resp = await getCall(`role/change-status/${roleID}`, true);
        if (resp.success) {
            if(resp.message === 'STATUS_CHANGED') {
                toast.success('Role status changed sucessfully.')
            }
            if(resp.message === 'NO_ROLE_FOUND') {
                toast.error('Role not found.')
            }
            getRole()
        }
    }
    async function handleFormSubmit(e) {
        e.preventDefault();
        let { fields } = state;
        const errors = getValidationErrors({ state: fields, schema: roleModel });
        if (errors?.latest) {
            setState({ errors });
            return;
        }
        setState({ postLoading: true });
        if (editId !== '') {
            await updateUser(editId, fields);
        } else {
            await postCall('role/create', fields, tsConstructSignatureDeclaration);
        }

    }

    return { ...state, setFieldState, DeleteRole, StatusChange, handleFormSubmit };
}