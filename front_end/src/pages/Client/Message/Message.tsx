import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import '@fortawesome/fontawesome-free/css/all.min.css';
import logo from '../img/logo.jpg';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
const MessageChatBox = () => {
  const [usersId, setUserId] = useState("");
  // boxchat
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [receiverId, setReceiverId] = useState('');
  const [messageHistory, setMessageHistory] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [FindNameRole, setFindNameRole] = useState('');

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
    findNameRole();
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000); // Gọi fetchMessages mỗi 5 giây (5000 milliseconds)
    return () => clearInterval(interval); // Xóa interval khi component unmount
  }, [messageHistory]);

  const handleToggleChat = () => {
    setIsChatVisible(prevState => !prevState);
  };
  // hiển thị tin nhắn 
  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/messages');
      setMessages(response.data);
      // setInputValue('');


    } catch (error) {
      console.error(error);
    }
  };
  const handleKeyDown = function (event: { key: string; }): void {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    try {
      await axios.post('http://localhost:8000/api/messages', {
        content: inputValue,
        userid: parseInt(usersId),
        receiver: receiverId
      });
      setInputValue('');

      await fetchMessages();
    } catch (error) {
      console.error(error);
    }

  };

  const findNameRole = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/findNameRole');
      setFindNameRole(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const alertMessager = () => {
    const loggedInUserId = usersId;
    // hiển thị ra đoạn tin nhắn giữa khách hàng và admin
    const userNoAdmin = messages.filter(
      (message) =>
        (message.sender_id == loggedInUserId && message.receiver_id == FindNameRole) ||
        (message.sender_id == FindNameRole && message.receiver_id == loggedInUserId)
    );

    return (
      <div className="chat-messages">
        {userNoAdmin.map((message) => (
          <div
            key={message.id}
            className={`message ${message.sender_id == loggedInUserId ? 'message-right' : 'message-left'}`}
          >
            <div>
              <div className="message-content">{message.content}</div>
              <br />
              <div className="message-timestamp">
              </div>
              {formatTimestamp(message.created_at)}
            </div>


          </div>
        ))}
      </div>
    );
  };

  const formatTimestamp = timestamp => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
  };
  return (
    <div className="  ">
      {isChatVisible && (
        <div className="chat-box">
          <div className=" bg-red-500 px-5 py-3 rounded-md">
            <img src={logo} alt="logo" width="30px" />
            <h3 className="chat-title">PolyTour</h3>
          </div>
          <div className="message-list">
            {alertMessager()}
          </div>

          <div className="input-area">
            <div className="input-container">
              <input
                type="text"
                placeholder="Nhập tin nhắn..."
                className="message-input border border-gray-900"
                value={inputValue}
                onChange={event => setInputValue(event.target.value)}

              />
              <button className="send-button" onClick={handleSendMessage}>
                Gửi
              </button>

            </div>
          </div>
        </div>
      )}

      <div className="icon" onClick={handleToggleChat}>
        <div  >
          <FontAwesomeIcon icon={faFacebookMessenger} style={{ color: 'blue', fontSize: '30px' }} />
        </div>
      </div>
    </div>
  );
}
export default MessageChatBox;