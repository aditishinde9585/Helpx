import { useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";

import {
  FaMapMarkerAlt,
  FaRupeeSign,
  FaCheckCircle
} from "react-icons/fa";

function PostTask() {

  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const [category,setCategory] = useState("");
  const [taskType,setTaskType] = useState("global");
  const [address,setAddress] = useState("");
  const [payment,setPayment] = useState("");

  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");
  const [locationLoading,setLocationLoading] = useState(false);

  const [lat,setLat] = useState(null);
  const [lng,setLng] = useState(null);

  const [isSuccess,setIsSuccess] = useState(false);

  const token = localStorage.getItem("token");

  const categories = [
    "Delivery",
    "Cleaning",
    "Technical",
    "Writing",
    "Design",
    "Other"
  ];


  const fetchCurrentLocation = () => {

    setLocationLoading(true);
    setError("");

    if (!navigator.geolocation) {

      setError("Geolocation not supported");
      setLocationLoading(false);

      return;

    }

    navigator.geolocation.getCurrentPosition(

      async (position) => {

        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setLat(latitude);
        setLng(longitude);

        try {

          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );

          const data = await res.json();

          setAddress(
            data.display_name ||
            `Lat ${latitude.toFixed(5)}, Lng ${longitude.toFixed(5)}`
          );

        } catch {

          setAddress(
            `Lat ${latitude.toFixed(5)}, Lng ${longitude.toFixed(5)}`
          );

        }

        setLocationLoading(false);

      },

      () => {

        setError("Location permission denied");

        setLocationLoading(false);

      },

      { enableHighAccuracy:true, timeout:10000 }

    );

  };


  const postTask = async () => {

    if (!title.trim() || !description.trim()) {

      setError("Title and Description are required");

      return;

    }

    const paymentNum = parseFloat(payment) || 0;

    if (taskType === "nearby" && !lat) {

      setError("Please detect your location first");

      return;

    }

    let locationObj = null;

    if (taskType === "nearby") {

      locationObj = {

        type:"Point",
        coordinates:[parseFloat(lng),parseFloat(lat)],
        address

      };

    }

    setLoading(true);
    setError("");

    try {

      await axios.post(

        "https://server-le4u.onrender.com/api/tasks",

        {
          title:title.trim(),
          description:description.trim(),
          category:category.trim() || undefined,
          taskType,
          payment:paymentNum,
          exactAddress:address,
          location:locationObj
        },

        { headers:{ Authorization:`Bearer ${token}` } }

      );

      setIsSuccess(true);

      setTitle("");
      setDescription("");
      setCategory("");
      setPayment("");
      setAddress("");

      setTimeout(()=>setIsSuccess(false),5000);

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Failed to post task"
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="min-h-screen bg-slate-50 pb-20">

      <Navbar/>

      <div className="max-w-2xl mx-auto px-4 py-12">

        <div className="bg-white rounded-3xl shadow-xl p-8 border">

          {/* SUCCESS */}

          {isSuccess && (

            <div className="flex flex-col items-center text-center p-6">

              <FaCheckCircle className="text-green-500 text-5xl mb-3"/>

              <h2 className="text-xl font-bold">
                Task Posted Successfully
              </h2>

              <p className="text-slate-500">
                Helpers will see it soon
              </p>

            </div>

          )}

          <h1 className="text-3xl font-bold mb-6">
            Post New Task
          </h1>


          {error && (

            <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
              {error}
            </div>

          )}


          <div className="space-y-6">

            {/* TASK TYPE */}

            <div className="flex gap-3">

              <button
                onClick={()=>setTaskType("global")}
                className={`flex-1 py-3 rounded-xl font-bold ${
                  taskType==="global"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100"
                }`}
              >
                🌍 Global
              </button>

              <button
                onClick={()=>setTaskType("nearby")}
                className={`flex-1 py-3 rounded-xl font-bold ${
                  taskType==="nearby"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100"
                }`}
              >
                📍 Nearby
              </button>

            </div>


            {/* TITLE */}

            <input
              className="w-full border rounded-xl p-4"
              placeholder="Task title"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
            />


            {/* DESCRIPTION */}

            <textarea
              className="w-full border rounded-xl p-4 h-32"
              placeholder="Describe the task"
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
            />


            {/* CATEGORY */}

            <div className="flex flex-wrap gap-2">

              {categories.map((cat)=>(
                <button
                  key={cat}
                  onClick={()=>setCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm ${
                    category===cat
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100"
                  }`}
                >
                  {cat}
                </button>
              ))}

            </div>


            {/* PAYMENT */}

            <div className="relative">

              <FaRupeeSign className="absolute left-4 top-4 text-gray-400"/>

              <input
                type="number"
                className="w-full border rounded-xl p-4 pl-10"
                placeholder="Budget"
                value={payment}
                onChange={(e)=>setPayment(e.target.value)}
              />

            </div>


            {/* LOCATION */}

            {taskType==="nearby" && (

              <div className="space-y-3">

                <input
                  value={address}
                  readOnly
                  className="w-full border rounded-xl p-4"
                  placeholder="Location"
                />

                <button
                  onClick={fetchCurrentLocation}
                  disabled={locationLoading}
                  className="w-full bg-blue-100 text-blue-600 py-3 rounded-xl font-semibold"
                >

                  {locationLoading
                    ? "Getting Location..."
                    : "📍 Get My Location"}

                </button>

              </div>

            )}


            {/* SUBMIT */}

            <button
              onClick={postTask}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700"
            >

              {loading
                ? "Posting..."
                : "Post Task"}

            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

export default PostTask;