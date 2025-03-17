import { Categoria } from "./decreto-schema";

export interface Titulos {
  pregrado: boolean;
  especializacion?: number; // Número de especializaciones (máximo 2)
  maestria?: number; // Número de maestrías (máximo 2)
  doctorado?: number; // Número de doctorados (máximo 2)
}

export interface Productividad {
  articulos: number; // Número de artículos publicados
  librosInvestigacion: number; // Número de libros de investigación
  librosTexto: number; // Número de libros de texto
  premios: number; // Número de premios nacionales/internacionales
  patentes: number; // Número de patentes
}

function calcularPuntosTitulos(titulos: Titulos): number {
  let puntos = 0;

  // Puntos por pregrado
  if (titulos.pregrado) {
    puntos += 178; // Puntos base por pregrado
  }

  // Puntos por especialización
  if (titulos.especializacion) {
    puntos += Math.min(titulos.especializacion, 2) * 20; // Máximo 2 especializaciones
  }

  // Puntos por maestría
  if (titulos.maestria) {
    puntos += Math.min(titulos.maestria, 2) * 40; // Máximo 2 maestrías
  }

  // Puntos por doctorado
  if (titulos.doctorado) {
    puntos += Math.min(titulos.doctorado, 2) * 80; // Máximo 2 doctorados
  }

  // Límite máximo de puntos por títulos de posgrado
  return Math.min(puntos, 140); // Máximo 140 puntos por títulos de posgrado
}

function calcularPuntosCategoria(categoria: Categoria): number {
  switch (categoria) {
    case Categoria.Instructor:
      return 37;
    case Categoria.Asistente:
      return 58;
    case Categoria.Asociado:
      return 74;
    case Categoria.Titular:
      return 96;
    default:
      return 0;
  }
}

function calcularPuntosExperiencia(
  experiencia: number,
  categoria: Categoria
): number {
  let factor = 0;

  switch (categoria) {
    case Categoria.Instructor:
      factor = 3;
      break;
    case Categoria.Asistente:
      factor = 5;
      break;
    case Categoria.Asociado:
      factor = 6;
      break;
    case Categoria.Titular:
      factor = 7;
      break;
    default:
      factor = 0;
  }

  return experiencia * factor;
}

function calcularPuntosProductividad(productividad: Productividad): number {
  let puntos = 0;

  puntos += productividad.articulos * 15;

  puntos += productividad.librosInvestigacion * 20;

  puntos += productividad.librosTexto * 15;

  puntos += productividad.premios * 15;

  puntos += productividad.patentes * 25;

  return puntos;
}

export function calcularSalario(
  titulos: Titulos,
  categoria: Categoria,
  experiencia: number,
  productividad: Productividad,
  valorPunto: number
): number {
  const puntosTitulos = calcularPuntosTitulos(titulos);
  const puntosCategoria = calcularPuntosCategoria(categoria);
  const puntosExperiencia = calcularPuntosExperiencia(experiencia, categoria);
  const puntosProductividad = calcularPuntosProductividad(productividad);

  const totalPuntos =
    puntosTitulos + puntosCategoria + puntosExperiencia + puntosProductividad;

  return totalPuntos * valorPunto;
}

const titulosProfesor: Titulos = {
  pregrado: true,
  especializacion: 1,
  maestria: 1,
  doctorado: 1,
};

const categoriaProfesor: Categoria = Categoria.Asociado;
const experienciaProfesor: number = 10;
const productividadProfesor: Productividad = {
  articulos: 5,
  librosInvestigacion: 2,
  librosTexto: 1,
  premios: 1,
  patentes: 0,
};

const valorPunto = 6435;

const salarioProfesor = calcularSalario(
  titulosProfesor,
  categoriaProfesor,
  experienciaProfesor,
  productividadProfesor,
  valorPunto
);

console.log(`El salario mensual del profesor es: $${salarioProfesor}`);
