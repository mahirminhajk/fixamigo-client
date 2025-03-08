import { FaChevronRight } from "react-icons/fa";

const CheckoutAddressCard = () => {
  const address = {
    name: "John Doe",
    details: "1234, 5th Avenue, New York, USA",
    phone: "+1 234 5678 910",
  };

  return (
    <div className="w-full max-w-md bg-gray-100 p-4 rounded-xl shadow-md cursor-pointer">
      <p className="text-gray-500 text-sm">Shipping Address</p>
      <div className="flex justify-between items-center">
        {address ? (
          <div>
            <p className="text-lg font-medium">{address.name}</p>
            <p className="text-sm text-gray-600">{address.details}</p>
            <p className="text-sm text-gray-600">{address.phone}</p>
          </div>
        ) : (
          <p className="text-lg font-medium">Add Shipping Address</p>
        )}
        <span className="">
          <FaChevronRight />
        </span>
      </div>
    </div>
  );
};

export default CheckoutAddressCard;
