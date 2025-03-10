const OrderInvoice = () => {
  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      {/* Spare Section */}
      <h2 className="font-semibold">Spare</h2>
      <div className="bg-gray-100 p-4 rounded-[6px]">
        <div className="flex items-center gap-4">
          <div className="w-12 h-16 bg-black rounded"></div>
          <div className="flex-1">
            <p className="font-medium">Iphone 15 plus display qty2</p>
            <p className="text-gray-500 text-sm">
              Brand - <span className="font-semibold">Apple</span> Model -{" "}
              <span className="font-semibold">Iphone 15 plus</span>
            </p>
          </div>
          <p className="font-semibold">₹8000</p>
        </div>
      </div>

      {/* Service Details Section */}
      <h2 className="font-semibold">Service Details</h2>
      <div className="bg-gray-100 p-4 rounded-[6px]">
        <div className="text-sm space-y-1">
          <p>
            <span className="text-gray-500">Ordered date</span>{" "}
            <span className="float-right">January 02, 2025</span>
          </p>
          <p>
            <span className="text-gray-500">Spare name</span>{" "}
            <span className="float-right">Iphone 15 plus display qty2</span>
          </p>
          <p>
            <span className="text-gray-500">Serviced by</span>{" "}
            <span className="float-right font-semibold">Fixamigo</span>
          </p>
          <p>
            <span className="text-gray-500">Address</span>
            <span className="block font-medium">
              2727 New Owerri, Owerri, Imo State 78410
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
            <span className="float-right">₹16,000</span>
          </p>
          <p>
            <span className="text-gray-500">Delivery cost</span>
            <span className="float-right">₹40</span>
          </p>
          <hr className="my-2" />
          <p className="font-semibold">
            <span>Total Price</span>
            <span className="float-right">₹16,040</span>
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
