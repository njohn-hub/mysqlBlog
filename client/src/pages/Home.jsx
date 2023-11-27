import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Home = () => {
  // const posts = [
  //   {
  //     id:1,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, quasi!",
  //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam corporis alias numquam atque deleniti voluptate distinctio minima veniam eveniet, totam quasi vero placeat sed neque eum reprehenderit dolorum omnis eos eaque libero explicabo! Error nam, atque nesciunt placeat reiciendis itaque modi labore enim qui animi doloremque aspernatur aperiam amet provident.",
  //     img: "https://images.pexels.com/photos/19180584/pexels-photo-19180584/free-photo-of-lost-in-the-melody-hooded-handpan-player-creating-magical-music.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
  //   },
  //   {
  //     id:2,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, quasi!",
  //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam corporis alias numquam atque deleniti voluptate distinctio minima veniam eveniet, totam quasi vero placeat sed neque eum reprehenderit dolorum omnis eos eaque libero explicabo! Error nam, atque nesciunt placeat reiciendis itaque modi labore enim qui animi doloremque aspernatur aperiam amet provident.",
  //     img: "https://images.pexels.com/photos/19180584/pexels-photo-19180584/free-photo-of-lost-in-the-melody-hooded-handpan-player-creating-magical-music.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
  //   },
  //   {
  //     id:3,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, quasi!",
  //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam corporis alias numquam atque deleniti voluptate distinctio minima veniam eveniet, totam quasi vero placeat sed neque eum reprehenderit dolorum omnis eos eaque libero explicabo! Error nam, atque nesciunt placeat reiciendis itaque modi labore enim qui animi doloremque aspernatur aperiam amet provident.",
  //     img: "https://images.pexels.com/photos/19180584/pexels-photo-19180584/free-photo-of-lost-in-the-melody-hooded-handpan-player-creating-magical-music.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
  //   },
  //   {
  //     id:4,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, quasi!",
  //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam corporis alias numquam atque deleniti voluptate distinctio minima veniam eveniet, totam quasi vero placeat sed neque eum reprehenderit dolorum omnis eos eaque libero explicabo! Error nam, atque nesciunt placeat reiciendis itaque modi labore enim qui animi doloremque aspernatur aperiam amet provident.",
  //     img: "https://images.pexels.com/photos/19180584/pexels-photo-19180584/free-photo-of-lost-in-the-melody-hooded-handpan-player-creating-magical-music.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
  //   },
  //   {
  //     id:5,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, quasi!",
  //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam corporis alias numquam atque deleniti voluptate distinctio minima veniam eveniet, totam quasi vero placeat sed neque eum reprehenderit dolorum omnis eos eaque libero explicabo! Error nam, atque nesciunt placeat reiciendis itaque modi labore enim qui animi doloremque aspernatur aperiam amet provident.",
  //     img: "https://images.pexels.com/photos/19180584/pexels-photo-19180584/free-photo-of-lost-in-the-melody-hooded-handpan-player-creating-magical-music.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
  //   },
  //   {
  //     id:6,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, quasi!",
  //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam corporis alias numquam atque deleniti voluptate distinctio minima veniam eveniet, totam quasi vero placeat sed neque eum reprehenderit dolorum omnis eos eaque libero explicabo! Error nam, atque nesciunt placeat reiciendis itaque modi labore enim qui animi doloremque aspernatur aperiam amet provident.",
  //     img: "https://images.pexels.com/photos/19180584/pexels-photo-19180584/free-photo-of-lost-in-the-melody-hooded-handpan-player-creating-magical-music.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
  //   },
  // ]

  const [posts, setPosts] = useState([]);

  const cat = useLocation().search 


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8002/posts/${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
            <div className="post" key={post.id}>
              <div className="img">
                <img src={`./upload/${post.img}`} alt="" />
              </div>
              <div className="content">
                <Link className="link" to={`/single/${post.id}`}>
                  <h1>{post.title}</h1>
                </Link>
                <p>{post.desc}</p>
                <button>Read More</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
