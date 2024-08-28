import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return (
        <div className="bg-gray-900 py-6">
            <div className="relative">
                <Carousel className="w-full max-w-full mx-auto overflow-hidden">
                    <CarouselContent className="bg-gray-900 rounded-lg p-3 sm:p-4 flex gap-2 sm:gap-4">
                        {category.map((cat, index) => (
                            <CarouselItem key={index} className="flex-shrink-0 w-full sm:w-auto p-2 sm:p-3">
                                <Button
                                    onClick={() => searchJobHandler(cat)}
                                    variant="outline"
                                    className="w-full rounded-full bg-gray-800 text-white border-gray-600 hover:bg-gray-700 py-2 sm:py-3"
                                >
                                    {cat}
                                </Button>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-900 text-white hover:text-yellow-500 z-10" />
                    <CarouselNext className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-900 text-white hover:text-yellow-500 z-10" />
                </Carousel>
            </div>
        </div>
    );
};

export default CategoryCarousel;
