<template>
  <div class="mt-5">
    <b-row no-gutters class="justify-content-between">
      <b-col cols="6"><h3 class="mb-4">Categorías</h3></b-col>
      <b-col cols="6" class="text-right"
        ><b-button
          @click="handleShowNewCategoryModal"
          size="sm"
          variant="success"
          >Crear categoria</b-button
        >
      </b-col>
    </b-row>

    <Table
      :items="items"
      :fields="fields"
      :perPage="perPage"
      :totalItems="totalItems"
      tableId="categories-table"
      @changePage="handleCurrentPageEmit"
      :myRowClickHandler="myRowClickHandler"
      :handleDelete="handleDeleteCategory"
      class="mx-auto"
    ></Table>
    <Modal modalId="categories-modal" :modalTitle="selectedItem.name">
      <template v-slot:modal-body>
        <CategoriesForm :selectedItem="selectedItem" :handleUpdateCategory="handleSubmitUpdateCategory"/>
      </template>
    </Modal>

    <Modal
      modalId="create-category-modal"
      modalTitle="Nueva categoría"
    >
      <template v-slot:modal-body>
        <NewCategoryForm :handleCreateCategory="handleSubmitCreateCategory"/>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Table from '~/components/common/Table.vue'
import Category from '~/interfaces/categories/Category'
import axios from 'axios'
import Modal from '~/components/common/Modal.vue'
import CategoriesForm from '~/components/categories/CategoriesForm.vue'
import NewCategoryForm from '~/components/categories/NewCategoryForm.vue'

@Component({
  components: {
    Table,
    Modal,
    CategoriesForm,
    NewCategoryForm
  },
})
export default class Categorias extends Vue {
  items: Category[] = []
  fields = ['id', 'name', { key: 'image', label: 'image' }]
  perPage: Number = 10
  totalItems: Number = 5
  currentPage: number = 1
  selectedItem: Partial<Category> = {}

  handleCurrentPageEmit(page: number) {
    this.currentPage = page
  }

  myRowClickHandler(item: Category) {
    this.selectedItem = item
    this.$bvModal.show('categories-modal')
  }
  async handleSubmitCreateCategory(data : Category){
    const response = await axios
    .post(`${process.env.API_BASE_URL}/categories`, data)
    .then((res) => {
      this.$bvModal.hide('create-category-modal')
      return res.data
    })
    .catch(err => {
      alert(err)
    })
    delete response["creationAt"]
    delete response["updatedAt"]
    this.items.push(response);
  }

  async handleDeleteCategory(id: number) {
    const response = await this.$axios
      .delete(`${process.env.API_BASE_URL}/categories/${id}`)
      .then((res) => {
        return res.data
      })
      .catch(err => {
        alert(err)
      })
    if (response) this.items = this.items.filter((item) => item.id !== id)
  }

  async handleSubmitUpdateCategory(data : Category){
    const response : Category = await axios
      .put(`${process.env.API_BASE_URL}/categories/${this.selectedItem.id}`, data)
      .then((res) => {
        this.$bvModal.hide('categories-modal')
        return res.data
      })
      .catch(err => {
        alert(err)
      })
    this.items.forEach((item : Category) => {
      if(item.id === response.id){
        item.name = response.name;
        item.image = response.image;
      }
    });
  }

  async asyncData() {
    try {
      const response = await axios
        .get(`${process.env.API_BASE_URL}/categories`)
        .then((res) => {
          return res.data.map((category: Category) => {
            return {
              id: category.id,
              image: category.image,
              name: category.name,
              action:""
            }
          })
        })
      return { items: response }
    } catch (error) {}
  }

  handleShowNewCategoryModal() {
    this.$bvModal.show('create-category-modal')
  }

  get tableItems() {
    return this.items.map((item) => {
      return {
        id: item.id,
        image: item.image,
        name: item.name,
      }
    })
  }
}
</script>

<style scoped>
</style>