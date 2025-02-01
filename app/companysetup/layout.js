import React from 'react';
import Navbar from '@/components/Navbar';
import Foot from '@/components/Foot';

const layout = ({ children }) => (
    <>
        {/* <Navbar/> */}
        <div className="flex justify-center items-center">{children}</div>
        {/* <Foot/> */}
    </>
);

export default layout;
