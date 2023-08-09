import React, {useEffect, useState} from 'react';
import TileComponent from "../components/tileComponent/TileComponent";
import ModalComponent from "../components/modalComponent/ModalComponent";
import InfoModal from "../components/infoModal/InfoModal";
import {fetchImagesById} from "../requests/ImagesRequests";
import {fetchBreeds} from "../requests/BreedsRequests";

const BreedsPage = (props) => {
    const {isLoadingCallback} = props;
    const [breedData, setBreedData] = useState([]);
    const [breedImages, setBreedImages] = useState([]);
    const [modalData, setModalData] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [infoModalIsOpen, setInfoModalIsOpen] = useState(false);
    const [infoModalData, setInfoModalData] = useState([]);


    useEffect(() => {
        isLoadingCallback(true);
        loadBreeds();
    }, []);

    const loadBreeds = async () => {
        try {
            const breeds = await fetchBreeds()
            setBreedData(breeds);
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

    const fetchImagesByBreedId = async (id) => {
        isLoadingCallback(true);
        try {
            const images = await fetchImagesById(id)
            isLoadingCallback(false);
            setBreedImages(images);
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

    const shouldShowModal = (data) => {
        setModalData(data);
        setModalIsOpen(true)
    }

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const closeInfoModal = () => {
        setInfoModalIsOpen(false);
    };

    return (
        <div>
            <div className="page-header-container">
                <h1 className="page-header">Breed Gallery</h1>
            </div>
            <TileComponent
                breedData={breedData}
                breedImages={breedImages}
                fetchImages={fetchImagesByBreedId}
                shouldShowModal={shouldShowModal}
            />
            <InfoModal
                headerText={infoModalData.headerText}
                descriptionText={infoModalData.descriptionText}
                isInfoModalOpen={infoModalIsOpen}
                closeModal={closeInfoModal}>
            </InfoModal>
            <ModalComponent
                breedData={modalData}
                breedImages={breedImages}
                isModalOpen={modalIsOpen}
                closeModal={closeModal}
                isLoadingCallback={isLoadingCallback}>
            </ModalComponent>
        </div>
    );
};

export default BreedsPage;
