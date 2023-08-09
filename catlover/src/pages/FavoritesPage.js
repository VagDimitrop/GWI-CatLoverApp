import React, {useEffect, useState} from 'react';
import TileComponent from "../components/tileComponent/TileComponent";
import InfoModal from "../components/infoModal/InfoModal";
import ConfirmModal from "../components/confirmModal/ConfirmModal";
import {deleteFavorite, fetchFavorites} from "../requests/FavoritesRequests";


const FavoritesPage = (props) => {
    const {isLoadingCallback} = props;
    const [favoritesData, setFavorites] = useState([]);
    const [infoModalData, setInfoModalData] = useState([]);
    const [infoModalIsOpen, setInfoModalIsOpen] = useState(false);
    const [modalData, setModalData] = useState([]);
    const [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false);


    useEffect(() => {
        isLoadingCallback(true);
        loadFavorites();
    }, []);

    const loadFavorites = async () => {
        try {
            const favorites = await fetchFavorites();
            setFavorites(transformData(favorites));
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

    const transformData = (data) => {
        let transformedData = [];
        data.forEach( (element) => {
            let entry = {
                id : element.id,
                url : element.image.url
            }
            transformedData.push(entry);
        })
        return transformedData;
    }

    const onDeleteFavoriteClick = async (data) => {
        let id = data.id
        isLoadingCallback(true);
        try {
            const favorites = await deleteFavorite(id);
            let updatedArray = favoritesData.filter(((element) => element.id !== id));
            setFavorites(updatedArray);
            isLoadingCallback(false);
            let infoModalData = {
                headerText: 'Pity..',
                descriptionText: 'You have just unfavourrrited a very good friend'
            }
            setInfoModalData(infoModalData)
            setInfoModalIsOpen(true);
        } catch (error) {
            isLoadingCallback(false);
            let infoModalData = {
                headerText: 'Oops..',
                descriptionText: 'The canines running the server did not do a very good job here.. Apologies!'
            }
            setInfoModalData(infoModalData)
            setInfoModalIsOpen(true);
        }
    }

    const shouldShowModal = (data) => {
        setModalData(data);
        setConfirmModalIsOpen(true)
    }

    const closeConfirmModal = (event) => {
        if (event === 'submit') {
            onDeleteFavoriteClick(modalData);
        }
        setConfirmModalIsOpen(false);
    };

    const closeInfoModal = () => {
        setInfoModalIsOpen(false);
    };

    return (
        <div>
            <div className="page-header-container">
                <h1 className="page-header">Your favorite cat images</h1>
                <span className="page-text">By clicking on the image, you can remove the image from your favorites</span>
            </div>
            <TileComponent
                catData={favoritesData}
                shouldShowModal={shouldShowModal}
            />
            <InfoModal
                headerText={infoModalData.headerText}
                descriptionText={infoModalData.descriptionText}
                isInfoModalOpen={infoModalIsOpen}
                closeModal={closeInfoModal}>
            </InfoModal>
            <ConfirmModal
                isConfirmModalOpen={confirmModalIsOpen}
                closeModal={closeConfirmModal}>
            </ConfirmModal>
        </div>
    );
};

export default FavoritesPage;
