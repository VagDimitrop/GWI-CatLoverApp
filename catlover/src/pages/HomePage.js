import React, {useEffect, useState} from 'react';
import TileComponent from "../components/tileComponent/TileComponent";
import axios from "axios";
import {APIKey, BaseUrl} from '../Constants';
import ModalComponent from "../components/modalComponent/ModalComponent";
import InfoModal from "../components/infoModal/InfoModal";


const HomePage = (props) => {
    const {isLoadingCallback} = props;
    const [catData, setCatImages] = useState([]);
    const [modalData, setModalData] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [infoModalIsOpen, setInfoModalIsOpen] = useState(false);


    useEffect(() => {
        isLoadingCallback(true);
        const fetchCatImages = async () => {
            try {
                const response = await axios.get(BaseUrl + 'images/search?limit=10',
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
            const response = await axios.get(BaseUrl + '/images/search?limit=10',
                {headers: {'x-api-key': APIKey}});
            setCatImages([...catData, ...response.data]);
            isLoadingCallback(false);
        } catch (error) {
            console.error('Error fetching cat images:', error);
        }
    };

    const shouldShowModal = (data) => {
        setModalData(data);
        setModalIsOpen(true)
    }

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const shouldShowInfoModal = () => {
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
                headerText={'Oops'}
                descriptionText={'This kitten is of no know breed unfortunately..'}
                isInfoModalOpen={infoModalIsOpen}
                closeModal={closeInfoModal}>
            </InfoModal>
            <ModalComponent
                catData={modalData}
                isModalOpen={modalIsOpen}
                closeModal={closeModal}
                isLoadingCallback={isLoadingCallback}>
            </ModalComponent>
        </div>
    );
};

export default HomePage;
