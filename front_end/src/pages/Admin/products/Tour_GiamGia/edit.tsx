import React, { useEffect, useState } from "react";
import { Form, Button, Input, DatePicker, Select } from "antd";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";

import {
  useEditTourDiscountMutation,
  useGetTourDiscountByIdQuery,
} from "../../../../api/TourDiscountApi";
import { ITourDiscount } from "../../../../interface/tourdiscount";
import { useGetTourQuery } from "../../../../api/TourApi";
import { useGetDiscountQuery } from "../../../../api/discountApi";
const { Option } = Select;

const Admin_TourDiscountEDIT: React.FC = () => {
  const navigate = useNavigate();
  const { data: tourdata } = useGetTourQuery();
  const tourArrary = tourdata?.data || [];
  const { data: imgdata } = useGetDiscountQuery();
  const imgArrary = imgdata || [];

  const { idtourdiscount } = useParams<{ idtourdiscount: any }>();
  const { data: TourDiscountData } = useGetTourDiscountByIdQuery(
    idtourdiscount || ""
  ); // lấy ra bản ghi muốn cập nhật
  const TourDiscount = TourDiscountData || {};

  const [updateTourDicount] = useEditTourDiscountMutation(); // cập nhật
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [form] = Form.useForm();
  useEffect(() => {
    if (TourDiscount && TourDiscount.tour_id && TourDiscount.discount_id) {
      form.setFieldsValue({
        tour_id: TourDiscount.tour_id,
        discount_id: TourDiscount.discount_id,
      });
    }
  }, [TourDiscount]);

  const onFinish = (values: ITourDiscount) => {
    updateTourDicount({ ...values, id: idtourdiscount })
      .unwrap()
      .then(() => navigate("/admin/tour/tour_discount"))
      .catch((error) => {
        setLoading(false);
      });
  };

  return (
    <div className="container">
      <header className="mb-4">
        <h2 className="font-bold text-2xl">
          Chỉnh sửa mã giảm giá của một tour
        </h2>
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
          label="Tên mã giảm giá"
          name="discount_id"
          rules={[{ required: true, message: "Vui lòng chọn mã giảm giá " }]}
        >
          <Select defaultValue="Chọn" style={{ width: "100%" }}>
            {imgArrary.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.discount_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Tour"
          name="tour_id"
          rules={[{ required: true, message: "Vui lòng chọn tour " }]}
        >
          <Select defaultValue="Chọn" style={{ width: "100%" }}>
            {tourArrary.map(
              (option: {
                id: React.Key | null | undefined;
                ten_tour:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | null
                  | undefined;
              }) => (
                <Option key={option.id} value={option.id}>
                  {option.ten_tour}
                </Option>
              )
            )}
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <div className="btn-button-sub">
            <Button type="primary" htmlType="submit" className="submit-click">
              Thêm
            </Button>
            <Button
              type="default"
              className="ml-2"
              onClick={() => navigate("/admin/tour/tour_discount")}
            >
              Quay lại
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Admin_TourDiscountEDIT;