import React from "react";
// @ts-expect-error ts-migrate(6142) FIXME: Module './Signup' was resolved to '/Users/ryota/Li... Remove this comment to see the full error message
import Signup from "./Signup";
import { Container, Row, Col } from "react-bootstrap";
// @ts-expect-error ts-migrate(6142) FIXME: Module '../contexts/AuthContext' was resolved to '... Remove this comment to see the full error message
import { AuthProvider } from "../contexts/AuthContext";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// @ts-expect-error ts-migrate(6142) FIXME: Module './Dashboard' was resolved to '/Users/ryota... Remove this comment to see the full error message
import Dashboard from "./Dashboard";
// @ts-expect-error ts-migrate(6142) FIXME: Module './Login' was resolved to '/Users/ryota/Lib... Remove this comment to see the full error message
import Login from "./Login";
// @ts-expect-error ts-migrate(6142) FIXME: Module './PrivateRoute' was resolved to '/Users/ry... Remove this comment to see the full error message
import PrivateRoute from "./PrivateRoute";
// @ts-expect-error ts-migrate(6142) FIXME: Module './ForgotPassword' was resolved to '/Users/... Remove this comment to see the full error message
import ForgotPassword from "./ForgotPassword";
// @ts-expect-error ts-migrate(6142) FIXME: Module './UpdateProfile' was resolved to '/Users/r... Remove this comment to see the full error message
import UpdateProfile from "./UpdateProfile";
// @ts-expect-error ts-migrate(6142) FIXME: Module './Home' was resolved to '/Users/ryota/Libr... Remove this comment to see the full error message
import Home from "./Home";
// @ts-expect-error ts-migrate(6142) FIXME: Module './Header' was resolved to '/Users/ryota/Li... Remove this comment to see the full error message
import Header from "./Header";
// @ts-expect-error ts-migrate(6142) FIXME: Module './Detail' was resolved to '/Users/ryota/Li... Remove this comment to see the full error message
import Detail from "./Detail";
// @ts-expect-error ts-migrate(6142) FIXME: Module './PostForm' was resolved to '/Users/ryota/... Remove this comment to see the full error message
import PostForm from "./PostForm";
// @ts-expect-error ts-migrate(6142) FIXME: Module './PostEdit' was resolved to '/Users/ryota/... Remove this comment to see the full error message
import PostEdit from "./PostEdit";
// @ts-expect-error ts-migrate(6142) FIXME: Module './Footer' was resolved to '/Users/ryota/Li... Remove this comment to see the full error message
import Footer from "./Footer";
// @ts-expect-error ts-migrate(6142) FIXME: Module './BookmarkList' was resolved to '/Users/ry... Remove this comment to see the full error message
import BookmarkList from "./BookmarkList";
// @ts-expect-error ts-migrate(6142) FIXME: Module './BookmarkList' was resolved to '/Users/ry... Remove this comment to see the full error message
import BookmarkListItem from "./BookmarkList";
import CssBaseline from "@material-ui/core/CssBaseline";

function App() {
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Router>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <AuthProvider>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <CssBaseline />
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Container>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Header />
        </Container>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Container
          className="d-flex justify-content-center"
          style={{ height: "100%", marginBottom: "60px" }}
        >
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <div className="w-100" style={{ maxWidth: "600px" }}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Switch>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Route path="/signup" component={Signup} />
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Route path="/login" component={Login} />
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Route path="/forgot-password" component={ForgotPassword} />
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <PrivateRoute exact path="/" component={Home} />
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <PrivateRoute
                exact
                path="/bookmarkList"
                component={BookmarkList}
              />
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <PrivateRoute
                exact
                path="/bookmarkListItem"
                component={BookmarkListItem}
              />
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <PrivateRoute exact path="/detail/:id" component={Detail} />
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <PrivateRoute path="/dashboard" component={Dashboard} />
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <PrivateRoute exact path="/postedit/:id" component={PostEdit} />
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <PrivateRoute path="/postform" component={PostForm} />
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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
