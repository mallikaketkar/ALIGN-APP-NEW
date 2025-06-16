export function DotMatrix({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <div
        className="w-full h-full opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle, #333 1px, transparent 1px)`,
          backgroundSize: "12px 12px",
        }}
      />
    </div>
  )
}
