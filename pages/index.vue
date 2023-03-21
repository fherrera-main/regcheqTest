<template>
  <div>
    Home
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'nuxt-property-decorator';
import { nextTick } from 'vue';

  @Component
  export default class Home extends Vue {
    beforeCreate() {
      this.$router.push("/productos") 
    }
  }
</script>

<style scoped>

</style>