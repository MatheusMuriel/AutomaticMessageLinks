var app = new Vue({
  el: '#app',
  data: {
    message: '',
    listNumbers: '',
    messageLinks: []
  },
  methods: {
    generateBatch: function(e) {
      let listNums = this.listNumbers.split(',');

      listNums.forEach( o => { this.createLink(o, this.message) });

    },
    createLink: function(_number, _message) {
        // https://api.whatsapp.com/send?phone=SeuNúmero&text=SuaMensagem
        let prefix = "https://api.whatsapp.com/send";
        
        let urlPhone = `phone=${this.formatNumber(_number)}`;
        let urlMessage = `text=${this.formatMessage(_message)}`;

        let _link = `${prefix}?${urlPhone}&${urlMessage}`;

        this.messageLinks.push({ number: _number, link: _link, clicked: false});
    },
    linkClick: function(_link) {
      let index = this.messageLinks.indexOf(_link);
      this.messageLinks[index].clicked = true;

      window.open(_link.link) 
    },
    formatNumber: function(numberOriginal) {
        // CodCountry+DDD+Number
        return numberOriginal;
    },
    formatMessage: function(messageOriginal) {
        // Space = %20
      let newMessage = messageOriginal.split(/\s/).join("\%20");

      return newMessage;
    }
  }
})