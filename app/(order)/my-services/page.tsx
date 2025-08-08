"use client";
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

  // Handle hydration - show loading state while user is undefined
  if (user === undefined) {
    return (
      <section className="py-6">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              My Orders
            </h1>
            <p className="text-gray-600">Loading your orders...</p>
          </div>
          <div className="p-8 text-center">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // User is null (not logged in)
  if (!user) {
    return (
      <section className="py-6">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              My Orders
            </h1>
            <p className="text-gray-600">Track and manage your repair orders</p>
          </div>
          <EmptyAndNotLogined
            icon={<GiAutoRepair />}
            title="Sign In to Access Your Services"
            showAuth={true}
            showAction={false}
            description="Sign in to quickly access and manage all the services available to you❤️."
          />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-6">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              My Orders
            </h1>
            <p className="text-gray-600">Track and manage your repair orders</p>
          </div>
          <EmptyAndNotLogined
            icon={<GiAutoRepair />}
            title="Error"
            showAuth={false}
            showAction={false}
            description={error}
          />
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="py-6">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              My Orders
            </h1>
            <p className="text-gray-600">Track and manage your repair orders</p>
          </div>
          {/* Skeleton Loading State */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 shadow-sm rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Skeleton className="w-5 h-5 rounded-full" />
                    <Skeleton className="h-5 w-24" /> {/* Status text */}
                  </div>
                  <Skeleton className="w-4 h-4" /> {/* Arrow icon */}
                </div>
                <Skeleton className="h-4 w-32 mb-4" /> {/* Date */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-20" /> {/* Label */}
                    <Skeleton className="h-4 w-28" /> {/* Value */}
                  </div>
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-16" /> {/* Label */}
                    <Skeleton className="h-4 w-24" /> {/* Value */}
                  </div>
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-12" /> {/* Label */}
                    <Skeleton className="h-4 w-20" /> {/* Value */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-6">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            My Orders
          </h1>
          <p className="text-gray-600">Track and manage your repair orders</p>
        </div>

        {orders.length === 0 ? (
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
          <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {orders.map((service, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 shadow-sm hover:shadow-md rounded-xl p-6 cursor-pointer transition-all duration-200 hover:scale-[1.02]"
                onClick={() =>
                  router.push(`/my-services/summary?id=${service._id}`)
                }
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
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
                    <h3 className="text-gray-900 font-semibold text-sm">
                      {service.status}
                    </h3>
                  </div>
                  <FaArrowRight className="text-gray-400 text-sm" />
                </div>

                <p className="text-gray-500 text-sm mb-4">
                  {formatDate(service.createdAt)}
                </p>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm font-medium">
                      Service Status
                    </span>
                    <span className="text-gray-900 text-sm">
                      {service.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm font-medium">
                      Model
                    </span>
                    <span className="text-gray-900 text-sm font-medium">
                      {service.device.name}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm font-medium">
                      Price
                    </span>
                    <span className="text-[#D2691E] text-sm font-bold">
                      ₹{service.price.final}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
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
