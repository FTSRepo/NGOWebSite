import React, { useState, useRef, useEffect } from "react";
import {
  Bell,
  Menu,
  X,
  Users,
  Calendar,
  Activity,
  UserPlus,
  BarChart3,
  Heart,
  Upload,
  LogOut,
  User,
  Settings,
  ChevronDown,
} from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  // Get formatted date string
  const formatDate = (date) => {
    const options = { month: "short", day: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  // Generate last 7 days including today
  const generateDateOptions = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date);
    }
    return dates;
  };

  const dateOptions = generateDateOptions();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // Clear authentication data from localStorage
    localStorage.removeItem("userToken");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("isAuthenticated");

    // Close the dropdown
    setShowUserMenu(false);

    // Redirect to login page
    navigate("/admin");
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex overflow-hidden">
      {/* Enhanced Sidebar */}
      <aside
        className={`${sidebarOpen ? "w-72" : "w-0"} bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 text-white transition-all duration-300 overflow-hidden shadow-2xl flex flex-col`}
      >
        <div className="p-6 flex-1 overflow-y-auto">
          {/* Logo Section */}
          <div className="mb-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm">
                <Heart className="w-8 h-8 text-rose-300" fill="currentColor" />
              </div>
            </div>
            <h1 className="text-center text-lg font-bold leading-tight bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Shanti Hari Sudhanya
              <br />
              Chand Vridhashram
            </h1>
            <p className="text-center text-xs text-indigo-200 mt-2">
              Care with Compassion
            </p>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            <div className="text-xs font-bold text-indigo-300 mb-3 px-3">
              MAIN MENU
            </div>
            <NavItem
              icon={<BarChart3 size={20} />}
              label="Dashboard"
              to="/admin-panel"
            />
            <NavItem
              icon={<Users size={20} />}
              label="Donations"
              to="donation"
            />
            <NavItem
              icon={<UserPlus size={20} />}
              label="Contact Us"
              to="contact"
            />
            <NavItem
              icon={<Calendar size={20} />}
              label="Subscribers"
              to="subscribers"
            />
            <NavItem
              icon={<Upload size={20} />}
              label="Media Manager"
              to="image-upload"
            />
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Enhanced Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-indigo-100 px-8 py-5 shadow-sm flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-indigo-50 rounded-xl transition-all duration-200 text-indigo-600"
              >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            <div className="flex items-center gap-4">
              {/* Date Selector */}
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                <Calendar size={18} className="text-indigo-600" />
                <select
                  value={selectedDate.toISOString()}
                  onChange={(e) => setSelectedDate(new Date(e.target.value))}
                  className="bg-transparent text-sm font-medium text-indigo-900 focus:outline-none cursor-pointer"
                >
                  {dateOptions.map((date, index) => (
                    <option key={index} value={date.toISOString()}>
                      {index === 0 ? "Today - " : ""}
                      {formatDate(date)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Notifications */}
              <button className="relative p-3 hover:bg-indigo-50 rounded-xl transition-all duration-200 group">
                <Bell
                  size={22}
                  className="text-slate-600 group-hover:text-indigo-600"
                />
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-rose-500 rounded-full animate-pulse"></span>
              </button>

              {/* User Profile with Dropdown */}
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-indigo-600 font-bold">
                    A
                  </div>
                  <div className="hidden lg:block">
                    <p className="text-sm font-semibold text-white">
                      Admin User
                    </p>
                    <p className="text-xs text-indigo-200">Administrator</p>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`text-white transition-transform duration-200 ${showUserMenu ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* User Info Section */}
                    <div className="px-4 py-3 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-slate-200">
                      <p className="text-sm font-semibold text-slate-800">
                        Admin User
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {localStorage.getItem("userEmail") ||
                          "admin@example.com"}
                      </p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <div className="my-2 border-t border-slate-200"></div>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 transition-colors text-left group"
                      >
                        <LogOut
                          size={18}
                          className="text-red-600 group-hover:text-red-700"
                        />
                        <span className="text-sm font-medium text-red-600 group-hover:text-red-700">
                          Logout
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content Goes Here - This will scroll independently */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

// NavItem Component
function NavItem({ icon, label, to }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
          isActive
            ? "bg-white/20 text-white shadow-lg backdrop-blur-sm"
            : "text-indigo-100 hover:bg-white/10 hover:text-white"
        }`
      }
    >
      <div className="transition-transform duration-200 group-hover:scale-110">
        {icon}
      </div>
      <span className="text-sm font-semibold">{label}</span>
    </NavLink>
  );
}

export default DashboardLayout;
