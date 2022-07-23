//It creates the app with argument that is a options object (we need to add at least the empty object!)'data' that returns another object where are stored our data.
const app = Vue.createApp(
  {
    data: function() {
      return {
        cart: [],
        premium: true
      }
    },
    methods: {
      updateCart(id) {
        this.cart.push(id)
      },
      removeItem(id) {
        const position = this.cart.indexOf(id)
        if(position >= 0) {
          this.cart.splice(position, 1)
        }
      }
    }
})
