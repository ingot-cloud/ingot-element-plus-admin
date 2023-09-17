<template>
  <div class="contacts-tab-list">
    <div
      class="tab"
      v-for="tab in tabs"
      :key="tab"
      :class="{ 'tab-active': selectTab === tab }"
      @click="onItemClick(tab)"
    >
      <div class="inner">
        {{ tab }}
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  selectTab: {
    type: String,
    required: true,
  },
});
const tabs = ref(["成员", "部门", "角色"]);
const go = useGo();
const onItemClick = (tab: string) => {
  if (tab === props.selectTab) {
    return;
  }
  switch (tab) {
    case "成员":
      go({
        path: "/contacts/member",
      });
      break;
    case "部门":
      go({
        path: "/contacts/dept",
      });
      break;
    case "角色":
      go({
        path: "/contacts/role",
      });
      break;
  }
};
</script>
<style scoped lang="postcss">
.contacts-tab-list {
  @apply flex flex-row;
  transition: transform 0.3s, -webkit-transform 0.3s;
  padding-left: 12px;
  padding-right: 12px;

  & .tab {
    @apply cursor-pointer;
    text-align: center;
    line-height: 24px;
    padding: 4px 0;
    margin: 0 4px 0 0;
    color: rgba(23, 26, 29, 0.6);
    background: transparent;
    border: 0;

    & .inner {
      padding: 8px 12px;
      border-radius: 4px;
      transition: all 0.3s;
      &:hover {
        background: rgba(126, 134, 142, 0.12);
      }
    }
  }

  & .tab-active {
    position: relative;

    & .inner {
      color: #171a1d;
      text-shadow: none;
      font-weight: 500;
    }

    &:after {
      content: "";
      height: 3px;
      width: 20px;
      background: #171a1d;
      margin: 0 auto;
      display: block;
      border-radius: 2px;
      position: absolute;
      bottom: 4px;
      left: 50%;
      transform: translate(-50%);
    }
  }
}
</style>
