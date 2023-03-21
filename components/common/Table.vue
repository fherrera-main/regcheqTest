<template>
  <div>
    <b-table
      class="app-table"
      sticky-header="600px"
      small
      responsive
      show-empty
      :hover="true"
      :items="items"
      :id="tableId"
      :per-page="perPage"
      :current-page="currentPage"
      @row-clicked="myRowClickHandler"
    >
      <template #cell(image)="data">
        <img :src="data.item.image" class="img-fluid" style="width: 70px" />
      </template>
      <template #cell(images)="data">
        <img :src="data.item.images[0]" class="img-fluid" style="width: 70px" />
      </template>
      <template #cell(price)="data"> ${{ data.item.price }} </template>
      <template #cell(category)="data">
        <b-badge variant="primary" style="font-size: 12px; font-weight: 400">{{
          data.item.category.name
        }}</b-badge>
      </template>
      <template #cell(action)="data">
        <b-button
          class="ml-1 py-0"
          variant="outline-danger"
          size="sm"
          @click="handleDelete(data.item.id)"
          >Eliminar</b-button
        >
      </template>
    </b-table>
    <b-pagination-nav
      class="mx-auto"
      :class="{'pagination-custom': !isProductsTable}"
      :link-gen="linkGen"
      :number-of-pages="isProductsTable ? pages.products.length : pages.categories.length"
      :limit="isProductsTable ? 10 : 1"
      use-router
    ></b-pagination-nav>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'nuxt-property-decorator'
import Product from '@/interfaces/products/ProductResponse'
import Category from '~/interfaces/categories/Category'
import Pages from '~/interfaces/Pages'

@Component
export default class Table extends Vue {
  @Prop({ type: Array, default: [], required: true }) readonly fields!: String[]
  @Prop({ type: Array<Product>, default: {}, required: true })
  readonly items!: []
  @Prop({ type: String, default: '' }) readonly tableId!: String
  @Prop({ type: Number, default: '' }) readonly perPage!: Number
  @Prop({ type: Number, default: '' }) readonly totalItems!: Number
  @Prop({
    type: Function,
    default: (item: Product | Category, index: number) => {},
  })
  readonly myRowClickHandler!: Function
  @Prop({
    type: Function,
    default: () => {},
    required: true,
  })
  readonly handleDelete!: Function
  currentPage: number = 1
  pages: Pages = 
    {
      products: [
        `/productos`,
        `?offset=15&limit=30`,
        `?offset=30&limit=45`,
        `?offset=45&limit=60`,
        `?offset=60&limit=75`,
        `?offset=75&limit=90`,
        `?offset=90&limit=105`,
        `?offset=105&limit=120`,
        `?offset=120&limit=135`,
        `?offset=135&limit=150`,
        `?offset=150&limit=165`,
        `?offset=165&limit=180`,
        `?offset=180&limit=195`,
        `?offset=195&limit=200`,
      ],
      categories: [
        "/categorias"
      ]
    }

    get isProductsTable(){
      return this.totalItems === 200 ;
    }

  linkGen(pageNum: number) {
    return this.isProductsTable ? this.pages.products[pageNum - 1] : this.pages.categories[pageNum -1]
  }

  @Emit('changePage')
  onCurrentPageChanged() {
    return this.currentPage
  }

  @Watch('currentPage')
  onPageChanged() {
    this.onCurrentPageChanged()
  }
}
</script>

<style scoped>
.app-table {
  font-size: 12px !important;
}
.app-table::-webkit-scrollbar {
  display: none;
}
nav {
  max-width: 250px;
  margin: 0 auto;
}
.pagination-custom {
  max-width: 150px;
}

@media screen and (min-width: 576px) {
  nav {
    max-width: 500px;
    margin: 0 auto;
  }
}
</style>