<template>
  <div>
    <button type="submit" class="btn btn-primary btn-block" :disabled="loading">
      <span v-if="!loading">
        {{ text }}
      </span>
      <div v-else class="spinner-border spinner-border-sm  text-light" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class Button extends Vue {
  @Prop({ type: String, default: 'Default text', required: true }) readonly text!: string
  @Prop({ type: Boolean, default: false }) readonly loading!: boolean;
  @Prop(Function) readonly handleClick! : () => void;
}
</script>

<style scoped>
.btn {
  background-color: #365ce1;
}
</style>