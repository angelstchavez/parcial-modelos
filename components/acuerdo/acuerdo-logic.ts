// Definición de las variables de entrada
type Categoria = "Auxiliar" | "Asistente" | "Asociado" | "Titular";
type Dedicacion = "Tiempo Completo" | "Medio Tiempo";
type Posgrado = "Especialización" | "Maestría" | "Doctorado" | "Postdoctorado";
type GrupoInvestigacion = "A1" | "A" | "B" | "C" | "Reconocido" | "Semillero";

interface Profesor {
  categoria: Categoria;
  dedicacion: Dedicacion;
  posgrado?: Posgrado; // Opcional, ya que no todos los profesores tienen posgrado
  grupoInvestigacion?: GrupoInvestigacion; // Opcional, ya que no todos los profesores pertenecen a un grupo de investigación
}

// Definición de las constantes
const SALARIO_MINIMO_LEGAL_VIGENTE = 1000000; // Este valor debe ser actualizado según el SMMLV vigente
const IPC_ANUAL = 0.03; // Este valor debe ser actualizado según el IPC anual vigente

// Tablas de salarios base según categoría y dedicación
const SALARIOS_BASE: Record<Categoria, Record<Dedicacion, number>> = {
  Auxiliar: {
    "Tiempo Completo": 2.645 * SALARIO_MINIMO_LEGAL_VIGENTE,
    "Medio Tiempo": 1.509 * SALARIO_MINIMO_LEGAL_VIGENTE,
  },
  Asistente: {
    "Tiempo Completo": 3.125 * SALARIO_MINIMO_LEGAL_VIGENTE,
    "Medio Tiempo": 1.749 * SALARIO_MINIMO_LEGAL_VIGENTE,
  },
  Asociado: {
    "Tiempo Completo": 3.606 * SALARIO_MINIMO_LEGAL_VIGENTE,
    "Medio Tiempo": 1.99 * SALARIO_MINIMO_LEGAL_VIGENTE,
  },
  Titular: {
    "Tiempo Completo": 3.918 * SALARIO_MINIMO_LEGAL_VIGENTE,
    "Medio Tiempo": 2.146 * SALARIO_MINIMO_LEGAL_VIGENTE,
  },
};

// Tablas de bonificaciones por posgrado y grupo de investigación
const BONIFICACION_POSGRADO: Record<Posgrado, number> = {
  Especialización: 0.1 * SALARIO_MINIMO_LEGAL_VIGENTE,
  Maestría: 0.45 * SALARIO_MINIMO_LEGAL_VIGENTE,
  Doctorado: 0.9 * SALARIO_MINIMO_LEGAL_VIGENTE,
  Postdoctorado: 0, // No hay bonificación para postdoctorado según el decreto
};

const BONIFICACION_GRUPO_INVESTIGACION: Record<GrupoInvestigacion, number> = {
  A1: 0.56 * SALARIO_MINIMO_LEGAL_VIGENTE,
  A: 0.47 * SALARIO_MINIMO_LEGAL_VIGENTE,
  B: 0.42 * SALARIO_MINIMO_LEGAL_VIGENTE,
  C: 0.38 * SALARIO_MINIMO_LEGAL_VIGENTE,
  Reconocido: 0.33 * SALARIO_MINIMO_LEGAL_VIGENTE,
  Semillero: 0.19 * SALARIO_MINIMO_LEGAL_VIGENTE,
};

// Función para calcular el salario total
export function calcularSalario(profesor: Profesor): number {
  // Calcular el salario base según la categoría y dedicación
  const salarioBase = SALARIOS_BASE[profesor.categoria][profesor.dedicacion];

  // Aplicar bonificación por posgrado si existe
  const bonificacionPosgrado = profesor.posgrado
    ? BONIFICACION_POSGRADO[profesor.posgrado]
    : 0;

  // Aplicar bonificación por grupo de investigación si existe
  const bonificacionGrupoInvestigacion = profesor.grupoInvestigacion
    ? BONIFICACION_GRUPO_INVESTIGACION[profesor.grupoInvestigacion]
    : 0;

  // Calcular el salario total
  let salarioTotal =
    salarioBase + bonificacionPosgrado + bonificacionGrupoInvestigacion;

  // Ajustar el salario según el IPC anual
  salarioTotal *= 1 + IPC_ANUAL;

  return salarioTotal;
}

// Ejemplo de uso
const profesorEjemplo: Profesor = {
  categoria: "Asistente",
  dedicacion: "Tiempo Completo",
  posgrado: "Maestría",
  grupoInvestigacion: "A1",
};

const salarioCalculado = calcularSalario(profesorEjemplo);
console.log(`El salario calculado es: ${salarioCalculado}`);
