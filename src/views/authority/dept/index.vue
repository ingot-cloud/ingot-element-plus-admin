<template>
  <ingot-container>
    部门
    <div>{{ user.username }}</div>
    <div>{{ roles }}</div>
    <div style="height: 2000px; background:red;"></div>
  </ingot-container>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { user, roles } from "@/core/store/composition/auth";
import { defineComponent } from "vue";
export default defineComponent({
  components: {},
  setup() {
    const store = useStore();
    return {
      user: user(store),
      roles: roles(store)
    };
  }
});
</script>
