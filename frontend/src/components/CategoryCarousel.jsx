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
            <Carousel className="w-full max-w-xl mx-auto">
                <CarouselContent className="bg-gray-900 rounded-lg p-4">
                    {category.map((cat, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 p-2">
                            <Button
                                onClick={() => searchJobHandler(cat)}
                                variant="outline"
                                className="w-full rounded-full bg-gray-800 text-white border-gray-600 hover:bg-gray-700"
                            >
                                {cat}
                            </Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="bg-gray-900" />
                <CarouselNext className="bg-gray-900" />
            </Carousel>
        </div>
    );
};

export default CategoryCarousel;
