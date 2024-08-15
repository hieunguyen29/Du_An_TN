import React, { useEffect, useState } from 'react';
import { Form, Button, Input, Upload } from 'antd';
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from 'react-router-dom';
import { useGetpostdmByIdQuery, useEditpostdmMutation } from '../../../../api/postdm';
import { Ipostdm } from '../../../../interface/postdm';
import axios from 'axios';

const Admin_DanhmucEdit: React.FC = () => {
  const navigate = useNavigate();
  const { iddm } = useParams<{ iddm: string }>();
  const [form] = Form.useForm();
  const [editPostDm] = useEditpostdmMutation();
  const { data: postDmData } = useGetpostdmByIdQuery(iddm);
  const postDm = postDmData || {};

  const [name, setName] = useState('');
  const [imageList, setImageList] = useState<any[]>([]);

  useEffect(() => {
    if (postDm && postDm.data && postDm.data.image) {
      const fileList = postDm.data.image.map((image, index) => ({
        uid: `${index}`,
        name: `image-${index}`,
        status: 'done',
        url: `http://localhost:8000/storage/${image}`, // Replace with your actual domain and path
      }));
      setImageList(fileList);
    }
    if (postDm.ten_dm) {
      setName(postDm.ten_dm);
      form.setFieldsValue({ ten_dm: postDm.ten_dm });
    }
  }, [postDm, form]);

  const onFinish = async (values: Ipostdm) => {
    try {
      const formData = new FormData();
      formData.append('image', values.image.fileList[0].originFileObj);
      formData.append('ten_dm', values.ten_dm);

      const response = await axios.post(
        `http://127.0.0.1:8000/api/admin/postdm/${iddm}`,
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
        console.log(response);
        window.location.href = 'http://localhost:5173/admin/post/danhmuc_post';
      } else {
        console.log('Yêu cầu thất bại');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <header className="mb-4">
        <h2 className="font-bold text-2xl">Chỉnh sửa danh mục</h2>
      </header>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
      >
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
          label="Tên danh mục"
          name="ten_dm"
          rules={[
            { required: true, message: "Vui lòng nhập tên danh mục!" },
            { min: 3, message: "Ít nhất 3 ký tự" },
          ]}
        >
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Lưu
          </Button>
          <Button
            type="default"
            className="ml-2"
            onClick={() => navigate("/admin/post/danhmuc_post")}
          >
            Hủy
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Admin_DanhmucEdit;
