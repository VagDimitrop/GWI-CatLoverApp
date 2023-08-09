import React, {useEffect, useState} from 'react';
import TileComponent from "../components/tileComponent/TileComponent";
import axios from "axios";
import {APIKey, BaseUrl} from '../Constants';
import ModalComponent from "../components/modalComponent/ModalComponent";
import InfoModal from "../components/infoModal/InfoModal";
import {fetchImages} from "../requests/ImagesRequests";


const HomePage = (props) => {
    const {isLoadingCallback} = props;
    const [catData, setCatImages] = useState([]);
    const [modalData, setModalData] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [infoModalIsOpen, setInfoModalIsOpen] = useState(false);
    const [infoModalData, setInfoModalData] = useState([]);


    useEffect(() => {
        loadImages();
    }, []);

    const loadImages = async () => {
        isLoadingCallback(true);
        try {
            const images = await fetchImages();
            setCatImages([...catData, ...images]);
            isLoadingCallback(false);
        } catch (error) {
            isLoadingCallback(false);
            let infoModalData = {
                headerText: 'Oops..',
                descriptionText: 'The canines running the server did not do a very good job here.. Apologies!'
            }
            setInfoModalData(infoModalData)
            setInfoModalIsOpen(true);
        }
    };

    const onLoadMoreClick = async () => {
        loadImages();
    };

    const shouldShowModal = (data) => {
        setModalData(data);
        setModalIsOpen(true)
    }

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const shouldShowInfoModal = (data) => {
        if (data === false) {
            let infoModalData = {
                headerText: 'Oops',
                descriptionText: 'This kitten is of no know breed unfortunately..'
            }
            setInfoModalData(infoModalData);
        } else {
            setInfoModalData(data)
        }
        setInfoModalIsOpen(true)
    }

    const closeInfoModal = () => {
        setInfoModalIsOpen(false);
    };

    return (
        <div>
            <div className="page-header-container">
                <h1 className="page-header">Cat Gallery</h1>
            </div>
            <TileComponent
                catData={catData}
                isLoadingCallback={isLoadingCallback}
                shouldShowModal={shouldShowModal}
                shouldShowInfoModal={shouldShowInfoModal}
            />
            <button className="load-button"
                    onClick={() => onLoadMoreClick()}>Load more furry friends!
            </button>
            <InfoModal
                headerText={infoModalData.headerText}
                descriptionText={infoModalData.descriptionText}
                isInfoModalOpen={infoModalIsOpen}
                closeModal={closeInfoModal}>
            </InfoModal>
            <ModalComponent
                catData={modalData}
                isModalOpen={modalIsOpen}
                closeModal={closeModal}
                shouldShowInfoModal={shouldShowInfoModal}
                isLoadingCallback={isLoadingCallback}>
            </ModalComponent>
        </div>
    );
};

export default HomePage;
