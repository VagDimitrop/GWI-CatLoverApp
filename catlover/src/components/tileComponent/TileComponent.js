import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ModalComponent from "../modalComponent/ModalComponent";
import InfoModal from "../infoModal/InfoModal";
import ConfirmModal from "../confirmModal/ConfirmModal";

const TileComponent = (props) => {
    const {catData, deleteCallback, headerText, descriptionText} = props;
    const [modalData, setModalData] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [infoModalIsOpen, setInfoModalIsOpen] = useState(false);
    const [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false);


    const onTileClick = (data) => {
        if (data.breeds && data.breeds.length && window.location.pathname === '/home') {
            let selectedEntryData = {
                showModal: true,
                url: data.url,
                breed: data.breeds[0].name,
                description: data.breeds[0].description,
                imageId: data.id
            }
            setModalData(selectedEntryData);
            setModalIsOpen(true)
        } else if (window.location.pathname === '/home') {
            setInfoModalIsOpen(true)
        } else if (window.location.pathname === '/favorites') {
            let selectedEntryData = {
                id : data.id
            }
            setModalData(selectedEntryData);
            setConfirmModalIsOpen(true);
        }
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const closeInfoModal = () => {
        setInfoModalIsOpen(false);
    };

    const closeConfirmModal = (event) => {
        deleteCallback(modalData);
        setConfirmModalIsOpen(false);
    };

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
            <ModalComponent
                data={modalData}
                isModalOpen={modalIsOpen}
                closeModal={closeModal}>
            </ModalComponent>
            <InfoModal
                headerText={headerText}
                descriptionText={descriptionText}
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

export default TileComponent;
