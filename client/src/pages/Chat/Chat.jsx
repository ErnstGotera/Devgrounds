import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import TextContainer from './TextContainer';
import Messages from './Messages';
import onlineIcon from '../../assets/onlineIcon.png';
import closeIcon from '../../assets/closeIcon.png';

import './Chat.scss';

const Chat = ({ auth: { user } }) => {
  const { topic } = useParams();
  const [users, setUsers] = useState('');
  const [room, setRoom] = useState(topic);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const username = user.name;

  return (
    <div className="outerContainer">
      <div className="chat-container">
        <div className="infoBar">
          <div className="leftInnerContainer">
            <img className="onlineIcon" src={onlineIcon} alt="online icon" />
            <h3>{room}</h3>
          </div>
          <div className="rightInnerContainer">
            <a href="/join">
              <img src={closeIcon} alt="close icon" />
            </a>
          </div>
        </div>
        <Messages messages={messages} name={username} />
        <form className="form">
          <input
            className="input"
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
          <button
            value="Submit"
            type="submit"
            className="btn btn-dark my-1 sendButton"
          >
            Send
          </button>
        </form>
      </div>
      <TextContainer users={users} />
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Chat);
