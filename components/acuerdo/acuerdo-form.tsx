"use client";

import CustomForm, { FieldConfig } from "../main/custom-form";
import { z } from "zod";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
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
  const [salarioCalculado, setSalarioCalculado] = useState<number | null>(null);
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
        description="Ingrese la información para calcular el salario del profesor."
        resetForm={resetForm}
      />
      {salarioCalculado !== null && (
        <Card className="mx-auto mt-2">
          <CardHeader>
            <CardTitle>El salario mensual del profesor es:</CardTitle>
            <CardDescription className="text-2xl text-green-700 font-bold">
              {new Intl.NumberFormat("es-CO", {
                style: "currency",
                currency: "COP",
                minimumFractionDigits: 0,
              }).format(salarioCalculado)}
            </CardDescription>
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
