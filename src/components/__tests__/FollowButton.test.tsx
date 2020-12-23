import * as React from "react";
import ReactDOM, * as ReactDom from "react-dom";
import FollowButton from "../FollowButton";
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

describe("FollowButtonのテスト", () => {
  afterAll(() => {
    jest.resetAllMocks();
  });

  it("クラッシュせずにレンダリングされる", () => {
    console.error = jest.fn();
    const div = document.createElement("div");
    ReactDOM.render(<FollowButton />, div);
    ReactDOM.unmountComponentAtNode(div);
    expect(console.error).not.toHaveBeenCalled();
  });

  it("followボタンがレンダリングされているか", () => {
    const wrapper = mount(<FollowButton />);
    expect(wrapper.find("button.follow_btn").length).toBe(1);
  });
});
