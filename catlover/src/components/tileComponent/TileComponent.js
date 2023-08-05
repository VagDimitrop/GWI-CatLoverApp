import React, {useEffect, useState} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import Modal from 'react-modal';

const TileComponent = () => {
    const [catData, setCatImages] = useState([]);
    const [showModal, toggleModal] = useState();
    const [modalData, setModalData] = useState([]);
    const [URLCopied, copyUrlToClipboard] = useState(false);



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
                url : data.url,
                breed : data.breeds[0].name,
                description: data.breeds[0].description
            }
            setModalData(selectedEntryData)
            toggleModal(true);
        } else {
            alert('This furry friend is of no known breed');
        }
    };


    const onCloseModalClick = () => {
        toggleModal(false);
    }

    const onLoadMoreClick = async () => {
        try {
            const response = await axios.get('https://api.thecatapi.com/v1/images/search?limit=10');
            setCatImages([...catData, ...response.data]);
        } catch (error) {
            console.error('Error fetching cat images:', error);
        }
    };

    async function copyTextToClipboard(text) {
        if ('clipboard' in navigator) {
            return await navigator.clipboard.writeText(text);
        } else {
            return document.execCommand('copy', true, text);
        }
    }

    const handleCopyClick = (copyText) => {
        // Asynchronously call copyTextToClipboard
        copyTextToClipboard(copyText)
            .then(() => {
                // If successful, update the isCopied state value
                copyUrlToClipboard(true);
                setTimeout(() => {
                    copyUrlToClipboard(false);
                }, 1500);
            })
            .catch((err) => {
                console.log(err);
            });
    }


    const modalStyles = {
        content: {
            width: '50%',
            height: '60%',
            position: 'absolute',
            top: '20%',
            left: '25%',
            borderRadius: '8px',
            backgroundColor: 'rgba(250, 240, 215, 1)'
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
            <Modal
                isOpen={showModal}
                contentLabel="Minimal Modal Example"
                appElement={document.getElementById('root')}
                style={modalStyles}>

                <h2 className="modal-header">{modalData.breed}</h2>
                <div className="container">
                    <div className="image-container">
                        <img src={modalData.url} alt="Cat"/>
                    </div>
                    <div className="details-container">
                        <span className="breed-details">{modalData.description}</span>
                    </div>
                </div>
                <div className="copy-container">
                    <span>Do you want to share this image?</span>
                    <span>Click on the button below to copy the image and share it with your friends</span>
                    <button className="copy-url-button" onClick={() => handleCopyClick(modalData.url)}>Copy image url</button>
                </div>
                <div className="button-container">
                    <button onClick={() => onCloseModalClick()}>Close</button>
                </div>
            </Modal>
        </div>
    );
};

export default TileComponent;
