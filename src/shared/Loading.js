import React from 'react';
import { ClimbingBoxLoader } from 'react-spinners';

const Loading = () => {
    return (
        <div className="d-flex align-items-center flex-column vh-100 justify-content-center text-center py-3">
            <div className="d-flex align-items-center flex-column px-4">
                <ClimbingBoxLoader color={'#5383ff'} loading={true} />
            </div>
            <div className="text-muted font-size-xl text-center pt-3">
                Loading
            </div>
        </div>
    );
};
export default Loading;