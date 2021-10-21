import React from "react";
import {Button, Space, Table} from "antd";
import UserService from "../../service/user.service";
import {Link} from "react-router-dom";

export default class BookList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
        };
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch("/books")
            .then((response) => response.json())
            .then((data) => this.setState({books: data}));
    }

    async remove(id) {
        await UserService.deleteBook(id).then(() => {
            let updatedBooks = [...this.state.books].filter((i) => i.id !== id);
            this.setState({books: updatedBooks});
        });
    }

    render() {
        const {books} = this.state;
        const columns = [
            {
                title: "Title",
                key: "title",
                render: book => <Link to={"/book/" + book.id}>{book.title}</Link>
            },

            {
                title: "Author",
                key: "author",
                render: (book) => <>{book.mainAuthor.name}</>,
            },
            {
                title: "Actions",
                key: "actions",
                render: (book) => (
                    <Space size="middle">
                        <Button
                            size="small"
                            disabled={!this.props.user}
                            onClick={() => {
                                UserService.rentBook(book.id);
                            }}
                        >
                            {this.props.user
                                ? "Rent this book"
                                : "Please login to rent books"}
                        </Button>
                        {this.props.user && this.props.user.role.includes("ROLE_ADMIN") && (
                            <Space>
                                <Button
                                    size="small"
                                    onClick={() => this.remove(book.id)}
                                    danger
                                >
                                    Delete
                                </Button>
                            </Space>
                        )}
                    </Space>
                ),
            },
        ];

        return (
            <div>
                <Table columns={columns} dataSource={books}/>
            </div>
        );
    }
}
