import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Menu = ({cat}) => {

    // const posts = [
    //     {
    //       id:1,
    //       title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, quasi!",
    //       desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam corporis alias numquam atque deleniti voluptate distinctio minima veniam eveniet, totam quasi vero placeat sed neque eum reprehenderit dolorum omnis eos eaque libero explicabo! Error nam, atque nesciunt placeat reiciendis itaque modi labore enim qui animi doloremque aspernatur aperiam amet provident.",
    //       img: "https://images.pexels.com/photos/19180584/pexels-photo-19180584/free-photo-of-lost-in-the-melody-hooded-handpan-player-creating-magical-music.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
    //     },
    //     {
    //       id:2,
    //       title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, quasi!",
    //       desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam corporis alias numquam atque deleniti voluptate distinctio minima veniam eveniet, totam quasi vero placeat sed neque eum reprehenderit dolorum omnis eos eaque libero explicabo! Error nam, atque nesciunt placeat reiciendis itaque modi labore enim qui animi doloremque aspernatur aperiam amet provident.",
    //       img: "https://images.pexels.com/photos/19180584/pexels-photo-19180584/free-photo-of-lost-in-the-melody-hooded-handpan-player-creating-magical-music.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
    //     },
    //     {
    //       id:3,
    //       title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, quasi!",
    //       desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam corporis alias numquam atque deleniti voluptate distinctio minima veniam eveniet, totam quasi vero placeat sed neque eum reprehenderit dolorum omnis eos eaque libero explicabo! Error nam, atque nesciunt placeat reiciendis itaque modi labore enim qui animi doloremque aspernatur aperiam amet provident.",
    //       img: "https://images.pexels.com/photos/19180584/pexels-photo-19180584/free-photo-of-lost-in-the-melody-hooded-handpan-player-creating-magical-music.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
    //     },
    //     {
    //       id:4,
    //       title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, quasi!",
    //       desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam corporis alias numquam atque deleniti voluptate distinctio minima veniam eveniet, totam quasi vero placeat sed neque eum reprehenderit dolorum omnis eos eaque libero explicabo! Error nam, atque nesciunt placeat reiciendis itaque modi labore enim qui animi doloremque aspernatur aperiam amet provident.",
    //       img: "https://images.pexels.com/photos/19180584/pexels-photo-19180584/free-photo-of-lost-in-the-melody-hooded-handpan-player-creating-magical-music.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
    //     },
    //     {
    //       id:5,
    //       title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, quasi!",
    //       desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam corporis alias numquam atque deleniti voluptate distinctio minima veniam eveniet, totam quasi vero placeat sed neque eum reprehenderit dolorum omnis eos eaque libero explicabo! Error nam, atque nesciunt placeat reiciendis itaque modi labore enim qui animi doloremque aspernatur aperiam amet provident.",
    //       img: "https://images.pexels.com/photos/19180584/pexels-photo-19180584/free-photo-of-lost-in-the-melody-hooded-handpan-player-creating-magical-music.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
    //     },
    //     {
    //       id:6,
    //       title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, quasi!",
    //       desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam corporis alias numquam atque deleniti voluptate distinctio minima veniam eveniet, totam quasi vero placeat sed neque eum reprehenderit dolorum omnis eos eaque libero explicabo! Error nam, atque nesciunt placeat reiciendis itaque modi labore enim qui animi doloremque aspernatur aperiam amet provident.",
    //       img: "https://images.pexels.com/photos/19180584/pexels-photo-19180584/free-photo-of-lost-in-the-melody-hooded-handpan-player-creating-magical-music.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
    //     },
    //   ]

    const [posts, setPosts] = useState([]);


useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:8002/posts/?cat=${cat}`);
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  fetchData();
}, [cat]);

  return (
    <div className='menu'>
        <h1>Other Posts you may like</h1>
        { posts.map(post=> (
            <div className="post" key={post.id}>
                <img src={post.img} alt="" />
                <h2>{post.title}</h2>
                <button>Read More</button>
            </div>
        ))}
    </div>
  )
}

export default Menu