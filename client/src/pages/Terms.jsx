import { FaCircleCheck } from "react-icons/fa6";

const Terms = () => {
  return (
    <section className="max_padd_container py-12 xl:py-28">
      <div className="py-12 xl:py-22">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-center">
          Refund, Exchange Policy
        </h1>
        <div className="flex justify-center mb-8">
          <FaCircleCheck className="bold-48" />
        </div>
        <p className="text-lg md:text-xl lg:text-2xl text-center">
          We accept refund, exchange while the courier awaits you. Once he
          leaves, the refund will not be allowed.
        </p>
      </div>
    </section>
  );
};

export default Terms;
