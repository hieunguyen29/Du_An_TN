import React, { useEffect, useState } from 'react';
import { Form, Button, Input, Select, Upload } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useGetpostByIdQuery, useEditpostMutation } from "../../../../api/post";
import { Ipost } from "../../../../interface/post";
import { UploadOutlined } from "@ant-design/icons";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useGetpostdmQuery } from "../../../../api/postdm";
import moment from 'moment';
import axios from 'axios';

const { Option } = Select;

const Admin_DanhmucEdit: React.FC = () => {
    const { idbv } = useParams<{ idbv: string }>();
    const { iddm } = useParams<{ iddm: string }>();
    console.log(idbv, "dd");

    const [editorData, setEditorData] = useState<string>('');
    const [form] = Form.useForm();
    const [postData, setPostData] = useState<Ipost | null>(null);
    const navigate = useNavigate();
    const [editpost] = useEditpostMutation();

    const { data: postDataResponse } = useGetpostByIdQuery(idbv);
    console.log(postDataResponse);

    const [imageList, setImageList] = useState<any[]>([]);
    const { data: postdmdata } = useGetpostdmQuery();
    const postdmArrary = postdmdata?.data || [];
    useEffect(() => {
        if (postDataResponse && postDataResponse.data && postDataResponse.data.image) {
            const fileList = postDataResponse.data.image.map((image, index) => ({
                uid: `${index}`,
                name: `image-${index}`,
                status: 'done',
                url: `http://localhost:8000/storage/${image}`, // Replace with your actual domain and path
            }));
            setImageList(fileList);
        }
        if (postDataResponse) {
            setPostData(postDataResponse);
            setEditorData(postDataResponse.mo_ta);
            form.setFieldsValue({
                ten_post: postDataResponse.ten_post,
                mo_ta: postDataResponse.mo_ta,
                ngay_dang: moment(postDataResponse.ngay_dang).format('YYYY-MM-DD'),
                id_postdm: postDataResponse.id_postdm,
            });
        }
    }, [postDataResponse, form]);

    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setEditorData(data);
    };

    const onFinish = async (values: Ipost) => {
        try {
            const formData = new FormData();
            formData.append("ten_post", values.ten_post);
            formData.append('image', values.image.fileList[0].originFileObj);
            formData.append("mo_ta", editorData);
            formData.append("ngay_dang", moment().format());
            formData.append("id_postdm", values.id_postdm);

            const response = await axios.post(

                `http://127.0.0.1:8000/api/admin/post/${idbv}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'X-HTTP-Method-Override': 'PUT',
                    },
                }
            );

            if (response.status === 200) {
                console.log('Thành công');
                window.location.href = 'http://localhost:5173/admin/post/bai_viet';

            } else {
                console.log('Request failed');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container">
            <header className="mb-4">
                <h2 className="font-bold text-2xl">Chỉnh sửa Category</h2>
            </header>
            <Form
                className="tour-form"
                form={form}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Category Name"
                    name="ten_post"
                    rules={[
                        { required: true, message: "Please enter category name!" },
                        { min: 3, message: "Category name must be at least 3 characters" },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Image"
                    name="image"
                    rules={!imageList.length ? [{ required: true, message: "Vui lòng chọn ảnh" }] : undefined}
                >
                    <Upload
                        disabled={imageList.length > 0}
                        accept="image/*"
                        listType="picture"
                        multiple={false}
                        beforeUpload={() => false}
                        fileList={imageList}
                        onChange={({ fileList }) => setImageList(fileList)}
                    >
                        <Button icon={<UploadOutlined />} type="button" disabled={imageList.length > 0}>
                            Chọn ảnh
                        </Button>
                    </Upload>
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="mo_ta"
                    rules={[{ required: true, message: 'Please enter description!' }]}
                >
                    <CKEditor
                        editor={ClassicEditor}
                        data={editorData}
                        onChange={handleEditorChange}
                    />
                </Form.Item>
                <Form.Item
                    label="Publish Date"
                    name="ngay_dang"
                    rules={[
                        { required: true, message: 'Please enter publish date!' },
                    ]}
                >
                    <Input type="date" />
                </Form.Item>
                <Form.Item
                    label="Post Category"
                    name="id_postdm"
                    rules={[
                        { required: true, message: 'Please select category!' },
                    ]}
                >
                    <Select defaultValue="Select" style={{ width: 400 }}>
                        {postdmArrary.map((option) => (
                            <Option key={option.id} value={option.id}>{option.ten_dm}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                    <Button
                        type="default"
                        className="ml-2"
                        onClick={() => navigate("/admin/post/bai_viet")}
                    >
                        Go Back
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Admin_DanhmucEdit;
