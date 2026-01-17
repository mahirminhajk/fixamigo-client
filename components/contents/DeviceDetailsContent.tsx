import ListSpareParts from "@/components/list/listSpareParts";
import UnknownSpareParts from "@/components/list/UnknownSpareParts";
import DiagnosisServices from "@/components/list/DiagnosisServices";
import OtherServices from "@/components/list/OtherServices";
import ShowModel from "@/components/others/showModel";
import WhyChooseUs from "@/components/others/whyChooseUs";
import OtherPhones from "@/components/others/otherPhones";
import DeviceOffersSection from "@/components/others/DeviceOffersSection";
import { IDevice } from "@/types/device";
import { ISparePart } from "@/types";
import ModelCart from "../others/modelCart";
import Link from "next/link";
import { hasActiveOffers } from "@/lib/offers";

interface DeviceDetailsContentProps {
  deviceData: IDevice;
}

export default async function DeviceDetailsContent({
  deviceData,
}: DeviceDetailsContentProps) {
  // Define the complete required categories list
  const REQUIRED_CATEGORIES = [
    "BATTERY",
    "DISPLAY",
    "CAMERA",
    "CHARGING_PORT",
    "MOTHERBOARD",
    "SPEAKER",
    "VIBRATOR",
    "BUTTONS",
    "FRONT_CAMERA",
    "BACK_CAMERA",
    "CAMERA_GLASS",
  ];

  const existingCategories = Array.isArray(deviceData.spareParts)
    ? deviceData.spareParts.map((sp) => sp.category)
    : [];

  const missingCategories = REQUIRED_CATEGORIES.filter(
    (cat) => !existingCategories.includes(cat)
  );

  return (
    <section className="mx-auto max-w-7xl px-4 pb-28 sm:px-6 lg:px-8 lg:pb-20">
      {/* Mobile Layout (unchanged) */}
      <div className="space-y-6 lg:hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
        <ShowModel
          deviceData={{
            name: deviceData.name,
            company: deviceData.company,
            images: deviceData.images,
          }}
          renderHeadingAsH1={false}
          only="mobile"
        />

        {/* Device Offers Section - Mobile */}
        {hasActiveOffers(deviceData.slug) && (
          <DeviceOffersSection
            deviceSlug={deviceData.slug}
            spareParts={deviceData.spareParts}
            cartDevice={{
              _id: deviceData._id,
              name: deviceData.name,
              slug: deviceData.slug,
              company: deviceData.company,
              images: deviceData.images,
            }}
            className="mt-8"
          />
        )}

        <ListSpareParts
          spareParts={deviceData.spareParts}
          cartDevice={{
            _id: deviceData._id,
            name: deviceData.name,
            slug: deviceData.slug,
            company: deviceData.company,
            images: deviceData.images,
          }}
        />
        {/* Missing categories placeholder services */}
        <UnknownSpareParts
          missingCategories={missingCategories}
          cartDevice={{
            _id: deviceData._id,
            name: deviceData.name,
            slug: deviceData.slug,
            company: deviceData.company,
            images: deviceData.images,
          }}
        />
        <DiagnosisServices
          existingSpareParts={deviceData.spareParts as ISparePart[]}
          cartDevice={{
            _id: deviceData._id,
            name: deviceData.name,
            slug: deviceData.slug,
            company: deviceData.company,
            images: deviceData.images,
          }}
        />
        <OtherServices
          existingSpareParts={deviceData.spareParts as ISparePart[]}
          cartDevice={{
            _id: deviceData._id,
            name: deviceData.name,
            slug: deviceData.slug,
            company: deviceData.company,
            images: deviceData.images,
          }}
        />
        {/* Support/help request card (moved from ListSpareParts) */}
        <div className="bg-gray-100 py-4 rounded-[6px] shadow-sm mt-4 lg:col-span-full">
          <Link
            href={`/support-request?type=service&value=${deviceData.slug}`}
            className="flex items-center justify-between px-4"
            title="Request a service that's not listed"
          >
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-blue-500 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                />
              </svg>
              <span className="text-sm font-medium text-gray-800">
                Can&apos;t find the service you need? Request here
              </span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
        <ModelCart />
        <OtherPhones
          currentDevice={{
            company: deviceData.company,
            slug: deviceData.slug,
            name: deviceData.name,
          }}
        />

        <WhyChooseUs />
      </div>{" "}
      {/* Desktop Layout */}
      <div className="hidden lg:block animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Main Grid Layout */}
        <div className="space-y-8">
            {/* Device Info Section */}
            <ShowModel
              deviceData={{
                name: deviceData.name,
                company: deviceData.company,
                images: deviceData.images,
              }}
              renderHeadingAsH1={true}
              only="desktop"
            />

            {/* Device Offers Section - Desktop */}
            {hasActiveOffers(deviceData.slug) && (
              <DeviceOffersSection
                deviceSlug={deviceData.slug}
                spareParts={deviceData.spareParts}
                cartDevice={{
                  _id: deviceData._id,
                  name: deviceData.name,
                  slug: deviceData.slug,
                  company: deviceData.company,
                  images: deviceData.images,
                }}
              />
            )}

            {/* Spare Parts Section */}
            <ListSpareParts
              spareParts={deviceData.spareParts}
              cartDevice={{
                _id: deviceData._id,
                name: deviceData.name,
                slug: deviceData.slug,
                company: deviceData.company,
                images: deviceData.images,
              }}
            />

            {/* Missing categories placeholder services */}
            <UnknownSpareParts
              missingCategories={missingCategories}
              cartDevice={{
                _id: deviceData._id,
                name: deviceData.name,
                slug: deviceData.slug,
                company: deviceData.company,
                images: deviceData.images,
              }}
            />

            <DiagnosisServices
              existingSpareParts={deviceData.spareParts as ISparePart[]}
              cartDevice={{
                _id: deviceData._id,
                name: deviceData.name,
                slug: deviceData.slug,
                company: deviceData.company,
                images: deviceData.images,
              }}
            />
            <OtherServices
              existingSpareParts={deviceData.spareParts as ISparePart[]}
              cartDevice={{
                _id: deviceData._id,
                name: deviceData.name,
                slug: deviceData.slug,
                company: deviceData.company,
                images: deviceData.images,
              }}
            />
            {/* Support/help request card (moved from ListSpareParts) */}
            <div className="bg-gray-100 py-4 rounded-[6px] shadow-sm mt-4 lg:col-span-full">
              <Link
                href={`/support-request?type=service&value=${deviceData.slug}`}
                className="flex items-center justify-between px-4"
                title="Request a service that's not listed"
              >
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-blue-500 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                    />
                  </svg>
                  <span className="text-sm font-medium text-gray-800">
                    Can&apos;t find the service you need? Request here
                  </span>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>

            {/* Model Cart */}
            <ModelCart />
          <OtherPhones
            currentDevice={{
              company: deviceData.company,
              slug: deviceData.slug,
              name: deviceData.name,
            }}
          />
        </div>

        {/* Why Choose Us Section - Bottom */}
        <div className="mt-12 flex justify-center">
          <WhyChooseUs />
        </div>
      </div>
    </section>
  );
}
