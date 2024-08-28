import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    return (
        <div 
            onClick={() => navigate(`/description/${job._id}`)} 
            className='p-4 sm:p-5 rounded-md shadow-lg bg-gray-100 border border-gray-200 cursor-pointer hover:shadow-xl transition-shadow duration-300'
        >
            <div className='mb-3'>
                <h1 className='font-medium text-base sm:text-lg text-gray-800'>{job?.company?.name}</h1>
                <p className='text-xs sm:text-sm text-gray-500'>India</p>
            </div>
            <div className='mb-4'>
                <h1 className='font-semibold text-base sm:text-lg text-gray-900'>{job?.title}</h1>
                <p className='text-xs sm:text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className='flex flex-wrap items-center gap-2'>
                <Badge className='text-yellow-500 font-semibold' variant="ghost">{job?.position} Positions</Badge>
                <Badge className='text-yellow-500 font-semibold' variant="ghost">{job?.jobType}</Badge>
                <Badge className='text-yellow-500 font-semibold' variant="ghost">{job?.salary}LPA</Badge>
            </div>
        </div>
    );
};

export default LatestJobCards;
