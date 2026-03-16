import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";

import {
  FaTrash,
  FaComments,
  FaRupeeSign,
  FaStar
} from "react-icons/fa";

function MyTasks() {

  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const token = localStorage.getItem("token");

  const getLocationDisplay = (loc) => {

    if (!loc) return "Not specified";

    if (typeof loc === "string") return loc;

    if (loc.address) return loc.address;

    if (loc.coordinates && loc.coordinates.length === 2) {

      const [lng, lat] = loc.coordinates;

      return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;

    }

    return "Not specified";

  };

  const fetchMyTasks = async () => {

    if (!token) {

      alert("Please login first");

      return;

    }

    try {

      setLoading(true);

      const res = await axios.get(
        "https://server-le4u.onrender.com/api/tasks/mytasks",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setTasks(res.data);

    } catch (error) {

      alert(error.response?.data?.message || "Failed to load tasks");

    } finally {

      setLoading(false);

    }

  };

  const deleteTask = async (taskId) => {

    if (!window.confirm("Delete this task?")) return;

    try {

      await axios.delete(
        `https://server-le4u.onrender.com/api/tasks/${taskId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      fetchMyTasks();

    } catch (error) {

      alert(error.response?.data?.message || "Failed to delete task");

    }

  };

  const openRatingModal = (task) => {

    if (!task.helper) {

      alert("No helper assigned yet");

      return;

    }

    setSelectedTask(task);

    setRating(0);

    setComment("");

    setShowModal(true);

  };

  const submitReview = async () => {

    if (rating === 0) {

      alert("Select rating");

      return;

    }

    setSubmitting(true);

    try {

      await axios.post(
        "https://server-le4u.onrender.com/api/reviews",
        {
          taskId: selectedTask._id,
          helperId: selectedTask.helper._id || selectedTask.helper,
          rating,
          comment: comment.trim()
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert("Review submitted!");

      setShowModal(false);

      fetchMyTasks();

    } catch (error) {

      alert(error.response?.data?.message || "Review failed");

    } finally {

      setSubmitting(false);

    }

  };

  useEffect(() => {

    fetchMyTasks();

  }, []);

  if (loading) {

    return (
      <div>
        <Navbar />
        <div className="p-10 text-center">Loading your tasks...</div>
      </div>
    );

  }

  return (

    <div className="min-h-screen bg-slate-50 pb-20">

      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-8">

        <h1 className="text-3xl font-black mb-8">
          My Posted Tasks
        </h1>

        {tasks.length === 0 ? (

          <div className="bg-white p-10 rounded-2xl text-center border border-slate-200">
            No tasks posted yet.
          </div>

        ) : (

          <div className="space-y-6">

            {tasks.map((task) => (

              <div
                key={task._id}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition"
              >

                <div className="flex justify-between mb-3">

                  <h2 className="text-xl font-bold">
                    {task.title}
                  </h2>

                  {task.status === "open" && (

                    <button
                      onClick={() => deleteTask(task._id)}
                      className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-lg"
                    >
                      <FaTrash />
                      Delete
                    </button>

                  )}

                </div>

                <p className="text-slate-600 mb-4">
                  {task.description}
                </p>

                <div className="flex flex-wrap gap-4 text-sm mb-4">

                  <span>
                    📍 {getLocationDisplay(task.location)}
                  </span>

                  <span className="flex items-center gap-1 text-green-600 font-semibold">
                    <FaRupeeSign />
                    {task.payment > 0
                      ? task.payment
                      : "Negotiable"}
                  </span>

                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    {task.status}
                  </span>

                </div>

                {task.helper && (

                  <p className="text-sm text-slate-600 mb-3">
                    Helper: {task.helper.name}
                  </p>

                )}

                <div className="flex flex-wrap gap-3">

                  {task.status === "accepted" && (

                    <button
                      onClick={() => navigate(`/chat/${task._id}`)}
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                      <FaComments />
                      Chat
                    </button>

                  )}

                  {task.status === "accepted" &&
                    task.payment > 0 && (

                    <button
                      onClick={() => handlePayment(task)}
                      className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                    >
                      <FaRupeeSign />
                      Pay ₹{task.payment}
                    </button>

                  )}

                  {task.status === "completed" &&
                    task.helper &&
                    !task.reviewed && (

                    <button
                      onClick={() => openRatingModal(task)}
                      className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg"
                    >
                      <FaStar />
                      Rate Helper
                    </button>

                  )}

                </div>

              </div>

            ))}

          </div>

        )}

      </div>


      {/* RATING MODAL */}

      {showModal && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white p-6 rounded-xl w-80">

            <h2 className="text-xl font-bold mb-4">
              Rate Helper
            </h2>

            <div className="flex gap-3 text-3xl mb-4">

              {[1,2,3,4,5].map((s) => (

                <span
                  key={s}
                  onClick={() => setRating(s)}
                  className={
                    s <= rating
                      ? "text-yellow-400 cursor-pointer"
                      : "text-gray-300 cursor-pointer"
                  }
                >
                  ★
                </span>

              ))}

            </div>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write review..."
              className="border w-full p-2 mb-4 rounded"
              rows={3}
            />

            <button
              onClick={submitReview}
              disabled={submitting}
              className="w-full bg-green-600 text-white py-2 rounded disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>

          </div>

        </div>

      )}

    </div>

  );

}

export default MyTasks;