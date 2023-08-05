import Modal from "react-modal";
import React from "react";

const InfoModal = (props) => {
    const { isInfoModalOpen, closeModal } = props;

    const modalStyles = {
        content: {
            width: '30%',
            height: '24%',
            position: 'absolute',
            top: '38%',
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
                <h1 className="modal-header">Oops!</h1>
                <span className="no-breed-info">This kitten is of no know breed unfortunately..</span>
            </div>
            <div className="button-container">
                <button onClick={() => onCloseModalClick()}>Meow!</button>
            </div>
        </Modal>
    );
};

export default InfoModal;