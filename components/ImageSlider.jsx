"use client"
import { useState, useEffect } from 'react';
import TypewriterEffect from './TypewriterEffect';

const images = [
    'Assets/images/image2.jpg',
    'Assets/images/image1.jpg',
    'Assets/images/image3.jpg',
];

const ImageSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const handleNext = () => {
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const delay = 2000;
    useEffect(() => {
        if (!isPaused) {
            const interval = setInterval(handleNext, delay);
            return () => clearInterval(interval);
        }
    }, [isPaused, currentIndex]);

    return (
        <>
            <div className="relative w-full h-[300px] overflow-hidden "
                onMouseEnter={() => { setIsPaused(true); }}
                onMouseLeave={() => { setIsPaused(false); }}
            >
                <div className='w-full h-[300px] bg-slate-900/40 text-lg text-white absolute top-0 z-10 flex flex-col justify-center items-center'>
                    <div className="text-3xl"><TypewriterEffect
                        textArray={["chat bot ..", "data scraping ", "made by tarun"]}
                        delay={120}
                    /></div>
                </div>
                <div
                    className="flex transition-transform ease-in-out duration-700"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >

                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`shirt-${index}`}
                            className="w-full h-[300px] object-cover flex-shrink-0"
                        //    do not copy code this is property of tarun kushwaha 
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default ImageSlider;
