import Item from "../components/Item";
import { useEffect, useState } from "react";

const Popular = () => {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/popularproducts")
      .then((response) => response.json())
      .then((data) => setPopular(data));
  }, []);

  return (
    <section className="bg-primary">
      <div className="max_padd_container py-12 xl:py-28 cl:w-[88%]">
        <h3 className="h3 text-center">Realted Products</h3>
        <hr className="h-[3px] md:w-1/2 mx-auto bg-gradient-to-l from-transparent via-black to-transparent mb-16 " />
        {/* container xl:grid-cols-4 for four items in a row */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-6">
          {popular.map((item) => (
            <Item
              key={item.id}
              id={item.id}
              images={item.images} // Pass the array of images
              name={item.name}
              new_price={item.new_price}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Popular;
