import React from 'react';

const Loading = () => {
    return (
        <div className='flex justify-center items-center h-full min-h-screen'>
            <span className="loading loading-spinner text-primary loading-xl"></span>
        </div>
    );
};

export default Loading;