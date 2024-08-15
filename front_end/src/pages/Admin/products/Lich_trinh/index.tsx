type Props = {};

// import { IProduct } from "@/interfaces/product";
import { Table, Button, Skeleton, Popconfirm, Alert, message, Switch, Input } from "antd";
import { Link } from "react-router-dom";
import { useGetLichTrinhQuery, useRemoveLichTrinhMutation } from "../../../../api/LichTrinhApi";
import { useGetTourQuery } from "../../../../api/TourApi";

import { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'; // Import the icons
import axios from "axios";
import { AiOutlinePlus } from "react-icons/ai";

const Admin_Lichtrinh = (props: Props) => {
  const { data: lictrinhdata, error, isLoading } = useGetLichTrinhQuery();
  const { data: tourdata } = useGetTourQuery();
  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "This is a success message",
    });
  };
  const [searchValue, setSearchValue] = useState();
  const [
    removeLichTrinh,
    { isLoading: isRemoveLoading, isSuccess: isRemoveSuccess },
  ] = useRemoveLichTrinhMutation();

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    const filteredData = lictrinhdata?.date.filter((item) =>
      item.tieu_de.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredDataSource(filteredData);
  };

  const confirm = (id) => {
    removeLichTrinh(id);
  };
  // const navigate = useNavigate();
  const lichtrinhrArray = lictrinhdata?.date || [];
  const tourArrary = tourdata?.data || [];
  const dataSource = lichtrinhrArray.map(
    ({ id, noi_dung, thoi_gian, status, id_tour }: ILichTrinh) => ({
      key: id,
      noi_dung,
      thoi_gian,
      status,
      id_tour,
    })
  );

  const tableStyles: React.CSSProperties = {
    fontWeight: "bold",
    textAlign: "center",
  };

  const [selectedId, setSelectedId] = useState("");
  const updateStatus = (id) => {
    setSelectedId(id);
    console.log(id);
    axios
      .put(
        `http://127.0.0.1:8000/api/admin/lichtrinh/updateStatusSchedule/${id}`)
      .then((response) => {
        if (response.data) {
          alert("cập nhật trạng thái thành công");
        }
        // Thực hiện các tác vụ sau khi nhận được phản hồi từ API
      })
      .catch((error) => {
        console.error("API error:", error);
        // Xử lý lỗi nếu có
      });
  };
  const columns = [
    {
      title: (
        <span style={tableStyles} className="w-[40px]">
          ID
        </span>
      ),
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Nội dung",
      dataIndex: "noi_dung",
      key: "noi_dung",
      render: (text) => (
        <div>
          {/* Hiển thị mô tả toàn bộ */}
          <div dangerouslySetInnerHTML={{ __html: text }} />
        </div>
      ),
    },
    {
      title: "Thời gian",
      dataIndex: "thoi_gian",
      key: "thoi_gian",
    },
    {
      title: "Tour tương ứng",
      dataIndex: "id_tour",
      key: "id_tour",
      render: (id_tour) => {
        const Tour = tourArrary.find((item) => item.id === id_tour);
        return Tour ? Tour.ten_tour : "Không xác định";
      },
    },
    {
      title: (
        <span style={tableStyles} className="w-[40px]">
          Trạng thái lịch trình
        </span>
      ),
      dataIndex: "status",
      key: "status",
      render: (status, { key: id }) => {
        const check = status === 0 ? false : true;

        return (
          <Switch
            defaultChecked={check}
            onChange={(checked) => {
              updateStatus(id); // Lấy giá trị id từ record
              onChange(checked);
            }}
          />
        );
      },
    },

    {
      title: "Action",
      render: ({ key: id }) => {
        return (
          <>
            {localStorage.getItem("role") === "admin" && (
              <div className="flex space-x-2">
                <Popconfirm
                  title="Bạn có muốn xóa?"
                  onConfirm={() => confirm(id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="primary" danger>Xóa</Button>
                </Popconfirm>
                <Button type="primary" danger>
                  <Link to={`/admin/tour/lich_trinh/edit/${id}`}>Sửa</Link>
                </Button>
              </div>
            )}
          </>
        );
      },
    },
  ];

  return (
    <div>
      <header className="mb-4 flex justify-between items-center">
        <h2 className="font-bold text-2xl">Quản lý lịch trình</h2>
        <Button type="primary" danger>
          <Link to="/admin/tour/lich_trinh/add" className="flex items-center space-x-2">
            <AiOutlinePlus />Tạo mới lịch trình
          </Link>
        </Button>
      </header>

      <div className="flex items-center justify-end mb-4">
        <Input
          style={{ width: "250px" }}
          placeholder="Tìm kiếm lịch trình"
          value={searchValue}
          onChange={handleSearchChange}
        />
        <Button style={{ backgroundColor: "blue", marginLeft: "5px" }} type="primary" onClick={handleSearch}>
          Tìm kiếm
        </Button>
      </div>

      {isLoading ? (
        <Skeleton />
      ) : (
        <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 2 }} />
      )}
    </div>
  );
};

export default Admin_Lichtrinh;