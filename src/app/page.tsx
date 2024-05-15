"use client";
import React from "react";
import AddPatientModal from "./components/PatientForm/AddPatientModal";
import { useDeviceType } from "./hooks/useDeviceType";

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
      {isDesktop && <p>You are on a desktop device</p>}
    </div>
  );
}
