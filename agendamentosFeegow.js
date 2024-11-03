fetch;

const API_URL = "https://api.feegow.com/v1/api/appoints/new-appoint";
const TOKEN = "//";

async function criarNovoAgendamento(dadosAgendamento) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": TOKEN,
      },
      body: JSON.stringify(dadosAgendamento),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(
        `Erro na requisição: ${response.status} - ${JSON.stringify(
          responseData
        )}`
      );
    }

    console.log("Agendamento realizado com sucesso:", responseData);
  } catch (error) {
    console.error("Erro ao realizar o agendamento:", error);
  }
}

const dadosAgendamento = {
  local_id: 1,
  paciente_id: 3,
  profissional_id: 1,
  especialidade_id: 95,
  procedimento_id: 5,
  data: "11-11-2024",
  horario: "08:00:00",
  valor: 55000,
  plano: 0, // 0 = Sem convênio, 1 = Com convênio
  convenio_id: 1,
  convenio_plano_id: null,
  canal_id: 5,
  tabela_id: 8,
  notas: "Consulta de rotina",
  celular: "(12) 34567-8912",
  telefone: "(12) 3456-8912",
  email: "email@email.com",
  sys_user: null,
};

criarNovoAgendamento(dadosAgendamento);
