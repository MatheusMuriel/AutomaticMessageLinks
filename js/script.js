var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    messageLinks: {}
  },
  methods: {
    generateBatch: function(e) {
        this.message = "Yeah!";
    }
  }
})