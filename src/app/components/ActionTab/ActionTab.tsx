import React, { useState } from "react";
import "./actiontab.scss";
interface ActionTabProps {
  children: React.ReactNode;
  title: string;
}
const ActionTab: React.FC<ActionTabProps> = ({ children, title }) => {
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(!show);
  };
  return (
    <div onClick={handleShow} className="action-tab">
      <div className="action-header">
        <h2>{title}</h2>
        {show ? (
          <img src="/images/up-arrow.png" alt="arrow" />
        ) : (
          <img src="/images/down-arrow.png" alt="arrow" />
        )}
      </div>

      {show && <>{children}</>}
    </div>
  );
};

export default ActionTab;
