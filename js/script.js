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
      // Referencia de link
      // https://api.whatsapp.com/send?phone=SeuNúmero&text=SuaMensagem
      let prefix = "https://api.whatsapp.com/send";
      
      let urlPhone = `phone=${this.formatNumber(_number)}`;
      let urlMessage = `text=${this.formatMessage(_message)}`;

      let _link = `${prefix}?${urlPhone}&${urlMessage}`;

      if (!this.messageLinks.some(item => item.number === _number)) {
        this.messageLinks.push({ number: _number, link: _link, clicked: false});
      }
    },
    linkClick: function(_link) {
      let index = this.messageLinks.indexOf(_link);
      this.messageLinks[index].clicked = true;

      window.open(_link.link) 
    },
    formatNumber: function(numberOriginal) {
      let charactersToRemove = ['-', '(', ')'];

      let cleaned_string = numberOriginal;

      charactersToRemove.forEach(c => cleaned_string = cleaned_string.replace(c, ''));
      // Estruturas possiveis: "+"CodCountry+DDD+Number / DDD+Number
      return cleaned_string;
    },
    formatMessage: function(messageOriginal) {
      // Space = %20
      let newMessage = messageOriginal.split(/\s/).join("\%20");

      return newMessage;
    }
  }
})