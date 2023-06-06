import Modal from 'react-modal';

export const DeleteConfirm = ({ isOpen, onRequestClose, onConfirm }) => {
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        className="custom-modal"
      >
        <h3>Are you sure you want to delete this user?</h3>
        <button onClick={onRequestClose}>Cancel</button><tab></tab>
        <button onClick={onConfirm}>Delete</button>
        
      </Modal>
    )
  };
  