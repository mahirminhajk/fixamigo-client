"use client";

import Topbar from "@/components/core/topbar";
import EmptyAndNotLogined from "@/components/others/emptyAndNotLogined";
import { GiAutoRepair } from "react-icons/gi";
import { FaArrowRight } from "react-icons/fa";

const services = [
  {
    status: "Ready to pickup",
    color: "bg-orange-500",
    details: {
      name: "Iphone 15 plus display qty2",
      serviceStatus: "Pickup at Jan 2nd",
      model: "Apple iphone 15 plus",
      price: "₹8,000",
    },
  },
  {
    status: "Repairing",
    details: {
      name: "Iphone 15 plus display qty2",
      serviceStatus: "Repairing",
      model: "Apple iphone 15 plus",
      price: "₹8,000",
    },
  },
  {
    status: "Repaired",
    color: "bg-blue-500",
    details: {
      name: "Iphone 15 plus display qty2",
      serviceStatus: "Repaired",
      model: "Apple iphone 15 plus",
      price: "₹8,000",
    },
  },
  {
    status: "Out for delivery",
    details: {
      name: "Iphone 15 plus display qty2",
      serviceStatus: "Delivery at Jan 2nd",
      model: "Apple iphone 15 plus",
      price: "₹8,000",
    },
  },
  {
    status: "Delivered",
    color: "bg-green-500",
    details: {
      name: "Iphone 15 plus display qty2",
      serviceStatus: "Delivered",
      model: "Apple iphone 15 plus",
      price: "₹8,000",
    },
  },
];

const OutForDeliveryCircle = () => (
  <div className="w-5 h-5 rounded-full border-4 border-green-500"></div>
);
const RepairingCircle = () => (
  <div className="w-5 h-5 rounded-full border-4 border-blue-500"></div>
);
const SolidCircle = ({ color }: { color?: string }) => (
  <div className={`w-5 h-5 rounded-full ${color}`}></div>
);

export default function Page() {
  return (
    <section>
      <div className="flex flex-col items-center">
        <div className="flex-1 p-4 w-full flex justify-center">
          <div className="w-full max-w-md">
            <Topbar title="My Services" />
            {services.length === 0 ? (
              <EmptyAndNotLogined
                icon={<GiAutoRepair />}
                title="No Services yet"
                showAuth={false}
                showAction={true}
                actionLink="/repair/mobile-phone"
                actionText="Create a Service"
                description="You don't have any orders yet. Please create some orders.❤️."
              />
            ) : (
              <div className="flex flex-col items-center mt-4 px-4 space-y-4 w-full">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 shadow-sm rounded-[6px] p-5 w-full max-w-md"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        {service.status === "Repairing" ? (
                          <RepairingCircle />
                        ) : service.status === "Out for delivery" ? (
                          <OutForDeliveryCircle />
                        ) : (
                          <SolidCircle color={service.color} />
                        )}
                        <h2 className="text-gray-900 font-bold">
                          {service.status}
                        </h2>
                      </div>
                      <FaArrowRight className="text-gray-500" />
                    </div>
                    <p className="text-gray-600 text-sm mb-2">
                      {service.details.name}
                    </p>
                    <div className="grid grid-cols-2 gap-y-3 text-gray-600 text-sm">
                      <p className="font-medium">Service Status</p>
                      <p className="text-right">
                        {service.details.serviceStatus}
                      </p>
                      <p className="font-medium">Model</p>
                      <p className="text-right">{service.details.model}</p>
                      <p className="font-medium">Price</p>
                      <p className="text-right font-bold text-gray-900">
                        {service.details.price}
                      </p>
                    </div>
                  </div>
                ))}
                <div className="h-20"></div>
              </div>
            )}
            <div className="h-20"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

//TODO: add the no sign comp
{
  /* <EmptyAndNotLogined
icon={<GiAutoRepair />}
title="Sign In to Access Your Services"
showAuth={true}
showAction={false}
description="Sign in to quickly access and manage all the services available to you❤️."
/> */
}
