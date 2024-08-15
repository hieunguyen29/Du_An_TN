import React from 'react';
import { Form, Button, Upload, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Add_Banner = () => {
    const navigate = useNavigate();

    const onFinish = async (values: any) => {
        try {
            // Prepare form data
            const formData = new FormData();
            formData.append('hinh_banner', values.hinh_banner[0].originFileObj); // Use originFileObj to get the file
            formData.append('hinh_logo', values.hinh_logo[0].originFileObj);

            // Make a POST request using Axios
            await axios.post('http://localhost:8000/api/admin/bannerlogo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // If the request is successful, navigate to the desired route
            navigate('/admin/banner_logo');
            message.success('Thêm mới thành công'); // Display success message
        } catch (error) {
            console.error('Error submitting form:', error);
            message.error('Đã xảy ra lỗi. Vui lòng thử lại.'); // Display error message
        }
    };

    return (
        <div className="container mx-auto mt-10 p-6 bg-white border rounded-md shadow-md max-w-screen-md">
            <h2 className="font-bold text-2xl mb-6">Thêm Banner & Logo mới</h2>
            <Form
                name="addBannerForm"
                onFinish={onFinish}
                autoComplete="off"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
            >
                <Form.Item
                    label="Upload Image Banner"
                    name="hinh_banner"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => e.fileList}
                    rules={[{ required: true, message: 'Please upload an image for the banner!' }]}
                >
                    <Upload beforeUpload={() => false} accept="image/*">
                        <Button className="bg-blue-500 text-white hover:bg-blue-700">
                            Click to Upload
                        </Button>
                    </Upload>
                </Form.Item>

                <Form.Item
                    label="Upload Image Logo"
                    name="hinh_logo"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => e.fileList}
                    rules={[{ required: true, message: 'Please upload an image for the logo!' }]}
                >
                    <Upload beforeUpload={() => false} accept="image/*">
                        <Button className="bg-blue-500 text-white hover:bg-blue-700">
                            Click to Upload
                        </Button>
                    </Upload>
                </Form.Item>

                <Form.Item className="py-5" wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" className="mr-2 bg-blue-500 hover:bg-blue-700">
                        Thêm
                    </Button>
                    <Button type="default" onClick={() => navigate('/admin/banner_logo')} className="bg-gray-300 hover:bg-gray-400">
                        Quay lại
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Add_Banner;
