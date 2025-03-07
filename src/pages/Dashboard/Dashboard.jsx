import React, { useState } from "react";
import {
  Store,
  Plus,
  User,
  LogOut,
  Settings,
  Menu,
  Trash2,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { GeneralAction } from "../../actions";
import { ShopAction } from "../../actions";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { userData } = useSelector((state) => state.generalState);
  const shops = useSelector((state) => state.shopState.userShops);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.clear();
    dispatch(GeneralAction.setToken(""));
    dispatch(GeneralAction.setUserData(null));
    navigate("/login");
  };

  const handleDelete = async (shop) => {
    if (window.confirm("Are you sure you want to delete this shop?")) {
      try {
        setIsDeleting(true);
        dispatch(ShopAction.removeShop(shop?._id, userData?.data?._id));
        alert("Shop deleted successfully!");
      } catch (error) {
        alert("Error deleting shop: " + error.message);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Shopwise
                </h1>
              </div>
              <div className="hidden md:block ml-10">
                <div className="flex items-center space-x-4">
                  <input
                    type="text"
                    placeholder="Search shops..."
                    className="w-64 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none text-gray-100"
                  />
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center space-x-4">
                <button className="text-gray-300 hover:text-white p-2 rounded-lg hover:bg-gray-700">
                  <Settings className="w-5 h-5" />
                </button>
                <div className="flex items-center space-x-2 text-gray-300 p-2 rounded-lg hover:bg-gray-700">
                  <User className="w-5 h-5" />
                  <span>{userData?.data?.username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-gray-300 hover:text-white p-2 rounded-lg hover:bg-gray-700"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white p-2"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 border-b border-gray-700 p-4">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Search shops..."
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none text-gray-100"
            />
            <div className="flex items-center space-x-2 text-gray-300">
              <User className="w-5 h-5" />
              <span>John Doe</span>
            </div>
            <button className="flex items-center space-x-2 text-gray-300">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-300">
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-gray-400 text-sm mb-2">Total Shops</h3>
            <p className="text-3xl font-bold text-white">{shops.length}</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-gray-400 text-sm mb-2">Active Shops</h3>
            <p className="text-3xl font-bold text-white">
              {shops.filter((shop) => shop.status === "active").length}
            </p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-gray-400 text-sm mb-2">Total Revenue</h3>
            <p className="text-3xl font-bold text-white">$12,345</p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-700 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">Your Shops</h2>
            <button
              onClick={() => navigate("/shopform")}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition duration-200"
            >
              <Plus className="w-5 h-5" />

              <span>Add Shop</span>
            </button>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shops.map((shop) => (
                <div
                  key={shop.id}
                  className="bg-gray-700 rounded-lg p-6 hover:bg-gray-600 transition duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {shop.shopName}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4">
                        {shop.location}
                      </p>
                    </div>
                    <Store className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        shop.isPublic
                          ? "bg-green-900 text-green-300"
                          : "bg-red-900 text-red-300"
                      }`}
                    >
                      {shop.isPublic ? "Active" : "Inactive"}
                    </span>
                    <button
                      onClick={() => handleDelete(shop)}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <Trash2 className="w-4 h-4" />
                        {isDeleting ? "Deleting..." : "Delete"}
                      </div>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
