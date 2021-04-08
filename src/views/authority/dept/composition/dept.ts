import { reactive } from "vue";

// 部门数据
export const deptData = reactive({
  props: {
    children: "children",
    label: "label"
  },
  data: [
    {
      id: 1,
      label: "一级 2",
      children: [
        {
          id: 2,
          label: "二级 2-1",
          children: [
            {
              label: "三级 2-1-1"
            }
          ]
        },
        {
          id: 3,
          label: "二级 2-2",
          children: [
            {
              label: "三级 2-2-1"
            }
          ]
        }
      ]
    }
  ]
});

// 获取部门数据
export function fetchDeptData() {
  // todo
}
