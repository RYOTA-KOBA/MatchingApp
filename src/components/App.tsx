import React from "react";
import Signup from "./Signup";
import { Container, Row, Col } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import Home from "./Home";
import Header from "./Header";
import Detail from "./Detail";
import PostForm from "./PostForm";
import PostEdit from "./PostEdit";
import Footer from "./Footer";
import BookmarkList from "./BookmarkList";
import BookmarkListItem from "./BookmarkList";
import CssBaseline from "@material-ui/core/CssBaseline";
import UserProfile from "./UserProfile";

function App() {
  return (
    <Router>
      <AuthProvider>
        <CssBaseline />
        <Container>
          <Header />
        </Container>
        <Container
          className="d-flex justify-content-center"
          style={{ height: "100%", marginBottom: "60px" }}
        >
          <div className="w-100">
            <Switch>
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <PrivateRoute exact path="/" component={Home} />
              <PrivateRoute
                exact
                path="/bookmarkList"
                component={BookmarkList}
              />
              <PrivateRoute
                exact
                path="/bookmarkListItem"
                component={BookmarkListItem}
              />
              <PrivateRoute exact path="/detail/:id" component={Detail} />
              <PrivateRoute exact path="/dashboard/:id" component={Dashboard} />
              <PrivateRoute
                exact
                path="/userprofile/:id"
                component={UserProfile}
              />
              <PrivateRoute exact path="/postedit/:id" component={PostEdit} />
              <PrivateRoute path="/postform" component={PostForm} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
            </Switch>
          </div>
        </Container>
        {/* <Container style={{ padding: "0", margin: "0" }} >
        <Footer />
      </Container> */}
      </AuthProvider>
    </Router>
  );
}

export default App;
