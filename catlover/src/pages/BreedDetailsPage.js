import React, {useEffect, useState} from 'react';
import TileComponent from "../components/tileComponent/TileComponent";
import axios from "axios";
import {APIKey, BaseUrl, sub_id} from "../Constants";

const BreedDetailsPage = (props) => {
    const {isLoadingCallback} = props;
    const [breedData, setBreedData] = useState([]);
    const [breedImages, setBreedImages] = useState([])

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

    const fetchImagesByBreedId = async (id) => {
        isLoadingCallback(true);
        try {
            const response = await axios.get(BaseUrl + 'images/search?limit=10',{
                params: {id: id}
            });
            isLoadingCallback(false);
            setBreedImages(response.data);
        } catch (error) {
            console.error('Error fetching cat images:', error);
        }
    };


    return (
        <div>
            <div className="page-header-container">
                <h1 className="page-header">Breed Gallery</h1>
            </div>
            <TileComponent
                breedData={breedData}
                breedImages={breedImages}
                fetchImages={fetchImagesByBreedId}
            />
        </div>
    );
};

export default BreedDetailsPage;
