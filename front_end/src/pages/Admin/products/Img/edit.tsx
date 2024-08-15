import React, { useState, useEffect } from 'react';
import { Form, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useEditImagesMutation, useGetImagesByIdQuery } from '../../../../api/ImagesApi';
import { Iimages } from '../../../../interface/images';

const Admin_ImageEdit: React.FC = () => {
  const { idimage } = useParams<{ idimage: any }>();
  const { data: LoaiPhuongTienData } = useGetImagesByIdQuery(idimage || "");
  const LoaiPhuongTien = LoaiPhuongTienData || {};
  const [updateLoaiPhuongTien] = useEditImagesMutation();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (LoaiPhuongTien.data?.image_path) {
      form.setFieldsValue({
        image_path: LoaiPhuongTien.data.image_path,
      });
    }
  }, [LoaiPhuongTien]);

  const navigate = useNavigate();
  const onFinish = async (values: Iimages) => {
    setLoading(true);
    try {
      const formData = new FormData();
  
      if (fileList.length > 0) {
        formData.append('file', fileList[0]); // Gửi ảnh mới nếu có
      } else if (LoaiPhuongTien.data?.image_path) {
        formData.append('file', LoaiPhuongTien.data.image_path); // Sử dụng ảnh cũ nếu không có ảnh mới
      }
  
      await updateLoaiPhuongTien({ ...values, id: idimage }, { body: formData });
      navigate('/admin/tour/image');
    } catch (error) {
      setErrors(error.data.message);
    } finally {
      setLoading(false);
    }
  };

  const customRequest = ({ file, onSuccess, onError }) => {
    setTimeout(() => {
      if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
        onSuccess(file);
      } else {
        onError(new Error('Chỉ cho phép tải lên các tệp ảnh JPEG hoặc PNG.'));
      }
    }, 1000);
  };

  const onChange = (info) => {
    let newFileList = [...info.fileList];
    // Limit the number of files to 1
    newFileList = newFileList.slice(-1);
  
    setFileList(newFileList);
  
    if (newFileList.length > 0) {
      console.log('New Image:', newFileList[0].name);
    } else if (LoaiPhuongTien.data?.image_path) {
      console.log('Existing Image:', LoaiPhuongTien.data.image_path);
    }
  };

  const onRemove = (file) => {
    setFileList([]);
  };

  console.log('Image:', LoaiPhuongTien.data?.image_path); // Added console.log statement

  return (
    <div className="container">
      <header className="mb-4">
        <h2 className="font-bold text-2xl">Thêm ảnh mới</h2>
      </header>
      <Form
        className="tour-form"
        name="hinh"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="hinh"
          label="Tải lên ảnh"
          valuePropName="fileList"
          getValueFromEvent={(e) => e.fileList}
        >
          <Upload
            customRequest={customRequest}
            fileList={fileList}
            onChange={onChange}
            onRemove={onRemove}
            accept="image/jpeg, image/png"
          >
            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
          </Upload>
        </Form.Item>
        {LoaiPhuongTien.data?.image_path && (
          <img src={`http://localhost:8000/storage/${LoaiPhuongTien.data.image_path}`} alt="Hình ảnh" style={{ width: '100%', marginTop: '10px' }} />
        )}
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Thêm
          </Button>
          <Button
            type="default"
            className="ml-2"
            onClick={() => navigate('/admin/tour/image/')}
          >
            Quay lại
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Admin_ImageEdit;