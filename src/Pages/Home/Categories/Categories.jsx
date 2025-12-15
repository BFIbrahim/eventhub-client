import React from "react";

const CategoriesSection = () => {
  const categories = [
    { id: 1, name: "Music", color: "btn-primary" },
    { id: 2, name: "Sports", color: "btn-secondary" },
    { id: 3, name: "Tech", color: "btn-accent" },
    { id: 4, name: "Business", color: "btn-info" },
    { id: 5, name: "Art", color: "btn-warning" },
    { id: 6, name: "Health", color: "btn-error" }
  ];

  return (
    <section className="mt-14">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-base-content">Event Categories Categories</h2>
        <p className="text-base-content/70 mt-2">
          Our all event categories are here
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`btn ${cat.color} px-6 py-3 rounded-full text-white font-semibold hover:scale-105 transform transition-transform duration-300`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
