type Categoria = "Auxiliar" | "Asistente" | "Asociado" | "Titular";
type Dedicacion = "Tiempo Completo" | "Medio Tiempo";
type Posgrado =
  | "Especialización"
  | "Maestría"
  | "Doctorado"
  | "Postdoctorado"
  | "Ninguno";
export type GrupoInvestigacion =
  | "A1"
  | "A"
  | "B"
  | "C"
  | "Reconocido"
  | "Semillero"
  | "Ninguno";

interface Profesor {
  categoria: Categoria;
  dedicacion: Dedicacion;
  posgrado?: Posgrado;
  grupoInvestigacion?: GrupoInvestigacion;
}

const SALARIO_MINIMO_LEGAL_VIGENTE = 1423500;
const IPC_ANUAL = 0.03;

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

const BONIFICACION_POSGRADO: Record<Posgrado, number> = {
  Especialización: 0.1 * SALARIO_MINIMO_LEGAL_VIGENTE,
  Maestría: 0.45 * SALARIO_MINIMO_LEGAL_VIGENTE,
  Doctorado: 0.9 * SALARIO_MINIMO_LEGAL_VIGENTE,
  Postdoctorado: 0,
  Ninguno: 0,
};

const BONIFICACION_GRUPO_INVESTIGACION: Record<GrupoInvestigacion, number> = {
  A1: 0.56 * SALARIO_MINIMO_LEGAL_VIGENTE,
  A: 0.47 * SALARIO_MINIMO_LEGAL_VIGENTE,
  B: 0.42 * SALARIO_MINIMO_LEGAL_VIGENTE,
  C: 0.38 * SALARIO_MINIMO_LEGAL_VIGENTE,
  Reconocido: 0.33 * SALARIO_MINIMO_LEGAL_VIGENTE,
  Semillero: 0.19 * SALARIO_MINIMO_LEGAL_VIGENTE,
  Ninguno: 0,
};

export function calcularSalario(profesor: Profesor): number {
  const salarioBase = SALARIOS_BASE[profesor.categoria][profesor.dedicacion];

  const bonificacionPosgrado = profesor.posgrado
    ? BONIFICACION_POSGRADO[profesor.posgrado]
    : 0;

  const bonificacionGrupoInvestigacion = profesor.grupoInvestigacion
    ? BONIFICACION_GRUPO_INVESTIGACION[profesor.grupoInvestigacion]
    : 0;

  let salarioTotal =
    salarioBase + bonificacionPosgrado + bonificacionGrupoInvestigacion;

  salarioTotal *= 1 + IPC_ANUAL;

  return salarioTotal;
}
