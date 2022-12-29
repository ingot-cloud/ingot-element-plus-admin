import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import SwitchDark from "../InSwitchDark.vue";

describe("HelloWorld", () => {
  it("renders properly", () => {
    const wrapper = mount(SwitchDark, { props: { msg: "Hello Vitest" } });
    expect(wrapper.text()).toContain("Hello Vitest");
  });
});
