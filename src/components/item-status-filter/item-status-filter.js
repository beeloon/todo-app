import React from "react";

const ItemStatusFilter = ({ filter, onFilter }) => {
  const statusList = [
    { name: "all", label: "All" },
    { name: "active", label: "Active" },
    { name: "done", label: "Done" },
  ];

  const buttons = statusList.map(({ name, label }) => {
    const isActive = filter === name;
    const clazz = isActive ? "btn-info" : "btn-outline-secondary";

    return (
      <button
        type="button"
        key={name}
        className={`btn ${clazz}`}
        onClick={() => onFilter(name)}
      >
        {label}
      </button>
    );
  });

  return <div className="btn-group">{buttons}</div>;
};

export default ItemStatusFilter;
