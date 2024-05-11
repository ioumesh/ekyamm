"use client";
import React, { useState } from "react";
import ActionButton from "./ActionButton/ActionButton";
import Modal from "./Modal/Modal";
// import PatientType from "./PatientType/PatientType";
import { message } from "antd";
// import { FormContext } from "antd/es/form/context";
import PatientForm from "./PatientType/PatientForm";
import AddPatientForm from "./PatientForm/PatientForm1";
// import PatientDetailsForm from "./PatientType/PatientDetails";

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
  };

  const handleSubmit = (data: any) => {
    // Handle form submission here
    console.log("Form submitted:", data);
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
        <AddPatientForm />
      </Modal>
    </div>
  );
};

export default Patient;
