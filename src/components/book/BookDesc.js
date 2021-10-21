import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import UserService from "./../../service/user.service";
import {Descriptions, Button} from "antd";

const BookDesc = (props) => {
    const [book, setBook] = useState({
        title: "",
        copies: 0,
        averageReadingHours: 1,
        description: "",
        author: {
            id: 0,
            name: ""
        },
        coAuthors: [{
            id: 0,
            name: ""
        }],
    });
    const {id} = useParams();

    useEffect(() => {
        UserService.getBookInfo(id).then((response) => {
            setBook(response.data)
        });
    }, []);

    return (
        <div>

            <Descriptions title="Book info">
                <Descriptions.Item label="Title">{book.title}</Descriptions.Item>
                <Descriptions.Item label="Copies">{book.copies}</Descriptions.Item>
                <Descriptions.Item label="Average reading hours">{book.averageReadingHours}</Descriptions.Item>
                <Descriptions.Item label="Description">{book.description}</Descriptions.Item>
                <Descriptions.Item label="Author">{book.author.name}</Descriptions.Item>
                <Descriptions.Item label="Co-authors">
                    <ul>
                        {book.coAuthors.map((author) => <li key={author.id}>{author.name}</li>)}
                    </ul>
                </Descriptions.Item>
            </Descriptions>
            <Button
                disabled={!props.user}
                onClick={() => {
                    UserService.rentBook(book.id);
                }}
            > {props.user
                ? "Rent this book"
                : "Please login to rent books"}</Button>
        </div>
    );
}
export default BookDesc;