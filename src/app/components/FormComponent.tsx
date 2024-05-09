import React, { useState } from 'react';
import { Form, Radio, Input, Button, Checkbox, Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { RadioChangeEvent } from 'antd/lib/radio';
import { RcFile, UploadFile } from 'antd/lib/upload/interface';
import { CheckboxChangeEvent } from 'antd/lib/checkbox/Checkbox';

const PatientForm: React.FC = () => {
    const [form] = Form.useForm();
    const [isSameNumber, setIsSameNumber] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handlePatientTypeChange = (e: RadioChangeEvent) => {
        console.log('Patient Type: ', e.target.value);
    };

    const handleSameNumberChange = (e: CheckboxChangeEvent) => {
        setIsSameNumber(e.target.checked);
        if (e.target.checked) {
            form.setFieldsValue({ whatsappNumber: form.getFieldValue('phoneNumber') });
        } else {
            form.setFieldsValue({ whatsappNumber: '' });
        }
    };

    const onPhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isSameNumber) {
            form.setFieldsValue({ whatsappNumber: e.target.value });
        }
    };

    const handleUploadChange = ({ fileList }: { fileList: UploadFile[] }) => {
        setFileList(fileList);
    };

    const normFile = (e: any): UploadFile[] => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const onSubmit = (values: any) => {
        console.log('Received values of form: ', values);
        message.success('Form submitted successfully!');
    };

    return (
        <Form
            form={form}
            onFinish={onSubmit}
            layout="vertical"
            initialValues={{ patientType: "walkingIn" }}
            style={{ maxWidth: 600, margin: '0 auto' }}
        >
            <Form.Item name="patientType" label="Patient Type" rules={[{ required: true }]}>
                <Radio.Group onChange={handlePatientTypeChange}>
                    <Radio value="walkingIn">Walking in Patient</Radio>
                    <Radio value="existing">Existing Patient</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item
                name="upload"
                label="Upload Image"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={[{ required: true, message: 'Please upload an image!' }]}
            >
                <Upload.Dragger
                    name="logo"
                    listType="picture-card"
                    showUploadList={false}
                    beforeUpload={() => false}
                    onChange={handleUploadChange}
                    style={{ width: 128, height: 128, margin: "0 auto" }}
                >
                    {fileList.length >= 1 ? (
                        <img src={URL.createObjectURL(fileList[0].originFileObj as RcFile)} alt="avatar" style={{ width: '100%', height: '100%' }} />
                    ) : (
                        <div style={{ marginTop: 24 }}>
                            <PlusOutlined style={{ fontSize: 24 }} />
                        </div>
                    )}
                </Upload.Dragger>
            </Form.Item>

            <Form.Item name="patientName" label="Patient Name" rules={[{ required: true }]}>
                <Input />
            </Form.Item>

            <Form.Item name="phoneNumber" label="Phone Number" rules={[{ required: true, pattern: /^\d{10}$/, message: 'Phone number must be 10 digits!' }]}>
                <Input onChange={onPhoneNumberChange} />
            </Form.Item>

            <Form.Item label="WhatsApp Number" style={{ marginBottom: 0 }}>
                <Input.Group>
                    <Form.Item
                        name="whatsappNumber"
                        noStyle
                        rules={[{ required: true, message: 'WhatsApp number is required!' }]}
                        style={{ width: 'calc(100% - 120px)', marginBottom: 0 }}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="sameAsMobile"
                        valuePropName="checked"
                        noStyle
                        style={{ marginBottom: 0 }}
                    >
                        <Checkbox onChange={handleSameNumberChange}>Same as mobile number</Checkbox>
                    </Form.Item>
                </Input.Group>
            </Form.Item>

            <Form.Item name="email" label="Email" rules={[{ type: 'email', message: 'Please enter a valid email!' }, { required: true }]}>
                <Input />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default PatientForm;
