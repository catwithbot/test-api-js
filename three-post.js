// Post de dados "brutos"

const url = 'https://api.feegow.com/v1/api/appoints/statusUpdate';
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJmZWVnb3ciLCJhdWQiOiJwdWJsaWNhcGkiLCJpYXQiOjE3MjI2OTY1ODYsImxpY2Vuc2VJRCI6Mzg1MDZ9.jWrMIYde3G7BR0CNXrM4388bK5n4KsaqbFjfXTaTGyQ';
const data = {
    "AgendamentoID": 100,
    "StatusID": "7",
    "Obs": "Paciente confirmou o comparecimento."
  };

fetch(url, {
  method: 'POST',
  headers: {
    'x-access-token': token,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
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
