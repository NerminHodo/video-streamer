import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { Update } from "../axios";

function StreamEdit() {
  const { streamData, streamsData, setStreamsData, user } = useContext(UserContext);

  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [key, setKey] = useState("");
  const [err, setErr] = useState({ title: false, desc: false, key: false });

  useEffect(() => {
    // eslint-disable-next-line array-callback-return
    streamsData.map((e) => {
      if (e.id === id) {
        setTitle(e.streamName);
        setDesc(e.streamDetails);
        setKey(e.streamKey);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = useNavigate();

  function clear() {
    setTitle("");
    setDesc("");
    setErr((e) => {
      return { title: false, desc: false, key: false };
    });
  }

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }
  function handleDescChange(e) {
    setDesc(e.target.value);
  }
  function handleKeyChange(e) {
    setKey(e.target.value);
  }

  function handleButton(e) {
    if (title && desc && key) {
      setStreamsData((e) => {
        let dbObject = {
          id: id,
          username: user.name,
          email: user.email,
          streamName: title,
          streamDetails: desc,
          streamKey: key,
          date: new Date().toISOString(),
        };

        Update(dbObject);

        const newState = streamsData.map((obj) => {
          if (obj.id === id) {
            return {
              ...obj,
              streamName: title,
              streamDetails: desc,
              streamKey: key,
              date: new Date().toISOString(),
            };
          }
          return obj;
        });

        return newState;
      });

      e.preventDefault();
      clear();
      navigate("/");
    } else {
      if (!title) {
        setErr((e) => {
          return { title: true, desc: e.desc, key: e.key };
        });
      } else {
        setErr((e) => {
          return { title: false, desc: e.desc, key: e.key };
        });
      }

      if (!desc) {
        setErr((e) => {
          return { title: e.title, desc: true, key: e.key };
        });
      } else {
        setErr((e) => {
          return { title: e.title, desc: false, key: e.key };
        });
      }

      if (!key) {
        setErr((e) => {
          return { title: e.title, desc: e.desc, key: true };
        });
      } else {
        setErr((e) => {
          return { title: e.title, desc: e.desc, key: false };
        });
      }
    }
  }
  if (streamData) {
    return (
      <div className="">
        <h1>Edit Stream</h1>
        <div className="form">
          <form action="" method="">
            <div>
              <div className="input-group mb-3">
                <span
                  className="input-group-text"
                  id="inputGroup-sizing-default"
                >
                  Stream Name
                </span>
                <input
                  type="text"
                  className="form-control"
                  value={title}
                  onChange={handleTitleChange}
                  required={true}
                />
              </div>
              <p
                className="error"
                style={{ display: err.title ? "block" : "none" }}
              >
                You must enter Stream Name
              </p>
              <div className="input-group mb-3">
                <span
                  className="input-group-text"
                  id="inputGroup-sizing-default"
                >
                  Stream Description
                </span>
                <input
                  type="text"
                  className="form-control"
                  value={desc}
                  onChange={handleDescChange}
                  required={true}
                />
              </div>
              <p
                className="error"
                style={{ display: err.desc ? "block" : "none" }}
              >
                You must enter Stream Description
              </p>
              <div className="input-group mb-3">
                <span
                  className="input-group-text"
                  id="inputGroup-sizing-default"
                >
                  Stream Key
                </span>
                <input
                  type="text"
                  className="form-control"
                  value={key}
                  onChange={handleKeyChange}
                  required={true}
                />
              </div>
            </div>
            <p
              className="error"
              style={{ display: err.key ? "block" : "none" }}
            >
              You must enter Stream Key
            </p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button
                className="btn btn-primary me-md-2"
                type="button"
                onClick={handleButton}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default StreamEdit;
