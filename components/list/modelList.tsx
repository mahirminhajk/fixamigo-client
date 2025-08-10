import Image from "next/image";
import Link from "next/link";

interface ModelListProps {
  models: {
    name: string;
    images: string[];
    _id: string;
    slug: string;
  }[];
  brand: string;
}

export default function ModelList({ models, brand }: ModelListProps) {
  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {models.map((model) => (
            <Link
              key={model._id} // Use unique _id for key
              href={`/repair/mobile-phone/${brand}/${model.slug}`}
              className="group bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col items-center text-center p-3 sm:p-4 
                           transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              <div className="w-full aspect-square flex items-center justify-center mb-3 sm:mb-4 overflow-hidden rounded-md bg-gray-50">
                <Image
                  src={model.images?.[0] || "/placeholder.png"} // Optional chaining for images
                  alt={`Image of ${model.name}`}
                  title={`${model.name}`}
                  width={150} // Adjusted size for 150x150 thumbnail
                  height={150} // Adjusted size for 150x150 thumbnail
                  className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-300 ease-in-out"
                  priority // Consider adding priority for above-the-fold images if applicable after lazy loading
                />
              </div>

              <h3 className="text-sm sm:text-base font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
                {model.name}
              </h3>
              {/* Optional: Add a placeholder for price or other info if needed in the future */}
              {/* <p className="text-xs text-gray-500 mt-1">Details</p> */}
            </Link>
          ))}
          {/* Missing device card */}
          {models.length !== 0 && (
            <Link
              href={`/support-request?type=device&value=${brand}`}
              className="group bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col items-center justify-center text-center p-3 sm:p-4 \
                         transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 text-blue-500 mb-2"
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
              <p className="text-sm font-medium text-gray-800 group-hover:text-blue-600">
                Can&apos;t find your device?
                <br />
                Request here
              </p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
