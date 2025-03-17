import { z } from "zod";

export enum Categoria {
  Instructor = "Instructor",
  Asistente = "Asistente",
  Asociado = "Asociado",
  Titular = "Titular",
}

export const decretoSchema = z.object({
  pregrado: z.boolean({
    required_error: "El campo 'pregrado' es requerido",
  }),
  especializacion: z
    .number({
      required_error: "El campo 'especializacion' es requerido",
    })
    .min(0, "El número de especializaciones debe ser mínimo 0")
    .max(2, "El número de especializaciones no puede exceder 2"),
  maestria: z
    .number({
      required_error: "El campo 'maestria' es requerido",
    })
    .min(0, "El número de maestrías debe ser mínimo 0")
    .max(2, "El número de maestrías no puede exceder 2"),
  doctorado: z
    .number({
      required_error: "El campo 'doctorado' es requerido",
    })
    .min(0, "El número de doctorados debe ser mínimo 0")
    .max(2, "El número de doctorados no puede exceder 2"),
  categoria: z.nativeEnum(Categoria, {
    required_error: "El campo 'categoria' es requerido",
    invalid_type_error:
      "El campo 'categoria' debe ser una de las opciones: Instructor, Asistente, Asociado, Titular",
  }),
  experiencia: z
    .number({
      required_error: "El campo 'experiencia' es requerido",
      invalid_type_error: "El campo 'experiencia' debe ser un número",
    })
    .min(0, "Los años de experiencia deben ser mínimo 0"),
  articulos: z
    .number({
      required_error: "El campo 'articulos' es requerido",
      invalid_type_error: "El campo 'articulos' debe ser un número",
    })
    .min(0, "El número de artículos publicados debe ser mínimo 0"),
  librosInvestigacion: z
    .number({
      required_error: "El campo 'librosInvestigacion' es requerido",
      invalid_type_error: "El campo 'librosInvestigacion' debe ser un número",
    })
    .min(0, "El número de libros de investigación debe ser mínimo 0"),
  librosTexto: z
    .number({
      required_error: "El campo 'librosTexto' es requerido",
      invalid_type_error: "El campo 'librosTexto' debe ser un número",
    })
    .min(0, "El número de libros de texto debe ser mínimo 0"),
  premios: z
    .number({
      required_error: "El campo 'premios' es requerido",
      invalid_type_error: "El campo 'premios' debe ser un número",
    })
    .min(0, "El número de premios debe ser mínimo 0"),
  patentes: z
    .number({
      required_error: "El campo 'patentes' es requerido",
      invalid_type_error: "El campo 'patentes' debe ser un número",
    })
    .min(0, "El número de patentes debe ser mínimo 0"),
  valorPunto: z
    .number({
      required_error: "El campo 'valorPunto' es requerido",
      invalid_type_error: "El campo 'valorPunto' debe ser un número",
    })
    .min(1, "El valor del punto salarial debe ser al menos 1"),
});
