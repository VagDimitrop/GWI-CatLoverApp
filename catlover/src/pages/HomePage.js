import React, {useEffect, useState} from 'react';
import TileComponent from "../components/tileComponent/TileComponent";
import axios from "axios";

const HomePage = (props) => {
    const {isLoadingCallback} = props;
    const [catData, setCatImages] = useState([]);

    const APIKey = 'live_Lel5oW8x7PrQ6TPSOIC2XyoQB9SSfzd4uHE4ukbENfzdOxbO3f1ojNv13BAKUHyj'

    useEffect(() => {
        isLoadingCallback(true);
        const fetchCatImages = async () => {
            try {
                const response = await axios.get('https://api.thecatapi.com/v1/images/search?limit=10',
                    {headers: {'x-api-key': APIKey}});
                setCatImages(response.data);
                isLoadingCallback(false);
            } catch (error) {
                console.error('Error fetching cat images:', error);
            }
        };
        fetchCatImages();
    }, []);

    const onLoadMoreClick = async () => {
        isLoadingCallback(true);
        try {
            const response = await axios.get('https://api.thecatapi.com/v1/images/search?limit=10',
                {headers: {'x-api-key': APIKey}});
            setCatImages([...catData, ...response.data]);
            isLoadingCallback(false);
        } catch (error) {
            console.error('Error fetching cat images:', error);
        }
    };

    return (
        <div>
            <div className="page-header-container">
                <h1 className="page-header">Cat Gallery</h1>
            </div>
            <TileComponent
                catData={catData}
                headerText={'Oops'}
                descriptionText={'This kitten is of no know breed unfortunately..'}
                isLoadingCallback={isLoadingCallback}
            />
            <button className="load-button"
                    onClick={() => onLoadMoreClick()}>Load more furry friends!
            </button>
        </div>
    );
};

export default HomePage;
