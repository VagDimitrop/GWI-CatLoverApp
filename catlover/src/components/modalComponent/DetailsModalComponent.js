import React, {useState} from 'react';
import Modal from 'react-modal';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart as faHeartSolid} from "@fortawesome/free-solid-svg-icons";
import {faHeart as faHeartRegular} from "@fortawesome/free-regular-svg-icons";
import {useNavigate} from "react-router-dom";

const DetailsModalComponent = (props) => {
    const {catData, isModalOpen, closeModal, breedData, breedImages, addToFavoritesCallBack} = props;
    const [URLCopied, copyUrlToClipboard] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const navigate = useNavigate();

    // The code below is used to apply custom style to the modal
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

    // Handling click on the heart icon by calling a callback function found in HomePage.js
    const handleFavoriteClick = async (imageId) => {
        addToFavoritesCallBack(imageId, isFavorite);
        setIsFavorite(true);
    }

    // Handling click on "close" button by calling a callback function found in HomePage.js
    const onCloseModalClick = () => {
        closeModal();
    }

    // Handling click on "copy URL" button by copying image url to clipboard
    const onCopyUrlClick = (copyText) => {
        if ('clipboard' in navigator) {
            return navigator.clipboard.writeText(copyText);
        } else {
            return document.execCommand('copy', true, copyText);
        }
    }

    // Handling click on "see more breeds" button by navigating to BreedsPage
    const navigateToBreedsDetails = () => {
        navigate("/breeds");
    }

    const navigateToHome = async (data) => {
        navigate("/home",{
            state: {
                imageUrl: data,
            }
        });
    }

    // Since this component is being used both for cat data and breed data, we have two different UI implementations.
    // The condition decides according to the clause which UI should be displayed
    if (catData) {
        return (
            <Modal
                isOpen={isModalOpen}
                contentLabel="Minimal Modal Example"
                appElement={document.getElementById('root')}
                style={modalStyles}>

                <div className="container">
                    <h2 className="modal-header">{catData.breed}</h2>
                    <div className="image-container">
                        <img src={catData.url} alt="Cat"/>{}
                        <FontAwesomeIcon icon={isFavorite ? faHeartSolid : faHeartRegular}
                                         onClick={() => handleFavoriteClick(catData.imageId)}/>
                    </div>
                    <div className="details-container">
                        <span className="breed-details">{catData.description}</span>
                    </div>
                </div>
                <div className="copy-container">
                    <span>Do you want to share this image?</span>
                    <span>Click on the button below to copy the image and share it with your friends</span>
                    <button className="copy-url-button" onClick={() => onCopyUrlClick(catData.url)}>Copy image url
                    </button>
                </div>
                <div className="button-container">
                    <button onClick={navigateToBreedsDetails}>See more breeds</button>
                    <button onClick={() => onCloseModalClick()}>Close</button>
                </div>
            </Modal>
        );
    } else if (breedData) {
        return (
            <Modal
                isOpen={isModalOpen}
                contentLabel="Minimal Modal Example"
                appElement={document.getElementById('root')}
                style={modalStyles}>

                <div className="container">
                    <h2 className="modal-header">{breedData.breed}</h2>
                    <div className="details-container">
                        <span className="breed-details">{breedData.description}</span>
                    </div>
                    <div className="container">
                        <div className="row">
                            {breedImages.map((data) => (
                                <div className="tile col-md-3" key={data.id}>
                                    <div className="tile-container">
                                        <img className="tile-image" key={data.id} src={data.url} alt="Cat"/>
                                    </div>
                                    <button onClick={() => navigateToHome(data.url)}>See more</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="button-container">
                    <button onClick={() => onCloseModalClick()}>Close</button>
                </div>
            </Modal>
        )
    }
};

export default DetailsModalComponent;
