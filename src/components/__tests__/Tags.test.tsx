/**
 * @jest-environment jsdom
 */

import * as React from "react";
import ReactDOM, * as ReactDom from "react-dom";
import Tags from "../Tags";
import { configure, mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ReactRouterDom from "react-router-dom";

configure({ adapter: new Adapter() });

const mHistory = {
  push: jest.fn(),
};
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as typeof ReactRouterDom),
  useHistory: jest.fn(() => mHistory),
}));

describe("Tags", () => {
  afterAll(() => {
    jest.resetAllMocks();
  });
  it("renders without crashing", () => {
    console.error = jest.fn();
    const div = document.createElement("div");
    ReactDOM.render(<Tags />, div);
    ReactDOM.unmountComponentAtNode(div);
    expect(console.error).not.toHaveBeenCalled();
  });

  it("should render backend tags", () => {
    const wrapper = mount(<Tags />);
    expect(wrapper.find("div#backend").length).toBe(1);
  });

  it("should render frontend tags", () => {
    const wrapper = mount(<Tags />);
    expect(wrapper.find("div#frontend").length).toBe(1);
  });

  it("should be pushed correct path(backend)", () => {
    const wrapper = mount(<Tags />);
    const backend = wrapper.find("div#backend");
    backend.simulate("click");
    expect(mHistory.push).toBeCalledWith("/?category=backend");
  });

  it("should be pushed correct path(frontend)", () => {
    const wrapper = mount(<Tags />);
    const backend = wrapper.find("div#frontend");
    backend.simulate("click");
    expect(mHistory.push).toBeCalledWith("/?category=frontend");
  });
});
