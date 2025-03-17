import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="mx-auto p-4 justify-center min-h-screen">
      <Card>
        <CardHeader>
          <CardTitle className="text-4xl font-bold mb-4 text-green-700">
            Parcial N° 1 - Modelos y Simulación
          </CardTitle>
          <CardDescription className="text-xl">
            Seleccione una de las opciones del menú
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <p className="text-sm">
            <span className="font-semibold">Desarollado por:</span> Angel Chavez
            - Juan Pineda
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
