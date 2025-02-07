import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import  interfaceimg from "../assets/interfaceImg1.png"
import { auth, db } from "../firebaseConfig";
import {getDoc , doc } from "firebase/firestore"

import { FaBars, FaSlack, FaTrello, FaGithub, FaBold, FaItalic, FaUnderline, FaList, FaLink, FaPlus, FaUser } from "react-icons/fa";
import Header from "../components/Header";

function InterfacePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userCredential, setUserCredential] = useState(null);

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) =>{
      console.log(user);
      const docRef = doc(db,"users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserCredential(docSnap.data());
        console.log(docSnap.data());
        console.log(userCredential)
      } else {
        setUserCredential("No data available");
        console.log(userCredential)
      }


    }

    )
    
  }

  useEffect(()=>{
    fetchUserData()

  },[])

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    
    <div className="flex flex-col text-black md:flex-row bg-gradient-to-r from-white to-slate-100 min-h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8">
        {/* Header */}
        

        <Header toggleSidebar={toggleSidebar} userCredential={userCredential} />
        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 mb-3">
          <button className="bg-white text-black shadow-sm border rounded-lg p-2">Integrate your tools</button>
          <button className="bg-white text-black shadow-sm border rounded-lg p-2">Add a note</button>
          <button className="bg-white text-black shadow-sm border rounded-lg p-2">Add a reminder</button>
          <button className="bg-white text-black shadow-sm border rounded-lg p-2">Upload a file</button>
          <button className="bg-white text-black shadow-sm border rounded-lg p-2">View analytics</button>
        </div>

        {/* Dashboard Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* My Tasks */}
          <div className="bg-white border-2 rounded-lg p-4">
            <h2 className="font-bold mb-4">My Tasks</h2>
            <div className="mb-2">
              <div className="flex justify-between">
                <span>High Priority</span>
                <span className="bg-purple-200 text-purple-800 rounded-full px-2 py-1 text-xs">6 in progress</span>
              </div>
            </div>
            <div className="mb-2">
              <div className="flex justify-between">
                <span>Medium Priority</span>
                <span className="bg-purple-200 text-purple-800 rounded-full px-2 py-1 text-xs">8 in progress</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <span>Low Priority</span>
                <span className="bg-gray-200 text-gray-800 rounded-full px-2 py-1 text-xs">No task</span>
              </div>
            </div>
          </div>

          {/* Reminders */}
          <div className="bg-white border rounded-lg p-4">
            <h2 className="font-bold mb-4">Reminders</h2>
            <div className="mb-2">
              <div className="flex justify-between">
                <span>Travel vlog</span>
                <span>11:29:05</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <span>Coding class</span>
                <span>11:29:05</span>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white border rounded-lg p-4">
            <h2 className="font-bold text-black mb-4">Notifications</h2>
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                <FaSlack className="text-2xl text-purple-600" />
                <FaTrello className="text-2xl text-blue-600" />
                <FaGithub className="text-2xl text-gray-800" />
              </div>
              <span className="bg-red-600 text-white rounded-full px-2 py-1 text-xs">3</span>
            </div>
          </div>
        </div>

        {/* Upcoming Project and Add a Note */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Upcoming Project */}
          <div className="bg-white border rounded-lg p-4 md:col-span-2">
            <h2 className="font-bold mb-4">Upcoming Project</h2>
            <img
              src={interfaceimg}
              alt="Team working on a project"
              className="rounded-lg mb-4"
            />
            <div className="flex justify-between items-center p-2">
              <div className="flex -space-x-2">
                <img
                  src="https://placehold.co/40x40"
                  alt="Team member 1"
                  className="rounded-full border-2 border-white"
                />
                <img
                  src="https://placehold.co/40x40"
                  alt="Team member 2"
                  className="rounded-full border-2 border-white"
                />
                <img
                  src="https://placehold.co/40x40"
                  alt="Team member 3"
                  className="rounded-full border-2 border-white"
                />
                <img
                  src="https://placehold.co/40x40"
                  alt="Team member 4"
                  className="rounded-full border-2 border-white"
                />
              </div>
              <span className="text-gray-600">3 days left</span>
            </div>
            <div className="mt-4">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Automated Reminder
              </label>
            </div>
          </div>

          {/* Add a Note */}
          <div className="bg-white text-black  shadow-md border rounded-lg p-4">
            <h2 className="font-bold mb-4">Add a Note</h2>
            <textarea
              className="w-full bg-white shadow-md border rounded-lg p-2 mb-4"
              rows="6"
              placeholder="Jot down private notes and links"
            ></textarea>
            <div className="flex space-x-2">
              <FaBold className="text-gray-600 cursor-pointer" />
              <FaItalic className="text-gray-600 cursor-pointer" />
              <FaUnderline className="text-gray-600 cursor-pointer" />
              <FaList className="text-gray-600 cursor-pointer" />
              <FaLink className="text-gray-600 cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Suggested Section */}
        <div className="text-lg text-black mb-4">Suggested</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white border shadow-md rounded-lg p-4 text-center cursor-pointer"
            >
              <FaPlus className="text-gray-600 text-2xl mb-2 mx-auto" />
              <p>Click to add</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InterfacePage;
