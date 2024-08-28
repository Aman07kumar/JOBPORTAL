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
        <div className='max-w-full mx-auto my-4 p-4 sm:p-6'>
            <div className='flex flex-col sm:flex-row items-start justify-between mb-4'>
                <div className='flex flex-col'>
                    <h1 className='text-xl sm:text-2xl font-bold'>{singleJob?.title}</h1>
                    <div className='flex flex-wrap items-center gap-2 mt-2'>
                        <Badge className='text-blue-700 font-bold text-xs sm:text-sm' variant="ghost">{singleJob?.position} Positions</Badge>
                        <Badge className='text-[#F83002] font-bold text-xs sm:text-sm' variant="ghost">{singleJob?.jobType}</Badge>
                        <Badge className='text-[#7209b7] font-bold text-xs sm:text-sm' variant="ghost">{singleJob?.salary} LPA</Badge>
                    </div>
                </div>
                <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`mt-4 sm:mt-0 rounded-lg py-2 px-4 text-white ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}
                >
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>
            <h1 className='border-b-2 border-gray-300 font-medium py-2 text-lg sm:text-xl'>Job Description</h1>
            <div className='space-y-2 sm:space-y-4'>
                <h2 className='text-base sm:text-lg font-bold'>Role:</h2>
                <p className='text-gray-800'>{singleJob?.title}</p>
                <h2 className='text-base sm:text-lg font-bold'>Location:</h2>
                <p className='text-gray-800'>{singleJob?.location}</p>
                <h2 className='text-base sm:text-lg font-bold'>Description:</h2>
                <p className='text-gray-800'>{singleJob?.description}</p>
                <h2 className='text-base sm:text-lg font-bold'>Experience:</h2>
                <p className='text-gray-800'>{singleJob?.experience} yrs</p>
                <h2 className='text-base sm:text-lg font-bold'>Salary:</h2>
                <p className='text-gray-800'>{singleJob?.salary} LPA</p>
                <h2 className='text-base sm:text-lg font-bold'>Total Applicants:</h2>
                <p className='text-gray-800'>{singleJob?.applications?.length}</p>
                <h2 className='text-base sm:text-lg font-bold'>Posted Date:</h2>
                <p className='text-gray-800'>{singleJob?.createdAt.split("T")[0]}</p>
            </div>
        </div>
    );
};

export default JobDescription;
