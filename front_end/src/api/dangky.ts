import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Kiểm tra trạng thái đăng nhập ở đây, có thể dựa trên localStorage hoặc token đã lưu trước đó
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const login = () => {
        // Thực hiện việc đăng nhập và cập nhật trạng thái đăng nhập
        setIsLoggedIn(true);
    };

    const logout = () => {
        // Thực hiện việc đăng xuất và cập nhật trạng thái đăng nhập
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value= {{ isLoggedIn, login, logout }
}>
    { children }
    < /AuthContext.Provider>
  );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
