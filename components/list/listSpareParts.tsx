import Image from "next/image";
import AddToCartBtn from "../buttons/addToCartBtn";
import { getDiscountPercentage, getSparePartsIcon } from "@/lib/utils";
import { ICartDevice, ISparePart } from "@/types";
import RedirectToAdminButton from "../admin/redirectToAdminButton";

interface ListSparePartsProps {
  spareParts: ISparePart[];
  cartDevice: ICartDevice;
}

function ListSpareParts({ spareParts, cartDevice }: ListSparePartsProps) {
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
                    -{getDiscountPercentage(item.price.total, item.price.final)}
                    %
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
            <RedirectToAdminButton id={item._id} type="sparePart" />
            <AddToCartBtn sparePart={item} cartDevice={cartDevice} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListSpareParts;
