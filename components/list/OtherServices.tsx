import AddToCartBtn from "../buttons/addToCartBtn";
import { ICartDevice, ISparePart, SparePartType } from "@/types";
import { HardDrive, Cpu, KeyRound } from "lucide-react";
import { MdRestore, MdBugReport, MdLockOpen } from "react-icons/md";

interface OtherServicesProps {
  existingSpareParts: ISparePart[];
  cartDevice: ICartDevice;
}

type IconType = React.ComponentType<{ className?: string }>;
interface ServiceMeta {
  raw: string;
  label: string;
  Icon: IconType;
  Fallback: IconType;
}

const OTHER_SERVICE_METAS: ServiceMeta[] = [
  {
    raw: "data recovery",
    label: "Data Recovery",
    Icon: HardDrive,
    Fallback: MdRestore,
  },
  {
    raw: "software issue",
    label: "Software Problems",
    Icon: Cpu,
    Fallback: MdBugReport,
  },
  {
    raw: "forget password",
    label: "Password Unlock",
    Icon: KeyRound,
    Fallback: MdLockOpen,
  },
];

export default function OtherServices({
  existingSpareParts,
  cartDevice,
}: OtherServicesProps) {
  const existingLabels = (existingSpareParts || []).map((sp) =>
    sp.label.toLowerCase()
  );

  const filteredMetas = OTHER_SERVICE_METAS.filter(
    (m) => !existingLabels.includes(m.raw.toLowerCase())
  );

  const services: ISparePart[] = filteredMetas.map((m) => {
    const slug = m.label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    return {
      _id: `other-${cartDevice._id}-${slug}`,
      label: m.label,
      name: m.label,
      category: "OTHERS",
      type: SparePartType.DIAGNOSIS,
      price: { total: 0, repair: 0, final: 0 },
    } as ISparePart;
  });

  if (!services.length) return null;

  return (
    <div className="w-full max-w-md mx-auto lg:max-w-none p-4 mt-8">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-bold">OTHER SERVICE</h2>
      </div>
      <hr className="bg-black mb-4" />

      {/* Mobile */}
      <div className="lg:hidden space-y-3">
        {services.map((item) => {
          const meta = OTHER_SERVICE_METAS.find((m) => m.label === item.label);
          const Icon = meta?.Icon || HardDrive;
          return (
            <div
              key={item._id}
              className="bg-gray-100 py-4 pr-2 rounded-[6px] shadow-sm"
            >
              <div className="flex items-center justify-between px-4">
                <div className="flex items-center">
                  <span className="mr-3">
                    <Icon className="w-12 h-12 text-[#D2691E]" />
                  </span>
                  <div>
                    <p className="font-medium text-black">{item.label}</p>
                    <p className="text-xs text-amber-700 font-medium">
                      Price will be confirmed after booking
                    </p>
                  </div>
                </div>
                <AddToCartBtn sparePart={item} cartDevice={cartDevice} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop */}
      <div className="hidden lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {services.map((item) => {
          const meta = OTHER_SERVICE_METAS.find((m) => m.label === item.label);
          const Icon = meta?.Icon || HardDrive;
          return (
            <div
              key={item._id}
              className="bg-gray-100 p-4 rounded-[6px] shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex flex-col space-y-3">
                <div className="flex items-center">
                  <span className="mr-3">
                    <Icon className="w-10 h-10 text-[#D2691E]" />
                  </span>
                  <div className="flex-1">
                    <p className="font-medium text-black text-sm">
                      {item.label}
                    </p>
                    <p className="text-[10px] text-amber-700 font-medium">
                      Price will be confirmed after booking
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-end">
                  <AddToCartBtn sparePart={item} cartDevice={cartDevice} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
