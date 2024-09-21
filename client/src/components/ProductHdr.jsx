/* eslint-disable react/prop-types */
import { TbArrowRight } from "react-icons/tb"

const ProductHdr = (props) => {
    const {product} = props;
  return (
    <div className="flex items-center flex-wrap gap-x-2 medium-16 capitalize py-3">Home <TbArrowRight/> Shop <TbArrowRight/> {product.category} <TbArrowRight/> {product.name} </div>
  )
}

export default ProductHdr