<template>
  <layout-div>
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
      <i class="fa fa-shopping-cart" aria-hidden="true"></i>
      ( {{ numInCart }} )
    </button>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              <i class="fa fa-shopping-cart" aria-hidden="true"></i>
              Shopping cart
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <table class="table">
              <tbody>
              <tr v-for="(item,idx) in inCart" :key="idx">
                <td>{{ item.title }}</td>
                <td>${{ item.price }}</td>
                <td>
                  <button class="btn btn-sm btn-danger" @click="removeFromCart(item)">&times;</button>
                </td>
              </tr>
              <tr>
                <th></th>
                <th>${{ total }}</th>
                <th></th>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" data-dismiss="modal">Keep shopping</button>
            <button class="btn btn-primary" @click="checkout()">Check out</button>
          </div>
        </div>
      </div>
    </div></layout-div>
</template>
<script>
import LayoutDiv from "@/components/LayoutDiv";
export default {
  name: 'ShoppingCart',
  components: {LayoutDiv},
  computed: {
    inCart() {
      return this.$store.getters.inCart;
    },
    numInCart() {
      return this.inCart.length;
    },
    total() {
      return this.inCart.reduce((acc, cur) => acc + cur.price, 0);
    },
    isAuthenticated() {
      return this.$store.state.user.isAuthenticated;
    },
  },
  methods: {
    removeFromCart(item) {
      this.$store.commit('removeFromCart', item);
    },
    checkout() {
      if (this.isAuthenticated) {
        if (this.numInCart == 0) {
          alert('Your cart is empty!');
          return
        }
      } else {
        alert('Please login to checkout');
        return
      }
    },
  }
};
</script>