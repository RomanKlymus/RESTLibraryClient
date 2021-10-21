import { Menu, Space } from "antd";
import React from "react";
import { BookOutlined, HomeOutlined } from "@ant-design/icons";
import { Link, Redirect } from "react-router-dom";
import AuthService from "../../service/auth.service";
import "./css/TopMenu.css";

const { SubMenu } = Menu;

export default class TopMenu extends React.Component {
  state = {
    current: "main",
  };

  handleClick = (e) => {
    console.log("click ", e);
    this.setState({ current: e.key });
  };

  logOut = () => {
    AuthService.logout();
    window.location.reload();
    return <Redirect to="/"/>
  }

  render() {
    const { current } = this.state;
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[current]}
        mode="horizontal"
      >
        <Menu.Item key="main" icon={<HomeOutlined />}>
          <Link to="/">Main page</Link>
        </Menu.Item>
        <SubMenu key="booksSubMenu" icon={<BookOutlined />} title="Books">
          {(this.props.user && this.props.user.role.includes("ROLE_ADMIN")) && (
            <Menu.Item key="addBook" title="Add book">
              <Link to="/book/new">Add book</Link>
            </Menu.Item>
          )}
          <Menu.Item key="allBooks" title="All books">
            <Link to="/books">All books</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="authors">
          <Link to="/authors">Authors</Link>
        </Menu.Item>
        {(this.props.user && this.props.user.role.includes("ROLE_ADMIN")) && (
            <Menu.Item key="journal" title="Journal">
              <Link to="/journal">Journal</Link>
            </Menu.Item>
          )}
        {!this.props.user && (
          <Menu.Item key="login">
            <Link to="/login">Signin</Link>
          </Menu.Item>
        )}
        {!this.props.user && (
          <Menu.Item key="register">
            <Link to="/register">Signup</Link>
          </Menu.Item>
        )}
        {this.props.user && (
          <Menu.Item key="profile">
            <Link to="/profile">Profile</Link>
          </Menu.Item>
        )}
        {this.props.user && (
          <Menu.Item key="logout" onClick={this.logOut}>
            Logout
          </Menu.Item>
        )}
      </Menu>
    );
  }
}
