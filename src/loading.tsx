
export default function Loading() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-5">
      {/* Loading Spinner */}
      <div className="relative flex h-20 w-20 items-center justify-center">
        <div className="absolute h-20 w-20 animate-spin rounded-full border-4 border-green-100 border-t-green-600"></div>

        <span className="text-3xl">🛒</span>
      </div>

      {/* Loading Text */}
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-800">
          Bazar Dor
        </h2>

        <p className="mt-2 animate-pulse text-sm text-gray-500">
          বাজারদরের তথ্য লোড হচ্ছে...
        </p>
      </div>

      {/* Loading Progress Bars */}
      <div className="w-52 space-y-2">
        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-green-600"></div>
        </div>
      </div>
    </div>
  );
}

