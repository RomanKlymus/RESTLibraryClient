import React, {useEffect, useState} from "react";
import "./css/AddBook.css";
import {Button, Form, Input, InputNumber, Select} from "antd";
import UserService from "../../service/user.service";

const {Option} = Select;

const AddBook = (props) => {
    const [allAuthors, setAllAuthors] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const [bookForm, setBookForm] = useState({
        title: "",
        copies: 0,
        averageReadingHours: 1,
        description: "",
        authorId: 0,
        coAuthorsId: [],
    });

    const onSubmit = () => {
        setIsPending(true);
        console.log(bookForm);
        UserService.addBook(bookForm);
        setIsPending(false);
    };

    const onChange = (e) => {
        console.log(e.target.value);
        if (e.target.id === "title") {
            bookForm.title = e.target.value;
        }
        if (e.target.id === "description") {
            bookForm.description = e.target.value;
        }
    };

    useEffect(() => {
        fetch("/authors")
            .then((response) => response.json())
            .then((data) => setAllAuthors(data));
    }, []);

    return (
        <div>
            <Form
                layout="horizontal"
                size="middle"
                labelCol={{
                    span: 7,
                }}
                wrapperCol={{
                    offset: 0,
                    span: 10,
                }}
                onFinish={onSubmit}
            >
                <div className="book-form">
                    <Form.Item
                        name="title"
                        label="Title"
                        onChange={onChange}
                        rules={[
                            {required: true, message: "Please input book title!"},
                            {
                                required: false,
                                pattern: /^(?=[^-'ʼ\s]).*[^-'ʼ\s]$/,
                                message: "The title must start and end with a letter!",
                            },
                            {
                                max: 50,
                                message: "The name cannot be longer than 50 characters!",
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name="copies"
                        label="Copies"
                        rules={[
                            {required: true, message: "Please enter number of copies"},
                            {
                                type: "number",
                                min: 0,
                                message: "The number of copies cannot be negative!",
                            },
                        ]}
                    >
                        <InputNumber
                            onChange={(e) => {
                                bookForm.copies = e;
                            }}
                            onStep={(value) => {
                                bookForm.copies = value;
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="averageReadingHours"
                        label="Average reading hours"
                        rules={[
                            {
                                required: true,
                                message: "Please enter average reading hours of copies!",
                            },
                            {
                                type: "number",
                                min: 1,
                                message: "Enter at least one hour of reading!",
                            },
                        ]}
                    >
                        <InputNumber
                            name="averageReadingHours"
                            onChange={(value) => {
                                bookForm.averageReadingHours = value;
                            }}
                            onStep={(value) => {
                                bookForm.averageReadingHours = value;
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Description"
                        onChange={onChange}
                        rules={[
                            {
                                required: false,
                                max: 100000,
                                message: "Too many letters in the description!",
                            },
                        ]}
                    >
                        <Input.TextArea/>
                    </Form.Item>
                </div>

                <Form.Item
                    name="authorId"
                    label="Select author"
                    rules={[{required: true, message: "Please select author"}]}
                >
                    {
                        <Select
                            onChange={(value) => {
                                bookForm.authorId = value.value;
                            }}
                            labelInValue
                        >
                            {allAuthors.map((author) => (
                                <Select.Option key={author.id} value={author.id}>
                                    {author.name}
                                </Select.Option>
                            ))}
                        </Select>
                    }
                </Form.Item>

                <Form.Item label="Select co-authors">
                    {
                        <Select
                            onChange={(value) => {
                                bookForm.coAuthorsId = value;
                            }}
                            mode="multiple"
                        >
                            {allAuthors.map((author) => (
                                <Option key={author.id} value={author.id}>
                                    {author.name}
                                </Option>
                            ))}
                        </Select>
                    }
                </Form.Item>
                <Form.Item wrapperCol={{offset: 11}}>
                    <Button htmlType="submit" disabled={isPending}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
export default AddBook;
