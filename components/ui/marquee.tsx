export default function Marquee({ items }: { items: string[] }) {
  return (
    <div className="relative flex w-full overflow-x-hidden bg-foreground text-white font-base">
      <div className="animate-marquee whitespace-nowrap py-2">
        {items.map((item) => {
          return (
            <span key={item} className="mx-1 text-2xl">
              {item}-
            </span>
          )
        })}
      </div>

      <div className="absolute top-0 animate-marquee2 whitespace-nowrap py-2">
        {items.map((item) => {
          return (
            <span key={item} className="mx-1 text-2xl">
              {item}-
            </span>
          )
        })}
      </div>

      {/* must have both of these in order to work */}
    </div>
  )
}
