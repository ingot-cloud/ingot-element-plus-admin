<script setup lang="ts">
defineProps<{
  msg: string;
}>();
</script>

<template>
  <div class="greetings">
    <h1 class="green">
      <span class="test">{{ msg }}</span>
    </h1>
    <el-row>
      <el-button>Default</el-button>
      <el-button type="primary" dark>Primary</el-button>
      <el-button type="success" dark>Success</el-button>
      <el-button type="info" dark>Info</el-button>
      <el-button type="warning" dark>Warning</el-button>
      <el-button type="danger" dark>Danger</el-button>
    </el-row>
    <h3>
      You’ve successfully created a project with
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>.
      What's next?
    </h3>
  </div>
</template>

<style lang="postcss" scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
  & .test {
    color: red;
  }
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
