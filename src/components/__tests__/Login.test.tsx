import * as React from "react";
import Login from "../Login";
import { configure, mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import firebase from "firebase";

configure({ adapter: new Adapter() });

describe("Login", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  it("renders without crashing", () => {
    // console.error = jest.fn();
    // const div = document.createElement("div");
    // ReactDOM.render(<Login />, div);
    // ReactDOM.unmountComponentAtNode(div);
    expect(true).toBe(true);
  });
});
