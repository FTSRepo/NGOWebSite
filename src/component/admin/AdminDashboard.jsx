import React, { useState, useEffect } from "react";
import {
  Users,
  Calendar,
  Activity,
  Heart,
  Home,
  Clock,
  Smile,
  Stethoscope,
  TrendingUp,
  Loader2,
  DollarSign,
  MessageSquare,
  Mail,
} from "lucide-react";

function AdminDashboard() {
  const [donations, setDonations] = useState([]);
  const [donationsLoading, setDonationsLoading] = useState(true);
  const [subscribers, setSubscribers] = useState([]);
  const [subscribersLoading, setSubscribersLoading] = useState(true);
  const [enquiries, setEnquiries] = useState([]);
  const [enquiriesLoading, setEnquiriesLoading] = useState(true);
  
  const [donationStats, setDonationStats] = useState({
    totalDonations: 0,
    totalAmount: 0,
    thisMonth: 0,
    thisWeek: 0,
    today: 0,
    yesterday: 0,
  });
  const [subscriberStats, setSubscriberStats] = useState({
    total: 0,
    today: 0,
    thisWeek: 0,
    thisMonth: 0,
  });
  const [enquiryStats, setEnquiryStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    responded: 0,
    today: 0,
    thisWeek: 0,
  });

  // Fetch all data from APIs
  useEffect(() => {
    fetchDonations();
    fetchSubscribers();
    fetchEnquiries();
  }, []);

  const fetchDonations = async () => {
    try {
      setDonationsLoading(true);
      const response = await fetch(
        "https://fileupload.friensys.com/api/Common/GetDonations?WebsiteId=1001",
        {
          method: "GET",
          headers: {
            accept: "*/*",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch donations");
      }

      const result = await response.json();

      if (result.status && result.data) {
        setDonations(result.data);
        calculateDonationStats(result.data);
      }
    } catch (err) {
      console.error("Error fetching donations:", err);
      setDonations([]);
    } finally {
      setDonationsLoading(false);
    }
  };

  const fetchSubscribers = async () => {
    try {
      setSubscribersLoading(true);
      const response = await fetch(
        "https://fileupload.friensys.com/api/Common/GetWebsiteSubscriber?WebsiteId=1001",
        {
          method: "GET",
          headers: {
            accept: "*/*",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch subscribers");
      }

      const result = await response.json();

      if (result.statusCode === 200 && result.data) {
        setSubscribers(result.data);
        calculateSubscriberStats(result.data);
      }
    } catch (err) {
      console.error("Error fetching subscribers:", err);
      setSubscribers([]);
    } finally {
      setSubscribersLoading(false);
    }
  };

  const fetchEnquiries = async () => {
    try {
      setEnquiriesLoading(true);
      const response = await fetch(
        "https://fileupload.friensys.com/api/Common/GetContactDetails?WebsiteId=1001",
        {
          method: "GET",
          headers: {
            accept: "*/*",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch enquiries");
      }

      const result = await response.json();

      if (result.statusCode === 200 && result.data) {
        setEnquiries(result.data);
        calculateEnquiryStats(result.data);
      }
    } catch (err) {
      console.error("Error fetching enquiries:", err);
      setEnquiries([]);
    } finally {
      setEnquiriesLoading(false);
    }
  };

  const calculateDonationStats = (donationsData) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    let totalAmount = 0;
    let thisMonthCount = 0;
    let thisWeekCount = 0;
    let todayCount = 0;
    let yesterdayCount = 0;

    donationsData.forEach((donation) => {
      const donationDate = new Date(donation.tranDate);
      const donationDay = new Date(
        donationDate.getFullYear(),
        donationDate.getMonth(),
        donationDate.getDate()
      );

      totalAmount += donation.amount;

      if (donationDay >= monthStart) {
        thisMonthCount++;
      }
      if (donationDay >= weekAgo) {
        thisWeekCount++;
      }
      if (donationDay.getTime() === today.getTime()) {
        todayCount++;
      }
      if (donationDay.getTime() === yesterday.getTime()) {
        yesterdayCount++;
      }
    });

    setDonationStats({
      totalDonations: donationsData.length,
      totalAmount: totalAmount,
      thisMonth: thisMonthCount,
      thisWeek: thisWeekCount,
      today: todayCount,
      yesterday: yesterdayCount,
    });
  };

  const calculateSubscriberStats = (subscribersData) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    let todayCount = 0;
    let thisWeekCount = 0;
    let thisMonthCount = 0;

    subscribersData.forEach((subscriber) => {
      const subDate = new Date(subscriber.tranDate);
      const subDay = new Date(
        subDate.getFullYear(),
        subDate.getMonth(),
        subDate.getDate()
      );

      if (subDay.getTime() === today.getTime()) {
        todayCount++;
      }
      if (subDay >= weekAgo) {
        thisWeekCount++;
      }
      if (subDay >= monthStart) {
        thisMonthCount++;
      }
    });

    setSubscriberStats({
      total: subscribersData.length,
      today: todayCount,
      thisWeek: thisWeekCount,
      thisMonth: thisMonthCount,
    });
  };

  const calculateEnquiryStats = (enquiriesData) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);

    let todayCount = 0;
    let thisWeekCount = 0;
    let pendingCount = 0;
    let inProgressCount = 0;
    let respondedCount = 0;

    enquiriesData.forEach((enquiry) => {
      const enquiryDate = new Date(enquiry.tranDate);
      const enquiryDay = new Date(
        enquiryDate.getFullYear(),
        enquiryDate.getMonth(),
        enquiryDate.getDate()
      );

      // Count by date
      if (enquiryDay.getTime() === today.getTime()) {
        todayCount++;
      }
      if (enquiryDay >= weekAgo) {
        thisWeekCount++;
      }

      // Count by status
      const status = determineStatus(enquiry.visitDate);
      if (status === 'pending') pendingCount++;
      else if (status === 'in-progress') inProgressCount++;
      else if (status === 'responded') respondedCount++;
    });

    setEnquiryStats({
      total: enquiriesData.length,
      pending: pendingCount,
      inProgress: inProgressCount,
      responded: respondedCount,
      today: todayCount,
      thisWeek: thisWeekCount,
    });
  };

  // Helper function to determine status based on visit date
  const determineStatus = (visitDate) => {
    if (!visitDate) return 'pending';
    const visit = new Date(visitDate);
    const now = new Date();
    const diffDays = Math.floor((visit - now) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'responded';
    if (diffDays <= 2) return 'in-progress';
    return 'pending';
  };

  // Get monthly donation data for chart (last 6 months)
  const getMonthlyDonationData = () => {
    const monthlyData = {};
    const now = new Date();

    // Initialize last 6 months
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = date.toLocaleDateString("en-US", { month: "short" });
      monthlyData[key] = { count: 0, amount: 0 };
    }

    // Count donations per month
    donations.forEach((donation) => {
      const date = new Date(donation.tranDate);
      const monthKey = date.toLocaleDateString("en-US", { month: "short" });
      if (monthlyData[monthKey]) {
        monthlyData[monthKey].count++;
        monthlyData[monthKey].amount += donation.amount;
      }
    });

    return Object.entries(monthlyData).map(([month, data]) => ({
      month,
      count: data.count,
      amount: data.amount,
    }));
  };

  const monthlyData = getMonthlyDonationData();
  const maxDonations = Math.max(...monthlyData.map((d) => d.count), 1);

  // Calculate growth percentage
  const calculateGrowth = () => {
    if (monthlyData.length < 2) return 0;
    const current = monthlyData[monthlyData.length - 1].count;
    const previous = monthlyData[monthlyData.length - 2].count;
    if (previous === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - previous) / previous) * 100);
  };

  const growthPercentage = calculateGrowth();

  return (
    <div className="p-8 bg-gradient-to-br from-slate-50 to-blue-50/30 min-h-screen">
      {/* Page Header */}
      <div className="mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Dashboard
        </h2>
        <p className="text-sm text-slate-500 mt-1">Welcome back, Admin</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="TOTAL SUBSCRIBERS"
          value={subscribersLoading ? "..." : subscriberStats.total}
          change={
            subscribersLoading
              ? "Loading..."
              : `${subscriberStats.thisWeek} this week`
          }
          trend="up"
          icon={<Users className="w-6 h-6" />}
          gradient="from-blue-500 to-cyan-500"
          loading={subscribersLoading}
        />

        <StatCard
          title="NUMBER OF DONATIONS"
          value={donationsLoading ? "..." : donationStats.totalDonations}
          change={
            donationsLoading
              ? "Loading..."
              : `${donationStats.totalDonations} total donations`
          }
          trend="up"
          icon={<Heart className="w-6 h-6" />}
          gradient="from-rose-500 to-pink-500"
          loading={donationsLoading}
        />
        <StatCard
          title="TOTAL DONATION AMOUNT"
          value={
            donationsLoading
              ? "..."
              : `₹${donationStats.totalAmount.toLocaleString()}`
          }
          change={
            donationsLoading
              ? "Loading..."
              : `${donationStats.thisMonth} this month`
          }
          trend="up"
          icon={<DollarSign className="w-6 h-6" />}
          gradient="from-green-500 to-emerald-500"
          loading={donationsLoading}
        />

        <StatCard
          title="CONTACT REQUESTS"
          value={enquiriesLoading ? "..." : enquiryStats.total}
          change={
            enquiriesLoading
              ? "Loading..."
              : `${enquiryStats.pending} pending`
          }
          trend="neutral"
          icon={<MessageSquare className="w-6 h-6" />}
          gradient="from-purple-500 to-indigo-500"
          loading={enquiriesLoading}
        />

        
      </div>

      {/* Detailed Stats Cards */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DetailCard
          title="Subscribers Today"
          count={subscriberStats.today}
          subtitle="New today"
          loading={subscribersLoading}
          gradient="from-blue-500 to-indigo-500"
          icon={<Users className="w-5 h-5 text-white" />}
        />
        <DetailCard
          title="Enquiries This Week"
          count={enquiryStats.thisWeek}
          subtitle="Last 7 days"
          loading={enquiriesLoading}
          gradient="from-purple-500 to-pink-500"
          icon={<Mail className="w-5 h-5 text-white" />}
        />
        <DetailCard
          title="Donations Today"
          count={donationStats.today}
          subtitle="Received today"
          loading={donationsLoading}
          gradient="from-orange-500 to-red-500"
          icon={<Heart className="w-5 h-5 text-white" />}
        />
        <DetailCard
          title="Pending Enquiries"
          count={enquiryStats.pending}
          subtitle="Needs attention"
          loading={enquiriesLoading}
          gradient="from-yellow-500 to-amber-500"
          icon={<Clock className="w-5 h-5 text-white" />}
        />
      </div> */}

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Donation Trends */}
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-slate-800">
                Donation Trends
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Monthly Donations Analytics (Last 6 Months)
              </p>
            </div>
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
                growthPercentage >= 0 ? "bg-green-50" : "bg-red-50"
              }`}
            >
              <TrendingUp
                size={18}
                className={
                  growthPercentage >= 0 ? "text-green-600" : "text-red-600"
                }
              />
              <span
                className={`text-sm font-bold ${
                  growthPercentage >= 0 ? "text-green-700" : "text-red-700"
                }`}
              >
                {growthPercentage >= 0 ? "+" : ""}
                {growthPercentage}%
              </span>
            </div>
          </div>

          {donationsLoading ? (
            <div className="h-64 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            </div>
          ) : (
            <div className="relative h-64">
              <svg
                className="w-full h-full"
                viewBox="0 0 600 200"
                preserveAspectRatio="none"
              >
                {/* Grid Lines */}
                <line
                  x1="0"
                  y1="40"
                  x2="600"
                  y2="40"
                  stroke="#e2e8f0"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                />
                <line
                  x1="0"
                  y1="80"
                  x2="600"
                  y2="80"
                  stroke="#e2e8f0"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                />
                <line
                  x1="0"
                  y1="120"
                  x2="600"
                  y2="120"
                  stroke="#e2e8f0"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                />
                <line
                  x1="0"
                  y1="160"
                  x2="600"
                  y2="160"
                  stroke="#e2e8f0"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                />

                {/* Area Fill */}
                <defs>
                  <linearGradient
                    id="areaGradient"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Generate path from actual data */}
                <polygon
                  fill="url(#areaGradient)"
                  points={`0,200 ${monthlyData
                    .map((d, i) => {
                      const x = (i / (monthlyData.length - 1)) * 600;
                      const y = 180 - (d.count / maxDonations) * 150;
                      return `${x},${y}`;
                    })
                    .join(" ")} 600,200`}
                />

                {/* Line */}
                <polyline
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={monthlyData
                    .map((d, i) => {
                      const x = (i / (monthlyData.length - 1)) * 600;
                      const y = 180 - (d.count / maxDonations) * 150;
                      return `${x},${y}`;
                    })
                    .join(" ")}
                />

                {/* Dots */}
                {monthlyData.map((d, i) => {
                  const x = (i / (monthlyData.length - 1)) * 600;
                  const y = 180 - (d.count / maxDonations) * 150;
                  const isLast = i === monthlyData.length - 1;
                  return (
                    <g key={i}>
                      <circle
                        cx={x}
                        cy={y}
                        r={isLast ? 6 : 5}
                        fill="#6366f1"
                        stroke={isLast ? "#fff" : "none"}
                        strokeWidth={isLast ? 2 : 0}
                      />
                      {/* Tooltip on hover */}
                      <title>{`${d.month}: ${d.count} donations (₹${d.amount.toLocaleString()})`}</title>
                    </g>
                  );
                })}

                {/* Labels */}
                {monthlyData.map((d, i) => {
                  const x = (i / (monthlyData.length - 1)) * 600;
                  return (
                    <text
                      key={i}
                      x={x}
                      y="195"
                      textAnchor="middle"
                      className="text-xs"
                      fill="#64748b"
                      fontSize="12"
                    >
                      {d.month}
                    </text>
                  );
                })}
              </svg>
            </div>
          )}

          {/* Legend */}
          <div className="mt-4 flex items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
              <span className="text-sm text-slate-600">Donation Count</span>
            </div>
          </div>
        </div>

        {/* Recent Activity Summary */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-slate-100">
          <h3 className="text-xl font-bold text-slate-800 mb-4">
            Recent Activity
          </h3>

          {donationsLoading || subscribersLoading || enquiriesLoading ? (
            <div className="flex items-center justify-center h-40">
              <Loader2 className="w-6 h-6 text-indigo-600 animate-spin" />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-slate-600">
                    Latest Donation
                  </span>
                  <Heart className="w-4 h-4 text-red-500" fill="currentColor" />
                </div>
                {donations.length > 0 ? (
                  <>
                    <p className="text-2xl font-bold text-slate-800">
                      ₹{donations[0].amount.toLocaleString()}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      by {donations[0].fullName}
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-slate-500">No donations yet</p>
                )}
              </div>

              <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-slate-600">
                    Latest Enquiry
                  </span>
                  <MessageSquare className="w-4 h-4 text-blue-500" />
                </div>
                {enquiries.length > 0 ? (
                  <>
                    <p className="text-lg font-bold text-slate-800 truncate">
                      {enquiries[0].fullName || 'New Contact'}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {new Date(enquiries[0].tranDate).toLocaleDateString()}
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-slate-500">No enquiries yet</p>
                )}
              </div>

              <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-slate-600">
                    Enquiry Status
                  </span>
                  <Activity className="w-4 h-4 text-purple-500" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-600">Pending</span>
                    <span className="text-sm font-bold text-yellow-600">
                      {enquiryStats.pending}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-600">In Progress</span>
                    <span className="text-sm font-bold text-blue-600">
                      {enquiryStats.inProgress}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-600">Responded</span>
                    <span className="text-sm font-bold text-green-600">
                      {enquiryStats.responded}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// StatCard Component
function StatCard({ title, value, change, trend, icon, gradient, loading }) {
  return (
    <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-slate-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div
          className={`p-3 bg-gradient-to-br ${gradient} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
        >
          <div className="text-white">{icon}</div>
        </div>
        {trend === "up" && !loading && (
          <div className="p-1.5 bg-green-50 rounded-lg">
            <TrendingUp size={16} className="text-green-600" />
          </div>
        )}
        {loading && (
          <Loader2 size={16} className="text-indigo-600 animate-spin" />
        )}
      </div>
      <div className="text-xs font-bold text-slate-500 mb-1 tracking-wider">
        {title}
      </div>
      <div className="text-3xl font-bold text-slate-800 mb-2">
        {loading ? (
          <Loader2 className="w-8 h-8 animate-spin inline-block" />
        ) : (
          value
        )}
      </div>
      <div className="text-sm text-slate-600 font-medium">{change}</div>
    </div>
  );
}

// Detail Card Component
function DetailCard({ title, count, subtitle, loading, gradient, icon }) {
  return (
    <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-slate-100 hover:shadow-xl transition-all duration-300">
      <div
        className={`inline-flex p-2 bg-gradient-to-br ${gradient} rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300`}
      >
        {icon}
      </div>
      <h3 className="text-sm font-semibold text-slate-600 mb-2">{title}</h3>
      {loading ? (
        <Loader2 className="w-6 h-6 text-indigo-600 animate-spin" />
      ) : (
        <div className="text-4xl font-black text-slate-800 mb-1">{count}</div>
      )}
      <p className="text-xs text-slate-500">{subtitle}</p>
    </div>
  );
}

export default AdminDashboard;