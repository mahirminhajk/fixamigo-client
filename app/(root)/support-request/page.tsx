import SupportRequestForm from "../../../components/SupportRequestForm";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  // Determine request type and initial value from URL
  const type = (await searchParams).type ?? "brand";
  const value = (await searchParams).value ?? "";

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Support Request ({type.charAt(0).toUpperCase() + type.slice(1)})
      </h1>
      <SupportRequestForm type={type} value={value} />
    </div>
  );
}
