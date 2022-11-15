import React, { useContext } from "react";
import "../css/StreamList.css";
import { Link, Outlet } from "react-router-dom";
import TimeAgo from "./TimeAgo";
import { UserContext } from "./UserContext";

function StreamListItem({ stream, location }) {
  const { user } = useContext(UserContext);


  return (
    <div className="stream">
      <div className="d-flex">
        <div className="titleDesc">
          <Link to={`/streamShow/${stream.id}`}>
            <h5 className="streamName">{stream.streamName}</h5>
          </Link>

          <p className="streamDetails">{stream.streamDetails}</p>
        </div>
        <div className="ms-2">
          <TimeAgo timestamp={stream.date} streamData={stream}/>
        </div>
      </div>

      {user.email === stream.email && (
        <div className="buttons">
          <Link
            to={`/streamEdit/${stream.id}`}
            className="btn btn-primary me-3 test"
          >
            Edit
          </Link>
          <Link
            to={`/StreamDelete/${stream.id}`}
            state={{ background: location }}
            className="btn btn-danger test"
          >
            Delete
          </Link>
          <Outlet />
        </div>
      )}
    </div>
  );
}

export default StreamListItem;
