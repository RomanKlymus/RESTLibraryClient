import React, {useEffect, useState} from "react";
import {Button, Col, Descriptions, Row, Space, Table} from "antd";
import {Redirect} from "react-router-dom";
import AuthService from "../../service/auth.service";
import UserService from "../../service/user.service";
import "./css/UserProfile.css";

const UserProfile = () => {
    const currentUser = AuthService.getCurrentUser();
    const [user, setUser] = useState({
        name: "",
        email: "",
        birthday: "",
        registrationDate: ""
    });
    const [books, setBooks] = useState([]);
    const columns = [
        {
            title: "Book",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Status",
            key: "status",
            render: (book) => {
                switch (book.status) {
                    case "REQUESTED":
                        return <>Requested</>;
                    case "GIVEN":
                        return <>Currently reading</>;
                    case "RETURNED":
                        return <>Returned</>;
                    case "DECLINED":
                        return <>Declined</>;
                    default:
                        return <>Unknown status</>;
                }
            },
        },
        {
            title: "Return book",
            key: "returnBook",
            render: (book) => {
                if (book.status === "GIVEN") {
                    return (
                        <Space>
                            <Button
                                onClick={() => {
                                    UserService.changeStatus(book.id, "RETURNED").then(() =>
                                        UserService.getUserBooks().then((response) =>
                                            setBooks(response.data)
                                        )
                                    );
                                }}
                            >
                                Return
                            </Button>
                        </Space>
                    );
                }
            },
        },
    ];

    useEffect(() => {
        UserService.getUserBooks().then((response) => setBooks(response.data));
        UserService.getUserInfo().then((response) => setUser(response.data));
    }, []);

    if (!currentUser) {
        return <Redirect to="/"/>;
    }
    return (
        <Row gutter={[8, 8]}>
            <Col span={8}>
                <div className="user-info">
                    <Descriptions title="Your info" layout="vertical">
                        <Descriptions.Item label="Name">
                            {user.name}
                        </Descriptions.Item>
                        <Descriptions.Item label="Email">
                            {user.email}
                        </Descriptions.Item>
                        <Descriptions.Item label="Birthday">
                            {user.birthday}
                        </Descriptions.Item>
                        <Descriptions.Item label="Registration date">
                            {user.registrationDate}
                        </Descriptions.Item>
                    </Descriptions>
                </div>
            </Col>
            <Col span={12}>
                <div className="books-table">
                    <Table
                        columns={columns}
                        dataSource={books}
                        size="small"
                        bordered
                        title={() => <b>Your books</b>}
                    />
                </div>
            </Col>
        </Row>
    );
};
export default UserProfile;
