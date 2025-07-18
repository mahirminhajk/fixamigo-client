"use client";
import Topbar from "@/components/core/topbar";
import EmptyAndNotLogined from "@/components/others/emptyAndNotLogined";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton
import { GiAutoRepair } from "react-icons/gi";
import { FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import api from "@/lib/axiosInstance";
import { useEffect, useState } from "react";
import { IOrder, OrderStatus } from "@/types/order";
import { useHydratedStore } from "@/hooks/useHydratedStore";
import { useUserStore } from "@/stores/userStore";
import { formatDate } from "@/lib/utils";

const GreenCircle = () => (
  <div className="w-5 h-5 rounded-full bg-green-500"></div>
);
const OrangeCircle = () => (
  <div className="w-5 h-5 rounded-full border-3 bg-[#D2691E]"></div>
);
const RedCircle = () => (
  <div className="w-5 h-5 rounded-full border-4 border-red-500"></div>
);
// const SolidCircle = ({ color }: { color?: string }) => (
//   <div className={`w-5 h-5 rounded-full ${color}`}></div>
// );

export default function Page() {
  //* state
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [error, setError] = useState<string | null>(null);

  const user = useHydratedStore(useUserStore, (state) => state.user);

  //* hooks
  const router = useRouter();

  const getOrders = async () => {
    setLoading(true);
    setError(null);
    api
      .get(`/order/user/${user?._id}`)
      .then((res) => {
        if (res.status === 200) {
          setOrders(res.data.data.orders);
        } else {
          setError("Something went wrong");
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //* useEffect
  useEffect(() => {
    if (user?._id) {
      (async () => {
        await getOrders();
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (!user) {
    return (
      <section>
        <div className="flex flex-col items-center">
          <div className="flex-1 p-4 w-full flex justify-center">
            <div className="w-full max-w-md">
              <Topbar title="My Services" />
              <EmptyAndNotLogined
                icon={<GiAutoRepair />}
                title="Sign In to Access Your Services"
                showAuth={true}
                showAction={false}
                description="Sign in to quickly access and manage all the services available to you❤️."
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <div className="flex flex-col items-center">
          <div className="flex-1 p-4 w-full flex justify-center">
            <div className="w-full max-w-md">
              <Topbar title="My Services" />
              <EmptyAndNotLogined
                icon={<GiAutoRepair />}
                title="Error"
                showAuth={false}
                showAction={false}
                description={error}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section>
        <div className="flex flex-col items-center">
          <div className="flex-1 p-4 w-full flex justify-center">
            <div className="w-full max-w-md">
              <Topbar title="My Services" />
              {/* Skeleton Loading State */}
              <div className="flex flex-col items-center mt-4 px-4 space-y-4 w-full">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-gray-100 shadow-sm rounded-[6px] p-5 w-full max-w-md"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Skeleton className="w-5 h-5 rounded-full" />
                        <Skeleton className="h-6 w-24" /> {/* Status text */}
                      </div>
                      <Skeleton className="w-4 h-4" /> {/* Arrow icon */}
                    </div>
                    <Skeleton className="h-4 w-32 mb-2" /> {/* Date */}
                    <div className="grid grid-cols-2 gap-y-3 text-gray-600 text-sm">
                      <Skeleton className="h-4 w-20" /> {/* Label */}
                      <Skeleton className="h-4 w-28 justify-self-end" />{" "}
                      {/* Value */}
                      <Skeleton className="h-4 w-16" /> {/* Label */}
                      <Skeleton className="h-4 w-24 justify-self-end" />{" "}
                      {/* Value */}
                      <Skeleton className="h-4 w-12" /> {/* Label */}
                      <Skeleton className="h-4 w-20 justify-self-end" />{" "}
                      {/* Value */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="flex flex-col items-center">
        <div className="flex-1 p-4 w-full flex justify-center">
          <div className="w-full max-w-md">
            <Topbar title="My Services" />
            {orders.length === 0 ? ( // Ensure this condition is mutually exclusive with loading state
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
                {orders.map((service, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 shadow-sm rounded-[6px] p-5 w-full max-w-md cursor-pointer transition-colors hover:bg-gray-200"
                    onClick={() =>
                      router.push(`/my-services/summary?id=${service._id}`)
                    }
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        {service.status === OrderStatus.COMPLETED ||
                        service.status === OrderStatus.DELIVERED ? (
                          <GreenCircle />
                        ) : service.status === OrderStatus.PENDING ||
                          service.status === OrderStatus.CANCELLED ||
                          service.status === OrderStatus.OTHERS ||
                          service.status === OrderStatus.REJECTED ? (
                          <RedCircle />
                        ) : (
                          <OrangeCircle />
                        )}
                        <h2 className="text-gray-900 font-bold">
                          {service.status}
                        </h2>
                      </div>
                      <FaArrowRight className="text-gray-500" />
                    </div>
                    <p className="text-gray-600 text-sm mb-2">
                      {formatDate(service.createdAt)}
                    </p>
                    <div className="grid grid-cols-2 gap-y-3 text-gray-600 text-sm">
                      <p className="font-medium">Service Status</p>
                      <p className="text-right">{service.status}</p>
                      <p className="font-medium">Model</p>
                      <p className="text-right">{service.device.name}</p>
                      <p className="font-medium">Price</p>
                      <p className="text-right font-bold text-gray-900">
                        {service.price.final}
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
