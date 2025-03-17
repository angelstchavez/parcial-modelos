import DecretoForm from "@/components/decreto/decreto-form";
import CustomTitle from "@/components/main/custom-title";

const DecretoPage = () => {
  return (
    <div className="mx-auto p-4">
      <CustomTitle title={"Decreto 1279"} />
      <DecretoForm />
    </div>
  );
};

export default DecretoPage;
