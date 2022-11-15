import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Delete } from "../axios";
import { UserContext } from "./UserContext";
import "../css/StreamDelete.css";

function StreamDelete() {
  const { streamData, streamsData, setStreamData, setStreamsData } =
    useContext(UserContext);

  const navigate = useNavigate();
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

  function clear() {
    navigate(-1);
  }

  function deletePost() {
    Delete(id);
    navigate("/");

    setStreamsData((current) =>
      current.filter((element) => {
        return element.id !== id;
      })
    );
  }

  return (
    <div className="modal modalDiv1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Delete Stream</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={clear}
            ></button>
          </div>
          <div className="modal-body">
            <p>
              Are you sure you want to delete stream{" "}
              <b>{streamData.streamName}</b>
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
              onClick={deletePost}
            >
              Delete
            </button>
            <button type="button" className="btn btn-primary" onClick={clear}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StreamDelete;

