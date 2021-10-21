import axios from "axios";
import authHeader from "./auth-header";

const addBook = (book) => {
    const request = {
        method: "post",
        url: "/book",
        data: book,
        headers: authHeader(),
    };
    console.log(request);
    return axios(request);
};

const getJournal = () => {
    const request = {
        method: "get",
        url: "/journal",
        headers: authHeader(),
    };
    return axios(request);
};

const rentBook = (id) => {
    const request = {
        method: "post",
        url: "/journal",
        data: {
            bookId: id,
        },
        headers: authHeader(),
    };
    return axios(request);
};

const getUserBooks = () => {
    const request = {
        method: "get",
        url: "/user/books",
        headers: authHeader(),
    };
    return axios(request);
};

const changeStatus = (id, s) => {
    const request = {
        method: "patch",
        url: "/journal/" + id,
        data: {
            status: s,
        },
    };
    return axios(request);
}

const deleteBook = (id) => {
    const request = {
        method: "delete",
        url: "/book/" + id,
        headers: authHeader(),
    };
    return axios(request);
}

const getBookInfo = (id) => {
    const request = {
        method: "get",
        url: "/book/" + id,
        headers: authHeader(),
    };
    return axios(request);
}

const getUserInfo = () => {
    const request = {
        method: "get",
        url: "/user",
        headers: authHeader(),
    };
    return axios(request);
}

export default {addBook, getJournal, rentBook, getUserBooks, changeStatus, deleteBook, getBookInfo, getUserInfo};
