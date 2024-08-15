type Props = {};

// import { IProduct } from "@/interfaces/product";

import { Table, Button, Skeleton, Alert,Popconfirm, Select } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
const { Option } = Select;
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect } from "react";
const ADmin_Hoadon = (props: Props) => {
  // 1 useGetdattour

  // 2 const [removeProduct, { isLoading: isRemoveLoading, isSuccess: isRemoveSuccess }] =
  // useRemove();

  // const confirm = (id: any) => {
  //     if(!window.confirm('bạn có muốn xóa không ')){
  //         return
  //     }
  //     removeProduct(id);

  // };
  const navigate = useNavigate();
  useEffect(() => {}, [navigate]);

  //  const dattour = dattour?.data || [];

  // const dataSource = dattour.map(({ ma_hoa_don,id_hoa_don,ngay_tao,id_dat_tour,tong_tien,,id_khach_hang,id_hdv,ma_khuyen_mai}: interface) => ({
  //  key:  ma_hoa_don,key:id_hoa_don,id_dat_tour,tong_tien,,id_khach_hang,id_hdv,ma_khuyen_mai,ngay_tao
  //
  // }));
  const dataSource = [
    {
      key: "1",
      ma_hoa_don: "#03837364 ",
      ngay_tao: "2023-10-16",
      trang_thai: "Đã thanh toán",
      id_dat_tour: "DT001",
      id_khach_hang: "KH001",
      ma_khuyen_mai: "KM001",
      id_hdv: 1,
    },
    {
      key: "2",
      ma_hoa_don: "HD002",
      ngay_tao: "2023-10-17",
      trang_thai: "Đang xử lý",
      id_dat_tour: "DT002",
      id_khach_hang: "KH002",
      ma_khuyen_mai: "KM002",
      id_hdv: 2,
    },
  ];
  const hdvOptions = [
    { id: 1, name: "Hthai" },
    { id: 2, name: "ronaldo" },
    { id: 3, name: "messi" },
    // Thêm các hướng dẫn viên khác vào danh sách này
  ];
  const handleSelectChange = (key: any, value: any) => {
    // Thực hiện xử lý khi người dùng thay đổi giá trị select
    console.log(`Key: ${key}, Selected Value: ${value}`);
  };

  const columns = [
    {
        title: "ID",
        dataIndex: "key",
        key: "key",
      },
    {
      title: "Mã hóa đơn",
      dataIndex: "ma_hoa_don",
      key: "ma_hoa_don",
    },
    {
      title: "Ngày tạo",
      dataIndex: "ngay_tao",
      key: "ngay_tao",
    },
    {
      title: "Trạng thái",
      dataIndex: "trang_thai",
      key: "trang_thai",
    },
    {
      title: "Mã đặt tour",
      dataIndex: "id_dat_tour",
      key: "id_dat_tour",
    },
    {
      title: "Mã khách hàng",
      dataIndex: "id_khach_hang",
      key: "id_khach_hang",
    },
    {
        title: "Tổng tiền",
        dataIndex: "tong_tien",
        key: "tong_tien",
      },
    {
      title: "Khuyến mãi",
      dataIndex: "ma_khuyen_mai",
      key: "ma_khuyen_mai",
    },
    {
        title: "Chọn hướng dẫn viên",
        dataIndex: "id_hdv",
        key: "id_hdv",
        render: (id_hdv: any) => (
          <Select
            defaultValue={id_hdv} // Giá trị mặc định được chọn
            style={{ width: 120 }}
            onChange={(value) => handleSelectChange(id_hdv, value)}
          >
            {hdvOptions.map((hdv) => (
              <Option key={hdv.id} value={hdv.id}>
                {hdv.name}
              </Option>
            ))}
          </Select>
        ),
      },

  

    {
      title: "Action",
      render: ({ key: id }: any) => {
        return (
          <>
            <div className="flex space-x-2">
              <Popconfirm
                title="Bạn có muốn xóa?"
                onConfirm={() => confirm(id)}
                okText="Yes"
                className="text-black"
                cancelText="No"
              >
                <Button type="primary" danger>
                  Xóa
                </Button>
              </Popconfirm>

              <Button type="primary" danger>
                <Link to={`/admin/tour/dat_tour/edit/${id}`}>Sửa</Link>
              </Button>
              <Button type="primary" danger>
                Xác nhận tour
              </Button>
            </div>
          </>
        );
      },
    },
  ];

  return (
    <div>
      <header className="mb-4 flex justify-between items-center">
        <h2 className="font-bold text-2xl">Quản lý phương tiện</h2>
      </header>
      {/* {isRemoveSuccess && <Alert message="Xóa thành công" type="success" />} */}
            {  <Table dataSource={dataSource} columns={columns} />}
    </div>
  );
};

export default ADmin_Hoadon;
