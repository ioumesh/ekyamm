import AddPatientModal from "./components/PatientForm/AddPatientModal";

export default function Home() {
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
      <AddPatientModal />
    </div>
  );
}
