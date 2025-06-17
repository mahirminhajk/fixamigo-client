"use client";

import { Button } from "@/components/ui/button";

interface RedirectToAdminButtonProps {
  type: "device" | "sparePart";
  id: string;
}

const RedirectToAdminButton: React.FC<RedirectToAdminButtonProps> = ({
  type,
  id,
}) => {
  const handleClick = () => {
    let adminUrl;
    switch (type) {
      case "device":
        adminUrl = `https://provider.fixamigo.com/devices/${id}`;
        break;
      case "sparePart":
        adminUrl = `https://provider.fixamigo.com/spare-parts/${id}`;
        break;
      default:
        console.error("Invalid type provided");
        return;
    }
    window.open(adminUrl, "_blank");
  };

  return (
    <Button onClick={handleClick} variant="outline" size="sm">
      Edit in Admin Panel
    </Button>
  );
};

export default RedirectToAdminButton;
