import React, {useEffect, useState} from 'react';
import TileComponent from "../components/tileComponent/TileComponent";
import ModalComponent from "../components/modalComponent/ModalComponent";
import InfoModal from "../components/infoModal/InfoModal";
import {fetchImagesById} from "../requests/ImagesRequests";
import {fetchBreeds} from "../requests/BreedsRequests";

const BreedsPage = (props) => {
    // isLoadingCallBack function is defined in the App.js file and defines whether the loader should be displayed or not
    const {isLoadingCallback} = props;

    // The breedData variable is an array with all the breeds retrieved.
    const [breedData, setBreedData] = useState([]);

    // The breedImages variable is an array with all the images of the specific breed retrieved.
    const [breedImages, setBreedImages] = useState([]);

    // The modalData variable holds the breed data (name, description and images) to be displayed in the details modal.
    const [modalData, setModalData] = useState([]);

    // The modalIsOpen variable is a boolean that determines if the info modal should be displayed.
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // The infoModalIsOpen variable is a boolean that determines if the info modal should be displayed.
    const [infoModalIsOpen, setInfoModalIsOpen] = useState(false);

    // The infoModalData variable holds the data to be displayed in the info modal.
    const [infoModalData, setInfoModalData] = useState([]);

    // Initial fetch of breeds by calling the loadBreeds function.
    useEffect(() => {
        loadBreeds();
    }, []);

    const loadBreeds = async () => {
        // Calling the isLoadingCallback callBack function in order to display the loader.
        isLoadingCallback(true);

        try {
            // Calling the fetchBreeds function from the requests/BreedsRequests file.
            const breeds = await fetchBreeds()

            // Using the setBreedData in order to add the breeds to breedData.
            setBreedData(breeds);

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

    // This function is invoked from the tile component when the user clicks on one of the breed tiles.
    // We proceed by fetching 10 random images of this specific breed by calling the fetchImagesById function
    // from the requests/BreedsRequests file
    const fetchImagesByBreedId = async (id) => {
        // Calling the isLoadingCallback callBack function in order to display the loader
        isLoadingCallback(true);

        try {
            // Fetch the images
            const images = await fetchImagesById(id)

            // Pushing the newly fetched images to breedImages
            setBreedImages(images);

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

    // This is the callback function found in the tile component used to show the details of the breed
    const shouldShowModal = (data) => {
        // Setting the modal data from the data passed by the child component
        setModalData(data);

        // Triggering the details modal to display
        setModalIsOpen(true)
    }

    // Callback function used in details modal to handle the click on "Close" button
    const closeModal = () => {
        setModalIsOpen(false);
    };

    // Callback function used in info component to handle the click on "Close" button
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
