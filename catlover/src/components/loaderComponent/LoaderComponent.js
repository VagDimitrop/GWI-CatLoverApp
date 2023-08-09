import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {ThreeDots} from "react-loader-spinner";

const LoaderComponent = (props) => {
    const {showLoader} = props;

    if (showLoader) {
        return <div className="loader-container">
            <ThreeDots
                color="#ab8463">
            </ThreeDots>
        </div>
    } else {
        return null;
    }
};

export default LoaderComponent;
