import * as React from "react";
import Login from "../Login";
import { configure, mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ReactDOM from "react-dom";
import firebase from "firebase";
import { useAuth } from "../../contexts/AuthContext";

configure({ adapter: new Adapter() });

jest.mock("firebase/app", () => {
  return {
    auth: jest.fn().mockReturnThis(),
    signInWithEmailAndPassword: jest.fn(),
  };
});

describe("Login", () => {
  // afterEach(() => {
  //   jest.resetAllMocks();
  // });
  it("renders without crashing", async () => {
    // console.error = jest.fn();
    // const div = document.createElement("div");
    // ReactDOM.render(<Login />, div);
    // ReactDOM.unmountComponentAtNode(div);
    // expect(true).toBe(true);
    const { login }: any = useAuth();
    const email = "guest@example.com";
    const password = "password";
    await login(email, password);
    expect(firebase.auth().signInWithEmailAndPassword).toBeCalledWith(
      email,
      password
    );
  });
});
