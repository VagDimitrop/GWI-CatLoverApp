import React, {useEffect, useState} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import Modal from 'react-modal';

const TileComponent = () => {
    const [catImages, setCatImages] = useState([]);
    const [showModal, toggleModal] = useState();

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

    const onTileClick = () => {
        toggleModal(true);
    };

    const onCloseModalClick = () => {
        toggleModal(false);
    }

    const onLoadMoreClick = async () => {
        try {
            const response = await axios.get('https://api.thecatapi.com/v1/images/search?limit=10');
            setCatImages([...catImages, ...response.data]);
        } catch (error) {
            console.error('Error fetching cat images:', error);
        }
    };

    const modalStyles = {
        content: {
            width: '40%',
            height: '40%',
            position: 'absolute',
            top: '30%',
            left: '30%',
        },
        overlay: {
            backgroundColor: 'rgb(91, 86, 70, 0.45)'
        },
    };

    return (
        <div>
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
            <button className="load-button"
                    onClick={() => onLoadMoreClick()}>Load more furry friends!</button>
        </div>
            <Modal
                isOpen={showModal}
                contentLabel="Minimal Modal Example"
                appElement={document.getElementById('root')}
                style={modalStyles}
            >
                <button onClick={() => onCloseModalClick()}>Close Modal</button>
            </Modal>
        </div>
    );
};

export default TileComponent;
