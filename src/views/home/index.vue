<template>
  <div>
    首页
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "@/store";
export default defineComponent({
  components: {},
  setup() {
    const store = useStore();
    console.log(store);
    console.log(store.getters.refreshToken);
    console.log(store.getters.accessToken);
  }
});
</script>
