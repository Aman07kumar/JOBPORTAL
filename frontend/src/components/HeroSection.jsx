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
        <div className='bg-gray-900 text-white text-center py-16'>
            <div className='flex flex-col gap-6 my-10'>
                <span className='mx-auto px-4 py-2 rounded-full bg-yellow-500 text-gray-900 font-medium'>
                    Start Your Career Journey Here
                </span>
                <h1 className='text-4xl md:text-5xl font-bold'>
                    Discover Your Next Opportunity <br />
                    and <span className='text-yellow-500'>Elevate Your Career</span>
                </h1>
                <p className='text-gray-300'>
                    Explore a wide range of job listings and find the perfect fit for your skills and aspirations.
                </p>
                <div className='flex w-full max-w-md mx-auto bg-gray-800 rounded-full overflow-hidden shadow-lg'>
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full px-4 py-2 bg-gray-800 text-white'
                    />
                    <Button
                        onClick={searchJobHandler}
                        className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 rounded-none border-none"
                    >
                        <Search className='h-5 w-5' />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
