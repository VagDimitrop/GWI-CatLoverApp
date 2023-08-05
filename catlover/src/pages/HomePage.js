import React, {useEffect, useState} from 'react';
import TileComponent from "../components/tileComponent/TileComponent";
import axios from "axios";

const HomePage = () => {
    const [catData, setCatImages] = useState([]);
    const APIKey = 'live_Lel5oW8x7PrQ6TPSOIC2XyoQB9SSfzd4uHE4ukbENfzdOxbO3f1ojNv13BAKUHyj'

    useEffect(() => {
        const fetchCatImages = async () => {
            try {
                const response = await axios.get('https://api.thecatapi.com/v1/images/search?limit=10',
                    {headers: {'x-api-key': APIKey}});
                setCatImages(response.data);
            } catch (error) {
                console.error('Error fetching cat images:', error);
            }
        };
        fetchCatImages();
    }, []);

    const onLoadMoreClick = async () => {
        try {
            const response = await axios.get('https://api.thecatapi.com/v1/images/search?limit=10',
                {headers: {'x-api-key': APIKey}});
            setCatImages([...catData, ...response.data]);
        } catch (error) {
            console.error('Error fetching cat images:', error);
        }
    };

    return (
        <div>
            <TileComponent
                catData={catData}/>

            <button className="load-button"
                    onClick={() => onLoadMoreClick()}>Load more furry friends!
            </button>
        </div>


    );
};

export default HomePage;
