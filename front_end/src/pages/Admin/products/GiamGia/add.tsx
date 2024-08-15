import React from "react";
import { Form, Button, Input, DatePicker, Select } from "antd";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useAddDiscountMutation } from "../../../../api/discountApi";
import { IDiscount } from "../../../../interface/discount";

const { Option } = Select;

type FieldType = {
  id: number;
  ten_loai_tour: string;
};

const AdminGiam_GiaADD: React.FC = () => {
  const [addDiscount] = useAddDiscountMutation();
  const navigate = useNavigate();

  const onFinish = (values: IDiscount) => {
    addDiscount(values)
      .unwrap()
      .then(() => navigate("/admin/tour/discount"));
  };
  const disabledDate = (current: number) => {
    // Get the current date
    const currentDate = new Date();

        // Disable dates before the current date
        return current && current < currentDate.setHours(0, 0, 0, 0);
    };
    
    return (
        <div className="container">
            <header className="mb-4">
                <h2 className="font-bold text-2xl">Tạo mã giảm giá </h2>
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
                    label="Tên Giảm Giá"
                    name="discount_name"
                    rules={[
                        { required: true, message: 'Vui lòng nhập tên giảm giá!' },
                        { min: 3, message: 'Tên giảm giá ít nhất 3 ký tự' },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Mã Giảm Giá"
                    name="discount_code"
                    rules={[
                        { required: true, message: 'Vui lòng nhập mã giảm giá!' },
                        { min: 5, message: 'Mã giảm giá ít nhất 5 ký tự' },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Tổng phần trăm(%) / tiền(K)"
                    name="percentage"
                    rules={[
                        { required: true, message: 'Vui lòng nhập giá trị giảm giá!' },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Điều kiện áp dụng"
                    name="minprice"
                    rules={[
                        { required: true, message: 'Vui lòng nhập điều kiện áp dụng' },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Loại Giảm Giá"
                    name="discount_condition"
                    rules={[
                        { required: true, message: 'Vui lòng chọn loại giảm giá!' },

                    ]}
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
                    rules={[
                        { required: true, message: 'Vui lòng chọn ngày!' },
                    ]}
                >
                    <DatePicker disabledDate={disabledDate} />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Thêm
                    </Button>
                    <Button
                        type="default"
                        className="ml-2"
                        onClick={() => navigate('/admin/tour/discount')}
                    >
                        Quay lại
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AdminGiam_GiaADD;
