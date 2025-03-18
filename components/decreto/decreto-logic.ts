import { Categoria } from "./decreto-schema";

export interface Titulos {
  pregrado: boolean;
  especializacion?: number;
  maestria?: number;
  doctorado?: number;
}

export interface Productividad {
  articulos: number;
  librosInvestigacion: number;
  librosTexto: number;
  premios: number;
  patentes: number;
}

function calcularPuntosTitulos(titulos: Titulos): number {
  let puntos = 0;

  if (titulos.pregrado) {
    puntos += 178;
  }

  if (titulos.especializacion) {
    puntos += Math.min(titulos.especializacion, 2) * 20;
  }

  if (titulos.maestria) {
    puntos += Math.min(titulos.maestria, 2) * 40;
  }

  if (titulos.doctorado) {
    puntos += Math.min(titulos.doctorado, 2) * 80;
  }

  return Math.min(puntos, 140);
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
