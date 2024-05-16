"use client";
import React from "react";
import AddPatientModal from "./components/PatientForm/AddPatientModal";
import { useDeviceType } from "./hooks/useDeviceType";
import AddPatientDesktopModal from "./components/PatientForm/AddPatientDesktopModal";

export default function Home() {
  const { isMobile, isDesktop } = useDeviceType();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h1>Ekyamm</h1>

      {isMobile && <AddPatientModal />}
      {isDesktop && <AddPatientDesktopModal />}
    </div>
  );
}
