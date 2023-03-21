<template>
  <div>
    <b-form @submit.prevent="handleSubmit">
      <b-form-group
        id="title"
        label="Titulo"
        label-for="input-prod-title"
        valid-feedback=""
        :invalid-feedback="invalidFeedback"
        :state="state"
        label-size="sm"
        class="mb-0"
      >
        <b-form-input
          id="input-prod-title"
          v-model="form.title"
          :state="state"
          size="sm"
          trim
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="price"
        label="Precio"
        label-for="input-prod-price"
        valid-feedback=""
        :invalid-feedback="invalidFeedbackNumber"
        :state="state"
        label-size="sm"
        class="mb-0"
      >
        <b-form-input
          id="input-prod-price"
          v-model="form.price"
          :state="state"
          type="number"
          size="sm"
          trim
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="description"
        label="Descripción"
        label-for="input-prod-description"
        valid-feedback=""
        :invalid-feedback="invalidFeedback"
        :state="state"
        label-size="sm"
        class="mb-0"
      >
        <b-form-textarea
          id="input-prod-description"
          v-model="form.description"
          :state="state"
          trim
          size="sm"
        ></b-form-textarea>
      </b-form-group>
      <b-form-group
        id="images"
        label="Imagenes"
        label-for="input-prod-images"
        valid-feedback=""
        :invalid-feedback="invalidFeedback"
        :state="state"
        label-size="sm"
        class="mb-0"
      >
        <b-row no-gutters>
          <b-col cols="8" class="p-0">
            <b-form-input
              id="input-prod-images"
              v-model="newImage"
              :state="state"
              trim
              size="sm"
            ></b-form-input>
          </b-col>
          <b-col cols="2" class="p-0">
            <b-button class="ml-2" size="sm" @click="handleSaveImage"
              >Agregar</b-button
            >
          </b-col>
        </b-row>
        <b-row
          class="justify-content-between pt-3"
          style="font-size: 12px"
          v-for="(image, index) in form.images"
          :key="index"
          no-gutters
        >
          <b-col cols="10" class="p-0 images-list">
            <p class="mb-2">"{{ `${image}` }}"</p>
          </b-col>
          <b-col cols="2" class="p-0">
            <b-button
              class="ml-1 py-0"
              variant="outline-danger"
              size="sm"
              @click="handleDeleteImage(index)"
              >Eliminar</b-button
            >
          </b-col>
        </b-row>
      </b-form-group>
      <b-button class="mt-3" type="submit" variant="primary" size="sm">Enviar</b-button>
    </b-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator'
import ProductResponse from '~/interfaces/products/ProductResponse'
import axios from 'axios'
import NewProduct from '~/interfaces/products/NewProduct'
import Category from '~/interfaces/categories/Category'

@Component
export default class ProductsForm extends Vue {
  @Prop({ type: Object, default: {} as ProductResponse })
  readonly selectedItem!: ProductResponse
  newImage: string = ''
  form: ProductResponse = { ...this.selectedItem }
  updateForm: Partial<ProductResponse> = { images: this.selectedItem.images }

  @Prop({
    type: Function,
    default: () => {},
    required: true,
  })
  readonly handleUpdateProduct!: Function

  handleSaveImage() {
    this.form.images.push(this.newImage)
    this.newImage = ''
  }

  handleDeleteImage(index: number) {
    this.form.images = this.form.images.filter(
      (el: string, i: number) => i !== index
    )
  }

  async handleSubmit() {
    const { title, price, description, images } = this.form
    
    const data: NewProduct = {
      title,
      price,
      description,
      images,
    }

    this.handleUpdateProduct(data);
  }
  get state() {
    return null
  }
  get invalidFeedback() {
    return 'Ingresa un valor.'
  }
  get invalidFeedbackNumber() {
    return 'Ingresa un valor.'
  }
}
</script>

<style scoped>
.images-list {
  list-style-position: inside;
}

.images-list p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>