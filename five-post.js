// remover a função getConversationData

function getConversationData() { // remover no futuro, apenas um test para o post de dados no node
  return {
    agendamentoID: '12345', 
    statusID: '67890', 
    obs: 'Consulta realizada com sucesso.'
  };
} 


async function main() {
  try {
    const { agendamentoID, statusID, obs } = getConversationData();

    const url = 'https://api.feegow.com/v1/api/appoints/statusUpdate';
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJmZWVnb3ciLCJhdWQiOiJwdWJsaWNhcGkiLCJpYXQiOjE3MjI2OTY1ODYsImxpY2Vuc2VJRCI6Mzg1MDZ9.jWrMIYde3G7BR0CNXrM4388bK5n4KsaqbFjfXTaTGyQ';

    const data = {
      "AgendamentoID": agendamentoID,
      "StatusID": statusID,
      "Obs": obs
    };

    const resposta = await fetch(url, {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (resposta.ok) {
      console.log('Post realizado com sucesso!');
    } else {
      const text = await resposta.text();
      console.log(`Falha ao realizar o post. Status: ${resposta.status}. Mensagem: ${text}`);
    }
  } catch (erro) {
    console.error('Houve um problema com a operação fetch:', erro);
  }
}

main();
