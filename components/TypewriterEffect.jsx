import React, { useState, useEffect } from 'react';

const TypewriterEffect = ({ textArray, delay }) => {
    const [currentText, setCurrentText] = useState('');
    const [increasing, setIncreasing] = useState(true);
    const [currentArrayIndex, setCurrentArrayIndex] = useState(0);

    useEffect(() => {
        const currentTextToType = textArray[currentArrayIndex] || '';

        const interval = setInterval(() => {
            setCurrentText((prev) => {
                if (increasing) {
                    const nextText = currentTextToType.slice(0, prev.length + 1);
                    if (nextText.length === currentTextToType.length) {
                        setIncreasing(false);
                    }
                    return nextText;
                } else {
                    const nextText = prev.slice(0, prev.length - 1);
                    if (nextText.length === 0) {
                        setIncreasing(true);
                        setCurrentArrayIndex((prevIndex) => (prevIndex + 1) % textArray.length);
                    }
                    return nextText;
                }
            });
        }, delay);

        return () => clearInterval(interval);
    }, [textArray, currentArrayIndex, increasing, delay]);

    return (
        <span>
            {currentText}
        </span>
    );
};

export default TypewriterEffect;



