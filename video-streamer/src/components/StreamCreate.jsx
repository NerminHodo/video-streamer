import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Post } from "../axios";
import "../css/StreamCreate.css";
import { UserContext } from "./UserContext";
import { nanoid } from "nanoid";

function StreamCreate() {
  const { user, setStreamsData } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [key, setKey] = useState("");
  const [err, setErr] = useState({ title: false, desc: false, key: false });

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
      //Post(key, title, desc, user.name, user.email);
      let dbObject = {
        id: nanoid(),
        username: user.name,
        email: user.email,
        streamName: title,
        streamDetails: desc,
        streamKey: key,
        date: new Date().toISOString(),
      };
      setStreamsData((e) => {
        return [...e, dbObject];
      });
      Post(dbObject);
      e.preventDefault();
      clear();
      navigate("/");
    } else {
      title
        ? setErr((e) => {
            return { title: false, desc: e.desc, key: e.key };
          })
        : setErr((e) => {
            return { title: true, desc: e.desc, key: e.key };
          });

      desc
        ? setErr((e) => {
            return { title: e.title, desc: false, key: e.key };
          })
        : setErr((e) => {
            return { title: e.title, desc: true, key: e.key };
          });

      key
        ? setErr((e) => {
            return { title: e.title, desc: e.desc, key: false };
          })
        : setErr((e) => {
            return { title: e.title, desc: e.desc, key: true };
          });
    }
  }
  return (
    <div className="">
      <h1>Create a Stream</h1>
      <div className="form">
        <form action="" method="">
          <div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="inputGroup-sizing-default">
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
              <span className="input-group-text" id="inputGroup-sizing-default">
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
              <span className="input-group-text" id="inputGroup-sizing-default">
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
          <p className="error" style={{ display: err.key ? "block" : "none" }}>
            You must enter Stream Key
          </p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button
              className="btn btn-primary me-md-2"
              type="button"
              onClick={handleButton}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StreamCreate;
