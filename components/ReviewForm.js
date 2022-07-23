app.component('review-form', {
    template:
    /*html*/
    `
    <!--prevent is the modifier that prevents the browser to refresh-->
    <form class="review-form" @submit.prevent="onSubmit">
        <h3>Leave a review</h3>
        <label for="name">Name:*</label>
        <!--"v-model" creates the binding for two way exchange of the data.
        The name of the v-model should be the same as the name of the data f
        field in the data-->
        <input id="name"  v-model="name">

        <label for="review">Review:*</label>      
        <textarea id="review"  v-model="review"></textarea>

        <label for="rating">Rating:*</label>
        <select id="rating"  v-model.number="rating">>
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
        </select>

        <label for="recommendation">Would you recommend this product?</label>
        <input type="radio" id="yes" :value="true" v-model="recommendation">YES
        <input type="radio" id="no" :value="false" v-model="recommendation">no

        <input class="button" type="submit" value="Submit">
    </form>`,
    data() {
        return {
        /*I have three type of inputs in the form.*/
        /*It stores the data from these different kind of inputs*/
            name:'',
            review:'',
            rating: null,
            recommendation:true
        }
    },
    methods: {
        onSubmit() {
            /*Basic validation of the field*/
            if(this.name === '' || this.review === '' || this.rating === null ) {
                alert('Review is incomplete. Please fill out all the fields.')
                return
            }

            let productReview = {
                name: this.name,
                review: this.review,
                rating: this.rating,
                recommendation: this.recommendation
            }
            this.$emit('review-submitted', productReview)
            
            this.name = '',
            this.review = '',
            this.rating = null,
            this.recommendation = true
        }
    }
})