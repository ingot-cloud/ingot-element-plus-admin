<template>
  <ingot-container>
    首页
    <div>{{ user.username }}</div>
    <div>{{ roles }}</div>
  </ingot-container>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { user, roles } from "@/store/composition/auth";
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
