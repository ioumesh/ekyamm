"use client";
import React, { useState } from "react";
import {
  Form,
  Input,
  Radio,
  Checkbox,
  DatePicker,
  TimePicker,
  Upload,
  message,
  AutoComplete,
  ConfigProvider,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ActionButton from "../ActionButton/ActionButton";
import Modal from "../Modal/Modal";
import ActionTab from "../ActionTab/ActionTab";
import { CheckboxChangeEvent } from "antd/es/checkbox/Checkbox";

const { TextArea } = Input;

const doctorData = [
  {
    id: 1,
    name: "Dr. John Doe",
    mobile: "1234567890",
    profilePic: "images/doctor-1.png",
  },
  {
    id: 2,
    name: "Dr. Jane Smith",
    mobile: "9876543210",
    profilePic: "images/doctor-2.png",
  },
];

const AddPatientModal: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [patientImagePreview, setPatientImagePreview] = useState<
    string | undefined
  >(undefined);
  const [prescriptionImagePreview, setPrescriptionImagePreview] = useState<
    string | undefined
  >(undefined);
  const [showPrescriptionUpload, setShowPrescriptionUpload] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<string | undefined>(
    undefined
  );
  const [onlineSessionLink, setOnlineSessionLink] = useState<
    string | undefined
  >(undefined);

  const showModal = () => setVisible(true);

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
    setPatientImagePreview(undefined);
    setPrescriptionImagePreview(undefined);
  };

  const handleSendInvite = async () => {
    try {
      const values = await form.validateFields();
      message.success("Patient invited successfully.");
      setVisible(false);
      console.log(values);
      form.resetFields();
      setPatientImagePreview(undefined);
      setPrescriptionImagePreview(undefined);
    } catch (error) {
      message.error("Fill patient details.");
      console.error("Form validation failed:", error);
    }
  };

  const handleImageUpload = (info: any, field: string) => {
    const fileList = info.fileList;
    const latestFile = fileList[fileList.length - 1]?.originFileObj;
    if (latestFile) {
      const reader = new FileReader();
      reader.onload = () => {
        if (field === "patientImage") {
          setPatientImagePreview(reader.result as string);
        } else if (field === "prescriptionImage") {
          setPrescriptionImagePreview(reader.result as string);
        }
      };
      reader.readAsDataURL(latestFile);
    } else {
      if (field === "patientImage") {
        setPatientImagePreview(undefined);
      } else if (field === "prescriptionImage") {
        setPrescriptionImagePreview(undefined);
      }
    }
  };

  const doctorOptions = doctorData.map((doctor) => ({
    label: (
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={doctor.profilePic}
          alt={doctor.name}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            marginRight: "10px",
          }}
        />
        <div>
          <div>{doctor.name}</div>
          <div>{doctor.mobile}</div>
        </div>
      </div>
    ),
    value: doctor.name,
    doctor,
  }));

  const handleDoctorSelect = (value: string, option: any) => {
    setSelectedDoctor(value);
    const { doctor } = option;
    form.setFieldsValue({
      practitionerName: `${doctor.name} - ${doctor.mobile}`,
    });
  };

  const handlePrimaryNumberChange = (e: CheckboxChangeEvent) => {
    const primaryNumberValue = e.target.checked
      ? form.getFieldValue("primaryNumber")
      : undefined;
    form.setFieldsValue({ whatsappNumber: primaryNumberValue });
  };

  return (
    <>
      <ActionButton title="Add Patient" handler={showModal} />

      <Modal
        title="Add Patient"
        actionTitle="Send Invite"
        cancelTitle="Cancel"
        isOpen={visible}
        onClose={handleCancel}
        onCancel={handleCancel}
        onSubmit={handleSendInvite}
      >
        <Form form={form} layout="vertical" onFinish={handleSendInvite}>
          <Form.Item
            name="patientType"
            initialValue="walking"
            rules={[{ required: true, message: "Please select patient type" }]}
          >
            <Radio.Group
              onChange={(e) =>
                setShowPrescriptionUpload(e.target.value === "existing")
              }
            >
              <Radio value="walking">Walk-in Patient</Radio>
              <Radio value="existing">Existing Patient</Radio>
            </Radio.Group>
          </Form.Item>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Form.Item
              name="patientImage"
              rules={[
                { required: true, message: "Please upload patient image" },
              ]}
            >
              <Upload
                showUploadList={false}
                onChange={(info) => handleImageUpload(info, "patientImage")}
                beforeUpload={() => false}
              >
                <div
                  style={{
                    width: "80px",
                    height: "100px",
                    border: "1px solid #d9d9d9",
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden",
                    margin: "0 auto",
                    marginBottom: "16px",
                    background: "#D9D9D9",
                  }}
                >
                  {patientImagePreview ? (
                    <img
                      src={patientImagePreview}
                      alt="Patient"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <img src="images/person.png" alt="person" />
                  )}
                </div>
              </Upload>
            </Form.Item>
          </div>
          <Form.Item
            name="patientName"
            label="Patient Name"
            rules={[{ required: true, message: "Please enter patient name" }]}
          >
            <Input placeholder="Enter patient name" />
          </Form.Item>
          <Form.Item
            name="primaryNumber"
            label="Primary Mobile Number *"
            rules={[
              { required: true, message: "Please enter primary number" },
              { len: 10, message: "Primary number must be 10 digits" },
            ]}
          >
            <Input placeholder="Enter mobile number" />
          </Form.Item>
          <Form.Item
            name="whatsappNumber"
            label="Whatsapp Number *"
            rules={[
              { required: true, message: "Please enter Whatsapp number" },
              { len: 10, message: "whatsapp number must be 10 digits" },
            ]}
          >
            <Input placeholder="Enter whatsapp number" />
          </Form.Item>
          <Form.Item name="sameAsPrimary" valuePropName="checked">
            <Checkbox onChange={handlePrimaryNumberChange}>
              Same as Mobile Number
            </Checkbox>
          </Form.Item>
          <Form.Item
            name="email"
            label="Email address *"
            rules={[{ required: true, message: "Please enter email" }]}
          >
            <Input placeholder="Enter email address" />
          </Form.Item>

          <ActionTab title="Schedule Session">
            <>
              <Form.Item
                name="sessionType"
                label="Session Type"
                initialValue="inPerson"
              >
                <Radio.Group>
                  <Radio value="inPerson">In-Person</Radio>
                  <Radio value="online">Online</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                name="sessionDateTime"
                label="Session Date"
                rules={[
                  {
                    required: true,
                    message: "Please select session date and time",
                  },
                ]}
              >
                <DatePicker />
              </Form.Item>
              <Form.Item
                name="sessionTime"
                label="Session Time Slot"
                rules={[
                  { required: true, message: "Please select session time" },
                ]}
              >
                <TimePicker />
              </Form.Item>
              {/* online session link */}
              <Form.Item name="onlineSessionLink" label="Online Session Link">
                <Input onChange={(e) => setOnlineSessionLink(e.target.value)} />
              </Form.Item>
              <Form.Item
                name="practitionerName"
                label="Enter Practitioner Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter practitioner name",
                  },
                ]}
              >
                <AutoComplete
                  placeholder="Select or enter Psychiatrist / Therapist name"
                  options={doctorOptions}
                  onSelect={handleDoctorSelect}
                />
              </Form.Item>
              <Form.Item
                name="sessionDetails"
                label="Session Details (Optional"
              >
                <TextArea placeholder="Enter session details here" />
              </Form.Item>
            </>
          </ActionTab>

          {showPrescriptionUpload && (
            <ActionTab title="Upload Old Prescription">
              <>
                <Form.Item
                  name="prescriptionDate"
                  label="Date"
                  rules={[{ required: true, message: "Please date" }]}
                >
                  <DatePicker />
                </Form.Item>
                <Form.Item
                  name="prescriptionImage"
                  label="Prescription"
                  rules={[
                    {
                      required: true,
                      message: "Please upload prescription image",
                    },
                  ]}
                >
                  <Upload
                    showUploadList={false}
                    onChange={(info) =>
                      handleImageUpload(info, "prescriptionImage")
                    }
                    beforeUpload={() => false}
                  >
                    <div
                      style={{
                        width: "100px",
                        height: "100px",
                        border: "1px solid #d9d9d9",
                        borderRadius: "4px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        overflow: "hidden",
                        margin: "0 auto",
                        marginBottom: "16px",
                      }}
                    >
                      {prescriptionImagePreview ? (
                        <img
                          src={prescriptionImagePreview}
                          alt="Prescription"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <UploadOutlined
                          style={{ fontSize: "32px", color: "#1890ff" }}
                        />
                      )}
                    </div>
                  </Upload>
                </Form.Item>
                <Form.Item
                  name="nextFollowUpDate"
                  label="Next Follow-up Date"
                  rules={[
                    {
                      required: true,
                      message: "Please select next follow up date",
                    },
                  ]}
                >
                  <DatePicker />
                </Form.Item>
              </>
            </ActionTab>
          )}
        </Form>
      </Modal>
    </>
  );
};

export default AddPatientModal;
