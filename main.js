//It creates the app with argument that is a options object (we need to add at least the empty object!)'data' that returns another object where are stored our data.
const app = Vue.createApp(
  {
    data: function() {
      return {
        cart: 0,
        product: 'Socks',
        brand: 'Vue Mastery',
        selectedVariant: 0,
        onSale: false,
        url: 'https:www.google.com',
        details: ['50% cotton', '30% wool', '20% polyester'],
        variants: [
          {id: 2234, 
           color:'green', 
           image: './assets/images/socks_green.jpg',
           quantity: 50 },
          {id: 2235,
           color: 'blue',
           image: './assets/images/socks_blue.jpg',
           quantity: 0
          }
        ],
        sizes: ['36/38','39/40','41/42','43/44','megafusekle']
      }
    },
    methods: {
      addToCart() {
        this.cart += 1
      },
      removeFromCart() {
        if(this.cart >= 1) {
        this.cart -= 1
        }
      },
      updateVariant(index) {
        this.selectedVariant = index
      }
    }, 
    computed: {
      title() {
        return this.brand + ' ' + this.product
      },
      image() {
        return this.variants[this.selectedVariant].image
      },
      inStock() {
        return this.variants[this.selectedVariant].quantity
      },
      saleMessage() {
        if(this.onSale) {
        return this.brand + ' ' + this.product + ' are on sale!'
        }
        return ''
      }
    }
  }
)
