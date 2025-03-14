function VersionInfo() {
  const version = "1.0.7-alpha";
  const isPreRelease = /alpha|beta|rc/i.test(version);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800">App Version</h2>
        <p
          className={`text-3xl font-bold mt-2 ${
            isPreRelease ? "text-red-500" : "text-green-600"
          }`}
        >
          {version}
        </p>
        {isPreRelease && (
          <span className="mt-2 text-sm text-red-500">
            (Pre-Release Version)
          </span>
        )}
      </div>
    </div>
  );
}

export default VersionInfo;
