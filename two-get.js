// Validar o GET

const url = 'https://api.feegow.com/v1/api/appoints/status';
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJmZWVnb3ciLCJhdWQiOiJwdWJsaWNhcGkiLCJpYXQiOjE3MjI2OTY1ODYsImxpY2Vuc2VJRCI6Mzg1MDZ9.jWrMIYde3G7BR0CNXrM4388bK5n4KsaqbFjfXTaTGyQ';

fetch(url, {
  method: 'GET',
  headers: {
    'x-access-token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJmZWVnb3ciLCJhdWQiOiJwdWJsaWNhcGkiLCJpYXQiOjE3MjI2OTY1ODYsImxpY2Vuc2VJRCI6Mzg1MDZ9.jWrMIYde3G7BR0CNXrM4388bK5n4KsaqbFjfXTaTGyQ',
    'Content-Type': 'application/json'
  }
})
  .then(resposta => {
    if (!resposta.ok) {
      return resposta.text().then(text => {
        throw new Error(`Resposta da rede não foi ok. Status: ${resposta.status}. Mensagem: ${text}`);
      });
    }
    return resposta.json();
  })
  .then(dados => {
    console.log('Dados recebidos:', dados);
  })
  .catch(erro => {
    console.error('Houve um problema com a operação fetch:', erro);
  });
