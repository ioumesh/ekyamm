import React, { useState } from "react";
import "./Modal.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onCancel: () => void;
  onSubmit: () => void;
  cancelTitle: string;
  actionTitle: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  onCancel,
  onSubmit,
  cancelTitle,
  actionTitle,
}) => {
  return (
    <div onClick={onClose} className={`modal-overlay ${isOpen ? "open" : ""} `}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <button className="back-button" onClick={onClose}>
            <img src="/images/arrow_back.png" alt="arrow" />
          </button>
          <h2 className="modal-title">{title}</h2>
        </div>
        <div className="modal-content">{children}</div>
        <div className="modal-footer">
          <button className="cancel-button" onClick={onCancel}>
            {cancelTitle}
          </button>
          <button className="submit-button" onClick={onSubmit}>
            {actionTitle}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
