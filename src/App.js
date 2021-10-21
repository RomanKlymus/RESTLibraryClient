import React, { useState, useEffect } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import BookList from "./components/book/BookList";
import TopMenu from "./components/layout/TopMenu";
import { createBrowserHistory } from "history";
import Home from "./components/Main";
import AddBook from "./components/book/AddBook";
import AuthorsList from "./components/author/AuthorsList";
import LoginPage from "./components/login/LoginPage";
import UserProfile from "./components/user/UserProfile";
import AuthService from "./service/auth.service";
import RegForm from "./components/registration/RegForm";
import Journal from "./components/journal/Journal";
import BookDesc from "./components/book/BookDesc";

const App = () => {
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const history = createBrowserHistory();

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setIsUserAdmin(user.role.includes("ROLE_ADMIN"));
    }
  }, []);

  return (
    <div>
      <Router>
        <TopMenu user={currentUser}/>
        <Switch>
          <Route exact path="/" history={history}>
            <Home />
          </Route>
          <Route exact path="/books" history={history}>
            <BookList user={currentUser}/>
          </Route>
          <Route exact path="/book/new" history={history}>
            <AddBook isAdmin={isUserAdmin}/>
          </Route>
          <Route exact path="/authors" history={history}>
            <AuthorsList user={currentUser}/>
          </Route>
          <Route exact path="/login" history={history}>
            <LoginPage history={history}/>
          </Route>
          <Route exact path="/profile" history={history}>
            <UserProfile />
          </Route>
          <Route exact path="/register" history={history}>
            <RegForm history={history}/>
          </Route>
          <Route exact path="/journal" history={history}>
            <Journal />
          </Route>
          <Route exact path="/book/:id" history={history}>
            <BookDesc user={currentUser}/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
