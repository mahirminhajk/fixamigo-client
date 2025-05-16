import Image from "next/image";
import Link from "next/link";

interface ModelListProps {
  models: {
    name: string;
    images: string[];
    _id: string;
    slug: string;
  }[];
  category: string;
  brand: string;
  heading: string;
}

export default function ModelList({
  models,
  category,
  brand,
  heading,
}: ModelListProps) {
  return (
    <div className="w-full p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl font-semibold text-center mb-4">{heading}</h2>

        {models.length === 0 ? (
          <div className="flex items-center justify-center h-96">
            <p>No models available for {brand}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {models.map((model, index) => (
              <Link
                key={index}
                href={`/repair/${category}/${brand}/${model.slug}`}
                className="bg-gray-100 p-4 rounded-xl shadow-md flex flex-col items-center cursor-pointer
                            transition duration-300 ease-in-out hover:shadow-lg hover:scale-105"
              >
                <div className="w-32 h-32 flex items-center justify-center">
                  <Image
                    src={model.images[0] || "/placeholder.png"}
                    alt={model.name}
                    width={128}
                    height={128}
                    className="object-cover w-full h-full rounded-md"
                  />
                </div>

                <p className="text-center text-sm font-medium mt-2">
                  {model.name}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
