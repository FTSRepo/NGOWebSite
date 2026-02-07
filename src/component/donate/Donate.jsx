import React, { useState } from "react";
import {
  Heart,
  Users,
  Home,
  Utensils,
  Stethoscope,
  BookOpen,
  Check,
  ArrowRight,
  Shield,
  Award,
  TrendingUp,
  Sparkles,
  Gift,
  Clock,
  QrCode,
  CreditCard,
  Smartphone,
  X,
  Copy,
  CheckCircle as CheckCircleIcon,
  User,
  Mail,
  Phone,
} from "lucide-react";

function Donate() {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [donationType, setDonationType] = useState("one-time");
  const [selectedCause, setSelectedCause] = useState("general");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showDetailsForm, setShowDetailsForm] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [copiedUPI, setCopiedUPI] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // User details state
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    emailId: "",
    mobile: "",
  });

  // Form validation errors
  const [errors, setErrors] = useState({});

  const predefinedAmounts = [500, 1000, 2500, 5000, 10000];

  // UPI Configuration
  const upiId = "6205129152@ibl";
  const upiName = "Nikhil Kumar";
  const webSiteId = 1001; // You can configure this based on your website

  const causes = [
    {
      id: "general",
      icon: <Heart className="w-6 h-6" />,
      title: "General Support",
      description:
        "Support overall care and wellbeing of our elderly residents",
      color: "from-red-500 to-orange-500",
    },
    {
      id: "medical",
      icon: <Stethoscope className="w-6 h-6" />,
      title: "Medical Care",
      description:
        "Provide essential healthcare, medicines, and medical equipment",
      color: "from-orange-500 to-amber-500",
    },
    {
      id: "food",
      icon: <Utensils className="w-6 h-6" />,
      title: "Nutritious Meals",
      description:
        "Ensure healthy and nutritious meals for our senior citizens",
      color: "from-amber-500 to-yellow-500",
    },
    {
      id: "shelter",
      icon: <Home className="w-6 h-6" />,
      title: "Shelter & Comfort",
      description: "Maintain comfortable living spaces and facilities",
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "activities",
      icon: <BookOpen className="w-6 h-6" />,
      title: "Activities & Care",
      description:
        "Organize recreational activities and mental wellness programs",
      color: "from-orange-600 to-red-600",
    },
  ];

  const paymentMethods = [
    {
      id: "upi",
      name: "UPI Payment",
      icon: <Smartphone className="w-8 h-8" />,
      description: "Pay via Google Pay, PhonePe, Paytm",
      color: "from-blue-500 to-blue-600",
      popular: true,
    },
    {
      id: "qr",
      name: "Scan QR Code",
      icon: <QrCode className="w-8 h-8" />,
      description: "Scan and pay instantly",
      color: "from-purple-500 to-purple-600",
      popular: true,
    },
    {
      id: "card",
      name: "Card Payment",
      icon: <CreditCard className="w-8 h-8" />,
      description: "Credit/Debit Card",
      color: "from-orange-500 to-red-600",
      popular: false,
    },
  ];

  const impactStats = [
    {
      number: "200+",
      label: "Elderly Cared For",
      icon: <Users className="w-5 h-5" />,
      color: "from-red-500 to-orange-500",
    },
    {
      number: "15+",
      label: "Years of Service",
      icon: <Award className="w-5 h-5" />,
      color: "from-orange-500 to-amber-500",
    },
    {
      number: "5000+",
      label: "Lives Touched",
      icon: <Heart className="w-5 h-5" />,
      color: "from-red-600 to-pink-500",
    },
    {
      number: "98%",
      label: "Satisfaction Rate",
      icon: <TrendingUp className="w-5 h-5" />,
      color: "from-amber-500 to-orange-600",
    },
  ];

  const benefits = [
    {
      text: "80G Tax Exemption Certificate",
      icon: <Gift className="w-4 h-4" />,
    },
    {
      text: "Regular updates on impact",
      icon: <Sparkles className="w-4 h-4" />,
    },
    { text: "Annual impact report", icon: <BookOpen className="w-4 h-4" /> },
    { text: "Recognition on donor wall", icon: <Award className="w-4 h-4" /> },
    {
      text: "Invitation to special events",
      icon: <Users className="w-4 h-4" />,
    },
  ];

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!userDetails.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userDetails.emailId.trim()) {
      newErrors.emailId = "Email is required";
    } else if (!emailRegex.test(userDetails.emailId)) {
      newErrors.emailId = "Invalid email format";
    }

    const mobileRegex = /^[6-9]\d{9}$/;
    if (!userDetails.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!mobileRegex.test(userDetails.mobile)) {
      newErrors.mobile = "Invalid mobile number (10 digits, starts with 6-9)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // API call to save donation
  const saveDonation = async () => {
    const amount = selectedAmount || customAmount;
    const selectedCauseData = causes.find((c) => c.id === selectedCause);

    const donationData = {
      webSiteId: webSiteId,
      donationType: donationType === "one-time" ? "One-Time" : "Monthly",
      cause: selectedCauseData.title,
      amount: parseFloat(amount),
      fullName: userDetails.fullName,
      emailId: userDetails.emailId,
      mobile: userDetails.mobile,
      tranDate: new Date().toISOString(),
    };

    try {
      setIsSubmitting(true);

      // Replace with your actual API endpoint
      const response = await fetch("https://fileupload.friensys.com/api/Common/SaveDonation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(donationData),
      });

      if (!response.ok) {
        throw new Error("Failed to save donation");
      }

      const result = await response.json();
      console.log("Donation saved successfully:", result);
      return true;
    } catch (error) {
      console.error("Error saving donation:", error);
      alert("Failed to save donation. Please try again.");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateUPILink = () => {
    const amount = selectedAmount || customAmount;
    const cause = causes.find((c) => c.id === selectedCause).title;
    return `upi://pay?pa=${upiId}&pn=${encodeURIComponent(upiName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(cause)}`;
  };

  const generateQRCodeURL = () => {
    const upiLink = generateUPILink();
    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(upiLink)}`;
  };

  const copyUPIId = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUPI(true);
    setTimeout(() => setCopiedUPI(false), 2000);
  };

  const handleDonate = () => {
    const amount = selectedAmount || customAmount;
    if (!amount) {
      alert("Please select or enter an amount");
      return;
    }
    // Show details form first
    setShowDetailsForm(true);
  };

  const handleDetailsSubmit = () => {
    if (!validateForm()) {
      return;
    }
    // Close details form and show payment modal
    setShowDetailsForm(false);
    setShowPaymentModal(true);
  };

  const handlePaymentMethod = async (methodId) => {
    setSelectedPaymentMethod(methodId);

    // Save donation to database before payment
    const saved = await saveDonation();
    if (!saved) {
      setSelectedPaymentMethod(null);
      return;
    }

    if (methodId === "upi") {
      window.location.href = generateUPILink();
    } else if (methodId === "card") {
      alert("Card payment integration will redirect to secure payment gateway");
      setTimeout(() => {
        setShowPaymentModal(false);
        setSelectedPaymentMethod(null);
      }, 2000);
    }
  };

  const handlePaymentCompleted = async () => {
    // Save donation if not already saved (for QR code payment)
    if (selectedPaymentMethod === "qr") {
      await saveDonation();
    }

    setShowPaymentModal(false);
    setPaymentSuccess(true);
    setSelectedPaymentMethod(null);

    setTimeout(() => {
      setPaymentSuccess(false);
      // Reset form
      setUserDetails({ fullName: "", emailId: "", mobile: "" });
      setSelectedAmount(null);
      setCustomAmount("");
    }, 5000);
  };

  const handleUserDetailsChange = (field, value) => {
    setUserDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-amber-50">
      {/* Payment Success Notification */}
      {paymentSuccess && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[60] animate-slide-down">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border-2 border-green-400">
            <div className="bg-white/20 p-2 rounded-full">
              <CheckCircleIcon className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-black text-lg">
                Thank You for Your Donation! 🙏
              </h4>
              <p className="text-green-100 text-sm">
                Your contribution of ₹{selectedAmount || customAmount} will help
                our elderly residents
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full mb-6 border border-white/30 shadow-lg">
              <Heart className="w-5 h-5 text-red-300 fill-red-300 animate-pulse" />
              <span className="text-sm font-bold tracking-wide">
                MAKE A DIFFERENCE TODAY
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              Support Our Elders with
              <span className="block bg-gradient-to-r from-yellow-300 via-amber-200 to-white bg-clip-text text-transparent mt-2">
                Love & Dignity
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-orange-100 max-w-3xl mx-auto mb-10 leading-relaxed">
              Your generous donation helps us provide care, comfort, and
              companionship to elderly residents who deserve respect and love.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20">
                <Shield className="w-4 h-4" />
                <span className="font-semibold">100% Secure</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20">
                <Award className="w-4 h-4" />
                <span className="font-semibold">80G Tax Benefits</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20">
                <Sparkles className="w-4 h-4" />
                <span className="font-semibold">UPI & Cards Accepted</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-orange-50 to-transparent"></div>
      </div>

      {/* Impact Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {impactStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-xl p-6 text-center transform hover:scale-105 transition-all duration-300 border-2 border-orange-100 hover:border-orange-300"
            >
              <div
                className={`inline-flex p-3 bg-gradient-to-br ${stat.color} rounded-xl mb-3 shadow-lg`}
              >
                <span className="text-white">{stat.icon}</span>
              </div>
              <div className="text-3xl md:text-4xl font-black text-gray-900 mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Donation Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Donation Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-orange-100">
              {/* Donation Type */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-6 flex items-center gap-3">
                  <Clock className="w-7 h-7 text-orange-600" />
                  Choose Donation Type
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setDonationType("one-time")}
                    className={`p-5 rounded-2xl border-2 transition-all duration-300 ${
                      donationType === "one-time"
                        ? "border-orange-600 bg-gradient-to-br from-orange-50 to-red-50 shadow-lg scale-105"
                        : "border-gray-200 hover:border-orange-300 hover:shadow-md"
                    }`}
                  >
                    <div className="font-bold text-xl mb-2 text-gray-900">
                      One-Time
                    </div>
                    <div className="text-sm text-gray-600">
                      Make a single donation
                    </div>
                  </button>
                  <button
                    onClick={() => setDonationType("monthly")}
                    className={`p-5 rounded-2xl border-2 transition-all duration-300 ${
                      donationType === "monthly"
                        ? "border-orange-600 bg-gradient-to-br from-orange-50 to-red-50 shadow-lg scale-105"
                        : "border-gray-200 hover:border-orange-300 hover:shadow-md"
                    }`}
                  >
                    <div className="font-bold text-xl mb-2 text-gray-900">
                      Monthly
                    </div>
                    <div className="text-sm text-gray-600">
                      Recurring support
                    </div>
                  </button>
                </div>
              </div>

              {/* Choose Cause */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-6 flex items-center gap-3">
                  <Heart className="w-7 h-7 text-red-600" />
                  Choose a Cause
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {causes.map((cause) => (
                    <button
                      key={cause.id}
                      onClick={() => setSelectedCause(cause.id)}
                      className={`text-left p-5 rounded-2xl border-2 transition-all duration-300 group ${
                        selectedCause === cause.id
                          ? "border-orange-600 bg-gradient-to-br from-orange-50 to-red-50 shadow-lg scale-105"
                          : "border-gray-200 hover:border-orange-300 hover:shadow-md"
                      }`}
                    >
                      <div
                        className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${cause.color} text-white mb-3 shadow-md group-hover:scale-110 transition-transform`}
                      >
                        {cause.icon}
                      </div>
                      <div className="font-bold text-lg text-gray-900 mb-2">
                        {cause.title}
                      </div>
                      <div className="text-sm text-gray-600 leading-relaxed">
                        {cause.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount Selection */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-6 flex items-center gap-3">
                  <Gift className="w-7 h-7 text-amber-600" />
                  Select Amount (₹)
                </h2>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-5">
                  {predefinedAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => {
                        setSelectedAmount(amount);
                        setCustomAmount("");
                      }}
                      className={`p-5 rounded-2xl border-2 font-bold text-lg transition-all duration-300 ${
                        selectedAmount === amount
                          ? "border-orange-600 bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-xl scale-110"
                          : "border-gray-200 hover:border-orange-400 text-gray-700 hover:shadow-md hover:scale-105"
                      }`}
                    >
                      ₹{amount.toLocaleString()}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl font-bold">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(null);
                    }}
                    placeholder="Enter custom amount"
                    className="w-full pl-12 pr-6 py-5 rounded-2xl border-2 border-gray-200 focus:border-orange-600 focus:outline-none text-lg font-semibold transition-all"
                  />
                </div>
              </div>

              {/* Donate Button */}
              <button
                onClick={handleDonate}
                className="w-full bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 text-white py-6 rounded-2xl font-black text-xl hover:shadow-2xl hover:shadow-orange-500/50 transition-all flex items-center justify-center gap-3 group transform hover:scale-105"
              >
                <Heart className="w-7 h-7 fill-white group-hover:scale-125 transition-transform" />
                Continue to Donate
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-600">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="font-medium">
                  Secure payment • UPI, Cards & More
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Benefits & Info */}
          <div className="space-y-6">
            {/* Benefits Card */}
            <div className="bg-gradient-to-br from-red-600 via-orange-600 to-amber-600 rounded-3xl p-8 text-white shadow-2xl border-2 border-orange-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl">
                  <Award className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-black">Donor Benefits</h3>
              </div>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3 group">
                    <div className="p-2 bg-white/20 backdrop-blur-md rounded-lg mt-0.5 group-hover:bg-white/30 transition-colors">
                      {benefit.icon}
                    </div>
                    <span className="text-orange-50 font-medium leading-relaxed">
                      {benefit.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Impact Card */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-orange-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-black text-gray-900">
                  Your Impact
                </h3>
              </div>
              <div className="space-y-4">
                <div className="p-5 bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl border-2 border-red-200 hover:border-red-300 transition-colors">
                  <div className="font-black text-2xl text-red-700 mb-2">
                    ₹500
                  </div>
                  <div className="text-sm text-gray-700 font-medium">
                    Provides nutritious meals for one elder for a week
                  </div>
                </div>
                <div className="p-5 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border-2 border-orange-200 hover:border-orange-300 transition-colors">
                  <div className="font-black text-2xl text-orange-700 mb-2">
                    ₹2,500
                  </div>
                  <div className="text-sm text-gray-700 font-medium">
                    Covers monthly medical expenses for one resident
                  </div>
                </div>
                <div className="p-5 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl border-2 border-amber-200 hover:border-amber-300 transition-colors">
                  <div className="font-black text-2xl text-amber-700 mb-2">
                    ₹10,000
                  </div>
                  <div className="text-sm text-gray-700 font-medium">
                    Sponsors complete care for one elder for a month
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 text-white shadow-2xl border-2 border-slate-700">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black">Why Donate With Us?</h3>
              </div>
              <div className="space-y-3 text-sm text-slate-300">
                <p className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>100% transparency in fund utilization</span>
                </p>
                <p className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Regular updates and impact reports</span>
                </p>
                <p className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Registered NGO with 80G certification</span>
                </p>
                <p className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Serving the community for 15+ years</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Details Form Modal */}
      {showDetailsForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl animate-slide-up">
            <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6 rounded-t-3xl flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-black mb-1">Your Details</h3>
                <p className="text-orange-100 text-sm">
                  We need your information for the donation receipt
                </p>
              </div>
              <button
                onClick={() => setShowDetailsForm(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8">
              <div className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <User className="w-4 h-4 text-orange-600" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={userDetails.fullName}
                    onChange={(e) =>
                      handleUserDetailsChange("fullName", e.target.value)
                    }
                    placeholder="Enter your full name"
                    className={`w-full px-5 py-4 rounded-xl border-2 ${
                      errors.fullName
                        ? "border-red-500 focus:border-red-600"
                        : "border-gray-200 focus:border-orange-600"
                    } focus:outline-none text-lg transition-all`}
                  />
                  {errors.fullName && (
                    <p className="text-red-600 text-sm mt-2 font-semibold">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-orange-600" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={userDetails.emailId}
                    onChange={(e) =>
                      handleUserDetailsChange("emailId", e.target.value)
                    }
                    placeholder="your.email@example.com"
                    className={`w-full px-5 py-4 rounded-xl border-2 ${
                      errors.emailId
                        ? "border-red-500 focus:border-red-600"
                        : "border-gray-200 focus:border-orange-600"
                    } focus:outline-none text-lg transition-all`}
                  />
                  {errors.emailId && (
                    <p className="text-red-600 text-sm mt-2 font-semibold">
                      {errors.emailId}
                    </p>
                  )}
                </div>

                {/* Mobile */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-orange-600" />
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    value={userDetails.mobile}
                    onChange={(e) =>
                      handleUserDetailsChange("mobile", e.target.value)
                    }
                    placeholder="10-digit mobile number"
                    maxLength="10"
                    className={`w-full px-5 py-4 rounded-xl border-2 ${
                      errors.mobile
                        ? "border-red-500 focus:border-red-600"
                        : "border-gray-200 focus:border-orange-600"
                    } focus:outline-none text-lg transition-all`}
                  />
                  {errors.mobile && (
                    <p className="text-red-600 text-sm mt-2 font-semibold">
                      {errors.mobile}
                    </p>
                  )}
                </div>

                {/* Donation Summary */}
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border-2 border-orange-200">
                  <h4 className="font-bold text-gray-900 mb-3">
                    Donation Summary
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount:</span>
                      <span className="font-bold text-gray-900">
                        ₹{selectedAmount || customAmount}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-bold text-gray-900">
                        {donationType === "one-time" ? "One-Time" : "Monthly"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cause:</span>
                      <span className="font-bold text-gray-900">
                        {causes.find((c) => c.id === selectedCause).title}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleDetailsSubmit}
                disabled={isSubmitting}
                className="w-full mt-8 bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 text-white py-5 rounded-2xl font-black text-xl hover:shadow-2xl hover:shadow-orange-500/50 transition-all flex items-center justify-center gap-3 group transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>Processing...</>
                ) : (
                  <>
                    <Heart className="w-7 h-7 fill-white group-hover:scale-125 transition-transform" />
                    Proceed to Payment
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </>
                )}
              </button>

              <p className="text-center text-sm text-gray-500 mt-4">
                * All fields are required
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slide-up">
            <div className="sticky top-0 bg-gradient-to-r from-orange-600 to-red-600 text-white p-6 rounded-t-3xl flex items-center justify-between z-10">
              <div>
                <h3 className="text-2xl font-black mb-1">
                  Complete Your Donation
                </h3>
                <p className="text-orange-100 text-sm">
                  Amount: ₹{selectedAmount || customAmount} • {userDetails.fullName}
                </p>
              </div>
              <button
                onClick={() => {
                  setShowPaymentModal(false);
                  setSelectedPaymentMethod(null);
                }}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 md:p-8">
              {/* Payment Methods */}
              <div className="mb-8">
                <h4 className="text-xl font-bold text-gray-900 mb-6">
                  Choose Payment Method
                </h4>
                <div className="grid md:grid-cols-3 gap-4">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => handlePaymentMethod(method.id)}
                      disabled={isSubmitting}
                      className={`relative p-6 rounded-2xl border-2 transition-all duration-300 text-left group disabled:opacity-50 disabled:cursor-not-allowed ${
                        selectedPaymentMethod === method.id
                          ? "border-orange-600 bg-gradient-to-br from-orange-50 to-red-50 shadow-lg scale-105"
                          : "border-gray-200 hover:border-orange-300 hover:shadow-md"
                      }`}
                    >
                      {method.popular && (
                        <div className="absolute -top-3 -right-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                          Popular
                        </div>
                      )}
                      <div
                        className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${method.color} text-white mb-4 group-hover:scale-110 transition-transform`}
                      >
                        {method.icon}
                      </div>
                      <h5 className="font-bold text-lg text-gray-900 mb-2">
                        {method.name}
                      </h5>
                      <p className="text-sm text-gray-600">
                        {method.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* UPI/QR Code Details */}
              {(selectedPaymentMethod === "upi" ||
                selectedPaymentMethod === "qr") && (
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border-2 border-blue-200">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* QR Code */}
                    <div className="text-center">
                      <h5 className="font-bold text-lg text-gray-900 mb-4 flex items-center justify-center gap-2">
                        <QrCode className="w-5 h-5 text-purple-600" />
                        Scan QR Code
                      </h5>
                      <div className="bg-white p-4 rounded-2xl shadow-xl inline-block mb-4">
                        <img
                          src={generateQRCodeURL()}
                          alt="UPI QR Code"
                          className="w-64 h-64 object-contain"
                        />
                      </div>
                      <p className="text-sm text-gray-600">
                        Scan with any UPI app
                      </p>
                    </div>

                    {/* UPI ID */}
                    <div>
                      <h5 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                        <Smartphone className="w-5 h-5 text-blue-600" />
                        Or Pay Using UPI ID
                      </h5>

                      <div className="space-y-4">
                        <div className="bg-white rounded-xl p-4 border-2 border-gray-200">
                          <label className="text-sm font-semibold text-gray-600 block mb-2">
                            UPI ID
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={upiId}
                              readOnly
                              className="flex-1 bg-gray-50 px-4 py-3 rounded-lg font-mono text-gray-900 border border-gray-300"
                            />
                            <button
                              onClick={copyUPIId}
                              className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
                            >
                              {copiedUPI ? (
                                <CheckCircleIcon className="w-5 h-5" />
                              ) : (
                                <Copy className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                          {copiedUPI && (
                            <p className="text-green-600 text-sm mt-2 font-semibold">
                              ✓ UPI ID Copied!
                            </p>
                          )}
                        </div>

                        <div className="bg-white rounded-xl p-4 border-2 border-gray-200">
                          <label className="text-sm font-semibold text-gray-600 block mb-2">
                            Amount
                          </label>
                          <div className="text-2xl font-black text-gray-900">
                            ₹{selectedAmount || customAmount}
                          </div>
                        </div>

                        <div className="bg-white rounded-xl p-4 border-2 border-gray-200">
                          <label className="text-sm font-semibold text-gray-600 block mb-2">
                            Beneficiary
                          </label>
                          <div className="font-semibold text-gray-900">
                            {upiName}
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border-2 border-green-200">
                          <p className="text-sm text-gray-700 font-medium">
                            💡 Open any UPI app (GPay, PhonePe, Paytm) and enter
                            the UPI ID to complete payment
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Supported Apps */}
                  <div className="mt-8 text-center">
                    <p className="text-sm text-gray-600 mb-4 font-semibold">
                      Supported UPI Apps
                    </p>
                    <div className="flex items-center justify-center gap-4 flex-wrap">
                      {[
                        "Google Pay",
                        "PhonePe",
                        "Paytm",
                        "BHIM",
                        "Amazon Pay",
                      ].map((app) => (
                        <div
                          key={app}
                          className="bg-white px-4 py-2 rounded-lg shadow-md border border-gray-200 text-sm font-semibold text-gray-700"
                        >
                          {app}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Payment Completed Button */}
                  <div className="mt-8 text-center">
                    <button
                      onClick={handlePaymentCompleted}
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg transition-all inline-flex items-center gap-3 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <CheckCircleIcon className="w-6 h-6" />
                      I've Completed the Payment
                    </button>
                    <p className="text-xs text-gray-500 mt-3">
                      Click this button after completing your payment
                    </p>
                  </div>
                </div>
              )}

              {/* Card Payment Info */}
              {selectedPaymentMethod === "card" && (
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border-2 border-orange-200 text-center">
                  <CreditCard className="w-16 h-16 text-orange-600 mx-auto mb-4" />
                  <h5 className="font-bold text-xl text-gray-900 mb-3">
                    Card Payment
                  </h5>
                  <p className="text-gray-600 mb-6">
                    You will be redirected to our secure payment gateway to
                    complete your donation.
                  </p>
                  <button 
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Processing..." : "Proceed to Payment Gateway"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Testimonials Section */}
      <div className="bg-gradient-to-br from-orange-100 via-red-100 to-amber-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md px-6 py-3 rounded-full mb-6 border border-orange-200">
              <Heart className="w-5 h-5 text-red-600 fill-red-600" />
              <span className="text-sm font-bold tracking-wide text-gray-800">
                TESTIMONIALS
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Voices of Gratitude
            </h2>
            <p className="text-gray-700 text-lg md:text-xl font-medium">
              Hear from those whose lives you're touching
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-orange-200 hover:border-orange-400 transition-all hover:shadow-2xl">
              <div className="text-yellow-500 text-3xl mb-4 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic leading-relaxed">
                "The care and love I receive here gives me hope every day.
                Thanks to generous donors, I have a family again."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  RK
                </div>
                <div>
                  <div className="font-bold text-gray-900">Ramesh Kumar</div>
                  <div className="text-sm text-gray-600">Resident, Age 78</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-orange-200 hover:border-orange-400 transition-all hover:shadow-2xl">
              <div className="text-yellow-500 text-3xl mb-4 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic leading-relaxed">
                "Being able to support the elderly in my community brings
                immense joy. The transparency is commendable."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  PS
                </div>
                <div>
                  <div className="font-bold text-gray-900">Priya Sharma</div>
                  <div className="text-sm text-gray-600">Regular Donor</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-orange-200 hover:border-orange-400 transition-all hover:shadow-2xl">
              <div className="text-yellow-500 text-3xl mb-4 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic leading-relaxed">
                "This place gave my mother dignity in her final years. Forever
                grateful to the staff and donors."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  AV
                </div>
                <div>
                  <div className="font-bold text-gray-900">Ankit Verma</div>
                  <div className="text-sm text-gray-600">Family Member</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translate(-50%, -100%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
        .animate-slide-down {
          animation: slide-down 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

export default Donate;