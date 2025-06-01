import { useEffect, useState } from "react";
import axios from "../api/axios";
import ChargerForm from "../components/ChargerForm";
import ChargerList from "../components/ChargerList";
import MapView from "../components/MapView";
import "../styles/home.css";

export default function Home() {
  const [stations, setStations] = useState([]);
  const [editData, setEditData] = useState(null);

  const getStations = async () => {
    const res = await axios.get("/stations");
    setStations(res.data);
  };

  const handleSubmit = async (formData) => {
    if (editData) {
      await axios.put(`/stations/${editData._id}`, formData);
      setEditData(null);
    } else {
      await axios.post("/stations", formData);
    }
    getStations();
  };

  const handleDelete = async (id) => {
    await axios.delete(`/stations/${id}`);
    getStations();
  };

  useEffect(() => {
    getStations();
  }, []);

const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};

  return (
    <div className="home-container">
      <h2>Charging Station Manager</h2>
      <ChargerForm
        onSubmit={handleSubmit}
        initialData={editData}
        onCancel={() => setEditData(null)}
      />
      <hr />
      <ChargerList
        chargers={stations}
        onEdit={(data) => setEditData(data)}
        onDelete={handleDelete}
      />

      <MapView chargers={stations} />
      
      <button onClick={logout}>Logout</button>

    
    </div>

);
}
