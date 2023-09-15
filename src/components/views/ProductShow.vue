<template>
  <layout-div>
    <h2 class="text-center mt-5 mb-3">Product Detail</h2>
    <div class="card">
      <div class="card-header">
        <router-link
            class="btn btn-outline-info float-right"
            to="/">View All Products
        </router-link>
      </div>
      <div class="card-body">
        <h3 class="card-title text-center">{{product.title}}</h3>
        <div class="col text-center">
          <img v-bind:src=product.image
               class="img-fluid rounded-start"
               alt="img"
               style="width: 30%;">
        </div>
        <hr />
        <p>
          <b className="text-muted">Price:</b>
          ${{product.price}}</p>
        <p>
          <b className="text-muted">Description:</b>
          {{product.description}}</p>
      </div>
    </div>
  </layout-div>
</template>

<script>
import LayoutDiv from "@/components/LayoutDiv";

export default {
  name: "ProductShow",
  components: {
    LayoutDiv,
  },
  data() {
    return {
      product: {
        title: '',
        description: '',
        image: '',
        price: '',
      },
      isSaving:false,
    };
  },
  created() {
    const id = this.$route.params.id;
    console.log(id)
    fetch('https://fakestoreapi.com/products/' + id)
        .then(res=>res.json())
        .then(json=> {
          this.product.title = json.title
          this.product.description = json.description
          this.product.image = json.image
          this.product.price = json.price
          return json
        })
        .catch(error => {
          return error
        })
  },
  methods: {

  },
}
</script>

<style scoped>

</style>