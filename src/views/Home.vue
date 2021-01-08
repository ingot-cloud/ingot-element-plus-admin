<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <el-button>默认按钮</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

export default defineComponent({
  name: "Home",
  components: {}
});
</script>
