import React, {useEffect, useState} from 'react';
import axios from "axios";
import TileComponent from "../components/tileComponent/TileComponent";
import InfoModal from "../components/infoModal/InfoModal";

const FavoritesPage = () => {
    const [favoritesData, setFavorites] = useState([]);
    const [infoModalIsOpen, setInfoModalIsOpen] = useState(false);


    const APIKey = 'live_Lel5oW8x7PrQ6TPSOIC2XyoQB9SSfzd4uHE4ukbENfzdOxbO3f1ojNv13BAKUHyj'


    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                    const response = await axios.get('https://api.thecatapi.com/v1/favourites', {
                    params: {sub_id: 44},
                    headers: {'x-api-key': APIKey}
                });

                setFavorites(transformData(response.data));
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

        try {
            const response = await axios.delete('https://api.thecatapi.com/v1/favourites/' + id, {
                headers: {'x-api-key': APIKey}
            });
            let updatedArray = favoritesData.filter(((element) => element.id !== id));
            setFavorites(updatedArray);
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
