import { useState, useEffect } from "react";
import "../styles/form.css";

export default function ChargerForm({ onSubmit, initialData, onCancel }) {
  const [form, setForm] = useState({
    name: "",
    status: "Active",
    powerOutput: "",
    connectorType: "Type 2 (Mennekes)",
    location: { latitude: "", longitude: "" },
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "latitude" || name === "longitude") {
      setForm({ ...form, location: { ...form.location, [name]: value } });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({
      name: "",
      status: "Active",
      powerOutput: "",
      connectorType: "Type 2 (Mennekes)",
      location: { latitude: "", longitude: "" },
    });
  };

  return (
    <form className="charger-form" onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Station Name"
        value={form.name}
        onChange={handleChange}
        required
      />

      <select name="status" value={form.status} onChange={handleChange} required>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>

      <input
        name="powerOutput"
        placeholder="Power Output (kW)"
        type="number"
        value={form.powerOutput}
        onChange={handleChange}
        required
      />

      <select name="connectorType" value={form.connectorType} onChange={handleChange} required>
        <option value="">Select Connector Type</option>
        <option value="Type 1 (SAE J1772)">Type 1 (SAE J1772)</option>
        <option value="Type 2 (Mennekes)">Type 2 (Mennekes)</option>
        <option value="CCS Type 1">CCS Type 1</option>
        <option value="CCS Type 2">CCS Type 2</option>
        <option value="CHAdeMO">CHAdeMO</option>
        <option value="GB/T">GB/T</option>
        <option value="Tesla Connector">Tesla Connector</option>
      </select>

      <input
        name="latitude"
        placeholder="Latitude"
        value={form.location.latitude}
        onChange={handleChange}
        required
      />

      <input
        name="longitude"
        placeholder="Longitude"
        value={form.location.longitude}
        onChange={handleChange}
        required
      />

      <button type="submit">{initialData ? "Update" : "Add"} Charger</button>
      {initialData && <button type="button" onClick={onCancel}>Cancel</button>}
    </form>
  );
}
