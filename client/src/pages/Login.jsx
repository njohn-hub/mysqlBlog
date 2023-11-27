import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [err, setErr] = useState(null);
  const navigate = useNavigate();
  const {currentUser, login} = useContext(AuthContext)

  console.log(currentUser)

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(inputs)
      navigate("/");
      // console.log(res)
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <div className="auth">
      <h1>Login</h1>
      <form action="">
        <input
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Login</button>
        {err && <p>{err}</p>}{" "}
        <span>
          Don't have an account{" "}
          <Link className="link" to="/register">
            Register
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
