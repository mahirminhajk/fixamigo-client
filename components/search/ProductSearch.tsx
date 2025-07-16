"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useTransition,
} from "react";
import { Search, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IDevice } from "@/types/device";
import { searchDevicesAction } from "@/lib/actions/search";

interface SearchProduct {
  id: string;
  name: string;
  image: string;
  brand: string;
  slug: string;
}

const ProductSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<SearchProduct[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isPending, startTransition] = useTransition();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Safety mechanisms
  const searchCacheRef = useRef<Map<string, SearchProduct[]>>(new Map());
  const abortControllerRef = useRef<AbortController | null>(null);
  const lastSearchTimeRef = useRef<number>(0);
  const shouldMaintainFocusRef = useRef<boolean>(false);
  const MINIMUM_QUERY_LENGTH = 2;
  const DEBOUNCE_DELAY = 400; // Increased from 300ms
  const RATE_LIMIT_DELAY = 100; // Minimum time between searches

  // Convert IDevice to SearchProduct format
  const convertDeviceToSearchProduct = useMemo(
    () =>
      (device: IDevice): SearchProduct => ({
        id: device._id,
        name: device.name,
        image: device.images?.[0] ? device.images[0] : "/brands/apple.png", // Use Apple logo as fallback
        brand: device.company,
        slug: device.slug,
      }),
    []
  );

  // Search function using server action with safety mechanisms
  const performSearch = React.useCallback(
    async (query: string) => {
      // Safety check 1: Minimum query length
      if (!query.trim() || query.trim().length < MINIMUM_QUERY_LENGTH) {
        setFilteredProducts([]);
        setIsOpen(false);
        return;
      }

      const trimmedQuery = query.trim().toLowerCase();
      // Set flag to maintain focus when results come in
      shouldMaintainFocusRef.current =
        document.activeElement === inputRef.current;

      // Safety check 2: Check cache first
      const cachedResults = searchCacheRef.current.get(trimmedQuery);
      if (cachedResults) {
        setFilteredProducts(cachedResults);
        setIsOpen(true);
        setSelectedIndex(-1);
        return;
      }

      // Safety check 3: Rate limiting
      const now = Date.now();
      if (now - lastSearchTimeRef.current < RATE_LIMIT_DELAY) {
        return;
      }
      lastSearchTimeRef.current = now;

      // Safety check 4: Cancel previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      startTransition(async () => {
        try {
          const result = await searchDevicesAction(trimmedQuery);

          // Safety check 5: Ensure this request wasn't cancelled
          if (abortControllerRef.current?.signal.aborted) {
            return;
          }

          if (result.success) {
            const products = result.data.map(convertDeviceToSearchProduct);

            // Cache the results
            searchCacheRef.current.set(trimmedQuery, products);

            // Limit cache size to prevent memory issues
            if (searchCacheRef.current.size > 50) {
              const firstKey = searchCacheRef.current.keys().next().value;
              if (firstKey) {
                searchCacheRef.current.delete(firstKey);
              }
            }

            setFilteredProducts(products);
            setIsOpen(true);
            setSelectedIndex(-1);
          } else {
            console.error("Search failed:", result.error);
            setFilteredProducts([]);
            setIsOpen(false);
          }
        } catch (error) {
          // Don't log errors for aborted requests
          if (!abortControllerRef.current?.signal.aborted) {
            console.error("Error during search:", error);
          }
          setFilteredProducts([]);
          setIsOpen(false);
        }
      });
    },
    [
      startTransition,
      convertDeviceToSearchProduct,
      MINIMUM_QUERY_LENGTH,
      RATE_LIMIT_DELAY,
    ]
  );

  // Debounced search effect with improved timing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(searchQuery);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, performSearch, DEBOUNCE_DELAY]);

  // Focus management after state updates
  useEffect(() => {
    if (shouldMaintainFocusRef.current && inputRef.current) {
      // Use requestAnimationFrame to ensure DOM has updated
      requestAnimationFrame(() => {
        if (inputRef.current && shouldMaintainFocusRef.current) {
          inputRef.current.focus();
          // Set cursor to end of text
          const length = inputRef.current.value.length;
          inputRef.current.setSelectionRange(length, length);
        }
      });
    }
  }, [isOpen, filteredProducts]);

  const handleProductSelect = React.useCallback(
    (product: SearchProduct) => {
      setSearchQuery("");
      setIsOpen(false);
      setSelectedIndex(-1);

      // Use setTimeout to ensure state updates complete before navigation
      setTimeout(() => {
        // Navigate to the model page
        router.push(`/repair/mobile-phone/${product.brand}/${product.slug}`);
      }, 0);
      // /repair/mobile-phone/samsung/samsung-galaxy-m55s-5g
    },
    [router]
  );

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || filteredProducts.length === 0) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < filteredProducts.length - 1 ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev > 0 ? prev - 1 : filteredProducts.length - 1
          );
          break;
        case "Enter":
          e.preventDefault();
          if (selectedIndex >= 0 && selectedIndex < filteredProducts.length) {
            handleProductSelect(filteredProducts[selectedIndex]);
          }
          break;
        case "Escape":
          setIsOpen(false);
          setSelectedIndex(-1);
          inputRef.current?.blur();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredProducts, selectedIndex, handleProductSelect]);

  // Handle clicks outside component
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Cleanup: Cancel any pending requests on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const clearSearch = () => {
    setSearchQuery("");
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8 px-4">
      <div className="relative" ref={searchRef}>
        {/* Search Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search your Device here"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              // Mark that we want to maintain focus
              shouldMaintainFocusRef.current = true;
            }}
            onFocus={() => {
              shouldMaintainFocusRef.current = true;
              if (searchQuery.trim() && filteredProducts.length > 0) {
                setIsOpen(true);
              }
            }}
            onBlur={(e) => {
              // Check if blur is happening due to clicking on dropdown
              const relatedTarget = e.relatedTarget as HTMLElement;
              if (searchRef.current?.contains(relatedTarget)) {
                // If clicking on dropdown, don't lose focus
                e.preventDefault();
                inputRef.current?.focus();
                return;
              }

              shouldMaintainFocusRef.current = false;
              // Delay closing dropdown to allow clicking on items
              setTimeout(() => {
                // Only close if focus didn't move to a dropdown item
                if (!searchRef.current?.contains(document.activeElement)) {
                  setIsOpen(false);
                  setSelectedIndex(-1);
                }
              }, 150);
            }}
            className="w-full pl-12 pr-12 py-4 border-2 border-blue-200 rounded-full focus:outline-none focus:border-blue-500 text-lg placeholder-gray-500 bg-white shadow-sm transition-colors"
            disabled={isPending}
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              disabled={isPending}
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Loading State */}
        {isPending && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              <span className="ml-2 text-gray-500">Searching...</span>
            </div>
          </div>
        )}

        {/* Search Results Dropdown */}
        {isOpen && !isPending && filteredProducts.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className={`flex items-center p-4 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors ${
                  index === selectedIndex
                    ? "bg-blue-50 border-blue-200"
                    : "hover:bg-gray-50"
                }`}
                onMouseDown={(e) => {
                  // Prevent default to stop blur event
                  e.preventDefault();
                  handleProductSelect(product);
                }}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <div className="flex-shrink-0 w-12 h-12 mr-4">
                  <Image
                    src={product.image}
                    alt={product.brand}
                    width={48}
                    height={48}
                    className="w-full h-full object-contain rounded"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/brands/apple.png"; // Fallback image
                    }}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">{product.brand}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {isOpen &&
          !isPending &&
          searchQuery.trim() &&
          filteredProducts.length === 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4">
              <p className="text-gray-500 text-center">
                No products found for &quot;{searchQuery}&quot;
              </p>
            </div>
          )}
      </div>
    </div>
  );
};

export default ProductSearch;
