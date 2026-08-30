const stats = [
  {
    value: "15+",
    label: "Years Leadership & Organisational Development Experience",
  },
  {
    value: "750+",
    label: "Relationship & Team Transformation Workshops",
  },
  {
    value: "5000+",
    label: "Combined Coaching & Facilitation Hours",
  },
  {
    value: "2000+",
    label: "Individual Contributors & Team Leaders Developed",
  },
];

export function StatsBar() {
  return (
    <div className="border-t border-white/10 bg-black/20 backdrop-blur-sm">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px md:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`flex flex-col items-center px-5 py-8 text-center md:px-8 ${
              index > 0 ? "md:border-l md:border-white/10" : ""
            } ${index % 2 === 1 ? "border-l border-white/10 md:border-l-0" : ""}`}
          >
            <p className="font-display text-3xl font-medium text-white md:text-4xl">
              {stat.value}
            </p>
            <p className="mt-3 max-w-[14rem] text-xs font-medium leading-5 text-white/80 sm:text-sm">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
