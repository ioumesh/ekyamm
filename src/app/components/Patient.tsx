"use client";
import React, { useState } from "react";
import ActionButton from "./ActionButton/ActionButton";
import Modal from "./Modal/Modal";
import PatientType from "./PatientType/PatientType";

const Patient = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
    // Handle cancel action here
  };

  const handleSubmit = () => {
    setIsOpen(false);
    // Handle submit action here
  };
  return (
    <div className="flex w-full items-center justify-center">
      <ActionButton title="Add Patient" handler={openModal} />
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title="Add Patient"
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        actionTitle="Send Invite"
        cancelTitle="Cancel"
      >
        {/* Content of the modal goes here */}
        <PatientType />
      </Modal>
    </div>
  );
};

export default Patient;