import React, {useState} from 'react';
import Modal from 'react-modal';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart as faHeartSolid} from "@fortawesome/free-solid-svg-icons";
import {faHeart as faHeartRegular} from "@fortawesome/free-regular-svg-icons";
import axios from "axios";

const ModalComponent = (props) => {
    const { data, isModalOpen, closeModal } = props;
    const [URLCopied, copyUrlToClipboard] = useState(false);
    const [showModal, toggleModal] = useState();
    const [isFavorite, setIsFavorite] = useState(false);

    const APIKey = 'live_Lel5oW8x7PrQ6TPSOIC2XyoQB9SSfzd4uHE4ukbENfzdOxbO3f1ojNv13BAKUHyj'

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

    const handleFavoriteClick = async (imageId) => {
        const payload = {
            image_id: imageId,
            sub_id: "44"
        };
        try {
            const response = await axios.post('https://api.thecatapi.com/v1/favourites',
                payload,
                {headers: {'x-api-key': APIKey}});
            setIsFavorite(true);
        } catch (error) {
            console.error('Error fetching cat images:', error);
        }
    }

    const onCloseModalClick = () => {
        closeModal();
    }

    async function copyTextToClipboard(text) {
        if ('clipboard' in navigator) {
            return await navigator.clipboard.writeText(text);
        } else {
            return document.execCommand('copy', true, text);
        }
    }

    const handleCopyClick = (copyText) => {
        copyTextToClipboard(copyText)
            .then(() => {
                copyUrlToClipboard(true);
                setTimeout(() => {
                    copyUrlToClipboard(false);
                }, 1500);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <Modal
            isOpen={isModalOpen}
            contentLabel="Minimal Modal Example"
            appElement={document.getElementById('root')}
            style={modalStyles}>

            <div className="container">
                <h2 className="modal-header">{data.breed}</h2>
                <div className="image-container">
                    <img src={data.url} alt="Cat"/>{}
                    <FontAwesomeIcon icon={isFavorite ? faHeartSolid : faHeartRegular} onClick={ () => handleFavoriteClick(data.imageId)}/>
                </div>
                <div className="details-container">
                    <span className="breed-details">{data.description}</span>
                </div>
            </div>
            <div className="copy-container">
                <span>Do you want to share this image?</span>
                <span>Click on the button below to copy the image and share it with your friends</span>
                <button className="copy-url-button" onClick={() => handleCopyClick(data.url)}>Copy image url</button>
            </div>
            <div className="button-container">
                <button onClick={() => onCloseModalClick()}>Close</button>
            </div>
        </Modal>
    );
};

export default ModalComponent;
