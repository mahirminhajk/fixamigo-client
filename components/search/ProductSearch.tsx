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
      // Use multiple animation frames to ensure DOM has fully updated
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (inputRef.current && shouldMaintainFocusRef.current) {
            inputRef.current.focus();
            // Set cursor to end of text
            const length = inputRef.current.value.length;
            inputRef.current.setSelectionRange(length, length);
          }
        });
      });
    }
  }, [isOpen, filteredProducts]);

  // Additional focus preservation effect specifically for search results
  useEffect(() => {
    if (
      shouldMaintainFocusRef.current &&
      filteredProducts.length > 0 &&
      inputRef.current
    ) {
      const preserveFocus = () => {
        if (inputRef.current && shouldMaintainFocusRef.current) {
          inputRef.current.focus();
          const length = inputRef.current.value.length;
          inputRef.current.setSelectionRange(length, length);
        }
      };

      // Immediate focus
      preserveFocus();

      // Delayed focus to handle any async DOM updates
      const timeoutId = setTimeout(preserveFocus, 10);
      return () => clearTimeout(timeoutId);
    }
  }, [filteredProducts]);

  // Monitor focus and restore if lost unexpectedly during typing
  useEffect(() => {
    if (!shouldMaintainFocusRef.current) return;

    const focusMonitor = () => {
      if (
        shouldMaintainFocusRef.current &&
        inputRef.current &&
        document.activeElement !== inputRef.current &&
        searchQuery.length > 0 &&
        isOpen
      ) {
        // Only restore focus if we're not interacting with the dropdown
        const activeElement = document.activeElement as HTMLElement;
        if (!searchRef.current?.contains(activeElement)) {
          inputRef.current.focus();
          const length = inputRef.current.value.length;
          inputRef.current.setSelectionRange(length, length);
        }
      }
    };

    const intervalId = setInterval(focusMonitor, 100);
    return () => clearInterval(intervalId);
  }, [searchQuery, isOpen]);

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

  // Listen for search focus event from navbar
  useEffect(() => {
    const handleFocusSearch = () => {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    };

    window.addEventListener("focusProductSearch", handleFocusSearch);
    return () => {
      window.removeEventListener("focusProductSearch", handleFocusSearch);
    };
  }, []);

  const clearSearch = () => {
    setSearchQuery("");
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  return (
    <section className="w-full max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          Find Your Device
        </h2>
        <p className="text-gray-600 text-base md:text-lg">
          Search for your device to get repair parts and services
        </p>
      </div>

      <div className="relative max-w-2xl mx-auto" ref={searchRef}>
        {/* Search Input */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none z-10">
            <Search className="h-6 w-6 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
          </div>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search your device here (e.g., iPhone 14, Samsung Galaxy)"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              shouldMaintainFocusRef.current = true;
              // Ensure input stays focused during typing
              if (
                inputRef.current &&
                document.activeElement !== inputRef.current
              ) {
                inputRef.current.focus();
              }
            }}
            onFocus={() => {
              shouldMaintainFocusRef.current = true;
              if (searchQuery.trim() && filteredProducts.length > 0) {
                setIsOpen(true);
              }
            }}
            onBlur={(e) => {
              const relatedTarget = e.relatedTarget as HTMLElement;

              // If clicking within the search container, prevent blur and maintain focus
              if (searchRef.current?.contains(relatedTarget)) {
                e.preventDefault();
                e.stopPropagation();
                // Immediately refocus
                setTimeout(() => {
                  if (inputRef.current) {
                    inputRef.current.focus();
                    const length = inputRef.current.value.length;
                    inputRef.current.setSelectionRange(length, length);
                  }
                }, 0);
                return;
              }

              shouldMaintainFocusRef.current = false;
              // Longer delay to allow for dropdown interactions
              setTimeout(() => {
                if (!searchRef.current?.contains(document.activeElement)) {
                  setIsOpen(false);
                  setSelectedIndex(-1);
                }
              }, 200);
            }}
            className="w-full pl-14 pr-14 py-5 text-lg border-2 border-gray-200 rounded-2xl 
                       bg-white shadow-lg hover:shadow-xl focus:shadow-xl
                       focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100
                       placeholder-gray-400 transition-all duration-300 ease-in-out
                       disabled:bg-gray-50 disabled:cursor-not-allowed"
            // keep input enabled during pending to avoid focus/keyboard loss on mobile
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-400 
                         hover:text-gray-600 hover:bg-gray-50 rounded-r-2xl transition-all duration-200 z-10
                         disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isPending}
              aria-label="Clear search"
            >
              <X className="h-6 w-6" />
            </button>
          )}

          {/* Focus ring effect */}
          <div
            className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 
                          group-focus-within:opacity-20 transition-opacity duration-300 -z-10 blur-xl"
          ></div>
        </div>

        {/* Loading State */}
        {isPending && (
          <div
            className="absolute top-full left-0 right-0 mt-3 bg-white border border-gray-200 
                          rounded-2xl shadow-xl z-50 p-6 backdrop-blur-sm"
          >
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-200"></div>
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent absolute top-0"></div>
              </div>
              <span className="ml-3 text-gray-600 font-medium">
                Searching devices...
              </span>
            </div>
          </div>
        )}

        {/* Search Results Dropdown */}
        {isOpen && !isPending && filteredProducts.length > 0 && (
          <div
            className="absolute top-full left-0 right-0 mt-3 bg-white border border-gray-200 
                          rounded-2xl shadow-2xl z-50 max-h-96 overflow-hidden backdrop-blur-sm"
            onMouseDown={(e) => {
              // Prevent the dropdown from stealing focus
              e.preventDefault();
            }}
          >
            <div className="p-3 border-b border-gray-100 bg-gray-50">
              <p className="text-sm font-medium text-gray-700">
                Found {filteredProducts.length} device
                {filteredProducts.length !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className={`group flex items-center p-4 cursor-pointer border-b border-gray-50 last:border-b-0 
                             transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50
                             ${
                               index === selectedIndex
                                 ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100"
                                 : ""
                             }`}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleProductSelect(product);
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  onMouseMove={(e) => {
                    e.preventDefault();
                    setSelectedIndex(index);
                  }}
                >
                  <div
                    className="flex-shrink-0 w-14 h-14 mr-4 bg-white rounded-xl shadow-sm 
                                  border border-gray-100 p-2 group-hover:shadow-md transition-shadow duration-200"
                  >
                    <Image
                      src={product.image}
                      alt={product.brand}
                      title={`${product.brand} Logo`}
                      width={56}
                      height={56}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/brands/apple.png";
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3
                      className="text-base font-semibold text-gray-900 group-hover:text-blue-700 
                                   transition-colors duration-200 truncate"
                    >
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-200">
                      {product.brand}
                    </p>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    <div
                      className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center 
                                    group-hover:bg-blue-200 transition-colors duration-200"
                    >
                      <svg
                        className="w-4 h-4 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {isOpen &&
          !isPending &&
          searchQuery.trim() &&
          filteredProducts.length === 0 && (
            <div
              className="absolute top-full left-0 right-0 mt-3 bg-white border border-gray-200 
                            rounded-2xl shadow-xl z-50 p-8 text-center backdrop-blur-sm"
            >
              <div className="mb-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No devices found
                </h3>
                <p className="text-gray-500 mb-4">
                  We couldn&apos;t find any devices matching &quot;{searchQuery}
                  &quot;
                </p>
                <div className="text-sm text-gray-400">
                  <p>Try searching with:</p>
                  <ul className="mt-2 space-y-1">
                    <li>• Brand name (e.g., Samsung, Apple, OnePlus)</li>
                    <li>• Model number (e.g., Galaxy S23, iPhone 14)</li>
                    <li>• Different spelling or shorter terms</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
      </div>

      {/* Quick Search Suggestions */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500 mb-4">Popular searches:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {[
            "iPhone 14",
            "Samsung Galaxy",
            "OnePlus",
            "Google Pixel",
            "Xiaomi",
          ].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => {
                setSearchQuery(suggestion);
                shouldMaintainFocusRef.current = true;
                inputRef.current?.focus();
              }}
              className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 
                         rounded-full transition-colors duration-200 hover:shadow-md"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSearch;
