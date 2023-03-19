<template>
  <div>
    <nuxt />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class CustomLayout extends Vue {}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap');

* {
    font-family: 'Montserrat', sans-serif;
    font-weight: 400;
}
</style>