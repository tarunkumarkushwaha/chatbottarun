"use client"
import React, { useState } from 'react';
import data from '@/dummydata';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="p-12 w-[96%] rounded-md my-5 bg-gradient-to-r from-blue-100 to-blue-200">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Frequently Asked Questions</h2>
        <p className="text-lg text-gray-600">Find answers to the most common questions about our laundry services.</p>
      </div>

      <div className=" rounded-md mx-auto">
        {data.faq.map((faq, index) => (
          <div key={index} className="border-b border-gray-300">
            <div 
              onClick={() => toggleAnswer(index)} 
              className="cursor-pointer flex justify-between rounded-md items-center py-4 px-6 bg-white hover:bg-gray-50 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-800">{faq.question}</h3>
              <span className="text-xl text-gray-600">{activeIndex === index ? '-' : '+'}</span>
            </div>

            {activeIndex === index && (
              <div className="py-2 px-6 bg-gray-50 text-gray-700 smooth-entry">Ans: {faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
