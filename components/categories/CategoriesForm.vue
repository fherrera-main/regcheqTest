<template>
  <div>
    <b-form @submit.prevent="handleSubmit">
        
      <b-form-group
        id="name"
        label="Nombre"
        label-for="input-prod-name"
        valid-feedback=""
        :invalid-feedback="invalidFeedback"
        :state="state"
        label-size="sm"
        class="mb-0"
      >
        <b-form-input
          id="input-prod-name"
          v-model="form.name"
          :state="state"
          size="sm"
          trim
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="image"
        label="Imagen"
        label-for="input-cat-image"
        valid-feedback=""
        :invalid-feedback="invalidFeedback"
        :state="state"
        label-size="sm"
        class="mb-0"
      >
        <b-form-input
          id="input-cat-image"
          v-model="form.image"
          :state="state"
          trim
          size="sm"
        ></b-form-input>
      </b-form-group>
      <b-button class="mt-3" type="submit" variant="primary" size="sm"
        >Enviar</b-button
      >
    </b-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import Category from '~/interfaces/categories/Category'

@Component
export default class CategoriesForm extends Vue {
  @Prop({ type: Object, default: {} })
  readonly selectedItem!: Category
  @Prop({
    type: Function,
    default: () => {},
    required: true,
  })
  readonly handleUpdateCategory!: Function

  form: Category = { ...this.selectedItem }

  async handleSubmit() {
    const { id, name, image } = this.form

    const data: Category = {
      id,
      name,
      image,
    }

    this.handleUpdateCategory(data)
  }

  get state() {
    return null
  }
  get invalidFeedback() {
    if (true) {
      return 'Debe ingresar al menos 1 caracter.'
    }
    return 'Ingresa un valor.'
  }
}
</script>

<style scoped>
</style>