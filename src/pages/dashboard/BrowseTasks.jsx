import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import TaskCard from "../../components/TaskCard";

import { FaGlobe, FaMapMarkerAlt, FaSearch } from "react-icons/fa";

function BrowseTasks() {

  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState("global");
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(

        (pos) => {

          const { latitude: lat, longitude: lng } = pos.coords;

          setUserLocation({ lat, lng });

          setActiveTab("nearby");

          fetchTasks("nearby", lat, lng);

        },

        () => fetchTasks("global")

      );

    } else {

      fetchTasks("global");

    }

  }, []);

  const fetchTasks = async (tab, lat = null, lng = null) => {

    setLoading(true);

    try {

      let url = `https://server-le4u.onrender.com/api/tasks?type=${tab === "nearby" ? "nearby" : "global"}`;

      if (tab === "nearby" && lat)

        url += `&lat=${lat}&lng=${lng}&maxDistance=30000`;

      const res = await axios.get(url);

      setTasks(res.data || []);

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-slate-50 pb-20">

      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* HEADER */}

        <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>

            <h1 className="text-3xl md:text-4xl font-black text-slate-900 flex items-center gap-3">
              <FaSearch className="text-blue-600"/>
              Available Tasks
            </h1>

            <p className="text-slate-500 mt-1">
              Find opportunities to help and earn near you.
            </p>

          </div>

          <div className="text-sm text-slate-500">
            {tasks.length} tasks available
          </div>

        </header>


        {/* TABS */}

        <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200 flex mb-8 max-w-md">

          <button

            onClick={() => {

              setActiveTab("global");

              fetchTasks("global");

            }}

            className={`flex-1 py-3 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
              activeTab === "global"
                ? "bg-blue-600 text-white shadow-md"
                : "text-slate-500 hover:bg-slate-50"
            }`}

          >

            <FaGlobe />

            Global

          </button>

          <button

            onClick={() => {

              setActiveTab("nearby");

              fetchTasks("nearby", userLocation?.lat, userLocation?.lng);

            }}

            disabled={!userLocation}

            className={`flex-1 py-3 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
              activeTab === "nearby"
                ? "bg-blue-600 text-white shadow-md"
                : "text-slate-500 hover:bg-slate-50 disabled:opacity-50"
            }`}

          >

            <FaMapMarkerAlt />

            Nearby

          </button>

        </div>


        {/* LOADING */}

        {loading ? (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {[1,2,3,4,5,6].map((i) => (

              <div

                key={i}

                className="h-64 bg-slate-200 animate-pulse rounded-3xl"

              ></div>

            ))}

          </div>

        ) : tasks.length === 0 ? (

          <div className="bg-white rounded-3xl p-16 text-center border-2 border-dashed border-slate-200">

            <FaSearch className="text-6xl text-slate-300 mx-auto mb-4"/>

            <h2 className="text-2xl font-bold text-slate-800">
              No tasks found
            </h2>

            <p className="text-slate-500 mt-2">
              Try switching tabs or check back later!
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {tasks.map((task) => (

              <div
                key={task._id}
                className="transform transition hover:-translate-y-2"
              >

                <TaskCard
                  task={task}
                  userLocation={userLocation}
                  activeTab={activeTab}
                  refreshTasks={() =>
                    fetchTasks(
                      activeTab,
                      userLocation?.lat,
                      userLocation?.lng
                    )
                  }
                />

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );

}

export default BrowseTasks;