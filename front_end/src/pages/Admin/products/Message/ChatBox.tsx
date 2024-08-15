import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ChatBox.css';
const ChatComponent = () => {
    const [usersId, setUserId] = useState("");
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [receiverId, setReceiverId] = useState('');
    const [isAdmin, setIsAdmin] = useState(false); // check xem user có vai trò là admin thì mới hiển thị ra
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            // Gửi yêu cầu API để lấy thông tin người dùng từ token
            fetch("http://localhost:8000/api/user", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => response.json())
                .then((userData) => {
                    setUserId(userData.id);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        fetchUsers();
        fetchMessages();

        const interval = setInterval(fetchMessages, 5000); // Gọi fetchMessages mỗi 5 giây (5000 milliseconds)
        return () => clearInterval(interval); // Xóa interval khi component unmount
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/showuser');
            setUsers(response.data);
            const loggedInUserRole = localStorage.getItem('role');
            const logAndNameArray = response.data.map(user => {
                const logRoles = user.roles.map(item => {
                    // check user đang nhập có vai trò này không 
                    setIsAdmin(item.name === loggedInUserRole);
                    debugger;
                });

            });
        } catch (error) {
            console.error(error);
        }
    };
    // hiển thị ra tất cả tin nhán
    const fetchMessages = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/messages');
            setMessages(response.data);
            // if(newMessage.trim == ""){
            //     alert('có chữ');
            // }
            //  setNewMessage(''); // để nó vào thì đang nhập nếu quá 5s thì reload lại ô nhập đó

        } catch (error) {
            console.error(error);
        }
    };
    // // thêm tin nhắn
    const sendMessage = async () => {

        try {
            await axios.post('http://localhost:8000/api/messages', {
                content: newMessage,
                userid: parseInt(usersId),
                receiver: receiverId
            });
            setNewMessage('');
            await fetchMessages();
        } catch (error) {
            console.error(error);
        }
    };
    const alertMessager = () => {
        const loggedInUserId = usersId;
        // Lọc tin nhắn chỉ giữ lại những tin nhắn giữa người dùng đang đăng nhập và người được chọn
        const filteredMessages = messages.filter(
            (message) =>
                (message.sender_id == loggedInUserId && message.receiver_id == receiverId) ||
                (message.sender_id == receiverId && message.receiver_id == loggedInUserId)
        );
        return (
            <div className="chat-messages">
                {filteredMessages.map((message) => (
                    <div
                        key={message.id}
                        className={`message ${message.sender_id == loggedInUserId ? 'message-right' : 'message-left'}`}
                    >
                        <div className="message-content">{message.content}</div>
                    </div>

                ))}
            </div>
        );
    };
    // danh sách user đẻ nhắn tin
    const optionsUser = () => { 
      
        if (isAdmin) {
           
            return (
                <div>
                    <div className="user-list">
                        {users &&
                            users.map((user) => (
                                <li
                                    key={user.id}
                                    className="user-card"
                                    onClick={() => setReceiverId(user.id)}
                                >
                                    <div className='flex gap-2'>
                                        <img className="avatar" src="mark_avatar.jpg" alt="Mark Avatar" />
                                        <h4>{user.name}</h4>
                                    </div>
                                </li>
                            ))}
                    </div>
                </div>
            );
        }
        return null;

    };
    return (

        <div className="chat-container">
            <div className="chat-header">
                <h2>Chat</h2>
            </div>
            <div className="chat-content">
                <div className="chat-sidebar">
                    <ul className="chat-participants">

                        {optionsUser()}
                    </ul>
                </div>
                <div className="chat-messages">
                    {alertMessager()}
                </div>
            </div>
            <div className="chat-input">


                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button onClick={sendMessage}>Send</button>

            </div>
        </div>


    );
}

export default ChatComponent;
