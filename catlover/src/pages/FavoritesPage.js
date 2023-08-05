import React, {useEffect, useState} from 'react';
import axios from "axios";
import TileComponent from "../components/tileComponent/TileComponent";

const FavoritesPage = () => {
    const [favoritesData, setFavorites] = useState([]);

    const APIKey = 'live_Lel5oW8x7PrQ6TPSOIC2XyoQB9SSfzd4uHE4ukbENfzdOxbO3f1ojNv13BAKUHyj'


    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await axios.get('https://api.thecatapi.com/v1/favourites', {
                    params: {sub_id: 44},
                    headers: {'x-api-key': APIKey}
                });
                
                setFavorites(transformData(response.data));
            } catch (error) {
                console.error('Error fetching cat images:', error);
            }
        };
        fetchFavorites();
    }, []);

    const transformData = (data) => {
        let transformedData = [];
        data.forEach( (element) => {
            let entry = {
                id : element.id,
                url : element.image.url
            }
            transformedData.push(entry);
        })
        return transformedData;
    }

    return (
        <div>
            <TileComponent
                catData={favoritesData}/>
        </div>
    );
};

export default FavoritesPage;
