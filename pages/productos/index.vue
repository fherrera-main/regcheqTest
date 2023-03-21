<template>
  <div class="mt-5">
    <b-row no-gutters class="justify-content-between">
      <b-col cols="6"><h3 class="mb-4">Productos</h3></b-col>
      <b-col cols="6" class="text-right"><b-button @click="handleShowNewProductModal" size="sm" variant="success">Crear producto</b-button> </b-col> 
    </b-row>
    
    <Table
      :items="items"
      :fields="fields"
      :perPage="perPage"
      :totalItems="totalItems"
      tableId="products-table"
      @changePage="handleCurrentPageEmit"
      :myRowClickHandler="myRowClickHandler"
      :handleDelete="handleDeleteProduct"
    ></Table>
    <Modal
      modalId="products-modal"
      :modalTitle="selectedItem.title"
    >
      <template v-slot:modal-body>
      <ProductsForm :selectedItem="selectedItem" :handleUpdateProduct="handleSubmitUpdateProduct"/>
      </template>
    </Modal>
    <Modal
      modalId="create-product-modal"
      modalTitle="Nuevo producto"
    >
      <template v-slot:modal-body>
        <NewProductForm :handleCreateProduct="handleSubmitCreateProduct"/>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import Table from '~/components/common/Table.vue'
import ProductResponse from '~/interfaces/products/ProductResponse'
import axios from 'axios'
import Modal from '~/components/common/Modal.vue'
import ProductsForm from '~/components/ProductsForm.vue'
import NewProductForm from '~/components/NewProductForm.vue'
import NewProduct from '~/interfaces/products/NewProduct'

@Component({
  components: {
    Table,
    Modal,
    ProductsForm,
    NewProductForm
  },
})
export default class Productos extends Vue {
  items: ProductResponse[] = []
  fields = [
    'id',
    { key: 'image', label: 'imagen' },
    { key: 'title', label: 'titulo' },
    { key: 'price', label: 'precio' },
    { key: 'description', label: 'descripción' },
    { key: 'category', label: 'category' },
  ]
  perPage: Number = 15
  totalItems: Number = 200
  currentPage: number = 1
  selectedItem: Partial<ProductResponse> = {}

  async fetch() {
    try {
      const params = `?offset=${this.$route.query.offset || this.currentPage}&limit=${this.$route.query.limit || this.perPage}`
      this.items = await axios
        .get(`${process.env.API_BASE_URL}/products${params}`)
        .then((res) => {
          return res.data.map((product: ProductResponse) => {
            return {
              id: product.id,
              images: product.images,
              title: product.title,
              price: product.price,
              description: product.description,
              category: product.category,
              action:""
            }
          })
        })
        .catch(() => {
          return []
        })
    } catch (error) {}
  }

  async handleDeleteProduct (id : number){
    const response = await this.$axios
    .delete(`${process.env.API_BASE_URL}/products/${id}`)
    .then(res => {
      return res.data
    })
    if ( response )  this.items = this.items.filter(item=> item.id !== id)
  }

  async handleSubmitUpdateProduct(data : NewProduct){
    const response : ProductResponse = await axios
      .put(`${process.env.API_BASE_URL}/products/${this.selectedItem.id}`, data)
      .then((res) => {
        this.$bvModal.hide('products-modal')
        return res.data
      })
      .catch(err => {

      })
    this.items.forEach((item : ProductResponse) => {
      if(item.id === response.id){
        item.title = response.title
        item.description = response.description;
        item.category = response.category;
        item.price = response.price;
        item.images = response.images;
      }
    });
  }

  async handleSubmitCreateProduct(data : NewProduct){
    const response = await axios
    .post(`${process.env.API_BASE_URL}/products`, data)
    .then((res) => {
      this.$bvModal.hide('create-product-modal')
      return res.data
    })
    .catch(err => {
    })
    delete response["creationAt"]
    delete response["updatedAt"]
    this.items.push(response);
  }

  fetchKey(getCounter: Function) {
    return getCounter('products-page')
  }
  handleCurrentPageEmit(page: number) {
    this.currentPage = page
  }

  myRowClickHandler(item: ProductResponse) {
    this.selectedItem = item
    this.$bvModal.show('products-modal')
  }

  handleShowNewProductModal(){
    this.$bvModal.show('create-product-modal')
  }

  @Watch('$route.query')
  onCurrentPageChanged() {
    this.$fetch()
  }
}
</script>

<style scoped>

</style>