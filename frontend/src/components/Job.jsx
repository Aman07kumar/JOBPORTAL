import React from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    };

    return (
        <div className='p-4 sm:p-5 rounded-md shadow-lg bg-white border border-gray-100'>
            <div className='flex items-center justify-between mb-2'>
                <p className='text-xs sm:text-sm text-gray-500'>
                    {daysAgoFunction(job?.createdAt) === 0 ? 'Today' : `${daysAgoFunction(job?.createdAt)} days ago`}
                </p>
                <Button variant="outline" className="rounded-full" size="icon">
                    <Bookmark />
                </Button>
            </div>

            <div className='flex items-center gap-3 my-2'>
                <Button className="p-2 sm:p-3" variant="outline" size="icon">
                    <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                        <AvatarImage src={job?.company?.logo} alt={`${job?.company?.name} logo`} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-sm sm:text-base'>{job?.company?.name}</h1>
                    <p className='text-xs text-gray-500'>India</p>
                </div>
            </div>

            <div className='mt-2'>
                <h1 className='font-bold text-sm sm:text-base md:text-lg my-2'>{job?.title}</h1>
                <p className='text-xs sm:text-sm text-gray-600 line-clamp-2'>{job?.description}</p>
            </div>
            <div className='flex flex-wrap items-center gap-2 mt-4'>
                <Badge className='text-blue-700 font-bold' variant="ghost">{job?.position} Positions</Badge>
                <Badge className='text-[#F83002] font-bold' variant="ghost">{job?.jobType}</Badge>
                <Badge className='text-[#7209b7] font-bold' variant="ghost">{job?.salary} LPA</Badge>
            </div>
            <div className='flex flex-wrap items-center gap-3 mt-4'>
                <Button 
                    onClick={() => navigate(`/description/${job?._id}`)} 
                    variant="outline" 
                    className="w-full sm:w-auto"
                >
                    Details
                </Button>
                <Button className="text-yellow-500 border-yellow-500 hover:bg-yellow-50 w-full sm:w-auto">
                    Save For Later
                </Button>
            </div>
        </div>
    );
};

export default Job;
