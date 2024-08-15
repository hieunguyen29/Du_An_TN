import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Input,
  DatePicker,
  Select,
  InputNumber,
  message,
  Checkbox, Space
} from "antd";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useGetLoaiTourQuery } from "../../../../api/LoaiTourApi";
import { useGetHuongDanVienQuery } from "../../../../api/HuongDanVienApi";
import { ITour } from "../../../../interface/tour";
import { useAddTourMutation } from "../../../../api/TourApi";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "../../../css.css";
import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
// import ImgCrop from 'antd-img-crop';
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;
type FieldType = {
  id: number;
  ten_tour: string;
  image_dd: string;
  image_path: string;
  diem_di: string;
  diem_den: string;
  lich_khoi_hanh: string;
  ngay_ket_thuc: string;
  diem_khoi_hanh: string;
  mo_ta: string;
  gia_nguoilon: number;
  gia_treem: number;
  soluong: number;
  trang_thai: number;
  ma_loai_tour: number;
};

const AdminTourAdd: React.FC = () => {
  const [editorData, setEditorData] = useState("");
  const [imageList, setImageList] = useState([]);
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorData(data);
  };
  const [addTour] = useAddTourMutation();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Thêm thành công",
    });
  };

  const onFinish = (values: FieldType) => {
    const formData = new FormData();

    // Kiểm tra nếu có hình ảnh được chọn
    if (imageList && imageList.length > 0) {
      imageList.forEach((file) => {
        formData.append('hinh[]', file.originFileObj);
      });
    }
    formData.append("image", values.image.fileList[0].originFileObj);
    formData.append("ten_tour", values.ten_tour);
    formData.append("diem_di", values.diem_di);
    formData.append("diem_den", values.diem_den);
    formData.append("diem_khoi_hanh", values.diem_khoi_hanh);
    formData.append("lich_khoi_hanh", values.lich_khoi_hanh);
    formData.append("ngay_ket_thuc", values.ngay_ket_thuc);
    formData.append("gia_nguoilon", values.gia_nguoilon);
    formData.append("gia_treem", values.gia_treem);
    formData.append("soluong", values.soluong);
    formData.append("trang_thai", values.trang_thai);
    formData.append("ma_loai_tour", values.ma_loai_tour);
    values.mo_ta = editorData;
    formData.append("mo_ta", values.mo_ta);

    addTour(formData)
      .unwrap()
      .then(() => {
        success();
        setTimeout(() => {
          navigate("/admin/tour");
        }, 2000); // Trì hoãn chuyển hướng sau 1 giây (1000ms)
      })
      .catch((error) => {
        setErrors(error.data.message);
      });
  };
  const { Option } = Select;
  const { data: loaitourdata } = useGetLoaiTourQuery();
  const { data: huongdanviendata } = useGetHuongDanVienQuery();
  const loaitourArrary = loaitourdata?.data || [];
  const huongdanvienArrary = huongdanviendata?.data || [];
  const navigate = useNavigate();
  const [provinces, setProvinces] = useState([]);
  const [provinces2, setProvinces2] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [imageButtonClass, setImageButtonClass] = useState("");
  const [ButtonImage, setButtonImage] = useState("");
  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Lỗi khi lấy dữ liệu từ API");
        }
        return response.json();
      })
      .then((data) => {
        setProvinces(data);
        setProvinces2(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleChange = (value) => {
    setSelectedValue(value);
    const filteredOptions = provinces2.filter(
      (option) => option.name !== value
    );
    setProvinces2(filteredOptions);
  };
  const handleButtonClick = () => {
    // Thêm class mới khi button được click
    setImageButtonClass("new-class");
    setButtonImage("add-class");
  };

  const disabledDate = (current) => {
    // Get the current date
    const currentDate = new Date();

    // Disable dates before the current date
    return current && current < currentDate.setHours(0, 0, 0, 0);
  };

  return (
    <div className="container">
      <header className="mb-4">
        <h2 className="font-bold text-2xl text-center ">Tạo mới tour</h2>
      </header>
      <div>
        {contextHolder}
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
                className="w-full"
                label="Tên tour"
                name="ten_tour"
                rules={[
                  { required: true, message: "Vui lòng nhập tên tour!" },
                  { min: 3, message: "Tên tour ít nhất 3 ký tự" },
                  {
                    validator(_, value) {
                      if (value && value.trim() === "") {
                        return Promise.reject(
                          "Tên tour không thể chỉ chứa khoảng trắng"
                        );
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <div className="upload-wrapper">
                <Form.Item
                  label="Ảnh đại diện"
                  name="image"
                  rules={[{ required: true, message: "Vui lòng chọn ảnh" }]}
                  className="custom-form-item image_dt"
                >
                  <Upload
                    accept="image/*"
                    listType="picture"
                    beforeUpload={() => false}

                  >
                    <Button icon={<UploadOutlined />} type="button" className="image_ul">
                      Chọn ảnh
                    </Button>
                  </Upload>
                </Form.Item>

                <Form.Item
                  label="Hình ảnh"
                  name="hinh[]"
                  rules={[{ required: true, message: 'Vui lòng chọn ảnh' }]}
                  className="custom-form-item"
                >
                  <Upload
                    accept="image/*" // Chỉ chấp nhận các định dạng ảnh
                    listType="picture"
                    multiple // Cho phép chọn nhiều file
                    beforeUpload={() => false}
                    onChange={(info) => {
                      const { fileList } = info;
                      // Lưu danh sách hình ảnh đã chọn vào imageList
                      setImageList(fileList);
                    }}
                  >
                    <Button icon={<UploadOutlined />} type="button">
                      Chọn ảnh
                    </Button>
                  </Upload>
                </Form.Item>
              </div>


              <Form.Item
                className="w-full"
                label="Điểm đi"
                name="diem_di"
                rules={[{ required: true, message: "Vui lòng chọn điểm đi!" }]}
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
                label="Mô Tả  "
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

export default AdminTourAdd;