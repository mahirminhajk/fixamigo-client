import Image from "next/image";
import AddToCartBtn from "../buttons/addToCartBtn";
import { SparePart } from "@/types/spareParts";
import { getSparePartsIcon } from "@/lib/utils";

interface ListSparePartsProps {
  spareParts: SparePart[];
}

function ListSpareParts({ spareParts }: ListSparePartsProps) {
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <h2 className="text-lg font-bold mb-2">SPARE PARTS</h2>
      <hr className="bg-black mb-4" />

      {spareParts.map((item) => (
        <div
          key={item._id}
          className="bg-gray-100 py-4 pr-2 rounded-[6px] shadow-sm mb-3"
        >
          <div className="flex items-center justify-between px-4">
            <div className="flex items-center">
              <Image
                src={getSparePartsIcon(item.category)}
                alt={item.label}
                width={48}
                height={48}
                className="mr-3"
              />
              <div>
                <p className="font-medium text-black">{item.label}</p>
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-blue-600 font-semibold">
                    {item.price.discountPercentage}%
                  </span>
                  <span className="line-through text-gray-500">
                    ₹{item.price.total}
                  </span>
                  <span className="text-black font-bold">
                    ₹{item.price.final}
                  </span>
                </div>
              </div>
            </div>
            <AddToCartBtn sparePart={item} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListSpareParts;
