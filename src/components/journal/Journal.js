import React, { useState, useEffect } from "react";
import UserService from "../../service/user.service";
import { Table, Button, Space } from "antd";

const Journal = (props) => {
  const [records, setRecords] = useState([]);
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "User",
      key: "",
      render: (record) => <div key={record.user.id}>{record.user.name}</div>,
    },
    {
      title: "Book",
      key: "book",
      render: (record) => <div key={record.book.id}>{record.book.title}</div>,
    },
    {
      title: "Rent date",
      dataIndex: "rentDate",
      key: "rentDate",
    },
    {
      title: "Expected return date",
      dataIndex: "expectedReturnDate",
      key: "expectedReturnDate",
    },
    {
      title: "Book return date",
      dataIndex: "bookReturnDate",
      key: "bookReturnDate",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Give book",
      key: "giveBook",
      render: (record) => {
        if (record.status === "REQUESTED") {
          return (
            <Space>
              <Button
                onClick={() => {
                  UserService.changeStatus(record.id, "GIVEN").then(() => {
                    UserService.getJournal().then((response) => {
                      setRecords(response.data);
                    });
                  });
                }}
              >
                Give book
              </Button>
              <Button
                danger
                onClick={() => {
                  UserService.changeStatus(record.id, "DECLINED").then(() => {
                    UserService.getJournal().then((response) => {
                      setRecords(response.data);
                    });
                  });
                }}
              >
                Decline
              </Button>
            </Space>
          );
        }
      },
    },
  ];

  useEffect(() => {
    UserService.getJournal().then((response) => {
      setRecords(response.data);
    });
  }, []);

  return (
    <div>
      <Table columns={columns} dataSource={records} />
    </div>
  );
};
export default Journal;
