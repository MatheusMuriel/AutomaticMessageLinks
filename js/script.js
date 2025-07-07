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
      if (!messageOriginal || typeof messageOriginal !== 'string') return '';

      const transformations = [
        // Substitui quebras de linha por %0A
        msg => msg.replace(/\r?\n/g, "%0A"),
        // Remove espaços duplos e trim final
        //msg => msg.trim(),
        // Substitui espaços por %20
        msg => msg.replace(/\s/g, "%20"),
        // Escapa & (importante para query string)
        msg => msg.replace(/&/g, "%26"),
        // Escapa # (importante em links)
        msg => msg.replace(/#/g, "%23"),
        // (Opcional) Remove emojis ou símbolos especiais (pode comentar essa linha se quiser permitir)
        // msg => msg.replace(/[\u{1F600}-\u{1F6FF}]/gu, '')
      ];

      return transformations.reduce((msg, fn) => fn(msg), messageOriginal);
    }
  }
})