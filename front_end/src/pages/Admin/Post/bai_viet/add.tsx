import React, { useEffect, useState } from 'react';
import { Form, Button, Input, Select, Upload } from "antd";
import { useNavigate } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import { useAddpostMutation } from "../../../../api/post";
import { useGetpostdmQuery } from "../../../../api/postdm";
import { Ipost } from "../../../../interface/post";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import moment from 'moment';
const { Option } = Select;

type FieldType = {
  id: number;
  ten_post: string;
  image: string;
  mo_ta: string;
  ngay_dang: string;
  id_postdm: string;
};

const Admin_DanhmucADD: React.FC = () => {
  const [addLoaiTour] = useAddpostMutation();
  const navigate = useNavigate();
  const [editorData, setEditorData] = useState('');
  const { data: postdmdata } = useGetpostdmQuery();
  const postdmArrary = postdmdata?.data || [];

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorData(data);
  };

  const onFinish = (values: Ipost) => {
    const formData = new FormData();
    formData.append("hinh", values.hinh.fileList[0].originFileObj);
    formData.append("ten_post", values.ten_post);

    values.mo_ta = editorData;
    formData.append("mo_ta", values.mo_ta);
    formData.append("ngay_dang", moment().format()); // Sử dụng ngày hiện tại
    formData.append("id_postdm", values.id_postdm);

    addLoaiTour(formData)
      .unwrap()
      .then(() => navigate("/admin/post/bai_viet"))
      .catch((error) => {
        console.log(error);
        // Xử lý lỗi (nếu có)
      });

    console.log(values);
  };

  return (
    <div className="container">
      <header className="mb-4">
        <h2 className="font-bold text-2xl">Tạo mới danh mục</h2>
      </header>
      <Form
        className="tour-form"
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Tên danh mục"
          name="ten_post"
          rules={[
            { required: true, message: "Vui lòng nhập tên loại tour!" },
            { min: 3, message: "Tên tour ít nhất 3 ký tự" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Image"
          name="hinh"
          rules={[{ required: true, message: "Vui lòng chọn ảnh" }]}
        >
          <Upload
            accept="image/*"
            listType="picture"
            beforeUpload={() => false}
          >
            <Button icon={<UploadOutlined />} type="button">
              Chọn ảnh
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item
          label="Mô Tả"
          name="mo_ta"
          rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
        >
          <CKEditor
            editor={ClassicEditor}
            data={editorData}
            onChange={handleEditorChange}
          />
        </Form.Item>
        <Form.Item
          label="Danh mục bài viết"
          name="id_postdm"
          rules={[
            { required: true, message: 'Vui lòng chọn danh mục!' },
          ]}
        >
          <Select defaultValue="Chọn" style={{ width: 400, }}>
            {postdmArrary.map((option) => (
              <Option key={option.id} value={option.id}>{option.ten_dm}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Thêm
          </Button>
          <Button
            type="default"
            className="ml-2"
            onClick={() => navigate("/admin/post/danhmuc_post")}
          >
            Quay lại
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Admin_DanhmucADD;
