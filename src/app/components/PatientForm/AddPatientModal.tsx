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
  Button,
  message,
  AutoComplete,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ActionButton from "../ActionButton/ActionButton";
import Modal from "../Modal/Modal";
import ActionTab from "../ActionTab/ActionTab";

const { TextArea } = Input;

// Sample doctor data
const doctorData = [
  {
    id: 1,
    name: "Dr. John Doe",
    mobile: "1234567890",
    profilePic: "https://example.com/profile1.jpg",
  },
  {
    id: 2,
    name: "Dr. Jane Smith",
    mobile: "9876543210",
    profilePic: "https://example.com/profile2.jpg",
  },
];

const AddPatientModal: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    undefined
  );
  const [showPrescriptionUpload, setShowPrescriptionUpload] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<string | undefined>(
    undefined
  );
  const [onlineSessionLink, setOnlineSessionLink] = useState<
    string | undefined
  >(undefined);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  const closeModal = () => {
    setVisible(false);
  };
  const handleSendInvite = () => {
    form
      .validateFields()
      .then((values) => {
        // Handle form submission
        message.success("Form submitted");
        setVisible(false);
        console.log(values);
      })
      .catch((error) => {
        console.error("Form validation failed:", error);
      });
  };

  const handleImageUpload = (info: any) => {
    if (info.file.status === "done") {
      // Get the uploaded image URL
      const imageUrl = info.file.response.url;
      setImagePreview(imageUrl);
    }
  };

  // Doctor option data for AutoComplete
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
    value: doctor.name, // Value to display in the input field
    doctor,
  }));

  const handleDoctorSelect = (value: string, option: any) => {
    setSelectedDoctor(value);
    const { doctor } = option;
    form.setFieldsValue({
      practitionerName: `${doctor.name} - ${doctor.mobile}`,
    });
  };

  return (
    <>
      <ActionButton title="Add Patient" handler={showModal} />

      <Modal
        title="Add Patient"
        actionTitle="Send Invite"
        cancelTitle="Cancel"
        isOpen={visible}
        onClose={closeModal}
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
              <Radio value="walking">Walking Patient</Radio>
              <Radio value="existing">Existing Patient</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="patientImage"
            label="Patient Image"
            rules={[{ required: true, message: "Please upload patient image" }]}
          >
            <Upload
              showUploadList={false}
              onChange={handleImageUpload}
              beforeUpload={() => false} // Prevent default upload behavior
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
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Patient"
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
            name="patientName"
            label="Patient Name"
            rules={[{ required: true, message: "Please enter patient name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="primaryNumber"
            label="Primary Number"
            rules={[{ required: true, message: "Please enter primary number" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="whatsappNumber" label="WhatsApp Number">
            <Input />
          </Form.Item>
          <Form.Item name="sameAsPrimary" valuePropName="checked">
            <Checkbox>Same as Primary Number</Checkbox>
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please enter email" }]}
          >
            <Input />
          </Form.Item>

          <ActionTab title="Schedule Session">
            <>
              <Form.Item name="sessionType" initialValue="inPerson">
                <Radio.Group>
                  <Radio value="inPerson">In Person</Radio>
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
                label="Session Time"
                rules={[
                  { required: true, message: "Please select session time" },
                ]}
              >
                <TimePicker />
              </Form.Item>
              <Form.Item name="onlineSessionLink" label="Online Session Link">
                <Input onChange={(e) => setOnlineSessionLink(e.target.value)} />
              </Form.Item>
              <Form.Item
                name="practitionerName"
                label="Practitioner Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter practitioner name",
                  },
                ]}
              >
                <AutoComplete
                  options={doctorOptions}
                  onSelect={handleDoctorSelect}
                  dropdownMatchSelectWidth={false}
                  dropdownClassName="doctor-autocomplete-dropdown"
                />
              </Form.Item>
              <Form.Item
                name="sessionDetails"
                label="Session Details"
                rules={[
                  {
                    required: true,
                    message: "Please enter session details",
                  },
                ]}
              >
                <TextArea />
              </Form.Item>
            </>
          </ActionTab>

          {showPrescriptionUpload && (
            <ActionTab title="Upload Old Prescription">
              <>
                <Form.Item
                  name="prescriptionDate"
                  label="Prescription Date"
                  rules={[
                    {
                      required: true,
                      message: "Please select prescription date",
                    },
                  ]}
                >
                  <DatePicker />
                </Form.Item>
                <Form.Item
                  name="prescriptionImage"
                  label="Prescription Image"
                  rules={[
                    {
                      required: true,
                      message: "Please upload prescription image",
                    },
                  ]}
                >
                  <Upload
                    showUploadList={false}
                    onChange={handleImageUpload}
                    beforeUpload={() => false} // Prevent default upload behavior
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
                      {imagePreview ? (
                        <img
                          src={imagePreview}
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
                  label="Next Follow Up Date"
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
