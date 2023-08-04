import React, {useEffect, useState} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

const TileComponent = () => {
    const [catImages, setCatImages] = useState([]);

    useEffect(() => {
        const fetchCatImages = async () => {
            try {
                const response = await axios.get('https://api.thecatapi.com/v1/images/search?limit=10');
                setCatImages(response.data);
            } catch (error) {
                console.error('Error fetching cat images:', error);
            }
        };
        fetchCatImages();
    }, []);

    const onTileClick = (imageUrl) => {
        alert(imageUrl);
    };

    return (
        <div className="gallery-container">
            <h1>Cat Gallery</h1>
            <div className="container">
                <div className="row">
                    {catImages.map((catImage) => (
                        <div className="tile col-md-3"
                             onClick={() => onTileClick(catImage.url)}
                             key={catImage.id}
                        >
                            <div className="tile-container">
                                <img className="tile-image" key={catImage.id} src={catImage.url} alt="Cat"/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <button className="load-button">Load more furry friends!</button>
        </div>
    );
};

export default TileComponent;
