import { setSingleCompany } from '@/redux/companySlice';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchSingleCompany = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, { withCredentials: true });
                console.log('Company Response:', res.data);
                if (res.data.success) {
                    dispatch(setSingleCompany(res.data.company));
                } else {
                    console.warn('Fetch Company Failed:', res.data.message);
                }
            } catch (error) {
                console.error('Error fetching company:', error);
            }
        };
        fetchSingleCompany();
    }, [companyId, dispatch]);
};

export default useGetCompanyById;
