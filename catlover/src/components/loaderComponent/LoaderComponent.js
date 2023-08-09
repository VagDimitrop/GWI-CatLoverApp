import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {ThreeDots} from "react-loader-spinner";

const LoaderComponent = (props) => {
    const {showLoader} = props;

    // This component is visible only when the parent component (App.js) sets the showLoader variable to true.
    // This variable is set to true across the app, when the user is waiting for the requests to be completed
    // and set to false when the requests have been completed.
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
