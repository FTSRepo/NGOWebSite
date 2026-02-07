import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  CheckCircle,
  MessageSquare,
  Users,
  Headphones,
  Calendar,
  Heart,
  Home,
  ArrowRight,
  User,
  Building,
  Loader2,
  AlertCircle,
} from "lucide-react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    relationship: "",
    visitDate: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [referenceId, setReferenceId] = useState("");

  const relationships = [
    "Son/Daughter",
    "Relative",
    "Friend",
    "Social Worker",
    "Healthcare Professional",
    "Other",
  ];

  const contactInfo = [
    {
      icon: <Phone className="w-7 h-7" />,
      title: "Call Us Anytime",
      primary: "+91-7321985911",
      secondary: "+91-9971673592",
      description: "Available 24/7 for emergencies",
      gradient: "from-orange-500 to-red-600",
      bgColor: "from-orange-50 to-red-50",
    },
    {
      icon: <Mail className="w-7 h-7" />,
      title: "Email Us",
      primary: "shantiharisudhanyachand@gmail.com",
      secondary: "Response within 24 hours",
      description: "We read every message",
      gradient: "from-red-500 to-orange-600",
      bgColor: "from-red-50 to-orange-50",
    },
    {
      icon: <MapPin className="w-7 h-7" />,
      title: "Visit Our Home",
      primary: "Barwat Sena, Areraj Road",
      secondary: "Bettiah, West Champaran, Bihar",
      description: "Near Gorwa Tola",
      gradient: "from-orange-600 to-red-600",
      bgColor: "from-orange-50 to-red-50",
    },
  ];

  const quickStats = [
    {
      number: "24/7",
      label: "Care Available",
      icon: <Clock className="w-8 h-8" />,
    },
    {
      number: "500+",
      label: "Happy Residents",
      icon: <Users className="w-8 h-8" />,
    },
    {
      number: "18+",
      label: "Years of Service",
      icon: <Heart className="w-8 h-8" />,
    },
    {
      number: "100%",
      label: "Family Satisfaction",
      icon: <CheckCircle className="w-8 h-8" />,
    },
  ];

  const visitingHours = [
    { day: "Monday - Friday", time: "9:00 AM - 6:00 PM" },
    { day: "Saturday", time: "10:00 AM - 4:00 PM" },
    { day: "Sunday", time: "10:00 AM - 2:00 PM" },
    { day: "Emergency Contact", time: "Available 24/7" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
    setApiError(""); // Clear API error when user starts typing
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\s+/g, '')))
      newErrors.phone = "Phone number must be 10 digits";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length !== 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setApiError("");

    try {
      // Prepare API payload
      const payload = {
        webSiteId: 1,
        fullName: formData.name,
        emailId: formData.email,
        mobile: formData.phone,
        message: formData.message,
        visitDate: formData.visitDate ? new Date(formData.visitDate).toISOString() : null,
        relation: formData.relationship || null,
        tranDate: new Date().toISOString()
      };

      console.log("Sending payload:", payload); // Debug log

      const response = await fetch('https://fileupload.friensys.com/api/Common/SaveContactDetails', {
        method: 'POST',
        headers: {
          'accept': '*/*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      
      console.log("API Response:", result); // Debug log

      if (result.status === true) {
        // Generate reference ID
        const refId = Math.random().toString(36).substr(2, 9).toUpperCase();
        setReferenceId(refId);
        setIsSubmitted(true);

        // Reset form after 8 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setReferenceId("");
          setFormData({
            name: "",
            email: "",
            phone: "",
            relationship: "",
            visitDate: "",
            message: "",
          });
        }, 8000);
      } else {
        setApiError(result.message || "Failed to submit inquiry. Please try again.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setApiError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-orange-900 to-red-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(251,146,60,0.3),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(239,68,68,0.2),transparent_50%)]"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl px-6 py-3 rounded-full mb-6 border border-white/20 hover:scale-105 transition-transform">
              <Heart className="w-5 h-5 text-orange-300 animate-pulse" />
              <span className="text-sm font-semibold">We're Here to Help</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 tracking-tight animate-slide-up">
              Get in Touch <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-amber-300">With Us</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-100 max-w-3xl mx-auto mb-10 animate-slide-up animation-delay-200">
              Have questions about our senior care services? Want to schedule a visit? 
              We'd love to hear from you and help find the best care for your loved ones.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-slide-up animation-delay-400">
              <a href="#contact-form" className="group inline-flex items-center justify-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-xl hover:scale-105">
                <MessageSquare className="w-5 h-5" />
                <span>Send a Message</span>
              </a>
              <a href="tel:+917321985911" className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-xl border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all">
                <Phone className="w-5 h-5" />
                <span>Call Now</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="relative -mt-16 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl p-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {quickStats.map((stat, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl mb-3 text-white group-hover:scale-110 transition-transform shadow-lg">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-1 group-hover:text-orange-600 transition-colors">{stat.number}</h3>
                <p className="text-sm text-gray-600 font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-6 py-2 rounded-full font-semibold mb-4 hover:scale-105 transition-transform">
            <Headphones className="w-4 h-4" />
            <span>Contact Information</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Multiple Ways to <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">Reach Us</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the method that's most convenient for you. We're always ready to assist.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className={`group relative bg-gradient-to-br ${info.bgColor} rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 duration-300 border-2 border-transparent hover:border-orange-200 overflow-hidden`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500 opacity-5 rounded-full -mr-16 -mt-16 group-hover:opacity-10 transition-opacity"></div>
              
              <div className="relative">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${info.gradient} rounded-2xl mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all`}>
                  {info.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors">
                  {info.title}
                </h3>
                
                <div className="space-y-2 mb-4">
                  <p className="text-lg font-bold text-gray-800">
                    {info.primary}
                  </p>
                  <p className="text-sm font-medium text-gray-600">
                    {info.secondary}
                  </p>
                </div>
                
                <p className="text-sm text-orange-600 font-semibold bg-orange-50 px-4 py-2 rounded-lg inline-block">
                  {info.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-12" id="contact-form">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-8 md:p-12 shadow-xl border-2 border-orange-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Send className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-extrabold text-gray-900">
                    Schedule a Visit
                  </h2>
                  <p className="text-gray-600">We'll respond within 24 hours</p>
                </div>
              </div>

              {isSubmitted ? (
                <div className="bg-white rounded-2xl p-8 md:p-12 text-center border-2 border-green-500 animate-fade-in">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                  </div>
                  <h3 className="text-3xl font-extrabold text-gray-900 mb-4">
                    Thank You for Reaching Out!
                  </h3>
                  <p className="text-lg text-gray-600 mb-6">
                    We've received your inquiry and our team will contact you shortly 
                    to discuss how we can help care for your loved one.
                  </p>
                  <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                    <p className="text-sm text-gray-700">
                      <strong>Reference ID:</strong> #{referenceId}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Please save this for your records
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* API Error Message */}
                  {apiError && (
                    <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                      <p className="text-red-700 text-sm font-semibold">{apiError}</p>
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                        <User className="w-4 h-4 text-orange-600" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={isLoading}
                        className={`w-full px-4 py-3 bg-white border-2 ${errors.name ? "border-red-500" : "border-gray-300"} rounded-xl focus:outline-none focus:border-orange-500 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed`}
                        placeholder="Enter your name"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1 font-semibold">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                        <Mail className="w-4 h-4 text-orange-600" />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isLoading}
                        className={`w-full px-4 py-3 bg-white border-2 ${errors.email ? "border-red-500" : "border-gray-300"} rounded-xl focus:outline-none focus:border-orange-500 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed`}
                        placeholder="your@email.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1 font-semibold">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                        <Phone className="w-4 h-4 text-orange-600" />
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={isLoading}
                        className={`w-full px-4 py-3 bg-white border-2 ${errors.phone ? "border-red-500" : "border-gray-300"} rounded-xl focus:outline-none focus:border-orange-500 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed`}
                        placeholder="9876543210"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1 font-semibold">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                        <Users className="w-4 h-4 text-orange-600" />
                        Your Relationship
                      </label>
                      <select
                        name="relationship"
                        value={formData.relationship}
                        onChange={handleChange}
                        disabled={isLoading}
                        className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl focus:outline-none focus:border-orange-500 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <option value="">Select relationship</option>
                        {relationships.map((rel, index) => (
                          <option key={index} value={rel}>{rel}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 text-orange-600" />
                      Preferred Visit Date
                    </label>
                    <input
                      type="date"
                      name="visitDate"
                      value={formData.visitDate}
                      onChange={handleChange}
                      disabled={isLoading}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl focus:outline-none focus:border-orange-500 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                      <MessageSquare className="w-4 h-4 text-orange-600" />
                      Your Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      disabled={isLoading}
                      rows="5"
                      className={`w-full px-4 py-3 bg-white border-2 ${errors.message ? "border-red-500" : "border-gray-300"} rounded-xl focus:outline-none focus:border-orange-500 transition-all resize-none shadow-sm disabled:opacity-50 disabled:cursor-not-allowed`}
                      placeholder="Tell us about your inquiry or the care you're looking for..."
                    />
                    {errors.message && (
                      <p className="text-red-500 text-xs mt-1 font-semibold">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="group w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-4 px-6 rounded-xl hover:from-orange-600 hover:to-red-700 transition-all transform hover:scale-105 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span className="text-lg">Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span className="text-lg">Submit Inquiry</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Visiting Hours */}
            <div className="bg-white border-2 border-orange-200 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-extrabold text-gray-900">
                  Visiting Hours
                </h3>
              </div>
              
              <div className="space-y-4">
                {visitingHours.map((schedule, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors"
                  >
                    <span className="text-sm font-bold text-gray-700">
                      {schedule.day}
                    </span>
                    <span className="text-sm font-semibold text-orange-600">
                      {schedule.time}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl text-white">
                <p className="text-sm font-semibold text-center">
                  💡 Call ahead to schedule a personal tour
                </p>
              </div>
            </div>

            {/* Quick Contact */}
            <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-3xl p-8 text-white shadow-xl">
              <Heart className="w-12 h-12 mb-4 animate-pulse" />
              <h3 className="text-2xl font-extrabold mb-3">
                Need Immediate Help?
              </h3>
              <p className="text-orange-100 mb-6">
                Our team is available 24/7 for emergencies and urgent inquiries.
              </p>
              <a
                href="tel:+917321985911"
                className="block w-full bg-white text-orange-600 font-bold py-3 px-4 rounded-xl hover:bg-gray-100 transition-all text-center shadow-lg"
              >
                Call Emergency Line
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="bg-gradient-to-b from-orange-50 to-red-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-white px-6 py-2 rounded-full font-semibold mb-4 shadow-lg hover:scale-105 transition-transform">
              <MapPin className="w-4 h-4 text-orange-600" />
              <span className="text-orange-700">Our Location</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Come Visit <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">Our Home</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We'd love to show you around and introduce you to our caring community
            </p>
          </div>

          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border-2 border-orange-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3565.5!2d84.5399107!3d26.7760777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDQ2JzMzLjkiTiA4NMKwMzInMjMuNyJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Shanti Hari Sudhanya Chand Vridhashram Location"
            ></iframe>

            <div className="p-8 text-center bg-gradient-to-r from-orange-50 to-red-50">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full mb-4 shadow-lg">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Shanti Hari Sudhanya Chand Vridhashram
              </h3>
              <p className="text-gray-700 font-semibold mb-1">
                Barwat Sena, Areraj Road, Near Gorwa Tola
              </p>
              <p className="text-gray-600 mb-6">
                Bettiah, West Champaran, Bihar 845438
              </p>

              <button
                onClick={() =>
                  window.open(
                    "https://www.google.com/maps/dir/?api=1&destination=26.7760777,84.5399107",
                    "_blank",
                  )
                }
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-xl font-bold hover:from-orange-600 hover:to-red-700 transition-all shadow-lg hover:scale-105"
              >
                <MapPin className="w-5 h-5" />
                Get Directions
              </button>
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

export default Contact;