import React, { useState } from "react";
import type { RadioChangeEvent } from "antd";
import { Radio } from "antd";
import UploadProfile from "../Upload/UploadProfile";

const plainOptions = ["Walk-in Patient", "Existing Patient"];
const PatientType: React.FC = () => {
  const [value1, setValue1] = useState("Walk-in Patient");

  const onChange1 = ({ target: { value } }: RadioChangeEvent) => {
    setValue1(value);
  };

  return (
    <>
      <Radio.Group options={plainOptions} onChange={onChange1} value={value1} />
      <UploadProfile/>
    </>
  );
};

export default PatientType;
