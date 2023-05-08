import React from "react";

import "../App.css";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const onfinishHandler = async (values) => {
    try {
      const res = await axios.post(
        "https://long-jade-beanie.cyclic.app/api/v1/user/login",
        values
      );

      if (res.data.success) {
        if (values.email == "admin@admin.com") {
          console.log("Admin");
          localStorage.setItem("admin", res.data.token);
          console.log(localStorage.getItem("admin"));
          message.success("Login Successfully");
          navigate("/");
        } else {
          localStorage.setItem("token", res.data.token);
          message.success("Login Successfully");
          navigate("/");
        }
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      // dispatch(hideLoading());
      console.log(error);
      message.error("something went wrong");
    }
  };
  return (
    <div className="loginForm">
      <Form
        layout="vertical"
        onFinish={onfinishHandler}
        className="register-form"
      >
        <h3 className="text-center">Login From</h3>

        <Form.Item label="Email" name="email" className="label">
          <Input type="email" required />
        </Form.Item>
        <Form.Item label="Password" name="password" className="label">
          <Input type="password" required />
        </Form.Item>
        <Link to="/register" className="m-2">
          Not a user Register here
        </Link>
        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </Form>
    </div>
  );
};

export default Login;
