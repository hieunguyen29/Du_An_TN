type Props = {};

import {
  Table,
  Button,
  Skeleton,
  Popconfirm,
  Alert,
  Modal,
  Switch,
  message,
} from "antd";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import "../../../../style.css"
const Admin_Account_huongdanvien = () => {
  const [hdvtour, sethdvtour] = useState([]);
  const [selectedTour, setSelectedTour] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

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

  function getListHdvTour() {
    const token = localStorage.getItem("token");
    axios
      .get("http://127.0.0.1:8000/api/hdvtour/getListHDVTour", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        sethdvtour(response.data.hdvtour);
        console.log(response);
      });
  }

  useEffect(() => {
    getListHdvTour();
  }, []);
  const [selectedId, setSelectedId] = useState("");
  const updateStatus = (id) => {
    setSelectedId(id);
    console.log(id);
    const token = localStorage.getItem("token");
    axios
      .put(
        `http://127.0.0.1:8000/api/hdvtour/updateStatustourhdv/${id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
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
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Họ tên",
      dataIndex: "ten_hdv",
      key: "ten_hdv",
    },
    {
      title: "Tên tour",
      dataIndex: "ten_tour",
      key: "ten_tour",
      render: (text, record) => (
        <Button type="link" onClick={() => handleTourClick(record)}>
          {text}
        </Button>
      ),
    },
    {
      title: "Ngày đi",
      dataIndex: "lich_khoi_hanh",
      key: "lich_khoi_hanh",
    },
    {
      title: "Ngày về",
      dataIndex: "ngay_ket_thuc",
      key: "ngay_ket_thuc",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          className={`status-badge ${status === 0 ? "chua_xac_nhan" : "xac_nhan"
            }`}
        >
          {status === 0 ? "Chưa Xác Nhận" : "Đã Xác Nhận"}
        </span>
      ),
    },
    {
      title: "Action",
      dataIndex: "status",
      key: "status",
      render: (status, { id }) => {
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
    // Add more columns as needed based on your API response
  ];

  const handleTourClick = (tour) => {
    setSelectedTour(tour);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedTour(null);
    setModalVisible(false);
  };

  return (
    <div>
      <header className="mb-4 flex justify-between items-center">
        <h2 className="font-bold text-2xl">Hướng dẫn viên</h2>
        <Button type="primary" danger>
          <Link
            to="/admin/account_huongdanvien/add"
            className="flex items-center space-x-2"
          >
            <AiOutlinePlus />
            Tạo mới hướng dẫn viên
          </Link>
        </Button>
      </header>
      <Table
        dataSource={hdvtour}
        columns={columns}
        loading={hdvtour.length === 0}
      />

      {selectedTour && (
        <Modal
          title={selectedTour.ten_tour}
          visible={modalVisible}
          onCancel={closeModal}
          footer={null}
        >
          {/* Add modal content here */}
          <p>{/* Example: Display additional tour information */}</p>
        </Modal>
      )}
    </div>
  );
};

export default Admin_Account_huongdanvien;

function setSelectedId(id: any) {
  throw new Error("Function not implemented.");
}