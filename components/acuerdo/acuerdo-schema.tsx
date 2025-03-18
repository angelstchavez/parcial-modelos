import { z } from "zod";

export enum Categoria {
  Auxiliar = "Auxiliar",
  Asistente = "Asistente",
  Asociado = "Asociado",
  Titular = "Titular",
}

export enum Dedicacion {
  TiempoCompleto = "Tiempo Completo",
  MedioTiempo = "Medio Tiempo",
}

export enum Posgrado {
  Especializacion = "Especialización",
  Maestria = "Maestría",
  Doctorado = "Doctorado",
  Postdoctorado = "Postdoctorado",
  Ninguno = "Ninguno",
}

export enum GrupoInvestigacion {
  A1 = "A1",
  A = "A",
  B = "B",
  C = "C",
  Reconocido = "Reconocido",
  Semillero = "Semillero",
  Ninguno = "Ninguno",
}

export const decretoSchema = z.object({
  categoria: z.nativeEnum(Categoria, {
    message: "Seleccione una categoría válida",
  }),
  dedicacion: z.nativeEnum(Dedicacion, {
    message: "Seleccione una dedicación válida",
  }),
  posgrado: z
    .nativeEnum(Posgrado, {
      message: "Seleccione un posgrado válido",
    })
    .optional(),
  grupoInvestigacion: z
    .nativeEnum(GrupoInvestigacion, {
      message: "Seleccione un grupo de investigación válido",
    })
    .optional(),
});
