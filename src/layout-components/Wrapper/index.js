import React from 'react';

const Wrapper = ({ title, children }) => {
    return (
        <div className="example-card-seamless mb-4-spacing">
            <h5 className="display-5 mb-4 font-weight-bold">
                {title}
            </h5>
            <div>{children}</div>
        </div>
    );
}
export default Wrapper;