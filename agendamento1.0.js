async function criarNovoAgendamento(dadosAgendamento) {
  const API_URL = "https://api.feegow.com/v1/api/appoints/new-appoint";
  const TOKEN = "//";

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
    return responseData;
  } catch (error) {
    console.error("Erro ao realizar o agendamento:", error);
    return { erro: error.message };
  }
}

function dadosPacienteParaAgendamento(inputData) {
  const dadosAgendamento = {
    local_id: inputData.local_id,
    paciente_id: inputData.paciente_id,
    profissional_id: inputData.profissional_id,
    especialidade_id: inputData.especialidade_id,
    procedimento_id: inputData.procedimento_id,
    data: inputData.data,
    horario: inputData.horario,
    valor: inputData.valor,
    plano: inputData.plano,
    convenio_id: inputData.convenio_id,
    convenio_plano_id: inputData.convenio_plano_id,
    canal_id: inputData.canal_id,
    tabela_id: inputData.tabela_id,
    notas: inputData.notas,
    celular: inputData.celular,
    telefone: inputData.telefone,
    email: inputData.email,
    sys_user: inputData.sys_user, // setar nulo
  };

  criarNovoAgendamento(dadosAgendamento)
    .then((response) => {
      console.log("Resposta do agendamento:", response);
    })
    .catch((err) => {
      console.error("Erro no processamento do agendamento:", err);
    });
}
