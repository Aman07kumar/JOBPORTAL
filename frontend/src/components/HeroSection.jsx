import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return (
        <div className='bg-gray-900 text-white text-center py-12 sm:py-16'>
            <div className='flex flex-col gap-6 my-8 sm:my-10 px-4 sm:px-0'>
                <span className='mx-auto px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-yellow-500 text-gray-900 font-medium text-sm sm:text-base'>
                    Start Your Career Journey Here
                </span>
                <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold leading-tight'>
                    Discover Your Next Opportunity <br />
                    and <span className='text-yellow-500'>Elevate Your Career</span>
                </h1>
                <p className='text-gray-300 text-sm sm:text-base'>
                    Explore a wide range of job listings and find the perfect fit for your skills and aspirations.
                </p>
                <div className='flex w-full max-w-sm sm:max-w-md mx-auto bg-gray-800 rounded-full overflow-hidden shadow-lg'>
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full px-4 py-2 sm:py-3 bg-gray-800 text-white text-sm sm:text-base'
                    />
                    <Button
                        onClick={searchJobHandler}
                        className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 rounded-none border-none px-4 sm:px-6"
                    >
                        <Search className='h-4 w-4 sm:h-5 sm:w-5' />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
