import React, {useEffect, useState} from 'react';
import TileComponent from "../components/tileComponent/TileComponent";
import axios from "axios";
import {APIKey, BaseUrl, sub_id} from "../Constants";
import ModalComponent from "../components/modalComponent/ModalComponent";
import InfoModal from "../components/infoModal/InfoModal";

const BreedDetailsPage = (props) => {
    const {isLoadingCallback} = props;
    const [breedData, setBreedData] = useState([]);
    const [breedImages, setBreedImages] = useState([]);
    const [modalData, setModalData] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [infoModalIsOpen, setInfoModalIsOpen] = useState(false);
    const [infoModalData, setInfoModalData] = useState([]);


    useEffect(() => {
        isLoadingCallback(true);
        const fetchBreedData = async () => {
            try {
                const response = await axios.get(BaseUrl + 'breeds',
                    {headers: {'x-api-key': APIKey}});
                setBreedData(response.data);
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
        fetchBreedData();
    }, []);

    const fetchImagesByBreedId = async (id) => {
        isLoadingCallback(true);
        try {
            const response = await axios.get(BaseUrl + 'images/search?limit=10',{
                params: {id: id}
            });
            isLoadingCallback(false);
            setBreedImages(response.data);
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

export default BreedDetailsPage;
