<template>
  <layout-div>
    <div class="container m-4">
      <h2 class="text-center mt-5 mb-3">Product List</h2>
      <div class="row">
        <div class="col col-md-6">
          <input
              v-model="search"
              class="form-control"
              aria-label=".form-select-lg example"
              placeholder="Search with name or description:">
        </div>
        <div class="col col-md-3 float-right">
        <select v-model="selected" class="form-select" aria-label=".form-select-lg example">
          <option selected value="">Select Category</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="jewelery">Jewelery</option>
          <option value="electronics">Electronics</option>
          <option value="women's clothing">Women's Clothing</option>
        </select>
        </div>
      </div>
            <div class="container m-4">
              <div class="row row-cols-1 row-cols-md-2
                    row-cols-lg-3 g-4 h-25">
                <div class="col"  v-for="product in filteredList" :key="product.id">
                  <div class="card mb-3"
                       style="max-width:540px; min-height:400px;">
                    <div class="row g-0">
                      <div class="col-md-6 text-center border-light-subtle">
                        <img v-bind:src=product.image
                             class="img-fluid rounded-start"
                             alt="img">
                      </div>
                      <div class="col-md-6">
                        <div class="card-body">
                          <h5 class="card-title">{{product.title}}</h5>
                          <p class="card-text">
                            ${{ product.price }}
                          </p>
                          <p class="card-text col-md-6">
                              <router-link :to="`/show/${product.id}`" class="btn btn-outline-info mx-1">
                              Show
                            </router-link>
                          </p>
                          <p class="col-md-6">
                            <button class="btn btn-success" @click="addToCart(product)">
                              Add to cart
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
  </layout-div>
</template>

<script>

import LayoutDiv from "@/components/LayoutDiv";

export default {
  name: 'ProductsList',
  components: {
    LayoutDiv,
  },
  data() {
    return {
      search: '',
      selected: '',
      products: [],
      categoryOptions: [],
    };
  },
  methods: {
    fetchProductsList() {
      fetch('https://fakestoreapi.com/products')
          .then(res=>res.json())
          .then(json=>{
            this.products = json;
            this.categoryOptions = json.map((item) => item.category)
          }).catch(error => {
            return error
          });
    },
    addToCart(item) {
      this.$store.commit('addToCart',item)
    }
  },
  mounted() {
    this.fetchProductsList();
  },
  computed: {
    filteredList() {
      console.log(this.selected)
      if (this.selected) {
        return this.products.
        filter(item => item.category.includes(this.selected));
      } else if(this.search) {
        return this.products.
        filter(item => item.title.includes(this.search) || item.description.includes(this.search));
      } else {
        return this.products;
      }
    }
  }
};
</script>