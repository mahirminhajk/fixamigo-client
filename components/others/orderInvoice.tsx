import { formatAddress, formatDate, getSparePartsIcon } from "@/lib/utils";
import { IOrder } from "@/types/order";
import Image from "next/image";

interface OrderInvoiceProps {
  order: IOrder;
}

const OrderInvoice = ({ order }: OrderInvoiceProps) => {
  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      {order.agent && (
        <>
          <h2 className="font-semibold text-lg">Contact Agent</h2>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <p className="font-medium text-gray-700">
                  Name:{" "}
                  <span className="font-semibold text-gray-900">
                    {order.agent.name.toUpperCase()}
                  </span>
                </p>
                <p className="font-medium text-gray-700">
                  Phone:{" "}
                  <a
                    href={`tel:${order.agent.phone}`}
                    className="font-semibold text-blue-600 hover:underline"
                  >
                    {order.agent.phone}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Device Section */}
      <h2 className="font-semibold">Device</h2>
      <div className="bg-gray-100 p-4 rounded-[6px]">
        <div className="flex items-center gap-4">
          <div className="w-12 h-16 rounded">
            <Image
              src={order.device.image}
              alt={order.device.name}
              width={80} // Max width, object-contain will handle scaling within the div
              height={80} // Max height
              className="object-cover rounded max-w-full max-h-full"
            />
          </div>
          <div className="flex-1">
            <p className="font-medium">{order.device.name.toUpperCase()}</p>
            <p className="text-gray-500 text-sm">
              Brand -{" "}
              <span className="font-semibold">
                {order.device.company!.toUpperCase()}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Spare Section */}
      <h2 className="font-semibold">Spares</h2>
      <div className="bg-gray-100 p-4 rounded-[6px]">
        {order.sparePartsDetails?.map((spare, i) => (
          <div className="flex items-center gap-4" key={i}>
            <div className="w-12 h-16 rounded">
              <Image
                src={getSparePartsIcon(spare.category)}
                alt={spare.name}
                width={48}
                height={48}
                className="mr-3"
              />
            </div>
            <div className="flex-1">
              <p className="font-medium">{spare.name.toUpperCase()}</p>
              <p className="text-gray-500 text-sm">
                <span className="font-semibold">{spare.category}</span>
              </p>
            </div>
            <p className="font-semibold">₹{spare.price.final}</p>
          </div>
        ))}
      </div>

      {/* Service Details Section */}
      <h2 className="font-semibold">Service Details</h2>
      <div className="bg-gray-100 p-4 rounded-[6px]">
        <div className="text-sm space-y-1">
          <p>
            <span className="text-gray-500">Ordered date</span>{" "}
            <span className="float-right">{formatDate(order.createdAt)}</span>
          </p>
          <p>
            <span className="text-gray-500">Serviced by</span>{" "}
            <span className="float-right font-semibold">Fixamigo</span>
          </p>
          <p>
            <span className="text-gray-500">Address</span>
            <span className="block font-medium">
              {formatAddress(order.address!)}
            </span>
          </p>
        </div>
      </div>

      {/* Payment Details Section */}
      <h2 className="font-semibold">Payment Details</h2>
      <div className="bg-gray-100 p-4 rounded-[6px]">
        <div className="text-sm space-y-1">
          <p>
            <span className="text-gray-500">Items (1)</span>
            <span className="float-right">₹{order.price.final}</span>
          </p>
          <p>
            <span className="text-gray-500">Delivery cost</span>
            <span className="float-right">₹{order.price.delivery}</span>
          </p>
          <hr className="my-2" />
          <p className="font-semibold">
            <span>Total Price</span>
            <span className="float-right">₹{order.price.final}</span>
          </p>
        </div>
        <button className="w-full mt-4 py-2 border rounded-[6px] font-semibold hover:bg-gray-200">
          View invoice
        </button>
      </div>
    </div>
  );
};

export default OrderInvoice;
