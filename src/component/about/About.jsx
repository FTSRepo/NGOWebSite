import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import {
  FaHeart,
  FaHandHoldingHeart,
  FaUserMd,
  FaUsers,
  FaAward,
  FaEye,
  FaBullseye,
  FaCheckCircle,
  FaQuoteLeft,
  FaStar,
  FaUserNurse,
  FaStethoscope,
  FaUtensils,
  FaHeartbeat,
  FaLightbulb,
  FaShieldAlt,
  FaSmile,
  FaArrowRight,
} from "react-icons/fa";
import { MdSecurity, MdVolunteerActivism } from "react-icons/md";
import { IoIosHeartEmpty } from "react-icons/io";
import { GiMeditation } from "react-icons/gi";

import adult from "../../assets/Events/adult.jpg";
import garden from '../../assets/Garden/Garden.jpeg';
import foodArea1 from '../../assets/FoodCourt/foodArea1.png';
import indoor from '../../assets/IndoorGames/indoor.png';   
import Garden5 from '../../assets/Garden/garden5.png';




function About() {
  const milestones = [
    {
      year: "2005",
      title: "Foundation",
      description:
        "Shanti Hari Sudhanya Chand Vridhashram was established with a vision to provide dignified care for seniors.",
    },
    {
      year: "2008",
      title: "Expansion",
      description:
        "Added 50 more rooms and upgraded medical facilities to serve more residents.",
    },
    {
      year: "2012",
      title: "Recognition",
      description:
        'Awarded "Best Senior Care Facility" by the State Government.',
    },
    {
      year: "2015",
      title: "Modern Amenities",
      description:
        "Introduced physiotherapy center and recreational activity hall.",
    },
    {
      year: "2018",
      title: "Healthcare Upgrade",
      description:
        "Partnered with leading hospitals for advanced medical care.",
    },
    {
      year: "2023",
      title: "500+ Residents",
      description:
        "Celebrated serving over 500 happy residents and their families.",
    },
  ];

  const team = [
    {
      name: "Dr. Abhinas Goldar",
      role: "Medical Director",
      icon: FaUserMd,
      experience: "25+ years",
      color: "from-orange-500 to-red-500",
    },
    {
      name: "Nursing Team",
      role: "Senior Care Nurses",
      icon: FaUserNurse,
      experience: "15+ professionals",
      color: "from-red-500 to-orange-600",
    },
    {
      name: "Nutrition Team",
      role: "Dieticians & Chefs",
      icon: FaUtensils,
      experience: "10+ experts",
      color: "from-amber-500 to-orange-500",
    },
    {
      name: "Activity Coordinators",
      role: "Recreation & Wellness",
      icon: GiMeditation,
      experience: "8+ coordinators",
      color: "from-orange-600 to-red-600",
    },
    {
      name: "Security Team",
      role: "24/7 Safety Personnel",
      icon: MdSecurity,
      experience: "20+ guards",
      color: "from-red-600 to-orange-700",
    },
    {
      name: "Support Staff",
      role: "Care & Housekeeping",
      icon: FaHandHoldingHeart,
      experience: "30+ members",
      color: "from-orange-500 to-red-500",
    },
  ];

  const values = [
    {
      icon: FaHeart,
      title: "Compassion",
      description:
        "We treat every resident with love, kindness, and understanding, creating a warm family atmosphere.",
      color: "from-red-500 to-orange-500",
    },
    {
      icon: FaShieldAlt,
      title: "Dignity & Respect",
      description:
        "Every senior deserves to live with dignity. We honor their independence and choices.",
      color: "from-orange-600 to-red-600",
    },
    {
      icon: FaStethoscope,
      title: "Quality Care",
      description:
        "Professional medical care with state-of-the-art facilities and experienced staff.",
      color: "from-amber-500 to-orange-600",
    },
    {
      icon: FaLightbulb,
      title: "Innovation",
      description:
        "Continuously improving our services with modern technology and best practices.",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: FaUsers,
      title: "Community",
      description:
        "Building strong connections through activities, events, and social engagement.",
      color: "from-red-600 to-orange-700",
    },
    {
      icon: FaHeartbeat,
      title: "Holistic Wellness",
      description:
        "Caring for physical, mental, emotional, and spiritual well-being of our residents.",
      color: "from-orange-600 to-red-600",
    },
  ];

  const achievements = [
    { number: "18+", label: "Years of Excellence", icon: FaAward },
    { number: "500+", label: "Happy Residents Served", icon: FaUsers },
    {
      number: "50+",
      label: "Dedicated Staff Members",
      icon: FaHandHoldingHeart,
    },
    { number: "99%", label: "Family Satisfaction", icon: FaStar },
    { number: "24/7", label: "Medical Assistance", icon: FaUserMd },
    { number: "100%", label: "Safety & Security", icon: MdSecurity },
  ];

  const facilities = [
    "Spacious air-conditioned rooms with attached bathrooms",
    "Modern medical equipment and emergency care",
    "Nutritious meals prepared by expert dieticians",
    "Daily physiotherapy and exercise sessions",
    "Library, TV room, and recreational areas",
    "Prayer room and meditation center",
    "Beautiful garden for morning walks",
    "Regular health checkups and monitoring",
    "In-house pharmacy for convenience",
    "Wheelchair accessible infrastructure",
    "Backup power and water supply",
    "24/7 CCTV surveillance",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-orange-900 to-red-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(251,146,60,0.3),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(239,68,68,0.2),transparent_50%)]"></div>
          <img
            src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1920&h=600&fit=crop"
            alt="About us"
            className="w-full h-full object-cover opacity-10"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl px-6 py-3 rounded-full mb-6 border border-white/20 hover:scale-105 transition-transform">
            <IoIosHeartEmpty className="text-orange-300 text-xl animate-pulse" />
            <span className="text-sm font-semibold">
              About Shanti Hari Sudhanya Chand Vridhashram
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 animate-slide-up">
            Where Seniors Find{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-amber-300">
              Home
            </span>
            ,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-amber-300">
              Love
            </span>{" "}
            &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-amber-300">
              Dignity
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-100 max-w-3xl mx-auto animate-slide-up animation-delay-200">
            For over 18 years, we've been creating a sanctuary where elderly
            individuals receive compassionate care, medical attention, and the
            respect they deserve.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-8 sm:p-12 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl mb-6 shadow-lg transform hover:rotate-6 transition-transform">
                <FaBullseye className="text-3xl text-white" />
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
                Our Mission
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                To provide a safe, comfortable, and dignified living environment
                for senior citizens, ensuring they receive the highest quality
                of care, medical attention, and emotional support.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We strive to create a family-like atmosphere where every
                resident feels valued, respected, and loved, enabling them to
                live their golden years with joy and peace.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl p-8 sm:p-12 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 duration-300 animation-delay-200">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl mb-6 shadow-lg transform hover:rotate-6 transition-transform">
                <FaEye className="text-3xl text-white" />
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
                Our Vision
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                To be recognized as the most trusted and compassionate senior
                care facility in India, setting new standards in elderly care
                through innovation, dedication, and love.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We envision a society where every senior citizen has access to
                quality care and lives with dignity, surrounded by warmth,
                respect, and understanding.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-6 py-2 rounded-full font-semibold mb-6 hover:scale-105 transition-transform">
                <FaHeart className="text-lg" />
                <span>Our Journey</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6">
                18 Years of{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                  Compassionate Care
                </span>
              </h2>
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                <p>
                  Shanti Hari Sudhanya Chand Vridhashram was founded in 2005
                  with a simple yet powerful vision: to create a home where
                  senior citizens could live their golden years with dignity,
                  comfort, and love.
                </p>
                <p>
                  What started as a small initiative with just 20 residents has
                  now grown into a thriving community of over 500 happy
                  residents. Our founder, inspired by the need for quality
                  senior care, dedicated their life to building a sanctuary
                  where elderly individuals receive not just medical care, but
                  emotional support and companionship.
                </p>
                <p>
                  Over the years, we've expanded our facilities, upgraded our
                  medical infrastructure, and assembled a team of dedicated
                  professionals who share our passion for senior care. Today, we
                  stand proud as one of the most trusted old age homes in the
                  region.
                </p>
                <p className="font-semibold text-orange-700 bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                  Every resident who walks through our doors becomes part of our
                  extended family, and their happiness is our greatest
                  achievement.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 animate-fade-in animation-delay-400">
              <img
                src={Garden5}
                alt="Care"
                className="rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300"
              />
              <img
                src={garden}
                alt="Community"
                className="rounded-2xl shadow-lg mt-8 transform hover:scale-105 transition-transform duration-300"
              />
              <img
                src={foodArea1}
                alt="Happiness"
                className="rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300"
              />
              <img
                src={indoor}
                alt="Support"
                className="rounded-2xl shadow-lg mt-8 transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Journey/Timeline Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-6 py-2 rounded-full font-semibold mb-4 hover:scale-105 transition-transform">
              <FaStar className="text-lg" />
              <span>Why Choose Us</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
              What Makes Us{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                Different
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover why families across India trust us with their most
              precious relationships
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Feature 1 */}
            <div className="group relative bg-gradient-to-br from-orange-50 to-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-3 duration-300 border-2 border-transparent hover:border-orange-200 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500 opacity-5 rounded-full -mr-16 -mt-16 group-hover:opacity-10 transition-opacity"></div>
              <div className="relative">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all">
                  <FaUserMd className="text-3xl text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                  Expert Medical Team
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  24/7 access to qualified doctors, nurses, and healthcare
                  professionals ensuring immediate medical attention.
                </p>
                <div className="flex items-center gap-2 text-orange-600 font-semibold">
                  <FaCheckCircle className="text-sm" />
                  <span className="text-sm">Certified Professionals</span>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative bg-gradient-to-br from-red-50 to-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-3 duration-300 border-2 border-transparent hover:border-orange-200 overflow-hidden animation-delay-100">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500 opacity-5 rounded-full -mr-16 -mt-16 group-hover:opacity-10 transition-opacity"></div>
              <div className="relative">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all">
                  <FaUtensils className="text-3xl text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                  Nutritious Meals
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Specially crafted meals by expert dieticians catering to
                  individual dietary needs and preferences.
                </p>
                <div className="flex items-center gap-2 text-orange-600 font-semibold">
                  <FaCheckCircle className="text-sm" />
                  <span className="text-sm">Customized Diet Plans</span>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative bg-gradient-to-br from-orange-50 to-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-3 duration-300 border-2 border-transparent hover:border-orange-200 overflow-hidden animation-delay-200">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500 opacity-5 rounded-full -mr-16 -mt-16 group-hover:opacity-10 transition-opacity"></div>
              <div className="relative">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all">
                  <MdSecurity className="text-3xl text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                  Complete Security
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Round-the-clock CCTV surveillance, trained security personnel,
                  and emergency response systems.
                </p>
                <div className="flex items-center gap-2 text-orange-600 font-semibold">
                  <FaCheckCircle className="text-sm" />
                  <span className="text-sm">24/7 Monitoring</span>
                </div>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="group relative bg-gradient-to-br from-red-50 to-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-3 duration-300 border-2 border-transparent hover:border-orange-200 overflow-hidden animation-delay-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500 opacity-5 rounded-full -mr-16 -mt-16 group-hover:opacity-10 transition-opacity"></div>
              <div className="relative">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all">
                  <GiMeditation className="text-3xl text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                  Holistic Wellness
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Daily yoga, meditation, physiotherapy, and recreational
                  activities for physical and mental well-being.
                </p>
                <div className="flex items-center gap-2 text-orange-600 font-semibold">
                  <FaCheckCircle className="text-sm" />
                  <span className="text-sm">Daily Activities</span>
                </div>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="group relative bg-gradient-to-br from-orange-50 to-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-3 duration-300 border-2 border-transparent hover:border-orange-200 overflow-hidden animation-delay-400">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500 opacity-5 rounded-full -mr-16 -mt-16 group-hover:opacity-10 transition-opacity"></div>
              <div className="relative">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all">
                  <FaHome className="text-3xl text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                  Homely Environment
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Comfortable rooms, beautiful gardens, and common areas
                  designed to feel like home with family warmth.
                </p>
                <div className="flex items-center gap-2 text-orange-600 font-semibold">
                  <FaCheckCircle className="text-sm" />
                  <span className="text-sm">Family Atmosphere</span>
                </div>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="group relative bg-gradient-to-br from-red-50 to-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-3 duration-300 border-2 border-transparent hover:border-orange-200 overflow-hidden animation-delay-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500 opacity-5 rounded-full -mr-16 -mt-16 group-hover:opacity-10 transition-opacity"></div>
              <div className="relative">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all">
                  <FaHandHoldingHeart className="text-3xl text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                  Compassionate Care
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Dedicated staff trained to provide emotional support,
                  companionship, and genuine care with respect.
                </p>
                <div className="flex items-center gap-2 text-orange-600 font-semibold">
                  <FaCheckCircle className="text-sm" />
                  <span className="text-sm">Personal Attention</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Stats Banner */}
          <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div className="group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                  <FaAward className="text-3xl" />
                </div>
                <h4 className="text-4xl font-black mb-2">18+</h4>
                <p className="text-orange-100 font-semibold">
                  Years of Excellence
                </p>
              </div>
              <div className="group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                  <FaUsers className="text-3xl" />
                </div>
                <h4 className="text-4xl font-black mb-2">500+</h4>
                <p className="text-orange-100 font-semibold">Happy Residents</p>
              </div>
              <div className="group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                  <FaStethoscope className="text-3xl" />
                </div>
                <h4 className="text-4xl font-black mb-2">24/7</h4>
                <p className="text-orange-100 font-semibold">Medical Support</p>
              </div>
              <div className="group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                  <FaStar className="text-3xl" />
                </div>
                <h4 className="text-4xl font-black mb-2">4.9/5</h4>
                <p className="text-orange-100 font-semibold">Family Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-orange-50 via-red-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-white px-6 py-2 rounded-full font-semibold mb-4 shadow-lg hover:scale-105 transition-transform">
              <FaHeart className="text-orange-600" />
              <span className="text-orange-700">Our Values</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
              Our Core{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                Values
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do and shape the care we
              provide to our residents.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 transform hover:-translate-y-2 border border-gray-100"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl mb-6 transform hover:rotate-6 hover:scale-110 transition-all shadow-lg`}
                >
                  <value.icon className="text-3xl text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-6 py-2 rounded-full font-semibold mb-4 hover:scale-105 transition-transform">
              <FaUsers className="text-lg" />
              <span>Our Team</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
              Meet Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                Dedicated Team
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our experienced and compassionate professionals work tirelessly to
              ensure the best care for our residents.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-8 text-center transform hover:-translate-y-2 duration-300 border border-gray-100 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${member.color} rounded-full mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all`}
                >
                  <member.icon className="text-4xl text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-gray-600 font-medium mb-2">{member.role}</p>
                <p className="text-sm text-orange-600 font-semibold bg-orange-50 px-4 py-2 rounded-full inline-block">
                  {member.experience}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-slate-900 via-orange-900 to-red-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,146,60,0.1),transparent_70%)]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl px-6 py-3 rounded-full font-semibold mb-4 border border-white/20 hover:scale-105 transition-transform">
              <FaAward className="text-orange-300" />
              <span>Our Achievements</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
              Numbers That Speak for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-amber-300">
                Themselves
              </span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Numbers that reflect our commitment to excellence in senior care.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="text-center group cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full mb-4 shadow-lg group-hover:scale-110 transition-transform">
                  <achievement.icon className="text-2xl" />
                </div>
                <h3 className="text-3xl sm:text-4xl font-extrabold mb-2 bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                  {achievement.number}
                </h3>
                <p className="text-sm text-gray-300 font-medium">
                  {achievement.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-white to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-6 py-2 rounded-full font-semibold mb-4 hover:scale-105 transition-transform">
              <FaShieldAlt className="text-lg" />
              <span>Our Facilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
              World-Class{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                Facilities
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive amenities to ensure comfort, safety, and
              well-being.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((facility, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-white rounded-xl p-6 hover:shadow-lg transition-all transform hover:-translate-y-1 duration-300 border border-orange-100 hover:border-orange-300 group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <FaCheckCircle className="text-orange-600 text-xl mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <p className="text-gray-700 font-medium">{facility}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-orange-600 via-red-600 to-orange-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FaHeart className="text-7xl mx-auto mb-6 opacity-80 animate-pulse" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6">
            Experience the Difference Yourself
          </h2>
          <p className="text-lg sm:text-xl text-orange-100 max-w-3xl mx-auto mb-8">
            Visit us and see why families trust Shanti Hari Sudhanya Chand
            Vridhashram for their loved ones. Schedule a tour today and meet our
            caring team.
          </p>

          <NavLink
            to="/contact"
            className="group inline-flex items-center gap-3 bg-white text-orange-600 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl hover:shadow-white/20 transform hover:scale-105"
          >
            <span>Schedule a Visit</span>
            <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
          </NavLink>
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

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-400 {
          animation-delay: 400ms;
        }
      `}</style>
    </div>
  );
}

export default About;
