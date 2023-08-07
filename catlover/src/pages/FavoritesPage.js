import React, {useEffect, useState} from 'react';
import axios from "axios";
import TileComponent from "../components/tileComponent/TileComponent";
import InfoModal from "../components/infoModal/InfoModal";
import {APIKey, BaseUrl, sub_id} from '../Constants';


const FavoritesPage = (props) => {
    const {isLoadingCallback} = props;
    const [favoritesData, setFavorites] = useState([]);
    const [infoModalIsOpen, setInfoModalIsOpen] = useState(false);

    useEffect(() => {
        isLoadingCallback(true);
        const fetchFavorites = async () => {
            try {
                    const response = await axios.get(BaseUrl + 'favourites', {
                    params: {sub_id: sub_id},
                    headers: {'x-api-key': APIKey}
                });
                setFavorites(transformData(response.data));
                isLoadingCallback(false);
            } catch (error) {
                console.error('Error fetching cat images:', error);
            }
        };
        fetchFavorites();
    }, []);

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

    const deleteFavorite = async (data) => {
        let id = data.id
        isLoadingCallback(true);
        try {
            const response = await axios.delete(BaseUrl + 'favourites/' + id, {
                headers: {'x-api-key': APIKey}
            });
            let updatedArray = favoritesData.filter(((element) => element.id !== id));
            setFavorites(updatedArray);
            isLoadingCallback(false);
            setInfoModalIsOpen(true);
        } catch (error) {
            console.error('Error fetching cat images:', error);
        }
    }

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
                deleteCallback={deleteFavorite}
            />
            <InfoModal
                headerText={'Pity..'}
                descriptionText={'You have just unfavourrrited a very good friend'}
                isInfoModalOpen={infoModalIsOpen}
                closeModal={closeInfoModal}>
            </InfoModal>
        </div>
    );
};

export default FavoritesPage;
