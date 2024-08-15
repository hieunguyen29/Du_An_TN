import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Form, Button, Input, DatePicker, Select, Checkbox, Space, Upload, InputNumber } from 'antd'; // Import InputNumber from 'antd'
import { useNavigate, useParams } from 'react-router-dom';
import { UploadOutlined } from "@ant-design/icons";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ITour } from "../../../../interface/tour";
import { useGetLoaiTourQuery } from "../../../../api/LoaiTourApi";
import { useGetTourByIdQuery, useEditTourMutation } from "../../../../api/TourApi";

const { Option } = Select;

const AdminTourEdit = () => {
  const navigate = useNavigate();
  const [editorData, setEditorData] = useState('');
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorData(data);
  };
  const { data: loaitourdata } = useGetLoaiTourQuery();

  const loaitourArrary = loaitourdata?.data || [];
  const [provinces, setProvinces] = useState([]);
  const [provinces2, setProvinces2] = useState([]);
  const dateFormat = "DD-MM-YYYY";
  const { idtour } = useParams<{ idtour: any }>();
  const { data: TourData } = useGetTourByIdQuery(idtour || "");
  const Tour = TourData || {};

  const [updateTour] = useEditTourMutation();
  const [imageList, setImageList] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (Tour && Tour.data && Tour.data.image_path) {
      const fileList = Tour.data.image_path.map((image, index) => ({
        uid: `${index}`,
        name: `image-${index}`,
        status: 'done',
        url: `http://localhost:8000/storage/${image}`,
      }));
      setImageList(fileList);
    }
    if (Tour && Tour.data && Tour.data.mo_ta) {
      setEditorData(Tour.data.mo_ta);
    }
    fetch('https://provinces.open-api.vn/api/')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Lỗi khi lấy dữ liệu từ API');
        }
        return response.json();
      })
      .then((data) => {
        setProvinces(data);
        setProvinces2(data)
      })
      .catch((error) => {
        console.error(error);
      });

    if (Tour && Tour.data) {
      form.setFieldsValue({
        ten_tour: Tour.data.ten_tour,
        diem_di: Tour.data.diem_di,
        diem_den: Tour.data.diem_den,
        ma_loai_tour: Tour.data.ma_loai_tour,
        ngay_ket_thuc: moment(Tour.data.ngay_ket_thuc, dateFormat),
        lich_khoi_hanh: moment(Tour.data.lich_khoi_hanh, dateFormat),
        soluong: Tour.data.soluong,
        trang_thai: Tour.data.trang_thai,
      });
    }

    if (Tour && Tour.data && Tour.data.image_path) {
      const fileList = Tour.data.image_path.map((image, index) => ({
        uid: `${index}`,
        name: `image-${index}`,
        status: 'done',
        url: `http://localhost:8000/storage/${image}`,
      }));
      setImageList(fileList);
    }
  }, [Tour, form]);

  const onFinish = (values: ITour) => {
    updateTour({ ...values, id: idtour })
      .unwrap()
      .then(() => navigate("/admin/tour/"))
      .catch((error) => {
        console.error("Error updating tour: ", error);
      });
  };

  const disabledDate = (current) => {
    const currentDate = new Date();
    return current && current < currentDate.setHours(0, 0, 0, 0);
  };

  return (
    <div className="container">
      <header className="mb-4">
        <h2 className="font-bold text-2xl text-center ">Chỉnh sửa tour</h2>
      </header>
      <div>

        <Form
          className="tour-form"
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}

          onFinish={onFinish}
          autoComplete="off"
        >
          <div className="text-center container ">
            <div className="">
              <Form.Item
                label="Tên tour"
                name="ten_tour"
                rules={[
                  { required: true, message: "Vui lòng nhập tên tour!" },
                  { min: 3, message: "Tên tour ít nhất 3 ký tự" },
                ]}
              >
                <Input />
              </Form.Item>
              <div className="upload-wrapper">
                <Form.Item
                  label="Ảnh đại diện"
                  name="image"
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
                  {/* Hiển thị ảnh đại diện nếu có dữ liệu từ API */}
                  {Tour && Tour.data && Tour.data.image_dd && (
                    <img src={`http://localhost:8000/storage/${Tour.data.image_dd}`} alt="Ảnh đại diện" style={{ width: '50px', marginTop: '10px' }} />
                  )}
                </Form.Item>
                <Form.Item
                  label="Ảnh mô tả"
                  name="hinh[]"
                  rules={!imageList.length ? [{ required: true, message: "Vui lòng chọn ảnh" }] : undefined}
                >
                  <Upload
                    disabled={imageList.length > 0}
                    accept="image/*"
                    listType="picture"
                    multiple
                    beforeUpload={() => false}
                    fileList={imageList}
                    onChange={({ fileList }) => setImageList(fileList)}
                  // Disable upload if images exist
                  >
                    <Button icon={<UploadOutlined />} type="button" disabled={imageList.length > 0}>
                      Chọn ảnh
                    </Button>
                  </Upload>
                </Form.Item>
              </div>


              <Form.Item
                label="Điểm đi"
                name="diem_di"
                rules={[{ required: true, message: "Vui lòng chọn điểm đến!" }]}
              >
                <Select
                  showSearch
                  placeholder="Chọn điểm đi"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {provinces.map((province) => (
                    <Option key={province.code} value={province.name}>
                      {province.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Điểm đến"
                name="diem_den"
                rules={[{ required: true, message: 'Vui lòng chọn điểm đến!' }]}
              >
                <Select
                  showSearch
                  mode="multiple"
                  placeholder="Chọn điểm đến"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {provinces2.map((province) => (
                    <Option key={province.code} value={province.name}>
                      {province.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                className="w-full"
                label="Lịch khởi hành"
                name="lich_khoi_hanh"
                rules={[
                  { required: true, message: "Vui lòng nhập lịch khởi hành!" },
                ]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  disabledDate={disabledDate}
                />
              </Form.Item>
              <Form.Item
                className="w-full"
                label="Ngày kết thúc"
                name="ngay_ket_thuc"
                rules={[
                  { required: true, message: "Vui lòng nhập thời gian!" },
                ]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  disabledDate={disabledDate}
                />
              </Form.Item>
            </div>
            <div className="">
              <Form.Item
                className="w-full"
                label="Giá Người lớn"
                name="gia_nguoilon"
                rules={[
                  // { required: true, message: 'Vui lòng nhập giá tour!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (value >= 1000000) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Giá tour phải lớn hơn hoặc bằng 1,000,000")
                      );
                    },
                  }),
                ]}
              >
                <InputNumber
                  min={1000000}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                />
              </Form.Item>
              <Form.Item
                className="w-full"
                label="Giá Trẻ em"
                name="gia_treem"
                rules={[
                  // { required: true, message: 'Vui lòng nhập giá tour!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (value >= 1000000) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Giá tour phải lớn hơn hoặc bằng 1,000,000")
                      );
                    },
                  }),
                ]}
              >
                <InputNumber
                  min={1000000}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                />
              </Form.Item>

              <Form.Item
                className="w-full"
                label="Mô Tả"
                name="mo_ta"
                rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
              >
                <br /><br /> <br />
                <CKEditor
                  editor={ClassicEditor}
                  // config={{
                  //   extraPlugins: [EasyImage],
                  //   // Cấu hình thêm plugin Easy Image

                  // }}
                  data={editorData}
                  onChange={handleEditorChange}
                />
              </Form.Item>
              <Form.Item
                className="w-full number-tour"
                label="Số Lượng"
                name="soluong"
                rules={[
                  { required: true, message: "Vui lòng nhập  số lượng !" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                className="w-full"
                label="Trạng thái"
                name="trang_thai"
                rules={[
                  { required: true, message: "Vui lòng chọn checkout!" },
                ]}
              >
                <Checkbox.Group style={{ width: '100%' }} defaultValue={[1]}>
                  <Space direction="vertical">
                    <Checkbox value={1}>Kích hoạt</Checkbox>
                    <Checkbox value={0}>Vô hiệu hóa</Checkbox>
                  </Space>
                </Checkbox.Group>
              </Form.Item>

              <Form.Item
                className="w-full"
                label="Loại Tour"
                name="ma_loai_tour"
                rules={[
                  { required: true, message: "Vui lòng Chọn Mã Loại Tour" },
                ]}
              >
                <Select defaultValue="Chọn" style={{ width: "100%" }}>
                  {loaitourArrary.map((option) => (
                    <Option key={option.id} value={option.id}>
                      {option.ten_loai_tour}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </div>

          <Form.Item className="" wrapperCol={{ offset: 8, span: 16 }}>
            <div className="btn-button-sub">
              <Button className="bg-blue-500" type="primary" htmlType="submit">
                Thêm
              </Button>
              <Button
                type="default"
                className="ml-2"
                onClick={() => navigate("/admin/tour")}
              >
                Quay lại
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );

};



export default AdminTourEdit;