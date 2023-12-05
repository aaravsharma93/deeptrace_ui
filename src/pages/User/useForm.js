import { useState, useEffect } from 'react';
import { postCall, getCall } from '../../api';
import { toast } from 'react-toastify';

export default function useForm(props, editId) {

    var [state, setTheState] = useState({
        userData: [],
        fields: {},
        errors: {},
        postLoading: false,
    });
    const setState = state => setTheState(prev => ({ ...prev, ...state }));

    useEffect(() => {
        getUserList()
    }, [editId]); // eslint-disable-line react-hooks/exhaustive-deps

    const setFieldState = (name, value) => {
        let { fields } = state;
        let _fields = { ...fields, [name]: value };
        setState({ fields: _fields });
    }

    const getUserList = () => {
        let companyID = localStorage.getItem('company_id')
        let _userData = getCall('user/list/?companyId=' + companyID, {}, true).then((res) => {
            let userData = res.users
            setState({ userData })
        });

        return _userData
    }
    const removeCompany = async(id, company_id) => {
        let _userData = state.userData.filter((r) =>
            r.company_id !== id);
        setState({ userData: _userData })
        let res = await postCall('user/delete', { 'ids': ['' + id], 'company_id': company_id }, true)  
        if (res.success) {
            if (res.message === 'USER_DELETED') {
                toast.success('User deleted successfully.')
            }
        }
        if(res.error) {
            toast.error('Failed to delete.')
        }
    }
    const StatusChange = async (username) => {
        let resp = await getCall(`user/change-status/${username}`, true);
        if (resp.success) {
            if (resp.message === 'STATUS_CHANGED') {
                toast.success('User status changed sucessfully.')
                getUserList()
            }
            if (resp.message === 'NO_ROLE_FOUND') {
                toast.success('Role not found.')
            }
        }
    }

    return { ...state, setFieldState, removeCompany, StatusChange };
}