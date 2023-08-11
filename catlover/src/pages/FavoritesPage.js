import React, {useEffect, useState} from 'react';
import TileComponent from "../components/tileComponent/TileComponent";
import InfoModal from "../components/infoModal/InfoModal";
import ConfirmModal from "../components/confirmModal/ConfirmModal";
import {deleteFavorite, fetchFavorites} from "../requests/FavoritesRequests";


const FavoritesPage = (props) => {
    // isLoadingCallBack function is defined in the App.js file and defines whether the loader should be displayed or not
    const {isLoadingCallback} = props;

    // The favoritesData variable is an array with all the favorite entries retrieved.
    const [favoritesData, setFavorites] = useState([]);

    // The infoModalData variable holds the data to be displayed in the info modal.
    const [infoModalData, setInfoModalData] = useState([]);

    // The infoModalIsOpen variable is a boolean that determines if the info modal should be displayed.
    const [infoModalIsOpen, setInfoModalIsOpen] = useState(false);

    // The confirmModalData variable holds the data to be passed to parent in order to be removed from favorite.
    const [confirmModalData, setConfirmModalData] = useState([]);

    // The confirmModalIsOpen variable is a boolean that determines if the info modal should be displayed.
    const [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false);

    // Initial fetch of favorites by calling the loadFavorites function.
    useEffect(() => {
        const loadFavorites = async () => {
            // Calling the isLoadingCallback callBack function in order to display the loader.
            isLoadingCallback(true);
            try {
                // Calling the fetchImages function from the requests/FavoritesRequests file.
                const favorites = await fetchFavorites();

                // Using the setFavorites in order to add the favorites to favoritesData.
                // Since we use the tile component in this page too and the data between the HomePage and the FavoritesPage are not
                // of the same format, we have to transform the data, in order for the tile component to accept them
                setFavorites(transformData(favorites));

                // Calling the isLoadingCallback callBack function in order to hide the loader.

                isLoadingCallback(false);
            } catch (error) {

                // Calling the isLoadingCallback callBack function in order to hide the loader.
                isLoadingCallback(false);

                // Initialising data for the info modal that informs the user that there has been some server error.
                let infoModalData = {
                    headerText: 'Oops..',
                    descriptionText: 'The canines running the server did not do a very good job here.. Apologies!'
                }
                // Setting the info modal data.
                setInfoModalData(infoModalData)

                // And lastly displaying the info modal.
                setInfoModalIsOpen(true);
            }
        };
        loadFavorites();
    }, []);


    // This is the function used above to transform the data for the tile component.
    const transformData = (data) => {
        let transformedData = [];

        // Iterating through each entry
        data.forEach((element) => {

            // Creating an acceptable from the tile component object
            let entry = {
                id: element.id,
                url: element.image.url
            }

            // Pushing this object to the array that will be passed to the tile component to map
            transformedData.push(entry);
        })
        return transformedData;
    }

    // This function is used to handle the click on the submit button of the confirmation modal,
    // in order to proceed with the removal from the favorites.
    const onDeleteFavoriteClick = async (data) => {
        // Getting the id of the entry to be deleted
        let id = data.id

        // Calling the isLoadingCallback callBack function in order to display the loader
        isLoadingCallback(true);
        try {

            // Calling the deleteFavorite function from the requests/FavoritesRequests file.
            await deleteFavorite(id);

            // We want to re-render the favorites, so we filter the existing array, keeping only the
            // elements that do not have the same id as the one deleted.
            let updatedArray = favoritesData.filter(((element) => element.id !== id));

            // We then re-set the favoritesData in order to trigger the re-render of the tile component.
            setFavorites(updatedArray);

            // Calling the isLoadingCallback callBack function in order to hide the loader.
            isLoadingCallback(false);

            // Creating and setting data for the info model in the case of successful removal from favorites
            let infoModalData = {
                headerText: 'Pity..',
                descriptionText: 'You have just unfavourrrited a very good friend'
            }
            setInfoModalData(infoModalData)

            // Triggering the modal to display.
            setInfoModalIsOpen(true);
        } catch (error) {
            // Calling the isLoadingCallback callBack function in order to hide the loader.
            isLoadingCallback(false);

            // Creating and setting data for the info model in the case of failed removal to favorites
            let infoModalData = {
                headerText: 'Oops..',
                descriptionText: 'The canines running the server did not do a very good job here.. Apologies!'
            }
            setInfoModalData(infoModalData)

            // Triggering the modal to display.
            setInfoModalIsOpen(true);
        }
    }

    // This is the callback function invoked by the tile component.
    // Sets the detail modal data and triggers the modal to be displayed.
    const shouldShowModal = (data) => {
        setConfirmModalData(data);
        setConfirmModalIsOpen(true)
    }

    // This is the callback function invoked by the confirm component.
    // If the user clicks on the primary button, then the data passed here is equal to "submit" so we proceed
    // with the removal from favorites.
    // If the user click on the secondary button, we just hide the confirm modal.
    const closeConfirmModal = (event) => {
        if (event === 'submit') {
            onDeleteFavoriteClick(confirmModalData);
        }
        setConfirmModalIsOpen(false);
    };

    // Triggering the info modal to hide.
    const closeInfoModal = () => {
        setInfoModalIsOpen(false);
    };

    return (
        <div>
            <div className="page-header-container">
                <h1 className="page-header">Your favorite cat images</h1>
                <span
                    className="page-text">By clicking on the image, you can remove the image from your favorites</span>
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
