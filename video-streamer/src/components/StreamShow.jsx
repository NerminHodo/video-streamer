import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "./UserContext";
import "../css/StreamShow.css";

function StreamShow() {
  const { streamData, streamsData, setStreamData, renderVideo } =
    useContext(UserContext);

  // const [renderVideo, setRenderVideo] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    // eslint-disable-next-line array-callback-return
    streamsData.map((e) => {
      if (e.id === id) {
        setStreamData(e);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="streamDiv">
      {renderVideo ? (
        <div></div>
      ) : (
        <div className="overlayDiv">
          <h1>Stream Not Live</h1>
        </div>
      )}
      <video
        id="videoElement"
        preload="none"
        style={{ width: "100%" }}
        controls={true}
      />
      <div className="streamInfo">
        <h1 className="infoStreamName">{streamData.streamName}</h1>
        <hr />
        <p className="infoStreamDescription">{streamData.streamDetails}</p>
      </div>
    </div>
  );
}

export default StreamShow;
