import Card from "./Card";

const RiskAdvantageCards = () => {
  const list = [
    {
      title: "Heavy financial fines",
      description: [
        "Heavy financial fines from the National Food Safety Authority for non-compliance with health regulations.",
      ],
      image: "/risk-advantage-cards/card-1.jpg",
      color: "#5196fd",
    },
    {
      title: "Food contamination cases",
      description: [
        "WHO reports indicate 70% of food contamination cases originate from unsafe sewage networks.",
      ],
      image: "/risk-advantage-cards/card-2.jpg",
      color: "#8f89ff",
    },
    {
      title: "Facility closure and license revocation",
      description: [
        "Facility closure and license revocation due to non-compliance with occupational safety and health standards.",
      ],
      image: "/risk-advantage-cards/card-3.jpg",
      color: "#13006c",
    },
    {
      title: "Small Details Make Big Differences",
      description: [
        "100% Healthy Environment - Non-porous surface completely prevents bacterial and fat penetration.",
        "Perfect Cleaning - 99.9% free from bacteria and fats after cleaning.",
        "Durability and Sustainability - Rust and corrosion resistant with solid physical structure that withstands impacts.",
      ],
      image: "/risk-advantage-cards/card-4.jpg",
      color: "#0b4f4a",
    },
    {
      title: "Sustainability and Development",
      description: [
        "Facility development and preparation for obtaining international quality certificates (ISO22000, BRCGS, IFS FOOD).",
        "300% savings on replacement costs compared to other materials.",
        "Focus on building rather than repairing.",
      ],
      image: "/risk-advantage-cards/card-5.jpg",
      color: "#0b4f4a",
    },
  ];

  return (
    <section className="relative">
      <Card list={list} />
    </section>
  );
};

export default RiskAdvantageCards;
