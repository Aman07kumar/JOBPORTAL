import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import useGetCompanyById from '@/hooks/useGetCompanyById';

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: '',
        description: '',
        website: '',
        location: '',
        file: null,
    });
    const { singleCompany } = useSelector((store) => store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setInput({
            name: singleCompany.name || '',
            description: singleCompany.description || '',
            website: singleCompany.website || '',
            location: singleCompany.location || '',
            file: null,
        });
    }, [singleCompany]);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', input.name);
        formData.append('description', input.description);
        formData.append('website', input.website);
        formData.append('location', input.location);
        if (input.file) {
            formData.append('file', input.file);
        }
        try {
            setLoading(true);
            const res = await axios.put(
                `${COMPANY_API_END_POINT}/update/${params.id}`,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true,
                }
            );
            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/admin/companies');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen bg-gray-100'>
            <Navbar />
            <div className='container mx-auto px-4 py-8 sm:px-6 md:px-8'>
                <form onSubmit={submitHandler} className='bg-white shadow-md rounded-lg p-6'>
                    <div className='flex items-center gap-4 mb-6'>
                        <Button
                            onClick={() => navigate('/admin/companies')}
                            variant='outline'
                            className='flex items-center gap-2 text-gray-600 font-semibold'
                        >
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
                        <h1 className='text-xl sm:text-2xl font-semibold'>Company Setup</h1>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                        <div>
                            <Label htmlFor='name'>Company Name</Label>
                            <Input
                                id='name'
                                type='text'
                                name='name'
                                value={input.name}
                                onChange={changeEventHandler}
                                required
                                className='w-full'
                            />
                        </div>
                        <div>
                            <Label htmlFor='description'>Description</Label>
                            <Input
                                id='description'
                                type='text'
                                name='description'
                                value={input.description}
                                onChange={changeEventHandler}
                                required
                                className='w-full'
                            />
                        </div>
                        <div>
                            <Label htmlFor='website'>Website</Label>
                            <Input
                                id='website'
                                type='text'
                                name='website'
                                value={input.website}
                                onChange={changeEventHandler}
                                required
                                className='w-full'
                            />
                        </div>
                        <div>
                            <Label htmlFor='location'>Location</Label>
                            <Input
                                id='location'
                                type='text'
                                name='location'
                                value={input.location}
                                onChange={changeEventHandler}
                                required
                                className='w-full'
                            />
                        </div>
                        <div className='col-span-2'>
                            <Label htmlFor='file'>Logo</Label>
                            <Input
                                id='file'
                                type='file'
                                accept='image/*'
                                onChange={changeFileHandler}
                                className='w-full'
                            />
                        </div>
                    </div>
                    <Button
                        type='submit'
                        className='w-full mt-6 bg-dark-navy-blue hover:bg-darker-navy-blue text-white'
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                Please wait
                            </>
                        ) : (
                            'Update'
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default CompanySetup;
