import React, { useState } from "react";
import { Form, Input, Button, DatePicker } from "antd";
import AuthService from "../../service/auth.service";

const RegForm = (props) => {
  const [regForm, setRegForm] = useState({
    name: "",
    email: "",
    password: "",
    secondPassword: "",
    birthday: "",
  });
  const [isValid, setValid] = useState(false);
  const [message, setMessage] = useState("");

  const onChange = (e) => {
    if (e.target.id === "name") {
      regForm.name = e.target.value;
    }
    if (e.target.id === "email") {
      regForm.email = e.target.value;
    }
    if (e.target.id === "password") {
      regForm.password = e.target.value;
    }
    if (e.target.id === "secondPassword") {
      regForm.secondPassword = e.target.value;
    }
    if (e.target.id === "birthday") {
      regForm.birthday = e.target.value;
    }

    if (regForm.password === regForm.secondPassword) {
      setValid(true);
    } else {
      setValid(false);
    }
  };

  const handleReg = (e) => {
    setMessage("");
    AuthService.register(
      regForm.name,
      regForm.email,
      regForm.password,
      regForm.birthday
    ).then(
      (response) => {
        props.history.push({
            pathname: "/login",
            state: {history: props.history}
        });
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
      }
    );
  };

  return (
    <div>
      <Form
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 10 }}
        initialValues={{ remember: true }}
        onFinish={handleReg}
        autoComplete="off"
      >
        <div className="login-form" onChange={onChange}>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
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

          <Form.Item
            label="Submit password"
            name="secondPassword"
            rules={[
              { required: true, message: "Please submit your password!" },
              ({ getFieldValue }) => ({
                validator(value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  if (!isValid) {
                    return Promise.reject(new Error("Passwords must match!"));
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Select your birthday"
            name="birthday"
            rules={[
              { required: true, message: "Please select your birthday!" },
            ]}
          >
            <DatePicker
              onChange={(date) => {
                if (date) {
                  regForm.birthday = date.toJSON();
                }
              }}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 11 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
          {message}
        </div>
      </Form>
    </div>
  );
};
export default RegForm;
