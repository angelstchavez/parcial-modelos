"use client";

import CustomForm, { FieldConfig } from "../main/custom-form";
import { z } from "zod";
import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card";
import CustomToast from "../main/custom-toast";
import {
  Categoria,
  decretoSchema,
  Dedicacion,
  GrupoInvestigacion,
  Posgrado,
} from "./acuerdo-schema";
import { calcularSalario } from "./acuerdo-logic";

const fields: FieldConfig[] = [
  {
    name: "categoria",
    label: "Categoría",
    type: "select",
    options: Object.values(Categoria).map((cat) => ({
      value: cat,
      label: cat,
    })),
    placeholder: "Seleccione una opción",
    validation: decretoSchema.shape.categoria,
  },
  {
    name: "dedicacion",
    label: "Dedicación",
    type: "select",
    options: Object.values(Dedicacion).map((ded) => ({
      value: ded,
      label: ded,
    })),
    placeholder: "Seleccione una opción",
    validation: decretoSchema.shape.dedicacion,
  },
  {
    name: "posgrado",
    label: "Posgrado",
    type: "select",
    options: Object.values(Posgrado).map((pos) => ({
      value: pos,
      label: pos,
    })),
    placeholder: "Seleccione una opción",
    validation: decretoSchema.shape.posgrado.optional(),
  },
  {
    name: "grupoInvestigacion",
    label: "Grupo de Investigación",
    type: "select",
    options: Object.values(GrupoInvestigacion).map((grupo) => ({
      value: grupo,
      label: grupo,
    })),
    placeholder: "Seleccione una opción",
    validation: decretoSchema.shape.grupoInvestigacion.optional(),
  },
];

const AcuerdoForm = () => {
  const [salarioCalculado, setSalarioCalculado] = useState<{
    salarioBase: number;
    bonificacionPosgrado: number;
    bonificacionGrupoInvestigacion: number;
    salarioTotal: number;
  } | null>(null);
  const [resetForm, setResetForm] = useState<boolean>(false);

  const handleSubmit = (values: z.infer<typeof decretoSchema>) => {
    const salario = calcularSalario(values);

    setSalarioCalculado(salario);
    setResetForm(false);

    CustomToast({
      text: "Cálculo exitoso",
      description: "Se ha calculado correctamente el salario.",
    });
  };

  const handleReset = () => {
    setSalarioCalculado(null);
    setResetForm(true);
  };

  return (
    <div>
      <CustomForm
        fields={fields}
        onSubmit={handleSubmit}
        title="Formulario de Cálculo Salarial"
        description="Cálculo del salario con base en el salario mínimo legal vigente: $1.423.500,0"
        resetForm={resetForm}
      />
      {salarioCalculado !== null && (
        <Card className="mx-auto mt-2">
          <CardHeader>
            <CardTitle className="text-green-700">
              Detalles del salario:
            </CardTitle>
            <div className="mt-4 border p-3 rounded-lg space-y-2">
              <div>
                <div>Salario Base:</div>
                <span className="font-semibold text-lg">
                  {new Intl.NumberFormat("es-CO", {
                    style: "currency",
                    currency: "COP",
                    minimumFractionDigits: 0,
                  }).format(salarioCalculado.salarioBase)}
                </span>
              </div>
              <div>
                <div>Bonificación por Posgrado:</div>
                <span className="font-semibold text-lg">
                  {new Intl.NumberFormat("es-CO", {
                    style: "currency",
                    currency: "COP",
                    minimumFractionDigits: 0,
                  }).format(salarioCalculado.bonificacionPosgrado)}
                </span>
              </div>
              <div>
                <div>Bonificación por Grupo de Investigación:</div>{" "}
                <span className="font-semibold text-lg">
                  {new Intl.NumberFormat("es-CO", {
                    style: "currency",
                    currency: "COP",
                    minimumFractionDigits: 0,
                  }).format(salarioCalculado.bonificacionGrupoInvestigacion)}
                </span>
              </div>
              <div>
                <div>Salario Total:</div>
                <span className="text-xl text-green-700 font-bold">
                  {new Intl.NumberFormat("es-CO", {
                    style: "currency",
                    currency: "COP",
                    minimumFractionDigits: 0,
                  }).format(salarioCalculado.salarioTotal)}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardFooter className="py-0">
            <Button onClick={handleReset} variant={"outline"}>
              Restablecer cálculo
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default AcuerdoForm;
