import Image from "next/image";
import AddToCartBtn from "../buttons/addToCartBtn";

interface ListSparePartsProps {
  spareParts: {
    _id: string;
    label: string;
    category: string;
    totalCost: number;
    discountAmount: number;
    finalPrice: number;
  }[];
}

const getImage = (category: string) => `/icons/${category.toLowerCase()}.png`;

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
                src={getImage(item.category)}
                alt={item.label}
                width={48}
                height={48}
                className="mr-3"
              />
              <div>
                <p className="font-medium text-black">{item.label}</p>
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-blue-600 font-semibold">
                    {item.discountAmount}
                  </span>
                  <span className="line-through text-gray-500">
                    ₹{item.totalCost}
                  </span>
                  <span className="text-black font-bold">
                    ₹{item.finalPrice}
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
