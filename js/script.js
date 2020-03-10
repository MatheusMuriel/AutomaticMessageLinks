var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    messageLinks: [
        {number: 123, link: "#1", clicked: false},
        {number: 124, link: "#2", clicked: true},
        {number: 125, link: "#3", clicked: false},
        {number: 126, link: "#4", clicked: false}
    ]
  },
  methods: {
    generateBatch: function(e) {
        this.message = "Yeah!";
    },
    createLink: function(_number, _message) {
        // https://api.whatsapp.com/send?phone=SeuNúmero&text=SuaMensagem
        let prefix = "https://api.whatsapp.com/send";
        
        let urlPhone = `phone=${formatNumber(_number)}`;
        let urlMessage = `text=${formatMessage(_message)}`;

        let _link = `${prefix}?${urlPhone}&${urlMessage}`;

        this.messageLinks.push({ number: _number, link: _link });
    },
    setClicked: function(_link) {
        let index = this.messageLinks.indexOf(_link);
        this.messageLinks[index].clicked = true;
    },
    formatNumber: function(numberOriginal) {
        // CodCountry+DDD+Number
    },
    formatMessage: function(messageOriginal) {
        // Space = %20

    }
  }
})