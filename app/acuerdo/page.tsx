import AcuerdoForm from "@/components/acuerdo/acuerdo-form";
import CustomTitle from "@/components/main/custom-title";

const AcuerdoPage = () => {
  return (
    <div className="mx-auto p-4">
      <CustomTitle title={"Acuerdo 006 de 2018"} />
      <AcuerdoForm />
    </div>
  );
};

export default AcuerdoPage;
