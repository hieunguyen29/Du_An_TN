import React, { useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetRolesQuery,
  useAddRolesMutation,
  useEditRolesMutation,
} from "../../../../api/UserApi";
import { IRole } from "../../../../interface/user";

const Admin_Acountkhachhang_Roles: React.FC = () => {
  const navigate = useNavigate();
  const { idrole } = useParams<{ idrole: any }>();
  const { data: RoleData } = useGetRolesQuery(idrole || "");
  const Roles = RoleData || {};

  const user = Roles.user; // Các vai trò
  const userRole = Roles.role; // Các vai trò
  const all_column_roles = Roles.all_column_roles; // vai trò của user đang phân
  // Trạng thái lựa chọn hiện tại

  // add roles
  const [addRoles] = useAddRolesMutation();
  const [editRoles] = useEditRolesMutation();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const onFinish = (values: IUser) => {
    addRoles(values)
      .unwrap()
      .then(() => navigate("/admin/customer_account"))
      .catch((error) => {
        setErrors(error.data.message);
        setLoading(false);
      });
  };
  // cập nhật roles theo id
  const handleAddRoles = () => {
    editRoles({ role: selectedRole, id: idrole })
      .unwrap()
      .then(() => {
        navigate("/admin/customer_account");
        window.location.reload();
      })
      .catch((error) => {
        setErrors(error.data.message);
        setLoading(false);
      });
  };
  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    if (all_column_roles) {
      setSelectedRole(all_column_roles.name);
    }
  }, [all_column_roles]);

  const handleRoleChange = (event) => {
    const selectedRole = event.target.value;
    setSelectedRole(selectedRole);
  };

  console.log(all_column_roles);
  console.log(selectedRole);

  const username = () => {
    if (user) {
      return <div className="card-header">Cấp Vai Trò user: {user.name}</div>;
    }
    return null;
  };
  const value = () => {
    if (userRole) {
      return userRole.map((role: IRole) =>
        all_column_roles ? (
          <div className="form-check form-check-inline" key={role.id}>
            <input
              className="form-check-input"
              type="radio"
              name="role"
              id={role.id.toString()}
              checked={role.name == selectedRole}
              value={role.name}
              onChange={handleRoleChange}
            />
            <label className="form-check-label" htmlFor={role.id.toString()}>
              {role.name}
            </label>
          </div>
        ) : (
          <div className="form-check form-check-inline" key={role.id}>
            <input
              className="form-check-input"
              type="radio"
              name="role"
              id={role.id.toString()}
              value={role.name}
            />
            <label className="form-check-label" htmlFor={role.id.toString()}>
              {role.name}
            </label>
          </div>
        )
      );
    }
    return null; // Trả về null nếu userRole chưa có dữ liệu
  };

  return (
    <div className="container">
      <header className="mb-4">
        <h2 className="font-bold text-2xl">Phân Vai Trò</h2>
      </header>
      <div className="flex">
        <div className="w-1/2">
          <Form
            className="tour-form form-css-role"
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: "100%" }}
            onFinish={handleAddRoles}
          >
            {username()}
            {value()}
            <div>
            <Form.Item
             
              className="role-form"
            >
              <Button type="success" htmlType="submit" className="role-user">
                Cấp vai trò
              </Button>
            </Form.Item>
            </div>
           
          </Form>
        </div>
        <div className="w-1/2">
          <Form
            className="tour-form ant-css-form"
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: "100%" }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Vai Trò"
              name="role"
              rules={[{ required: true, message: "Vui lòng nhập vai trò !" }]}
            >
              <div className="flex items-center">
                <Input className="mr-10" />
                <div className="btn-button-sub-role">
                <Button type="primary" htmlType="submit" className="submit-click">
                  Thêm
                </Button>
                <Button
                  type="default"
                  className="ml-2"
                  onClick={() => navigate("/admin/customer_account")}
                >
                  Quay lại
                </Button>
                </div>
               
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Admin_Acountkhachhang_Roles;
