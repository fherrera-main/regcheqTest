<template>
  <div>
    <b-modal :id="modalId" :title="modalTitle" hide-footer>
        <slot name="modal-body"></slot>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'nuxt-property-decorator'
@Component
export default class Modal extends Vue {
 
    @Prop({ type: String, default: '' }) readonly modalId!: String
    @Prop({ type: String, default: '' }) readonly modalTitle!: String
    @Prop({ type: Boolean, default: false }) readonly showModal!: Boolean
}
</script>

<style scoped>
</style>