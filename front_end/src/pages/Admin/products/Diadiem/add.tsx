import React ,{useState}from 'react';
import { Form, Button, Input, DatePicker, Select } from 'antd';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useGetLoaiTourQuery } from "../../../../api/LoaiTourApi";
import { useAddDiaDiemMutation, useRemoveDiaDiemMutation } from "../../../../api/DiaDiemApi";
import { IDiaDiem } from "../../../../interface/diadiem";
import "../../../css.css";
const { Option } = Select;

const AdminGiam_GiaEdit: React.FC = () => {
  const { iddiscount } = useParams<{ iddiscount: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    // Lấy dữ liệu giảm giá theo iddiscount và thiết lập giá trị mặc định cho form
    axios
      .get(`http://localhost:8000/api/admin/discount/${iddiscount}`)
      .then((response) => {
        const LoaiTour = response.data;
        form.setFieldsValue({
          discount_name: LoaiTour.discount_name,
          discount_code: LoaiTour.discount_code,
          percentage: LoaiTour.percentage,
          discount_condition: LoaiTour.discount_condition,
          expiry_date: LoaiTour.expiry_date,
        });
      })
      .catch((error) => {
        console.error(error.response.data.message);
      });
  }, [form, iddiscount]);

  const onFinish = (values: IDiscount) => {
    axios
      .put(
        `http://localhost:8000/api/admin/discount/update/${iddiscount}`,
        values
      )
      .then(() => {
        navigate("/admin/tour/discount");
      })
      .catch((error) => {
        console.error(error.response.data.message);
      });
  };

  return (
    <div className="container">
      <header className="mb-4">
        <h2 className="font-bold text-2xl">Cập Nhật giảm giá </h2>
      </header>
      <Form
        className="tour-form"
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: "100%" }}
        onFinish={onFinish}
        autoComplete="off"
        form={form}
      >
        <Form.Item
          label="Tên Giảm Giá"
          name="discount_name"
          rules={[
            { required: true, message: "Vui lòng nhập tên giảm giá!" },
            { min: 3, message: "Tên giảm giá ít nhất 3 ký tự" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Mã Giảm Giá"
          name="discount_code"
          rules={[
            { required: true, message: "Vui lòng nhập mã giảm giá!" },
            { min: 5, message: "Mã giảm giá ít nhất 5 ký tự" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Tổng phần trăm(%) / tiền(K)"
          name="percentage"
          rules={[
            { required: true, message: "Vui lòng nhập giá trị giảm giá!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Loại Giảm Giá"
          name="discount_condition"
          rules={[{ required: true, message: "Vui lòng chọn loại giảm giá!" }]}
        >
          <Select defaultValue="">
            <Option value="">Chọn</Option>
            <Option value="1">Giảm Giá Theo K</Option>
            <Option value="2">Giảm Giá Theo %</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Ngày Hết Hạn"
          name="expiry_date"
          rules={[{ required: true, message: "Vui lòng chọn ngày!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <div className="btn-button-sub-pt">
            <Button type="primary" htmlType="submit" className="submit-click">
              Thêm
            </Button>
            <Button
              type="default"
              className="ml-2"
              onClick={() => navigate("/admin/tour/discount")}
            >
              Quay lại
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminGiam_GiaEdit;