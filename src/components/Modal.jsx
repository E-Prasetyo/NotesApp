import PropTypes from "prop-types";

const Modal = ({ isOpen, onClose}) => {
    if (!isOpen) return null;

    return (
        <div
            onClick={onClose}
            className="modal-container"
        >
            <div className="modal-body">
                <div className="loader"></div>
            </div>
        </div>
    );
};

export default Modal;

Modal.propsTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.any
}