const LogoSlider = () => {
  const logos = [
    { name: "Abo Hashem", color: "#2563eb" },
    { name: "Alsanhory", color: "#dc2626" },
    { name: "Almostakbl", color: "#059669" },
    { name: "3Y", color: "#7c3aed" },
    { name: "Beyeni Plast", color: "#ea580c" },
    { name: "Partner 6", color: "#0891b2" },
    { name: "Partner 7", color: "#8b5cf6" },
    { name: "Partner 8", color: "#10b981" },
    { name: "Partner 9", color: "#f59e0b" },
    { name: "Partner 10", color: "#6366f1" },
  ];

  return (
    <section className="py-16 bg-background overflow-hidden">
      <div className="relative">
        <div className="flex animate-scroll">
          {/* First set */}
          {logos.map((logo, index) => (
            <div
              key={`first-${index}`}
              className="flex-shrink-0 mx-8 w-32 h-32 flex items-center justify-center"
            >
              <div
                className="w-full h-full rounded-lg flex items-center justify-center font-bold text-white shadow-lg"
                style={{ backgroundColor: logo.color }}
              >
                {logo.name}
              </div>
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {logos.map((logo, index) => (
            <div
              key={`second-${index}`}
              className="flex-shrink-0 mx-8 w-32 h-32 flex items-center justify-center"
            >
              <div
                className="w-full h-full rounded-lg flex items-center justify-center font-bold text-white shadow-lg"
                style={{ backgroundColor: logo.color }}
              >
                {logo.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoSlider;
