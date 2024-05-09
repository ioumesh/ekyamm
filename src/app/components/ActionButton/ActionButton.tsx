import React from "react";
import "./actionbutton.scss";

interface ActionButtonProps {
  title: string;
  handler: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ title, handler }) => {
  return (
    <div onClick={handler} className="action-container">
      <div className="action-info">
        <img src="/images/user.png" alt="User Icon" />
        <span className="action-title"> {title}</span>
      </div>
      <img src="/images/arrow.png" alt="Arrow Icon" />
    </div>
  );
};

export default ActionButton;
