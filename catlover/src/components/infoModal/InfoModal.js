import Modal from "react-modal";
import React from "react";

const InfoModal = (props) => {
    const { isInfoModalOpen, closeModal, headerText, descriptionText } = props;

    const modalStyles = {
        content: {
            width: '30%',
            height: '34%',
            position: 'absolute',
            top: '33%',
            left: '35%',
            borderRadius: '8px',
            backgroundColor: 'rgba(250, 240, 215, 1)'
        },
        overlay: {
            backgroundColor: 'rgb(91, 86, 70, 0.45)'
        },
    };

    const onCloseModalClick = () => {
        closeModal();
    }

    return (
        <Modal
            isOpen={isInfoModalOpen}
            contentLabel="Minimal Modal Example"
            appElement={document.getElementById('root')}
            style={modalStyles}>

            <div className="container">
                <h1 className="modal-header">{headerText}</h1>
                <span className="no-breed-info">{descriptionText}</span>
            </div>
            <div className="button-container">
                <button onClick={() => onCloseModalClick()}>Meow!</button>
            </div>
        </Modal>
    );
};

export default InfoModal;
