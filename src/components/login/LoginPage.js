import React, { useState } from "react";
import AuthService from "../../service/auth.service";
import { Form, Input, Button, Card } from "antd";
import "./css/LoginPage.css";

const LoginPage = (props) => {
  const [logForm, setLogForm] = useState({
    email: "",
    password: "",
  });
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState(null);

  const onChange = (e) => {
    if (e.target.id === "email") {
      logForm.email = e.target.value;
    }
    if (e.target.id === "password") {
      logForm.password = e.target.value;
    }
  };

  const handleLogin = (e) => {
    setIsPending(true);
    AuthService.login(logForm.email, logForm.password).then(
      () => {
        props.history.push("/profile");
        window.location.reload();
        console.log(localStorage.getItem("user"));
        setIsPending(false);
      },
      (error) => {
        setIsPending(false);
        setMessage("You entered wrong email or password!");
      }
    );
  };

  return (
    <div>
      <Form
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 10 }}
        initialValues={{ remember: true }}
        onFinish={handleLogin}
        autoComplete="off"
      >
        <div className="login-form" onChange={onChange}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <div className="submit-button">
            <Form.Item wrapperCol={{ offset: 10 }}>
              <Button type="primary" htmlType="submit" disabled={isPending}>
                Submit
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
      {message && (
        <div className="error-message">
          <Card style={{ width: 390, height: 90 }}>
            <p className="error-message-text">{message}</p>
          </Card>
        </div>
      )}
    </div>
  );
};
export default LoginPage;
