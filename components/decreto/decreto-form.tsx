"use client";

import CustomForm, { FieldConfig } from "../main/custom-form";
import { z } from "zod";
import { Categoria, decretoSchema } from "./decreto-schema";
import { useState } from "react";
import { calcularSalario, Productividad, Titulos } from "./decreto-logic";
import { Button } from "../ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

const fields: FieldConfig[] = [
  {
    name: "pregrado",
    label: "¿Tiene título de pregrado?",
    type: "select",
    options: [
      { value: "true", label: "Sí" },
      { value: "false", label: "No" },
    ],
    validation: decretoSchema.shape.pregrado,
  },
  {
    name: "especializacion",
    label: "Número de especializaciones (Máximo 2)",
    type: "number",
    validation: decretoSchema.shape.especializacion,
  },
  {
    name: "maestria",
    label: "Número de maestrías (Máximo 2)",
    type: "number",
    validation: decretoSchema.shape.maestria,
  },
  {
    name: "doctorado",
    label: "Número de doctorados (Máximo 2)",
    type: "number",
    validation: decretoSchema.shape.doctorado,
  },
  {
    name: "categoria",
    label: "Categoría",
    type: "select",
    options: Object.values(Categoria).map((cat) => ({
      value: cat,
      label: cat,
    })),
    validation: decretoSchema.shape.categoria,
  },
  {
    name: "experiencia",
    label: "Años de experiencia",
    type: "number",
    validation: decretoSchema.shape.experiencia,
  },
  {
    name: "articulos",
    label: "Número de artículos publicados",
    type: "number",
    validation: decretoSchema.shape.articulos,
  },
  {
    name: "librosInvestigacion",
    label: "Número de libros de investigación",
    type: "number",
    validation: decretoSchema.shape.librosInvestigacion,
  },
  {
    name: "librosTexto",
    label: "Número de libros de texto",
    type: "number",
    validation: decretoSchema.shape.librosTexto,
  },
  {
    name: "premios",
    label: "Número de premios nacionales/internacionales",
    type: "number",
    validation: decretoSchema.shape.premios,
  },
  {
    name: "patentes",
    label: "Número de patentes",
    type: "number",
    validation: decretoSchema.shape.patentes,
  },
  {
    name: "valorPunto",
    label: "Valor de un punto salarial",
    type: "number",
    validation: decretoSchema.shape.valorPunto,
  },
];

const DecretoForm = () => {
  const [salarioCalculado, setSalarioCalculado] = useState<number | null>(null);
  const [resetForm, setResetForm] = useState<boolean>(false);

  const handleSubmit = (values: z.infer<typeof decretoSchema>) => {
    const titulos: Titulos = {
      pregrado: values.pregrado,
      especializacion: values.especializacion,
      maestria: values.maestria,
      doctorado: values.doctorado,
    };

    const categoria: Categoria = values.categoria as Categoria;
    const experiencia: number = values.experiencia;
    const productividad: Productividad = {
      articulos: values.articulos,
      librosInvestigacion: values.librosInvestigacion,
      librosTexto: values.librosTexto,
      premios: values.premios,
      patentes: values.patentes,
    };
    const valorPunto: number = values.valorPunto;

    const salario = calcularSalario(
      titulos,
      categoria,
      experiencia,
      productividad,
      valorPunto
    );

    setSalarioCalculado(salario);
    setResetForm(false);
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
            <CardDescription className="text-xl">
              {new Intl.NumberFormat("es-CO", {
                style: "currency",
                currency: "COP",
                minimumFractionDigits: 0,
              }).format(salarioCalculado)}
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={handleReset}>Resetear Consulta</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default DecretoForm;
