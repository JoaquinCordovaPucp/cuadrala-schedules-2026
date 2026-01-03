import cursos from './data.json';
export { cursos };

//From data.js
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


//End data.js


const buscarEventos = (curso, horario) => {
    if (curso === "none") return []

    const cursoSelec = cursos.find(c => c.id === curso)
    if (!cursoSelec) return []  

    const horarioSelec = cursoSelec.horarios.find(h => h.horarioId == horario)
    if (!horarioSelec) return [] 

    return horarioSelec.eventos.map(e => ({
        ...e,
        horarioId: horario,
        curso: cursoSelec.id
    }))
}

const evaluarCoinidencia = (eventos) => {
    let sonCompatibles = true
    for(let i = 0; i < eventos.length; i++){
        for(let j = i + 1; j < eventos.length; j++){
            const evento1 = eventos[i]
            const evento2 = eventos[j]
            if((evento1.tipo != "EXA" && evento2.tipo != "EXA") || (evento1.tipo === "EXA") && (evento2.tipo === "EXA")) {
                if(Math.min(evento1.fin, evento2.fin) > Math.max(evento1.inicio, evento2.inicio)){
                    console.log("Chocan", evento1, "con", evento2)
                    sonCompatibles = false
                }
            }
            continue
        }
    }
    return sonCompatibles
}

const toLocalISOString = (date) => {
  const pad = n => String(n).padStart(2, '0')

  return `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:00`
}


const formatearEventos = (eventos, indice, outArr) => {

    if (!outArr[indice]) {
        outArr[indice] = []
    }

    eventos.forEach(e => {
        const dayNumber = Math.floor(e.inicio / 30) + 1
        const startHourNumber = (e.inicio % 30)  // Esto me da las MEDIAS HORAS despues de las 7 (Inicio del dia)
        const endHourNumber = (e.fin % 30) 

        const startHour = 7 + Math.floor(startHourNumber / 2)
        const endHour = 7 + Math.floor(endHourNumber / 2)

        const startMinutes = startHourNumber % 2 === 0 ? 0 : 30
        const endMinutes = endHourNumber % 2 === 0 ? 0 : 30

        const sumaDias = 0  // (indice) * 7
        const baseStartDate = new Date(
            2024,
            0,
            dayNumber + sumaDias,
            startHour,
            startMinutes,
            0
        )

        const baseEndDate = new Date(
            2024,
            0,
            dayNumber + sumaDias,
            endHour,
            endMinutes,
            0
        )
        
        outArr[indice].push({
            title: e.curso,
            type: e.tipo,
            horarioId: e.horarioId,
            start: toLocalISOString(baseStartDate),
            end: toLocalISOString(baseEndDate)
        })
    })
}


const combinar = ( arr, indice, acumulador, outArr, state) => {

    if(evaluarCoinidencia(acumulador) == false) {
        return
    }

    if(indice == arr.length){
        console.log("acumulador", acumulador)
        formatearEventos(acumulador, state.contadorCompatibles, outArr);
        state.contadorCompatibles += 1
        return
    }

    arr[indice].horarioId.forEach((horario) => {
        const eventos = buscarEventos(arr[indice].id, horario)
        const nuevoAcumulador = acumulador.concat(eventos)
        combinar(arr, indice + 1, nuevoAcumulador, outArr, state)
    })
}

export const generarCombinaciones = (arrCursosSelec) => {
    const outputArray = []
    let contadorCompatibles = 0
    combinar(arrCursosSelec, 0, [], outputArray, {contadorCompatibles: 0})
    return outputArray
}


export const findHorario = (id, horario) => {
  const curso = cursos.find(c => c.id === id)
  return curso.horarios.find(h => h.horarioId == horario)
}


// DATA
// const cursos = [
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


//INPUT SELECTION OF DATAA 
// const cursoSelec1 = {
//     id: "CDR121",
//     horarioId: [261, 262]
// }

// const cursoSelec2 = {
//     id: "CDR123",
//     horarioId: [363]
// }

// const cursoSelec3 = {
//     id: "CDR125",
//     horarioId: [464, 465]
// }

// const cursoSelec4 = {
//     id: "none",
//     horarioId: [0]
// }

// const cursoSelec5 = {
//     id: "none",
//     horarioId: [0]
// }








// cursoSelec1.horarioId.forEach( horario1 => {
//     const horario1Eventos = buscarEventos(cursoSelec1.id, horario1) 
//     cursoSelec2.horarioId.forEach( horario2 => {
//         const horario2Eventos = buscarEventos(cursoSelec2.id, horario2) 
//         cursoSelec3.horarioId.forEach( horario3 => {
//             const horario3Eventos = buscarEventos(cursoSelec3.id, horario3) 
//             cursoSelec4.horarioId.forEach( horario4 => {
//                 const horario4Eventos = buscarEventos(cursoSelec4.id, horario4)
//                 cursoSelec5.horarioId.forEach(horario5 => {
//                     const horario5Eventos = buscarEventos(cursoSelec5.id, horario5)
//                     const eventos = [...horario1Eventos, ...horario2Eventos, ...horario3Eventos, ...horario4Eventos, ...horario5Eventos]
//                     if(evaluarCoinidencia(eventos)){ // True si son compatibles los eventos
//                         console.log("Los horarios son compatibles",cursoSelec1.id, horario1, ", ", cursoSelec2.id, horario2,", ", cursoSelec3.id, horario3,", ", cursoSelec4.id, horario4,", ", cursoSelec5.id, horario5, "INDICIE",  contadorCompatibles)
//                         formatearEventos(eventos, contadorCompatibles);
//                         contadorCompatibles += 1
//                         eventosCompatibles.push(eventos)
//                     }
//                 })
//             })
//         })
//     })
// })


// console.log(eventosCompatiblesFormat)


// const arrCursosSelec = []
// arrCursosSelec.push(cursoSelec1)
// arrCursosSelec.push(cursoSelec2)
// arrCursosSelec.push(cursoSelec3)
// arrCursosSelec.push(cursoSelec4)
// arrCursosSelec.push(cursoSelec5)


// console.log(arrCursosSelec)


// const eventosCompatiblesFormat = []
// let contadorCompatibles = 0

// combinar(arrCursosSelec, 0, [], eventosCompatiblesFormat, {contadorCompatibles: 0})
// console.log(combinacionesP)
// const eventosCompatiblesFormatCompleto = []
// eventosCompatiblesFormat.forEach(eventos => {
//     eventosCompatiblesFormatCompleto.push(...eventos)
// })

// console.log(generarCombinaciones(arrCursosSelec))
// console.log(eventosCompatiblesFormatCompleto)
// console.log(generarCombinaciones(arrCursosSelec))