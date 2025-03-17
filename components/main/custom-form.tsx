/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect } from "react";

export type FieldConfig = {
  name: string;
  label: string;
  type:
    | "text"
    | "email"
    | "tel"
    | "number"
    | "date"
    | "time"
    | "select"
    | "hidden"
    | "password";
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: z.ZodTypeAny;
  hidden?: boolean;
};

type GenericFormProps = {
  fields: FieldConfig[];
  onSubmit: (values: any) => void;
  title: string;
  description: string;
  resetForm?: boolean;
};

const CustomForm = ({
  fields,
  onSubmit,
  title,
  description,
  resetForm,
}: GenericFormProps) => {
  const formSchema = z.object(
    fields.reduce((acc, field) => {
      acc[field.name] = field.validation || z.string();
      return acc;
    }, {} as Record<string, z.ZodTypeAny>)
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: fields.reduce((acc, field) => {
      acc[field.name] = "";
      return acc;
    }, {} as Record<string, string>),
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const parsedValues = Object.fromEntries(
      Object.entries(values).map(([key, value]) => {
        const field = fields.find((f) => f.name === key);
        if (field?.type === "number" && typeof value === "string") {
          return [key, value === "" ? 0 : Number(value)];
        }
        return [key, value];
      })
    );
    onSubmit(parsedValues);
  };

  useEffect(() => {
    if (resetForm) {
      form.reset();
    }
  }, [resetForm, form]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-green-700">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fields.map((field) => (
                <FormField
                  key={field.name}
                  control={form.control}
                  name={field.name}
                  render={({ field: formField }) => (
                    <FormItem className={field.hidden ? "hidden" : ""}>
                      <FormLabel>{field.label}</FormLabel>
                      <FormControl>
                        {field.type === "select" ? (
                          <Select
                            onValueChange={(value) => {
                              const parsedValue =
                                value === "true"
                                  ? true
                                  : value === "false"
                                  ? false
                                  : value;
                              formField.onChange(parsedValue);
                            }}
                            value={String(formField.value)}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder={field.placeholder} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {field.options?.map((option) => (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <Input
                            placeholder={field.placeholder}
                            type={
                              field.type === "hidden" ? "hidden" : field.type
                            }
                            {...formField}
                            value={
                              field.type === "date" && formField.value
                                ? formField.value.split("T")[0]
                                : field.type === "time" && formField.value
                                ? formField.value
                                : formField.value
                            }
                            onChange={(e) => {
                              if (field.type === "date") {
                                const date = new Date(e.target.value);
                                if (!isNaN(date.getTime())) {
                                  formField.onChange(date.toISOString());
                                } else {
                                  formField.onChange("");
                                }
                              } else if (field.type === "time") {
                                const regex =
                                  /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
                                if (regex.test(e.target.value)) {
                                  formField.onChange(e.target.value);
                                } else {
                                  formField.onChange("");
                                }
                              } else if (field.type === "number") {
                                const value = e.target.value;
                                formField.onChange(
                                  value === "" ? "" : Number(value)
                                );
                              } else {
                                formField.onChange(e.target.value);
                              }
                            }}
                          />
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <Button
              type="submit"
              className="bg-green-700 hover:bg-green-700/90"
            >
              Registrar
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CustomForm;
