import React, {useEffect, useState} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import ModalComponent from "../modalComponent/ModalComponent";

const TileComponent = () => {
    const [catData, setCatImages] = useState([]);
    const [modalData, setModalData] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);


    const APIKey = 'live_Lel5oW8x7PrQ6TPSOIC2XyoQB9SSfzd4uHE4ukbENfzdOxbO3f1ojNv13BAKUHyj'

    useEffect(() => {
        const fetchCatImages = async () => {
            try {
                const response = await axios.get('https://api.thecatapi.com/v1/images/search?limit=10',
                    { headers: { 'x-api-key': APIKey } });
                setCatImages(response.data);
            } catch (error) {
                console.error('Error fetching cat images:', error);
            }
        };
        fetchCatImages();
    }, []);

    const onTileClick = (data) => {
        if (data.breeds.length) {
            let selectedEntryData = {
                showModal: true,
                url : data.url,
                breed : data.breeds[0].name,
                description: data.breeds[0].description,
                imageId: data.id
            }
            setModalData(selectedEntryData);
            setModalIsOpen(true)
        } else {
            alert('This furry friend is of no known breed');
        }
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const onLoadMoreClick = async () => {
        try {
            const response = await axios.get('https://api.thecatapi.com/v1/images/search?limit=10',
                { headers: { 'x-api-key': APIKey } });
            setCatImages([...catData, ...response.data]);
        } catch (error) {
            console.error('Error fetching cat images:', error);
        }
    };

    return (
        <div>
        <div className="gallery-container">
            <h1>Cat Gallery</h1>
            <div className="container">
                <div className="row">
                    {catData.map((data) => (
                        <div className="tile col-md-3"
                             onClick={() => onTileClick(data)}
                             key={data.id}>

                            <div className="tile-container">
                                <img className="tile-image" key={data.id} src={data.url} alt="Cat"/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button className="load-button"
                    onClick={() => onLoadMoreClick()}>Load more furry friends!
            </button>
        </div>
            <ModalComponent
                data={modalData}
                isModalOpen={modalIsOpen}
                closeModal={closeModal}>
            </ModalComponent>
        </div>
    );
};

export default TileComponent;
