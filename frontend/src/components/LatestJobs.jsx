import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);

    return (
        <div className='max-w-7xl mx-auto my-8 sm:my-12 px-4 sm:px-6'>
            <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-6'>
                <span className='text-yellow-500'>Latest & Top </span> Job Openings
            </h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                {
                    allJobs.length === 0 
                        ? <span className='text-gray-500 col-span-full text-center'>No Jobs Available</span> 
                        : allJobs.slice(0, 6).map(job => (
                            <LatestJobCards key={job._id} job={job} />
                        ))
                }
            </div>
        </div>
    );
};

export default LatestJobs;
