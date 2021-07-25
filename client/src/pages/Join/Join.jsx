import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Join.scss';

export default function SignIn() {
  const [room, setRoom] = useState('javascript');

  return (
    <div className="joinOuterContainer bg-primary">
      <div className="">
        <h1 className="heading">Join a room!</h1>
        <div>
          <select
            className="select"
            onChange={event => setRoom(event.target.value)}
          >
            <option value="javascript">Javascript</option>
            <option value="python">Python</option>
            <option value="web">Web</option>
            <option value="android">Android</option>
            <option value="ios">IOS</option>
            <option value="gamedev">Game Dev</option>
            <option value="help">Code help</option>
            <option value="databases">Databases</option>
          </select>
        </div>
        <Link
          onClick={e => (!room ? e.preventDefault() : null)}
          to={`/chat/${room}`}
        >
          <button disabled={true} className="btn" type="submit">
            Join
          </button>
        </Link>
      </div>
    </div>
  );
}
