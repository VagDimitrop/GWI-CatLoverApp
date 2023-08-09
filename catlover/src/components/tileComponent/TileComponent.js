import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const TileComponent = (props) => {
    const {catData, breedData, fetchImages, shouldShowModal, shouldShowInfoModal} = props;

    // Since this component is beeing used across all three pages, we have to find in which page the user is and build the data to be diplayed accordingly.
    const onTileClick = (data) => {
        if (window.location.pathname === '/home') {
            // If the user is in the home page and the tile clicked has more data other, than the image, then,
            // we create a selectedEntryData object, which is then passed to the parent component (ie HomePage.js)
            // in order for the parent component to initiate the display of the details modal, showing the details of the cat.
            if (data.breeds && data.breeds.length) {
                let selectedEntryData = {
                    showModal: true,
                    url: data.url,
                    breed: data.breeds[0].name,
                    description: data.breeds[0].description,
                    imageId: data.id
                }
                shouldShowModal(selectedEntryData);
            }
            // If the user is in the homepage and the tile clicked does not have more data, then,
            // we just call the callback function to display an info modal with literals defined in the parent component.
            else {
                let selectedEntryData = false
                shouldShowInfoModal(selectedEntryData)
            }
        }
        // If the user is in the favorites page and the tile clicked, then
        // we create a selectedEntryData object, which is then passed to the parent component (ie FavoritesPage.js)
        // in order for the parent component to initiate the display of the confirm modal with.
        else if (window.location.pathname === '/favorites') {
            let selectedEntryData = {
                id: data.id
            }
            shouldShowModal(selectedEntryData);
        }
        // If the user is in the breeds page and the tile clicked, then
        // we create a selectedEntryData object, which is then passed to the parent component (ie BreedsPage.js)
        // in order for the parent component to initiate the display of the details modal, showing the breed's details.
        else if (window.location.pathname === '/breeds') {
            let selectedEntryData = {
                showModal: true,
                breed: data.name,
                description: data.description,
            }
            fetchImages(data.id);
            shouldShowModal(selectedEntryData);
        }
    };


    // Since this component is being used both for cat data (HomePage.js & FavoritesPage.js) and breed data (BreedsPage.js), we have two different UI implementations.
    // The condition decides accordingly which UI should be displayed
    if (catData) {
        return (
            <div>
                <div className="gallery-container">
                    <div className="container">
                        <div className="row">
                            {catData.map((data) => (
                                <div className="tile col-md-3"
                                     onClick={() => onTileClick(data)}
                                     key={data.id}>

                                    <div className="tile-container">
                                        <img className="tile-image" key={data.id} src={data.url} alt="Cat"/>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    } else if (breedData) {
        return (
            <div>
                <div className="gallery-container">
                    <div className="container">
                        <div className="row">
                            {breedData.map((data) => (
                                <div className="tile col-md-3"
                                     onClick={() => onTileClick(data)}
                                     key={data.id}>
                                    <div className="tile-container">
                                        <span>{data.name}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default TileComponent;
