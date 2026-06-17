export default function Loading({ text = '加载中...' }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-4 border-insurance-blue-100 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-insurance-blue-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
      <p className="mt-4 text-gray-500 text-sm">{text}</p>
    </div>
  );
}
