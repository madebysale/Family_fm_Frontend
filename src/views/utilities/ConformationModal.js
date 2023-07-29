import React from 'react';
import './Conformation.css';

function ConfirmationModal({ message, onConfirm, onCancel, itemId }) {
  return (
    <div className="confirmation-modal">
      <p>{message}</p>
      <div className="buttons">
        <button className="confirm-button" onClick={() => onConfirm(itemId)}>
          Yes
        </button>
        <button className="cancel-button" onClick={onCancel}>
          No
        </button>
      </div>
    </div>
  );
}

export default ConfirmationModal;
