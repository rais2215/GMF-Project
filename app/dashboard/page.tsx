import React from "react";
import { motion } from "framer-motion";

const data = [
  { id: 1, title: "Aircraft Checked", value: 128 },
  { id: 2, title: "Ongoing Repairs", value: 42 },
  { id: 3, title: "Completed Tasks", value: 237 },
  { id: 4, title: "Technicians", value: 57 },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center px-6 py-10 gap-10"
         style={{ backgroundImage: `url('/background-plane.jpg')` }}>

      <div className="backdrop-blur-md bg-black/30 rounded-2xl p-6 w-full max-w-5xl">
        <h1 className="text-white text-3xl font-semibold mb-6">Welcome to GMF Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: item.id * 0.1 }}
            >
              <div className="bg-white/20 border border-white/30 text-white shadow-xl rounded-2xl p-6">
                <h2 className="text-lg font-medium mb-2">{item.title}</h2>
                <p className="text-3xl font-bold">{item.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-end mt-8">
          <button className="bg-white/20 hover:bg-white/30 text-white font-medium rounded-xl px-6 py-2 transition duration-300">
            View More Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
