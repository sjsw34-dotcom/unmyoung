export function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="text-center">
      <div className="text-sm font-semibold uppercase tracking-wider text-[#d4af37]">
        {eyebrow}
      </div>
      <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-white">
        {title}
      </h2>
    </div>
  );
}
