app.component('product-display', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template:
    /*html*/
    `<div class="product-display">
        <div class="product-container">
            <div class="product-image">
                <!-- Dynamically bind an attribute to an expression. -->
                <!-- ":" is a shorcut for "v-bind:".  -->
                <!-- Can be used also for "href", "alt", "style", dynamic "class" etc.  -->
                <!-- Src attribute bound to the image data. -->
                <!-- I use kebab syntax in :class because I need to set CSS property with CSS syntax.-->
                <img :src="image" alt="" :class="{ 'out-of-stock-img': !inStock }">

            </div>

        <div class="product-info">
            <h1>{{ title }}</h1>
            <p v-if="onSale">{{ saleMessage }}</p>
            <!-- I can also use "v-show" if the condition is valid to show the proper text. -->
            <p v-if="inStock > 10">In Stock</p>
            <p v-else-if="inStock <= 10 && inStock > 0">Almost sold out!</p>
            <p v-else>Out of Stock</p>

            <p>Shipping: {{ shipping }}</p>
            <p v-show="onSale">On Sale</p>
            <product-details :details="details"></product-details>
            <!--Object in :style is JS so it has JS syntax even though it is a CSS property name.-->
            <div v-for="(variant, index) in variants" :key="variant.id" @mouseover="updateVariant(index)"
            class="color-circle" :style="{ backgroundColor: variant.color }"></div>
            <!-- "@click" is a shortcut for "v-on:click" . -->
            <button class="button" :class="{ disabledButton: !inStock }" @click="addToCart" :disabled="!inStock">Add to
            Cart</button>
            <!-- ":class" is active class . -->
            <button class="button remove" :class="{ disabledButton: !inStock }" @click="removeFromCart"
            :disabled="!inStock">Remove Item</button>
            <!--I show the review list only if there are some review
            - something is stored in the Array "reviews". The condition with
            > 0 is there to prevent the for exxample mispelled word that then returns
            undefined. If something is undefined the console will not show an error.
            But if the condition is there it then undefined is greater than 0 makes no
            sense and the console will showw error. -->
            <review-list v-if="reviews.length > 0" :reviews="reviews"></review-list>
            <!-- I use the component that is imported in index.html -->
            <review-form @review-submitted="addReview"></review-form>
            <ul>
            <li v-for="size in sizes">{{ size }}</li>
            </ul>
        </div>
    </div>
  </div>`,
  data: function() {
    return {
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
      sizes: ['36/38','39/40','41/42','43/44','megafusekle'],
      reviews: []
    }
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
    },
    removeFromCart() {
      this.$emit('remove-item', this.variants[this.selectedVariant].i)
    },
    updateVariant(index) {
      this.selectedVariant = index
    },
    addReview(review) {
      this.reviews.push(review)
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
    },
    shipping() {
        if(this.premium) {
            return 'Free'
        }
        return 2.99
    }
  }  
})