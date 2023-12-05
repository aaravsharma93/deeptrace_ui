import { useState, useEffect } from 'react';
import { postCall, getCall} from '../../api';
import { toast } from 'react-toastify';

export default function useForm(props, editId) {

    var [state, setTheState] = useState({
        companyData: [],
        fields: {},
        errors: {},
        postLoading: false,
    });
    // var [companyData, setCompanyData] = useState([])
    const setState = state => setTheState(prev => ({ ...prev, ...state }));

    useEffect(() => {
        setCompany()
    }, [editId]); // eslint-disable-line react-hooks/exhaustive-deps

    const setFieldState = (name, value) => {
        let { fields } = state;
        let _fields = { ...fields, [name]: value };
        setState({ fields: _fields });
    }

    const setCompany = async () => {
        if (editId !== '' && editId !== undefined && editId !== 'undefined') {
           await getCompany();
        } else {
            let _companyData = await getCompanyList()
            let companyData = _companyData.companies
            setState({ companyData })
            setState({ postLoading: false });
        }
    }
    const getCompany = () => {
        let resp = getCall(`company/get/${props.match.params.company_id}`, {}, true);
        return { resp };
    }
    const getCompanyList = () => {
        setState({ postLoading: true });
        let resp = getCall('company/list', {}, true).then((res) => {
            return res
        });
        return resp;
    }
    const removeCompany = async (id) => {
        let _companyData = state.companyData.filter((r) =>
            r.company_id !== id);
        setState({ companyData: _companyData })
        let res = await postCall('company/delete', { 'ids': [''+id] }, true);
            if (res.success) {
                if (res.message === 'COMPANY_DELETED') {
                    toast.success('Company deleted successfully.')
                }
            }
    }
    const StatusChange = async (company_id) => {
        let resp = await getCall(`company/change-status/${company_id}`, true);
        if (resp.success) {
            let _companyData = await getCompanyList()
            let companyData = _companyData.companies
                if(resp.message === 'STATUS_CHANGED') {
                    toast.success('Company status changed sucessfully.')
                }
                if(resp.message === 'NO_COMPANY_FOUND') {
                    toast.error('Comapny not found.')
                }
            return setState({ companyData })
            
        }

    }
    const updateUser = (id, data) => {
        return postCall('role/update', { 'title': data.title }, true);
    }
    async function handleFormSubmit(e) {
        e.preventDefault();
        let { fields } = state;
        setState({ postLoading: true });
        if (editId !== '' && editId !== undefined) {
            await updateUser(editId, fields);
        } else {
            // alert('else')
            // const body = {
            //     'title': fields.title, 
            //     'companyId': fields.company_id, 
            //     'role_id': fields.role_id
            // }
            // await postCall('company/create', fields, tsConstructSignatureDeclaration);
        }

    }

    return { ...state, setFieldState, handleFormSubmit, removeCompany, StatusChange };
}