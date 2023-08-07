import React, {useEffect, useState} from 'react';
import TileComponent from "../components/tileComponent/TileComponent";
import axios from "axios";
import {APIKey, BaseUrl} from "../Constants";

const BreedDetailsPage = (props) => {
    const {isLoadingCallback} = props;
    const [breedData, setBreedData] = useState([]);

    useEffect(() => {
        isLoadingCallback(true);
        const fetchBreedData = async () => {
            try {
                const response = await axios.get(BaseUrl + 'breeds',
                    {headers: {'x-api-key': APIKey}});
                setBreedData(response.data);
                isLoadingCallback(false);
            } catch (error) {
                console.error('Error fetching cat images:', error);
            }
        };
        fetchBreedData();
    }, []);


    return (
        <div>
            <div className="page-header-container">
                <h1 className="page-header">Breed Gallery</h1>
            </div>
            <TileComponent
                breedData={breedData}
            />
        </div>
    );
};

export default BreedDetailsPage;
