import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);

    const { id: jobId } = useParams();
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            
            if (res.data.success) {
                setIsApplied(true); // Update local state
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] };
                dispatch(setSingleJob(updatedSingleJob)); // Update Redux store
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'An error occurred');
        }
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id));
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <div className='max-w-7xl mx-auto my-10 p-4 sm:p-6'>
            <div className='flex flex-col sm:flex-row items-start justify-between'>
                <div>
                    <h1 className='font-bold text-2xl sm:text-3xl'>{singleJob?.title}</h1>
                    <div className='flex flex-wrap items-center gap-2 mt-4'>
                        <Badge className='text-blue-700 font-bold' variant="ghost">{singleJob?.position} Positions</Badge>
                        <Badge className='text-[#F83002] font-bold' variant="ghost">{singleJob?.jobType}</Badge>
                        <Badge className='text-[#7209b7] font-bold' variant="ghost">{singleJob?.salary}LPA</Badge>
                    </div>
                </div>
                <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`mt-4 sm:mt-0 rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}>
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>
            <h1 className='border-b-2 border-b-gray-300 font-medium py-4 text-xl'>Job Description</h1>
            <div className='space-y-4'>
                <h1 className='font-bold text-lg'>Role: <span className='font-normal text-gray-800'>{singleJob?.title}</span></h1>
                <h1 className='font-bold text-lg'>Location: <span className='font-normal text-gray-800'>{singleJob?.location}</span></h1>
                <h1 className='font-bold text-lg'>Description: <span className='font-normal text-gray-800'>{singleJob?.description}</span></h1>
                <h1 className='font-bold text-lg'>Experience: <span className='font-normal text-gray-800'>{singleJob?.experience} yrs</span></h1>
                <h1 className='font-bold text-lg'>Salary: <span className='font-normal text-gray-800'>{singleJob?.salary}LPA</span></h1>
                <h1 className='font-bold text-lg'>Total Applicants: <span className='font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
                <h1 className='font-bold text-lg'>Posted Date: <span className='font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>
            </div>
        </div>
    );
};

export default JobDescription;
