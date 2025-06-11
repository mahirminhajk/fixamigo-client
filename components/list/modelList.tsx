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
  heading: string;
}

export default function ModelList({ models, brand, heading }: ModelListProps) {
  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Conditionally render the heading only if it's provided */}
        {heading && (
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6 sm:mb-8 tracking-tight">
            {heading}
          </h2>
        )}

        {models.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-96 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-xl text-gray-600">
              No models currently available for {brand}.
            </p>
            <p className="text-md text-gray-500 mt-1">
              Please check back later or try a different brand.
            </p>
          </div>
        ) : (
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
          </div>
        )}
      </div>
    </div>
  );
}
