import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/authContext";

const Single = () => {
  const [post, setPost] = useState({});

  const location = useLocation();
  const navigate = useNavigate()

  const postId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8002/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8002/posts/${postId}`);
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="single">
      <div className="content">
        <img src={post?.profilePic} alt="" />
        <div className="user">
          {post.img && <img src={post.img} alt="" />}
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser.username === post.username && (
            <div className="edit">
              <Link to={`/write?edit=2`} state={post}> 
                <i
                  className="fa-solid fa-pen-to-square"
                  style={{ color: "teal", cursor: "pointer" }}
                ></i>
              </Link>
              <i
                onClick={handleDelete}
                className="fa-solid fa-trash"
                style={{ color: "tomato", cursor: "pointer" }}
              ></i>
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        <p>{post.desc}</p>
      </div>
      <div className="menu">
        <Menu cat={post.cat} />
      </div>
    </div>
  );
};

export default Single;
