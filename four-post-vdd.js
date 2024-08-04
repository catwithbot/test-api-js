// Post de dados informados pelo user com verificação

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function getUserInput(promptMessage) {
  return new Promise((resolve) => {
    rl.question(promptMessage, (answer) => {
      resolve(answer);
    });
  });
}

async function main() {
  try {
    const agendamentoID = await getUserInput("Digite o ID do Agendamento: ");
    const statusID = await getUserInput("Digite o ID do Status: ");
    const obs = await getUserInput("Digite a Observação: ");

    const data = {
      AgendamentoID: agendamentoID,
      StatusID: statusID,
      Obs: obs,
    };

    rl.close();

    console.log("Objeto data:", data);

    const fetch = (await import("node-fetch")).default;

    const url = "https://api.feegow.com/v1/api/appoints/statusUpdate";
    const token =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJmZWVnb3ciLCJhdWQiOiJwdWJsaWNhcGkiLCJpYXQiOjE3MjI2OTY1ODYsImxpY2Vuc2VJRCI6Mzg1MDZ9.jWrMIYde3G7BR0CNXrM4388bK5n4KsaqbFjfXTaTGyQ";

    const resposta = await fetch(url, {
      method: "POST",
      headers: {
        "x-access-token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (resposta.ok) {
      console.log("Post realizado com sucesso!");
    } else {
      const text = await resposta.text();
      console.log(
        `Falha ao realizar o post. Status: ${resposta.status}. Mensagem: ${text}`
      );
    }
  } catch (erro) {
    console.error("Houve um problema com a operação fetch:", erro);
  }
}

main();
