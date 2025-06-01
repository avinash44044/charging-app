import { useState } from "react";

export default function ChargerList({ chargers, onEdit, onDelete }) {
  const [filter, setFilter] = useState({ status: "", connectorType: "" });
  const [selectedCharger, setSelectedCharger] = useState(null);

  const filtered = chargers.filter(
    (c) =>
      (!filter.status || c.status === filter.status) &&
      (!filter.connectorType || c.connectorType.includes(filter.connectorType))
  );

  // Handle dropdown selection
  const handleSelectChange = (e) => {
    const chargerId = e.target.value;
    const charger = filtered.find((c) => c._id === chargerId);
    setSelectedCharger(charger || null);
  };

  // Handle Delete action
  const handleDeleteClick = () => {
    if (selectedCharger) {
      onDelete(selectedCharger._id);
      setSelectedCharger(null); // Reset selection after deletion
    }
  };

  // Handle Edit action
  const handleEditClick = () => {
    if (selectedCharger) {
      onEdit(selectedCharger);
    }
  };

  return (
    <div className="filter-bar">
      <h3>Filter</h3>
      <select
        value={filter.status}
        onChange={(e) => setFilter({ ...filter, status: e.target.value })}
      >
        <option value="">All Status</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>

      <input
        placeholder="Connector Type"
        value={filter.connectorType}
        onChange={(e) =>
          setFilter({ ...filter, connectorType: e.target.value })
        }
      />

      <h3>Chargers</h3>
      <select onChange={handleSelectChange} value={selectedCharger?._id || ""}>
        <option value="">Select a charger</option>
        {filtered.map((c) => (
          <option key={c._id} value={c._id}>
            {c.name} ({c.status}) - {c.powerOutput}kW - {c.connectorType}
          </option>
        ))}
      </select>

      {selectedCharger && (
        <div className="charger-actions">
          <button onClick={handleEditClick}>Edit</button>
          <button onClick={handleDeleteClick}>Delete</button>
        </div>
      )}
    </div>
  );
}