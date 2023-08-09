import React, {useEffect, useState} from 'react';
import TileComponent from "../components/tileComponent/TileComponent";
import ModalComponent from "../components/modalComponent/ModalComponent";
import InfoModal from "../components/infoModal/InfoModal";
import {fetchImages} from "../requests/ImagesRequests";
import {addFavorite} from "../requests/FavoritesRequests";


const HomePage = (props) => {
    // isLoadingCallBack function is defined in the App.js file and defines whether the loader should be displayed or not.
    const {isLoadingCallback} = props;

    // The catData variable is an array with all the images retrieved.
    const [catData, setCatImages] = useState([]);

    // The modalData variable holds the data to be displayed in the details modal.
    const [modalData, setModalData] = useState([]);

    // The modalIsOpen variable is a boolean that determines if the details modal should be displayed.
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // The infoModalIsOpen variable is a boolean that determines if the info modal should be displayed.
    const [infoModalIsOpen, setInfoModalIsOpen] = useState(false);

    // The infoModalData variable holds the data to be displayed in the info modal.
    const [infoModalData, setInfoModalData] = useState([]);

    // Initial fetch of images by calling the loadImages function.
    useEffect(() => {
        loadImages();
    }, []);


    const loadImages = async () => {
        // Calling the isLoadingCallback callBack function in order to display the loader.
        isLoadingCallback(true);

        try {
            // Calling the fetchImages function from the requests/ImagesRequests file.
            const images = await fetchImages();

            // Using the setCatImages in order to add the newly fetched images to catData.
            // Using the spread syntax because the images are retrieved as an array
            setCatImages([...catData, ...images]);

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

    // Handles the click on the "Load More" button found in the bottom of the Home page by calling the loadImages function above
    const onLoadMoreClick = async () => {
        loadImages();
    };

    // This is the callback function invoked by the tile component.
    // Sets the detail modal data and triggers the modal to be displayed.
    const shouldShowModal = (data) => {
        setModalData(data);
        setModalIsOpen(true)
    }

    // This is the callback function invoked by the modal component to close the modal.
    const closeModal = () => {
        setModalIsOpen(false);
    };

    // This is the callback function found in the tile component when the tile has no data other than the image
    // Is also used when there is a server error or when the user adds a cat to favorites.
    const shouldShowInfoModal = (data) => {
        // This if clause is used when the function is used as a callback.
        // The tile component sends an argument equal to false (as in there are no data to display)
        // and we proceed by defining the literals for the info modal.
        if (data === false) {
            let infoModalData = {
                headerText: 'Oops',
                descriptionText: 'This kitten is of no know breed unfortunately..'
            }
            setInfoModalData(infoModalData);
        }
        // If there are data passed, then the function has been invoked from this controller (lines 113, 121)
        // and we also proceed by defining the literals based on the arguments passed to this function.
        else {
            setInfoModalData(data)
        }
        // Triggering the modal to display.
        setInfoModalIsOpen(true)
    }

    // Triggering the info modal to hide.
    const closeInfoModal = () => {
        setInfoModalIsOpen(false);
    };

    // This function is used to handle the click on the heart icon in the details modal component (add to favorites action).
    const addToFavorites = async (imageId, isFavorite) => {
        // Creating the payload required
        const payload = {
            image_id: imageId,
            sub_id: "44"
        };
        // If the cat has not been added to favorite, we proceed.
        if (!isFavorite) {
            // Calling the isLoadingCallback callBack function in order to display the loader
            isLoadingCallback(true);

            try {
                // Calling the fetchImages function from the requests/FavoritesRequests file.
                await addFavorite(payload);

                // Calling the isLoadingCallback callBack function in order to hide the loader.
                isLoadingCallback(false);

                // Closing the details modal in order to show the info modal with the result of the action
                closeModal();

                // Creating data for the info model in the case of successful addition to favorites
                let infoModalData = {
                    headerText: 'Yay!',
                    descriptionText: 'You have just favorited a little kitten!'
                }
                // Triggering info modal with the success message
                shouldShowInfoModal(infoModalData)
            } catch (error) {
                isLoadingCallback(false);
                // Creating data for the info model in the case of failed addition to favorites
                let infoModalData = {
                    headerText: 'Oops..',
                    descriptionText: 'The canines running the server did not do a very good job here.. Apologies!'
                }

                // Closing the details modal in order to show the info modal with the result of the action
                closeModal();

                // Triggering info modal with the error message
                shouldShowInfoModal(infoModalData)
            }
        }
    }

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
                addToFavoritesCallBack={addToFavorites}
                isLoadingCallback={isLoadingCallback}>
            </ModalComponent>
        </div>
    );
};

export default HomePage;
