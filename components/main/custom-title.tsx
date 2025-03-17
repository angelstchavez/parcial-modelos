const CustomTitle = ({ title }: { title: string }) => {
  return (
    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 bg-gradient-to-r from-green-700 to-green-900 text-transparent bg-clip-text">
      {title}
    </h2>
  );
};

export default CustomTitle;
