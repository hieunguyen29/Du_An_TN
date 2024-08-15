import { useEffect, useState } from "react";
import { Table, Button } from "antd";
import axios from "axios";
import { FaStar } from "react-icons/fa";

const AdminDanhGia = () => {
  const [showdanhgia, setShowDanhGia] = useState([]);

  useEffect(() => {
    show();
  }, []);

  const show = () => {
    axios
      .get("http://127.0.0.1:8000/api/admin/evaluate")
      .then((response) => {
        setShowDanhGia(response.data.danhgia);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn xóa?");
    if (confirmed) {
      axios
        .delete(`http://127.0.0.1:8000/api/admin/evaluate/${id}`)
        .then((response) => {
          console.log("Xóa thành công");
          show();
        })
        .catch((error) => {
          console.error("Lỗi khi xóa:", error);
        });
    }
  };

  return (
    <div>
      <header className="mb-4 flex justify-between items-center">
        <h2 className="font-bold text-2xl">Quản lý đánh giá</h2>
      </header>
      <table className="w-full  mb-4 ">
        <thead className="bg-gray-100">
          <tr className="border">
            <th className="p-2">ID</th>
            <th className="p-2">Tên khách hàng</th>
            <th className="p-2">Sao</th>
            <th className="p-2">Tên tour</th>
            <th className="p-2">Nội dung</th>
            <th className="p-2">Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {showdanhgia.length > 0 ? (
            showdanhgia.map((danhgia) => (
              <tr key={danhgia.id} className="border">
                <td className="border p-2">{danhgia.id}</td>
                <td className="border p-2">{danhgia.id_user}</td>
                <td className="border p-2 text-center item">
                  <div className="rate justify-center flex gap-2">
                    
                    {[1, 2, 3, 4, 5].map((star) => (
                      <h2
                        key={star}
                        style={{ color: danhgia.so_sao >= star ? 'yellow' : 'gray' }}
                        className={`text-${danhgia.so_sao >= star ? "yellow" : "gray"}-300 text-[25px]`}
                      >
                        <FaStar />
                      </h2>
                    ))}
                  </div>
                </td>
                <td className="border  p-2">{danhgia.id_tour}</td>
                <td className="border p-2">{danhgia.noi_dung}</td>
                <td className="border text-center p-2">
                  <Button type="primary" danger onClick={() => handleDelete(danhgia.id)}>
                    Xóa
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center p-4">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDanhGia;
