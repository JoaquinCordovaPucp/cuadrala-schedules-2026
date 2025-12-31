export const data = [
  {
    title: 'CDR121',
    start: '2024-01-01T07:30:00',
    end: '2024-01-01T09:00:00'
  },
  {
    title: 'CDR121',
    start: '2024-01-02T12:00:00',
    end: '2024-01-02T14:00:00'
  },
  {
    title: 'CDR123',
    start: '2024-01-01T12:00:00',
    end: '2024-01-01T14:00:00'
  },
  {
    title: 'CDR123',
    start: '2024-01-01T15:00:00',
    end: '2024-01-01T17:00:00'
  },
  {
    title: 'CDR125',
    start: '2024-01-02T17:00:00',
    end: '2024-01-02T19:00:00'
  },
  {
    title: 'CDR125',
    start: '2024-01-03T07:00:00',
    end: '2024-01-03T09:00:00'
  },
  {
    title: 'CDR121',
    start: '2024-01-08T07:30:00',
    end: '2024-01-08T09:00:00'
  },
  {
    title: 'CDR121',
    start: '2024-01-09T12:00:00',
    end: '2024-01-09T14:00:00'
  },
  {
    title: 'CDR123',
    start: '2024-01-08T12:00:00',
    end: '2024-01-08T14:00:00'
  },
  {
    title: 'CDR123',
    start: '2024-01-08T15:00:00',
    end: '2024-01-08T17:00:00'
  },
  {
    title: 'CDR125',
    start: '2024-01-10T16:00:00',
    end: '2024-01-10T16:30:00'
  },
  {
    title: 'CDR125',
    start: '2024-01-13T12:00:00',
    end: '2024-01-13T17:00:00'
  },
  {
    title: 'CDR121',
    start: '2024-01-16T08:00:00',
    end: '2024-01-16T08:30:00'
  },
  {
    title: 'CDR121',
    start: '2024-01-16T17:00:00',
    end: '2024-01-16T19:00:00'
  },
  {
    title: 'CDR123',
    start: '2024-01-15T12:00:00',
    end: '2024-01-15T14:00:00'
  },
  {
    title: 'CDR123',
    start: '2024-01-15T15:00:00',
    end: '2024-01-15T17:00:00'
  },
  {
    title: 'CDR125',
    start: '2024-01-17T16:00:00',
    end: '2024-01-17T16:30:00'
  },
  {
    title: 'CDR125',
    start: '2024-01-20T12:00:00',
    end: '2024-01-20T17:00:00'
  }
]

import cursos from './data.json';
export { cursos };
// export const cursos = [
//   {
//     id: "CDR121",
//     title: "Pensamiento Cristiano",
//     creditos: 4,
//     horarios: [
//       {
//         horarioId: 261,
//         profesor: "Chang, E.",
//         eventos: [
//           { tipo: "CLA", inicio: 1, fin: 4 },
//           { tipo: "CLA", inicio: 40, fin: 44 }
//         ]
//       },
//       {
//         horarioId: 262,
//         profesor: "Chang, E.",
//         eventos: [
//           { tipo: "CLA", inicio: 32, fin: 33 },
//           { tipo: "CLA", inicio: 50, fin: 54 }
//         ]
//       }
//     ]
//   },
//   {
//     id: "CDR123",
//     title: "Pensamiento Cristiano de Cristo",
//     creditos: 12,
//     horarios: [
//       {
//         horarioId: 363,
//         profesor: "Martínez, J.",
//         eventos: [
//           { tipo: "CLA", inicio: 10, fin: 14 },
//           { tipo: "CLA", inicio: 16, fin: 20 }
//         ]
//       }
//     ]
//   },
//   {
//     id: "CDR125",
//     title: "Fundamentos del Pensamiento Cristiano",
//     creditos: 8,
//     horarios: [
//       {
//         horarioId: 464,
//         profesor: "López, M.",
//         eventos: [
//           { tipo: "CLA", inicio: 50, fin: 54 },
//           { tipo: "CLA", inicio: 60, fin: 64 }
//         ]
//       },
//       {
//         horarioId: 465,
//         profesor: "López, M.",
//         eventos: [
//           { tipo: "CLA", inicio: 78, fin: 79 },
//           { tipo: "CLA", inicio: 160, fin: 170 }
//         ]
//       }
//     ]
//   },
//   {
//     id: "FIL201",
//     title: "Introducción a la Filosofía",
//     creditos: 6,
//     horarios: [
//       {
//         horarioId: 501,
//         profesor: "García, A.",
//         eventos: [
//           { tipo: "CLA", inicio: 5, fin: 8 },
//           { tipo: "CLA", inicio: 25, fin: 28 }
//         ]
//       }
//     ]
//   },
//   {
//     id: "TEO310",
//     title: "Teología Sistemática",
//     creditos: 10,
//     horarios: [
//       {
//         horarioId: 601,
//         profesor: "Ramírez, C.",
//         eventos: [
//           { tipo: "CLA", inicio: 90, fin: 94 },
//           { tipo: "CLA", inicio: 120, fin: 124 }
//         ]
//       },
//       {
//         horarioId: 602,
//         profesor: "Ramírez, C.",
//         eventos: [
//           { tipo: "CLA", inicio: 140, fin: 144 }
//         ]
//       }
//     ]
//   },
//   {
//     id: "HIS150",
//     title: "Historia del Cristianismo",
//     creditos: 7,
//     horarios: [
//       {
//         horarioId: 701,
//         profesor: "Pérez, L.",
//         eventos: [
//           { tipo: "CLA", inicio: 200, fin: 204 },
//           { tipo: "CLA", inicio: 210, fin: 214 }
//         ]
//       }
//     ]
//   }
// ];

export function formatHourEvent(inicio, fin) {
  const dias = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];
  const HORA_INICIO_DIA = 7;

  const dia = dias[Math.trunc(inicio / 30)];

  const formatHora = (valor) => {
    const bloques = valor % 30;
    const horas = HORA_INICIO_DIA + Math.trunc(bloques / 2);
    const minutos = bloques % 2 === 0 ? "00" : "30";

    return `${String(horas).padStart(2, "0")}:${minutos}`;
  };

  return {
    dia,
    inicioFormat: formatHora(inicio),
    finFormat: formatHora(fin),
  };
}


export function findCourse(id) {
  return cursos.find(curso => curso.id === id)
}

export function findHorarioData(cursoId, horarioId) {
  const curso = findCourse(cursoId);
  if (!curso) return null;
  return curso.horarios.find(horario => horario.horarioId === horarioId) || null;
}
