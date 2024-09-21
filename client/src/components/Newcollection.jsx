import { useEffect, useState } from "react";
import Item from "../components/Item";

const Newcollection = () => {
  const [newCollection, setNewCollection] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/latestproducts")
      .then((response) => response.json())
      .then((data) => setNewCollection(data));
  }, []);

  return (
    <section className="bg-primary">
      <div className="max_padd_container py-12 xl:py-28 cl:w-[88%]">
        <h3 className="h3 text-center">Latest Products </h3>
        <hr className="h-[3px] md:w-1/2 mx-auto bg-gradient-to-l from-transparent via-black to-transparent mb-16 " />
        {/* container */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-6">
          {newCollection.map((item) => (
            <Item
              key={item.id}
              id={item.id}
              images={item.images}
              name={item.name}
              old_price={item.old_price}
              new_price={item.new_price}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Newcollection;
