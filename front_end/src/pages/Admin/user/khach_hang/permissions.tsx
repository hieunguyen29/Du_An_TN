import React, { useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetPermissionsQuery,
  useEditPermissionsMutation,
  useAddPermissionsMutation,
} from "../../../../api/UserApi";
import { IRole } from "../../../../interface/user";

const Admin_Acountkhachhang_Permisssions: React.FC = () => {
  const navigate = useNavigate();
  const { idpermission } = useParams<{ idpermission: any }>();
  const { data: PermissionsData } = useGetPermissionsQuery(idpermission || "");
  const Permissions = PermissionsData || {};

  const user = Permissions.user; // Các quyền và tt user
  const userPermissions = Permissions.permission; // Các quyền
  const name_roles = Permissions.name_roles; // quyền
  const get_permission_via_role = Permissions.get_permission_via_role;

  const [addPermissions] = useAddPermissionsMutation();
  const [editPermissions] = useEditPermissionsMutation();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const onFinish = (values: IUser) => {
    addPermissions(values)
      .unwrap()
      .then(() => navigate("/admin/customer_account"))
      .catch((error) => {
        setErrors(error.data.message);
        setLoading(false);
      });
  };

  const username = () => {
    if (user) {
      return (
        <>
          <div class="card-header">Cấp Quyền user: {user.name}</div>
          <div className="card-header"> Vai Trò Hiện Tại: {name_roles}</div>
        </>
      );
    }
    return null;
  };
  const [selectedRoles, setSelectedRoles] = useState([]);

  useEffect(() => {
    if (get_permission_via_role) {
      setSelectedRoles(
        get_permission_via_role.map((permission) => permission.name)
      );
    }
  }, [get_permission_via_role]);

  const handleRoleChange = (event) => {
    const selectedRole = event.target.value;
    setSelectedRoles((prevSelectedRoles) => {
      if (!prevSelectedRoles.includes(selectedRole)) {
        return [...prevSelectedRoles, selectedRole];
      } else {
        return prevSelectedRoles.filter((role) => role !== selectedRole);
      }
    });
  };

  console.log(get_permission_via_role);
  console.log(selectedRoles);

  // cập nhật quyền
  const handleAddPermissions = () => {
    editPermissions({ permission: selectedRoles, id: idpermission })
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

  const value = () => {
    if (userPermissions) {
      return userPermissions.map((permission) => {
        return (
          <div className="form-check" key={permission.id}>
            <input
              className="form-check-input"
              type="checkbox"
              name="permission[]"
              checked={
                selectedRoles.includes(permission.name) ||
                selectedRoles.includes(permission.id.toString())
              }
              id={permission.id.toString()}
              value={permission.name}
              onChange={handleRoleChange} // Thêm sự kiện onChange để cập nhật giá trị của checkbox
            />
            <label
              className="form-check-label"
              htmlFor={permission.id.toString()}
            >
              {permission.name}
            </label>
          </div>
        );
      });
    }
    return null;
  };

  return (
    <div className="container">
      <header className="mb-4">
        <h2 className="font-bold text-2xl">Phân Quyền</h2>
      </header>
      <div className="flex">
        <div className="w-1/2 ">
          <Form
            className="tour-form flex flex-col"
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: "100%" }}
            onFinish={handleAddPermissions}
          >
            {username()}
            {value()}
            <Form.Item >
              <div className="flex ">
                <Button type="success" htmlType="submit" className="submit-click">
                  Cấp quyền
                </Button>
                <Button
                  type="default"
                  className="ml-2"
                  onClick={() => navigate("/admin/customer_account")}
                >
                  Quay lại
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
        <div className="w-1/2">
          <Form
            className="tour-form ant-css-form"
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Quyền"
              name="per"
              rules={[{ required: true, message: "Vui lòng nhập quyền !" }]}
            >
              <div className="flex gap-5 items-center">
              <Input />
              <div className="btn-button-sub-role">
              <Button type="primary" htmlType="submit" className="submit-click">
                Thêm Quyền
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

export default Admin_Acountkhachhang_Permisssions;
