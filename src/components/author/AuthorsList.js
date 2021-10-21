import React, {useEffect, useState} from "react";
import {Button, Space, Table} from "antd";

const AuthorsList = (props) => {
    const [allAuthors, setAllAuthors] = useState([]);
    const columns = [
        {
            title: "Author name",
            dataIndex: "name",
            key: "name",
        },
    ];

    useEffect(() => {
        fetch("/authors")
            .then((response) => response.json())
            .then((data) => setAllAuthors(data));
    }, []);

    return (
        <div>
            <Table columns={columns} dataSource={allAuthors}/>
        </div>
    );
};

export default AuthorsList;
