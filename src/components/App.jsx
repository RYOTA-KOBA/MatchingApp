import React from "react"
import Signup from "./Signup"
import { Container, Row, Col } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"
import Home from './Home'
import Header from './Header'
import Detail from "./Detail"
import PostForm from './PostForm'
import PostEdit from "./PostEdit"
import Footer from "./Footer"


function App() {
  return (
    <Router>
      <Container>
        <Header />
      </Container>
      <Container
        className="d-flex justify-content-center"
        style={{ height: "100%", marginBottom: "60px" }}
      >
        <div className="w-100" style={{ maxWidth: "600px" }}>
            <AuthProvider>
              <Switch>
                <PrivateRoute exact path="/" component={Home} />
                <PrivateRoute exact path="/detail/:id" component={Detail} />
                <PrivateRoute path="/dashboard" component={Dashboard} />
                <PrivateRoute path="/detail" component={Detail} />
                <PrivateRoute exact path="/postedit/:id" component={PostEdit} />
                <PrivateRoute path="/postform" component={PostForm} />
                <PrivateRoute path="/update-profile" component={UpdateProfile} />
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
                <Route path="/forgot-password" component={ForgotPassword} />
              </Switch>
            </AuthProvider>
        </div>
        
      </Container>
      {/* <Container style={{ padding: "0", margin: "0" }} >
        <Footer />
      </Container> */}
    </Router>
  )
}

export default App
