import * as React from "react";
import ReactDOM, * as ReactDom from "react-dom";
import TimeLineLink from "../TimeLineLink";
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

describe("TimeLineLink", () => {
  afterAll(() => {
    jest.resetAllMocks();
  });
  it("クラッシュせずにレンダーするか", () => {
    console.error = jest.fn();
    const div = document.createElement("div");
    ReactDOM.render(<TimeLineLink />, div);
    ReactDOM.unmountComponentAtNode(div);
    expect(console.error).not.toHaveBeenCalled();
  });

  it("タイムラインリンクをレンダーするか", () => {
    const wrapper = mount(<TimeLineLink />);
    expect(wrapper.find("div#timeline").length).toBe(1);
  });

  it("正しいパスをpushするか", () => {
    const wrapper = mount(<TimeLineLink />);
    const backend = wrapper.find("div#timeline");
    backend.simulate("click");
    expect(mHistory.push).toBeCalledWith("/timeline");
  });
});
