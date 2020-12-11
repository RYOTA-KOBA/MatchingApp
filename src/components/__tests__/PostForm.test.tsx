import * as React from "react";
import ReactDOM from "react-dom";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PostForm from "../PostForm";

configure({ adapter: new Adapter() });

describe("PostForm", () => {
  //   it("renders without crashing", () => {
  //     console.error = jest.fn();
  //     const div = document.createElement("div");
  //     ReactDOM.render(<PostForm />, div);
  //     ReactDOM.unmountComponentAtNode(div);
  //     expect(console.error).not.toHaveBeenCalled();
  //   });

  //   it("should render ID text field", () => {
  //     const wrapper = mount(<PostForm />);
  //     expect(wrapper.find("input").length).toBe(2);
  //   });
  it("サンプル", () => {
    expect(1 + 1).toBe(2);
  });
});

// describe("サンプル", () => {
//   expect(1 + 1).toBe(2);
// });
