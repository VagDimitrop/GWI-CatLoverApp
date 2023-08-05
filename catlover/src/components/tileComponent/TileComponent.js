import React, {useEffect, useState} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import ModalComponent from "../modalComponent/ModalComponent";

const TileComponent = (props) => {
    const {catData} = props;
    const [modalData, setModalData] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const onTileClick = (data) => {
        if (data.breeds.length) {
            let selectedEntryData = {
                showModal: true,
                url: data.url,
                breed: data.breeds[0].name,
                description: data.breeds[0].description,
                imageId: data.id
            }
            setModalData(selectedEntryData);
            setModalIsOpen(true)
        } else {
            alert('This furry friend is of no known breed');
        }
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <div>
            <div className="gallery-container">
                <h1>Cat Gallery</h1>
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
            <ModalComponent
                data={modalData}
                isModalOpen={modalIsOpen}
                closeModal={closeModal}>
            </ModalComponent>
        </div>
    );
};

export default TileComponent;
