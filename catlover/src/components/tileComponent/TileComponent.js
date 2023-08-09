import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const TileComponent = (props) => {
    const {catData, breedData, fetchImages, shouldShowModal, shouldShowInfoModal} = props;

    const onTileClick = (data) => {
        if (window.location.pathname === '/home') {
            if (data.breeds && data.breeds.length) {
                let selectedEntryData = {
                    showModal: true,
                    url: data.url,
                    breed: data.breeds[0].name,
                    description: data.breeds[0].description,
                    imageId: data.id
                }
                shouldShowModal(selectedEntryData);
            } else {
                let selectedEntryData = false
                shouldShowInfoModal(selectedEntryData)
            }
        } else if (window.location.pathname === '/favorites') {
            let selectedEntryData = {
                id: data.id
            }
            shouldShowModal(selectedEntryData);
        } else if (window.location.pathname === '/breeds') {
            let selectedEntryData = {
                showModal: true,
                breed: data.name,
                description: data.description,
            }
            fetchImages(data.id);
            shouldShowModal(selectedEntryData);
        }
    };



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
