import { Form, Button, Input,DatePicker,Select} from "antd";
const { Option } = Select;
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
type FieldType = {
    id: number;
    ten_tour: string;
    diem_di: string;
    diem_den: string;
    lich_khoi_hanh: string;
    thoi_gian: string;
    diem_khoi_hanh: string;
    anh: string;
    soluong: number;
    trang_thai: number;
    ma_loai_tour: number;
    ma_hdv: number;
    
};
const AdminTourEdit = () => {
  const navigate = useNavigate();

  return (
    <div>
      <header className="mb-4">
        <h2 className="font-bold text-2xl">Edit tour</h2>
      </header>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        // onFinish={onFinish}
        autoComplete="off"
      >
   <Form.Item<FieldType>
          label="Tên tour"
          name="ten_tour"
          rules={[
            { required: true, message: "Vui lòng nhập tên tour!" },
            { min: 3, message: "Tên tour ít nhất 3 ký tự" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
  label="Điểm khởi hành"
  name="diem_khoi_hanh"
  rules={[{ required: true, message: "Vui lòng chọn điểm đến!" }]}
>
  <Select>
    <Option value="diem1">Hà Nội</Option>
    <Option value="diem2">Phú Thọ</Option>
   
  </Select>
</Form.Item>
   
        <Form.Item<FieldType>
  label="Điểm đi"
  name="diem_di"
  rules={[{ required: true, message: "Vui lòng chọn điểm đến!" }]}
>
  <Select>
    <Option value="diem1">Hà Nội</Option>
    <Option value="diem2">Phú Thọ</Option>
   
  </Select>
</Form.Item>
        <Form.Item<FieldType>
  label="Điểm đến"
  name="diem_den"
  rules={[{ required: true, message: "Vui lòng chọn điểm đến!" }]}
>
  <Select>
    <Option value="diem1">Hà Nội</Option>
    <Option value="diem2">Phú Thọ</Option>
   
  </Select>
</Form.Item>

     

        <Form.Item<FieldType>
          label="Lịch khởi hành"
          name="lich_khoi_hanh"
          rules={[{ required: true, message: "Vui lòng nhập lịch khởi hành!" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item<FieldType>
          label="Thời gian"
          name="thoi_gian"
          rules={[{ required: true, message: "Vui lòng nhập thời gian!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Trạng thái"
          name="trang_thai"
          rules={[{ required: true, message: "Vui lòng nhập trạng thái!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Mã loại tour"
          name="ma_loai_tour"
          rules={[{ required: true, message: "Vui lòng nhập mã loại tour!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Mã hướng dẫn viên"
          name="ma_hdv"
          rules={[{ required: true, message: "Vui lòng nhập mã hướng dẫn viên!" }]}
        >
          <Input />
        </Form.Item>


        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" danger htmlType="submit">
          Thêm
            {/* <AiOutlineLoading3Quarters className="animate-spin" />   */}
          </Button>
          <Button
            type="primary"
            danger
            className="ml-2"
            onClick={() => navigate("/admin/product")}
          >
            Quay lại
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminTourEdit;
