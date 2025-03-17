import { z } from "zod";

export enum Categoria {
  Instructor = "Instructor",
  Asistente = "Asistente",
  Asociado = "Asociado",
  Titular = "Titular",
}

export const decretoSchema = z.object({
  pregrado: z.boolean({ message: "Seleccione una opción válida" }),
  especializacion: z
    .number({ message: "Ingrese un número válido" })
    .min(0, { message: "Valor no válido" })
    .max(2, { message: "Valor no válido" }),
  maestria: z
    .number({ message: "Ingrese un número válido" })
    .min(0, { message: "Valor no válido" })
    .max(2, { message: "Valor no válido" }),
  doctorado: z
    .number({ message: "Ingrese un número válido" })
    .min(0, { message: "Valor no válido" })
    .max(2, { message: "Valor no válido" }),
  categoria: z.nativeEnum(Categoria, {
    message: "Seleccione una opción válida",
  }),
  experiencia: z
    .number({ message: "Ingrese un número válido" })
    .min(0, { message: "Valor no válido" }),
  articulos: z
    .number({ message: "Ingrese un número válido" })
    .min(0, { message: "Valor no válido" }),
  librosInvestigacion: z
    .number({ message: "Ingrese un número válido" })
    .min(0, { message: "Valor no válido" }),
  librosTexto: z
    .number({ message: "Ingrese un número válido" })
    .min(0, { message: "Valor no válido" }),
  premios: z
    .number({ message: "Ingrese un número válido" })
    .min(0, { message: "Valor no válido" }),
  patentes: z
    .number({ message: "Ingrese un número válido" })
    .min(0, { message: "Valor no válido" }),
  valorPunto: z
    .number({ message: "Ingrese un número válido" })
    .min(1, { message: "Valor no válido" }),
});
