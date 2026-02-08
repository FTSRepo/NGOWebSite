import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  Heart,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Award,
  Shield,
  Stethoscope,
  UtensilsCrossed,
  Home,
  Activity,
  Clock,
  Sparkles,
  Building2,
  MessageCircle,
  Calendar,
  ThumbsUp,
  Music,
  BookOpen,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
  Quote,
  Leaf,
  Target,
  Eye,
  Zap,
  TrendingUp,
  Camera,
  PartyPopper,
  DollarSign,
  Gift,
  Loader2,
} from "lucide-react";
import adult from "../../assets/Events/adult.jpg";
import Garden2 from "../../assets/Garden/garden2.png";
import Garden5 from "../../assets/Garden/garden5.png";
import indoor3 from "../../assets/IndoorGames/indoor3.png";

function HomePage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeEvent, setActiveEvent] = useState(0);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [donations, setDonations] = useState([]);
  const [donationsLoading, setDonationsLoading] = useState(true);
  const [activeDonation, setActiveDonation] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveEvent((prev) => (prev + 1) % events.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchDonations();
  }, []);

  useEffect(() => {
    if (donations.length > 0) {
      const interval = setInterval(() => {
        setActiveDonation((prev) => (prev + 1) % donations.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [donations]);

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
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch donations");
      }

      const result = await response.json();

      if (result.status && result.data) {
        const latestDonations = result.data
          .slice(0, 10)
          .map((donation, index) => ({
            id: `DON${String(index + 1).padStart(3, "0")}`,
            donorName: donation.fullName,
            amount: donation.amount,
            date: new Date(donation.tranDate).toISOString().split("T")[0],
            cause: donation.cause,
            donationType: donation.donationType,
          }));

        setDonations(latestDonations);
      }
    } catch (err) {
      console.error("Error fetching donations:", err);
      setDonations([]);
    } finally {
      setDonationsLoading(false);
    }
  };

  const testimonials = [
    {
      name: "Rajesh Kumar",
      relation: "Son of Resident",
      text: "My father has been living here for 2 years now. The care and attention he receives is exceptional. The staff treats him like family.",
      rating: 5,
      location: "Delhi, India",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    },
    {
      name: "Priya Sharma",
      relation: "Daughter of Resident",
      text: "The medical facilities and 24/7 care give me peace of mind. My mother is happy and well-cared for. Highly recommended!",
      rating: 5,
      location: "Noida, India",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    },
    {
      name: "Amit Patel",
      relation: "Family Member",
      text: "The environment is homely and the staff is compassionate. Regular health checkups ensure excellent care.",
      rating: 5,
      location: "Greater Noida, India",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    },
  ];

  const events = [
    {
      title: "Diwali Celebration 2024",
      date: "November 12, 2024",
      description:
        "Grand Diwali celebration with traditional diyas, rangoli competition, and festive dinner.",
      image: adult,
      category: "Festival",
      participants: "150+ Residents",
    },
    {
      title: "Yoga & Wellness Day",
      date: "December 5, 2024",
      description:
        "Morning yoga session followed by health checkups and wellness workshops for all residents.",
      image:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=500&fit=crop",
      category: "Wellness",
      participants: "200+ Residents",
    },
    {
      title: "Sports and Games ",
      date: "January 15, 2025",
      description: "Indoor Game Playing Session.",
      image: indoor3,
      category: "Sports",
      participants: "180+ Residents",
    },
    {
      title: "Republic Day Celebration",
      date: "January 26, 2025",
      description:
        "Patriotic celebration with flag hoisting, cultural programs, and special lunch.",
      image: adult,
      category: "National",
      participants: "220+ Residents",
    },
    {
      title: "Health Awareness Camp",
      date: "February 10, 2025",
      description:
        "Free health checkup camp with specialist doctors and nutrition guidance sessions.",
      image: Garden5,
      category: "Health",
      participants: "250+ Residents",
    },
  ];

  const services = [
    {
      icon: <Stethoscope className="w-7 h-7" />,
      title: "24/7 Medical Care",
      description:
        "Round-the-clock healthcare with qualified doctors and emergency services.",
      gradient: "from-orange-500 to-red-600",
    },
    {
      icon: <UtensilsCrossed className="w-7 h-7" />,
      title: "Nutritious Meals",
      description:
        "Healthy, delicious meals prepared by expert nutritionists daily.",
      gradient: "from-amber-500 to-orange-600",
    },
    {
      icon: <Home className="w-7 h-7" />,
      title: "Comfortable Living",
      description:
        "Spacious rooms with modern amenities and homely atmosphere.",
      gradient: "from-red-500 to-orange-600",
    },
    {
      icon: <Activity className="w-7 h-7" />,
      title: "Daily Activities",
      description: "Yoga, meditation, games and cultural events for wellbeing.",
      gradient: "from-orange-600 to-red-500",
    },
    {
      icon: <Shield className="w-7 h-7" />,
      title: "Complete Security",
      description: "24/7 CCTV surveillance and trained security personnel.",
      gradient: "from-red-600 to-orange-700",
    },
    {
      icon: <Heart className="w-7 h-7" />,
      title: "Loving Care",
      description:
        "Compassionate staff providing dignity and emotional support.",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  const stats = [
    {
      icon: <Users className="w-8 h-8" />,
      number: "500+",
      label: "Happy Residents",
    },
    {
      icon: <Award className="w-8 h-8" />,
      number: "18+",
      label: "Years of Service",
    },
    {
      icon: <Stethoscope className="w-8 h-8" />,
      number: "50+",
      label: "Care Staff",
    },
    { icon: <Star className="w-8 h-8" />, number: "4.9", label: "Rating" },
  ];

  const getCategoryColor = (category) => {
    const colors = {
      "General Support": "from-blue-500 to-blue-600",
      Medical: "from-red-500 to-red-600",
      Food: "from-green-500 to-green-600",
      Infrastructure: "from-blue-500 to-indigo-600",
      Healthcare: "from-purple-500 to-purple-600",
      General: "from-gray-500 to-gray-600",
      Recreation: "from-yellow-500 to-orange-600",
      Education: "from-indigo-500 to-indigo-600",
    };
    return colors[category] || "from-gray-500 to-gray-600";
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail("");
      }, 4000);
    }
  };

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  const nextEvent = () => {
    setActiveEvent((prev) => (prev + 1) % events.length);
  };

  const prevEvent = () => {
    setActiveEvent((prev) => (prev - 1 + events.length) % events.length);
  };

  const nextDonation = () => {
    setActiveDonation((prev) => (prev + 1) % donations.length);
  };

  const prevDonation = () => {
    setActiveDonation(
      (prev) => (prev - 1 + donations.length) % donations.length,
    );
  };

  const donationStats = {
    totalReceived: donations.reduce((sum, d) => sum + d.amount, 0),
    totalDonors: donations.length,
    thisMonth: donations
      .filter((d) => new Date(d.date).getMonth() === new Date().getMonth())
      .reduce((sum, d) => sum + d.amount, 0),
    avgDonation:
      donations.length > 0
        ? Math.round(
            donations.reduce((sum, d) => sum + d.amount, 0) / donations.length,
          )
        : 0,
  };

  const getCategoryGradient = (category) => {
    const gradients = {
      "General Support": "from-blue-500 via-blue-600 to-indigo-600",
      Medical: "from-red-500 via-rose-600 to-pink-600",
      Food: "from-green-500 via-emerald-600 to-teal-600",
      Infrastructure: "from-indigo-500 via-purple-600 to-violet-600",
      Healthcare: "from-purple-500 via-fuchsia-600 to-pink-600",
      General: "from-slate-500 via-gray-600 to-zinc-600",
      Recreation: "from-yellow-500 via-amber-600 to-orange-600",
      Education: "from-cyan-500 via-sky-600 to-blue-600",
    };
    return gradients[category] || "from-orange-500 via-red-600 to-rose-600";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Modern Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-orange-900 to-red-900">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(251,146,60,0.3),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(239,68,68,0.2),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/50"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-white animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl px-6 py-3 rounded-full mb-8 border border-white/20 hover:scale-105 transition-transform duration-300">
                <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
                <span className="text-sm font-semibold">
                  Trusted Since 2005 • Award Winning Care
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6 animate-slide-up">
                Where Every Day is
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-400 to-orange-500 mt-2 animate-gradient">
                  Filled With Care
                </span>
              </h1>

              <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-xl animate-slide-up animation-delay-200">
                Experience India's finest senior living community. Premium care,
                loving environment, and dignity for your loved ones at Shanti
                Hari Sudhanya Chand Vridhashram.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-slide-up animation-delay-400">
                <button className="group bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-orange-500/50 transition-all transform hover:scale-105 flex items-center justify-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>Book a Visit</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <a
                  href="tel:+919971673592"
                  className="bg-white/10 backdrop-blur-xl border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2 hover:scale-105"
                >
                  <Phone className="w-5 h-5" />
                  <span>+91-9971673592</span>
                </a>
              </div>
            </div>

            <div className="relative hidden lg:block animate-fade-in animation-delay-800">
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-600 to-red-600 rounded-3xl blur-2xl opacity-20 animate-pulse"></div>
              <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 transform hover:scale-105 transition-transform duration-500">
                <img
                  src={adult}
                  alt="Senior care"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-2xl shadow-xl animate-bounce-slow">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                    <div>
                      <div className="text-sm font-semibold">
                        24/7 Care Active
                      </div>
                      <div className="text-xs opacity-90">
                        Always Here for You
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Stats Bar */}
      <section className="relative -mt-20 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl mb-3 text-white group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-1 group-hover:text-orange-600 transition-colors">
                  {stat.number}
                </h3>
                <p className="text-sm text-gray-600 font-semibold">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Vision Values */}
      <section className="py-24 bg-gradient-to-b from-white to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-6 py-2 rounded-full font-semibold mb-4 hover:scale-105 transition-transform">
              <Target className="w-4 h-4" />
              <span>Our Foundation</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Built on{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                Purpose & Values
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-orange-200 transform hover:-translate-y-2 duration-300">
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                <Target className="w-10 h-10 text-white" />
              </div>
              <div className="pt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Mission
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  To provide compassionate, dignified care that honors life
                  experiences while ensuring physical, emotional, and spiritual
                  wellbeing in a loving environment.
                </p>
              </div>
            </div>

            <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-orange-200 transform hover:-translate-y-2 duration-300 animation-delay-200">
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                <Eye className="w-10 h-10 text-white" />
              </div>
              <div className="pt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Vision
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  To be India's leading senior care facility, setting standards
                  for excellence through innovation, compassion, and unwavering
                  commitment to happiness.
                </p>
              </div>
            </div>

            <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-orange-200 transform hover:-translate-y-2 duration-300 animation-delay-400">
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <div className="pt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Values
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Respect, dignity, compassion, transparency, and excellence
                  guide everything we do. We treat every resident as family,
                  with love and genuine care.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Services */}
      <section className="py-24 bg-gradient-to-br from-orange-50 via-red-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-white px-6 py-2 rounded-full font-semibold mb-4 shadow-lg hover:scale-105 transition-transform">
              <Zap className="w-4 h-4 text-orange-600" />
              <span className="text-orange-700">Premium Services</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Comprehensive{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                Care
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything your loved ones need for a healthy, joyful life under
              one roof
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500 to-red-600 opacity-5 rounded-full -mr-16 -mt-16 group-hover:opacity-10 transition-opacity"></div>

                <div
                  className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl mb-6 text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                >
                  {service.icon}
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>

                <div className="mt-6 flex items-center text-orange-600 font-semibold group-hover:gap-2 transition-all">
                  <span className="text-sm">Learn More</span>
                  <ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Donations Section - SLIDER VIEW */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-orange-50/20 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-red-200/30 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2.5 rounded-full font-semibold mb-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <Heart className="w-4 h-4" fill="currentColor" />
              <span className="text-sm tracking-wide">MAKING A DIFFERENCE</span>
            </div>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight">
              Our{" "}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-red-600 to-pink-600">
                  Generous
                </span>
                <div className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-orange-400/30 to-red-400/30 -skew-x-12 -z-10"></div>
              </span>{" "}
              Supporters
            </h2>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Every contribution creates ripples of positive change. Thank you
              for being part of our mission to bring comfort and dignity to
              those we serve.
            </p>
          </div>

          {/* Statistics Dashboard */}
          {!donationsLoading && donations.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
              <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
                      <DollarSign className="w-6 h-6 text-white" />
                    </div>
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      Total Raised
                    </p>
                    <h3 className="text-4xl font-black text-gray-900">
                      ₹{donationStats.totalReceived.toLocaleString()}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <Sparkles className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      This Month
                    </p>
                    <h3 className="text-4xl font-black text-gray-900">
                      ₹{donationStats.thisMonth.toLocaleString()}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <Heart
                      className="w-5 h-5 text-purple-500"
                      fill="currentColor"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      Donors
                    </p>
                    <h3 className="text-4xl font-black text-gray-900">
                      {donationStats.totalDonors}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400/20 to-red-500/20 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-lg">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <TrendingUp className="w-5 h-5 text-orange-500" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      Avg Donation
                    </p>
                    <h3 className="text-4xl font-black text-gray-900">
                      ₹{donationStats.avgDonation.toLocaleString()}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Donations Slider */}
          {donationsLoading ? (
            <div className="flex items-center justify-center py-32">
              <div className="text-center">
                <div className="relative inline-block">
                  <Loader2 className="w-16 h-16 text-orange-600 animate-spin" />
                  <div className="absolute inset-0 blur-xl bg-orange-400/30 animate-pulse"></div>
                </div>
                <p className="text-gray-600 font-semibold mt-6 text-lg">
                  Loading contributions...
                </p>
              </div>
            </div>
          ) : donations.length === 0 ? (
            <div className="text-center py-32">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl mb-6 shadow-inner">
                <Gift className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">
                No Donations Yet
              </h3>
              <p className="text-gray-500 text-lg">
                Be the first to make a difference!
              </p>
            </div>
          ) : (
            <div className="relative w-full">
              {/* Image Card Style Slider Container */}
              <div className="relative mx-auto" style={{ maxWidth: '90%', height: '450px' }}>
                <div className="flex items-center justify-center gap-4 h-full perspective-1000">
                  {/* Display 5 cards with center focus */}
                  {[-2, -1, 0, 1, 2].map((offset) => {
                    const index = (activeDonation + offset + donations.length) % donations.length;
                    const donation = donations[index];
                    const isActive = offset === 0;
                    
                    return (
                      <div
                        key={index}
                        onClick={() => setActiveDonation(index)}
                        className={`relative transition-all duration-500 ease-in-out cursor-pointer ${
                          isActive
                            ? 'w-72 h-96 z-30 scale-100'
                            : Math.abs(offset) === 1
                            ? 'w-56 h-80 z-20 scale-90 opacity-60'
                            : 'w-48 h-72 z-10 scale-75 opacity-30'
                        }`}
                        style={{
                          transform: `translateX(${offset * (isActive ? 0 : offset > 0 ? 20 : -20)}px) rotateY(${offset * 8}deg)`,
                        }}
                      >
                        {/* Card */}
                        <div
                          className={`relative w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br ${getCategoryGradient(donation.cause)} transition-all duration-500`}
                        >
                          {/* Card Content */}
                          <div className="relative w-full h-full p-6 flex flex-col justify-between">
                            {/* Top Section */}
                            <div>
                              {/* Category Badge */}
                              <div className="mb-4">
                                <span className="inline-block px-4 py-2 rounded-lg text-xs font-bold bg-white/20 backdrop-blur-sm text-white shadow-lg uppercase tracking-wide">
                                  {donation.cause}
                                </span>
                              </div>

                              {/* Donor Avatar & Name */}
                              <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center text-white font-black text-xl shadow-lg border-2 border-white/40">
                                  {donation.donorName.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-bold text-white text-lg line-clamp-1">
                                    {donation.donorName}
                                  </h3>
                                  <div className="flex items-center gap-1 text-white/80 text-xs">
                                    <Calendar className="w-3 h-3" />
                                    <span>{formatDate(donation.date)}</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Middle Section - Amount */}
                            <div className="flex-1 flex items-center justify-center">
                              <div className="text-center">
                                <p className="text-white/80 text-sm font-semibold uppercase tracking-wide mb-2">
                                  Contribution
                                </p>
                                <h4 className="text-5xl font-black text-white mb-2">
                                  ₹{donation.amount.toLocaleString()}
                                </h4>
                                <div className="flex items-center justify-center gap-2">
                                  <CheckCircle className="w-5 h-5 text-white" />
                                  <span className="text-white/90 text-sm font-semibold">
                                    Verified
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Bottom Section */}
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                              <p className="text-white/70 text-xs font-semibold uppercase tracking-wide mb-1">
                                Type
                              </p>
                              <p className="text-white font-bold text-sm">
                                {donation.donationType}
                              </p>
                            </div>

                            {/* Heart Icon */}
                            {isActive && (
                              <div className="absolute top-4 right-4">
                                <Heart
                                  className="w-8 h-8 text-white animate-pulse"
                                  fill="currentColor"
                                />
                              </div>
                            )}
                          </div>

                          {/* Overlay gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-center mt-8 gap-6">
                <button
                  onClick={prevDonation}
                  className="w-14 h-14 rounded-full bg-white hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-600 hover:text-white text-gray-700 flex items-center justify-center transition-all transform hover:scale-110 shadow-xl border border-gray-200"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <div className="flex gap-2">
                  {donations.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveDonation(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === activeDonation
                          ? "w-12 bg-gradient-to-r from-orange-500 to-red-600"
                          : "w-2 bg-gray-300 hover:bg-orange-400"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextDonation}
                  className="w-14 h-14 rounded-full bg-white hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-600 hover:text-white text-gray-700 flex items-center justify-center transition-all transform hover:scale-110 shadow-xl border border-gray-200"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Donation Counter */}
              <div className="text-center mt-6">
                <p className="text-gray-600 font-semibold text-lg">
                  <span className="text-orange-600 font-black">
                    {activeDonation + 1}
                  </span>
                  {" / "}
                  <span className="text-gray-800 font-black">
                    {donations.length}
                  </span>
                  {" "}generous donations
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Events Section */}
      <section className="py-24 bg-gradient-to-br from-white to-red-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-6 py-2 rounded-full font-semibold mb-4 hover:scale-105 transition-transform">
              <PartyPopper className="w-4 h-4" />
              <span>Recent Events</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Creating{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                Joyful Moments
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Celebrating life with engaging activities and memorable events
            </p>
          </div>

          {/* Event Slider */}
          <div className="relative max-w-5xl mx-auto mb-12">
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-orange-100">
              {/* Main Event Display */}
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-80 md:h-auto overflow-hidden group">
                  <img
                    src={events[activeEvent].image}
                    alt={events[activeEvent].title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    {events[activeEvent].category}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-orange-600 mb-4">
                    <Calendar className="w-5 h-5" />
                    <span className="font-semibold">
                      {events[activeEvent].date}
                    </span>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                    {events[activeEvent].title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                    {events[activeEvent].description}
                  </p>

                  <div className="flex items-center gap-2 text-gray-700 mb-8">
                    <Users className="w-5 h-5 text-orange-600" />
                    <span className="font-semibold">
                      {events[activeEvent].participants}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={prevEvent}
                      className="w-12 h-12 rounded-full bg-orange-100 hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-600 hover:text-white flex items-center justify-center transition-all transform hover:scale-110 shadow-md"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    <div className="flex gap-2">
                      {events.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveEvent(index)}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            index === activeEvent
                              ? "w-8 bg-gradient-to-r from-orange-500 to-red-600"
                              : "w-2 bg-gray-300 hover:bg-orange-400"
                          }`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={nextEvent}
                      className="w-12 h-12 rounded-full bg-orange-100 hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-600 hover:text-white flex items-center justify-center transition-all transform hover:scale-110 shadow-md"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Event Thumbnails */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {events.map((event, index) => (
              <button
                key={index}
                onClick={() => setActiveEvent(index)}
                className={`relative rounded-2xl overflow-hidden group transition-all duration-300 ${
                  index === activeEvent
                    ? "ring-4 ring-orange-500 shadow-xl scale-105"
                    : "hover:scale-105 shadow-md"
                }`}
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-3">
                  <p className="text-white text-xs font-bold line-clamp-2">
                    {event.title}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* View More Button */}
          <div className="text-center animate-fade-in">
            <NavLink
              to="/events"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-red-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-orange-500/50 transition-all transform hover:scale-105"
            >
              <Camera className="w-6 h-6" />
              <span>View All Events</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </NavLink>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-orange-900 to-red-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,146,60,0.1),transparent_70%)]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl px-6 py-2 rounded-full font-semibold mb-4 border border-white/20 hover:scale-105 transition-transform">
              <Heart className="w-4 h-4 text-orange-400" />
              <span>Testimonials</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Stories from{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
                Our Families
              </span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-12 border border-white/10 transform hover:scale-105 transition-transform duration-500">
              <Quote className="absolute top-8 right-8 w-16 h-16 text-white/10" />

              <div className="flex items-center gap-6 mb-8">
                <img
                  src={testimonials[activeTestimonial].image}
                  alt={testimonials[activeTestimonial].name}
                  className="w-20 h-20 rounded-full border-4 border-white/20 transform hover:scale-110 transition-transform"
                />
                <div>
                  <h4 className="text-2xl font-bold">
                    {testimonials[activeTestimonial].name}
                  </h4>
                  <p className="text-orange-300">
                    {testimonials[activeTestimonial].relation}
                  </p>
                  <div className="flex gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-xl text-gray-200 leading-relaxed italic mb-6">
                "{testimonials[activeTestimonial].text}"
              </p>

              <div className="flex items-center justify-between">
                <p className="text-sm text-orange-300">
                  {testimonials[activeTestimonial].location}
                </p>

                <div className="flex items-center gap-3">
                  <button
                    onClick={prevTestimonial}
                    className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:scale-110"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:scale-110"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 text-center border border-white/10 transform hover:scale-105 transition-transform">
                <div className="text-4xl font-black mb-2">4.9/5</div>
                <div className="text-sm text-orange-300">Average Rating</div>
              </div>
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 text-center border border-white/10 transform hover:scale-105 transition-transform animation-delay-200">
                <div className="text-4xl font-black mb-2">1000+</div>
                <div className="text-sm text-orange-300">Happy Reviews</div>
              </div>
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 text-center border border-white/10 transform hover:scale-105 transition-transform animation-delay-400">
                <div className="text-4xl font-black mb-2">99%</div>
                <div className="text-sm text-orange-300">Recommend Us</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-white to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-orange-600 via-red-600 to-orange-700 rounded-3xl p-12 md:p-16 overflow-hidden transform hover:scale-105 transition-transform duration-500">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>

            <div className="relative text-center text-white">
              <Sparkles className="w-16 h-16 mx-auto mb-6 text-yellow-300 animate-pulse" />
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                Give Your Loved Ones the Best
              </h2>
              <p className="text-xl text-orange-100 max-w-2xl mx-auto mb-10">
                Schedule a visit today and experience why families trust us with
                their most precious relationships
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="group bg-white text-orange-600 px-10 py-5 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl flex items-center justify-center gap-2 hover:scale-105">
                  <Calendar className="w-6 h-6" />
                  <span>Schedule Visit</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <a
                  href="tel:+919971673592"
                  className="bg-white/10 backdrop-blur-xl border-2 border-white text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2 hover:scale-105"
                >
                  <Phone className="w-6 h-6" />
                  <span>Call Now</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-400">
              We're here to answer all your questions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-gradient-to-br from-orange-900 to-red-900 rounded-2xl p-8 text-center hover:scale-105 transition-all">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Call Us</h3>
              <a
                href="tel:+917321985911"
                className="text-orange-300 hover:text-white font-semibold text-xl block"
              >
                +91-7321985911
              </a>
              <p className="text-sm text-gray-400 mt-2">24/7 Available</p>
            </div>

            <div className="group bg-gradient-to-br from-red-900 to-orange-900 rounded-2xl p-8 text-center hover:scale-105 transition-all animation-delay-200">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Email Us</h3>
              <a
                href="mailto:shantiharisudhanyachand@gmail.com"
                className="text-orange-300 hover:text-white font-semibold block"
              >
                shantiharisudhanyachand@gmail.com
              </a>
              <p className="text-sm text-gray-400 mt-2">Quick Response</p>
            </div>

            <div className="group bg-gradient-to-br from-orange-900 to-red-900 rounded-2xl p-8 text-center hover:scale-105 transition-all animation-delay-400">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Visit Us</h3>
              <p className="text-orange-300">
                Barwat Sena, Areraj Road, Near Gorwa Tola, <br />
                Bettiah West Champaran, Bihar 845438
              </p>
            </div>
          </div>
        </div>
      </section>

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
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-400 {
          animation-delay: 400ms;
        }

        .animation-delay-600 {
          animation-delay: 600ms;
        }

        .animation-delay-800 {
          animation-delay: 800ms;
        }

        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
}

export default HomePage;