<template>
  <div>
    首页
    <div>{{ user.username }}</div>
    <div>{{ roles }}</div>
  </div>
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
