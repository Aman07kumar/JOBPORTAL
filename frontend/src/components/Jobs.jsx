import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase());
            });
            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchedQuery]);

    return (
        <div>
            <Navbar />
            <div className='max-w-full mx-auto mt-8 px-4 sm:px-6'>
                <div className='flex flex-col lg:flex-row gap-4 lg:gap-5'>
                    <div className='w-full lg:w-1/4'>
                        <FilterCard />
                    </div>
                    <div className='flex-1 h-auto lg:h-[88vh] overflow-y-auto pb-5'>
                        {
                            filterJobs.length <= 0 
                                ? <span className='text-gray-600'>Job not found</span> 
                                : (
                                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                                        {
                                            filterJobs.map((job) => (
                                                <motion.div
                                                    initial={{ opacity: 0, x: 100 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -100 }}
                                                    transition={{ duration: 0.3 }}
                                                    key={job?._id}
                                                >
                                                    <Job job={job} />
                                                </motion.div>
                                            ))
                                        }
                                    </div>
                                )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Jobs;
