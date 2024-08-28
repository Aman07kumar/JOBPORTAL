import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/redux/companySlice';

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState('');
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        try {
            const res = await axios.post(
                `${COMPANY_API_END_POINT}/register`,
                { companyName },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res.data.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred');
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="container mx-auto p-4 sm:p-6 md:p-8 max-w-2xl">
                <div className="mb-6">
                    <h1 className="text-2xl sm:text-3xl font-semibold mb-2">Company Setup</h1>
                    <p className="text-gray-500">Provide a name for your company. You can change this later.</p>
                </div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                    id="companyName"
                    type="text"
                    className="my-2 w-full"
                    placeholder="JobHunt, Microsoft, etc."
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                />
                <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
                    <Button
                        variant="outline"
                        onClick={() => navigate('/admin/companies')}
                        className="w-full sm:w-auto text-dark-navy-blue border-dark-navy-blue hover:bg-light-navy-blue"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={registerNewCompany}
                        className="w-full sm:w-auto mt-4 sm:mt-0 bg-dark-navy-blue hover:bg-darker-navy-blue text-white"
                    >
                        Continue
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CompanyCreate;