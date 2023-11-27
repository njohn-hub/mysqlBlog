import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation } from "react-router-dom";

const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.value || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("http://localhost:8002/upload/", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      state
        ? await axios.put(`http://localhost:8002/posts${state.id}`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
          })
        : await axios.post(`http://localhost:8002/posts`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          placeholder="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b>Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            {" "}
            Upload Image
          </label>
          <div className="buttons">
            <button>Save as draft</button>
            <button onClick={handleSubmit}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
              onChange={(e) => setCat(e.target.value)}
              type="radio"
              name="cat"
              value="art"
              id="art"
              checked={cat === "art"}
            />
            <label htmlFor="art">ART</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              onChange={(e) => setCat(e.target.value)}
              value="science"
              id="science"
              checked={cat === "science"}
            />
            <label htmlFor="science">SCIENCE</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              onChange={(e) => setCat(e.target.value)}
              value="technology"
              id="technology"
              checked={cat === "technology"}
            />
            <label htmlFor="technology">TECHNOLOGY</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
