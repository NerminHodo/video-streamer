import React, { useContext } from "react";
import StreamListItem from "./StreamListItem";
import "../css/StreamList.css";
import { UserContext } from "./UserContext";
import { useLocation } from "react-router-dom";

function StreamList() {
  const { streamsData } = useContext(UserContext);
  const location = useLocation();

  

  return (
    <div className="streamsList">
      <h1>Streams</h1>
      <div className="Streams">
        {streamsData.map((stream, i) => (
          <div className="" key={stream.id}>
            <StreamListItem stream={stream} location={location} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default StreamList;
