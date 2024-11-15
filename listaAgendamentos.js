fetch;

const API_URL = "https://api.feegow.com/v1/api";
const TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJmZWVnb3ciLCJhdWQiOiJwdWJsaWNhcGkiLCJpYXQiOjE3MzA1Nzg4NjMsImxpY2Vuc2VJRCI6NDE2ODJ9.aqzu_IstRfTBLM-DEZ21y9uVW_zN1Zb-eBsO4zf0L34";

async function listarProfissionais() {
  try {
    const response = await fetch(`${API_URL}/professional/list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": TOKEN,
      },
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Lista de profissionais:", data);
  } catch (error) {
    console.error("Erro ao listar profissionais:", error);
  }
}

// async function listarPacientes() {
//   try {
//     const response = await fetch(`${API_URL}/patient/list`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         "x-access-token": TOKEN,
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Erro na requisição: ${response.statusText}`);
//     }

//     const data = await response.json();
//     console.log("Lista de pacientes:", data);
//   } catch (error) {
//     console.error("Erro ao listar pacientes:", error);
//   }
// }

async function listarHorariosDisponiveis(
  tipo,
  procedimento_id,
  unidade_id,
  data_start,
  data_end,
  convenio_id
) {
  try {
    const url = new URL(`${API_URL}/appoints/available-schedule`);
    url.search = new URLSearchParams({
      tipo,
      procedimento_id,
      unidade_id,
      data_start,
      data_end,
      convenio_id,
    }).toString();

    console.log("URL de requisição:", url.toString());

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": TOKEN,
      },
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.success && data.content) {
      let horariosDisponiveis = [];

      for (const profissionalId in data.content) {
        for (const local of Object.values(data.content[profissionalId])) {
          for (const [data, horarios] of Object.entries(local)) {
            console.log(
              `Verificando estrutura de horários para a data ${data}:`,
              horarios
            );

            // Verifica se 'horarios' é um array antes de iterar
            if (Array.isArray(horarios)) {
              horarios.forEach((horario) => {
                horariosDisponiveis.push({
                  data,
                  horario,
                  profissional_id: profissionalId,
                });
              });
            } else {
              console.warn(
                `Horários em ${data} não é uma lista, estrutura inesperada:`,
                horarios
              );
            }
          }
        }
      }

      console.log("Horários disponíveis formatados:", horariosDisponiveis);
      return horariosDisponiveis;
    } else {
      console.log("Nenhum horário disponível encontrado.");
      return [];
    }
  } catch (error) {
    console.error("Erro ao listar horários disponíveis:", error);
    return [];
  }
}

// Exemplo de uso:
listarHorariosDisponiveis("P", 1, 0, "08-08-2024", "10-11-2024", 1).then(
  (horarios) => {
    if (horarios.length > 0) {
      console.log("Horários disponíveis para o paciente:");
      horarios.forEach((item) => {
        console.log(
          `Data: ${item.data}, Horário: ${item.horario}, Profissional ID: ${item.profissional_id}`
        );
      });
    } else {
      console.log("Nenhum horário disponível para exibir.");
    }
  }
);

//listarEspecialidades();

//listarPacientes();

//listarProfissionais();
