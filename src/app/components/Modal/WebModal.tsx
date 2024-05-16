import React, { useState } from "react";
import "./webmodal.scss";

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

const WebModal: React.FC<ModalProps> = ({
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
    <div
      onClick={onClose}
      className={`modal-overlay-desktop ${isOpen ? "open" : ""} `}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <img src="/images/user.png" alt="arrow" />
          <h2 className="modal-title">{title}</h2>
          <button className="back-button" onClick={onClose}>
            <img src="/images/close.png" alt="arrow" />
          </button>
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

export default WebModal;
