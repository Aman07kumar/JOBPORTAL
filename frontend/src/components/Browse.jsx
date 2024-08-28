import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Browse = () => {
    useGetAllJobs();
    const { allJobs } = useSelector(store => store.job);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        };
    }, [dispatch]);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto p-4 sm:p-6'>
                <h1 className='text-2xl font-bold mb-8'>Search Results ({allJobs.length})</h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {
                        allJobs.length === 0 ? (
                            <p className='text-center text-gray-500'>No jobs found.</p>
                        ) : (
                            allJobs.map((job) => (
                                <Job key={job._id} job={job} />
                            ))
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Browse;
