import Modal from "react-modal";
import React from "react";

const ConfirmModal = (props) => {
    const { isConfirmModalOpen, closeModal } = props;

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

    const onCancelClick = () => {
        closeModal('cancel'); // Pass 'cancel' as an argument for cancel button
    };

    const onSubmitClick = () => {
        closeModal('submit'); // Pass 'proceed' as an argument for proceed button
    };


    return (
        <Modal
            isOpen={isConfirmModalOpen}
            contentLabel="Minimal Modal Example"
            appElement={document.getElementById('root')}
            style={modalStyles}>

            <div className="container">
                <h1 className="modal-header">Are you sure?</h1>
                <span className="no-breed-info">Are you sure you want to unfavorite this little cutiepie?</span>
            </div>
            <div className="button-container">
                <button onClick={() => onCancelClick()}>Cancel</button>
                <button onClick={() => onSubmitClick()}>Submit</button>
            </div>
        </Modal>
    );
};

export default ConfirmModal;
