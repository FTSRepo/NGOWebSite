import React, { useState } from "react";
import {
  Heart,
  Stethoscope,
  Utensils,
  Users,
  Home,
  Shield,
  Music,
  BookOpen,
  Activity,
  Flower2,
  Gift,
  HandHeart,
  TrendingUp,
  CheckCircle,
  Clock,
  DollarSign,
  Target,
  Award,
  Star,
  ChevronRight,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  Zap,
  Crown,
  MessageCircle,
} from "lucide-react";

const Causes = () => {

  const priorityCauses = [
    {
      id: 1,
      title: "Advanced Medical Care & Wellness",
      description:
        "Comprehensive geriatric healthcare including specialist consultations, regular health monitoring, physiotherapy, and 24/7 emergency medical support with trained nurses and doctors.",
      image:
        "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&h=600&fit=crop",
      icon: Stethoscope,
      goal: "$15,000",
      raised: "$9,200",
      progress: 61,
      supporters: 127,
      category: "Healthcare",
      color: "from-blue-500 to-cyan-500",
      impact: "Serves 150+ residents monthly",
    },
    {
      id: 2,
      title: "Nutritional Excellence Program",
      description:
        "Chef-prepared nutritious meals with personalized diet plans for diabetes, heart conditions, and special dietary needs. Fresh ingredients, balanced portions, and home-cooked taste.",
      image:
        "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=600&fit=crop",
      icon: Utensils,
      goal: "$8,000",
      raised: "$6,500",
      progress: 81,
      supporters: 89,
      category: "Nutrition",
      color: "from-green-500 to-emerald-500",
      impact: "12,000+ meals served monthly",
    },
    {
      id: 3,
      title: "Social Engagement & Activities",
      description:
        "Combating loneliness through daily group activities, cultural programs, art therapy, music sessions, yoga classes, and community celebrations to promote mental wellbeing.",
      image:
        "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&h=600&fit=crop",
      icon: Users,
      goal: "$5,000",
      raised: "$4,100",
      progress: 82,
      supporters: 65,
      category: "Wellness",
      color: "from-purple-500 to-pink-500",
      impact: "200+ activities monthly",
    },
    {
      id: 4,
      title: "Comfortable Living Spaces",
      description:
        "Maintaining and upgrading resident rooms with comfortable furnishing, air conditioning, modern amenities, safety features, and creating a home-like environment.",
      image:
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop",
      icon: Home,
      goal: "$12,000",
      raised: "$7,800",
      progress: 65,
      supporters: 102,
      category: "Infrastructure",
      color: "from-orange-500 to-red-500",
      impact: "80+ private rooms",
    },
    {
      id: 5,
      title: "Memory Care & Support",
      description:
        "Specialized care for residents with dementia and Alzheimer's, including cognitive therapy, memory exercises, patient engagement programs, and dedicated trained staff.",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&h=600&fit=crop",
      icon: Activity,
      goal: "$10,000",
      raised: "$5,600",
      progress: 56,
      supporters: 74,
      category: "Special Care",
      color: "from-indigo-500 to-purple-500",
      impact: "35+ residents receiving care",
    },
    {
      id: 6,
      title: "Emergency Fund Support",
      description:
        "Financial assistance for residents without family support, covering medical emergencies, essential medications, and ensuring no senior is denied care due to financial constraints.",
      image:
        "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&h=600&fit=crop",
      icon: Shield,
      goal: "$20,000",
      raised: "$11,400",
      progress: 57,
      supporters: 156,
      category: "Emergency",
      color: "from-rose-500 to-pink-500",
      impact: "Helps 40+ residents annually",
    },
  ];

  const impactStats = [
    {
      icon: Users,
      value: "500+",
      label: "Residents Supported",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Clock,
      value: "24/7",
      label: "Medical Assistance",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Utensils,
      value: "12K+",
      label: "Meals Served Monthly",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Award,
      value: "15+",
      label: "Years of Service",
      color: "from-purple-500 to-pink-500",
    },
  ];

  const donationTiers = [
    {
      amount: "$25",
      title: "Compassionate Friend",
      benefits: [
        "Provides meals for 5 seniors",
        "Monthly newsletter updates",
        "Tax deduction receipt",
      ],
      icon: Heart,
      color: "from-pink-500 to-rose-500",
    },
    {
      amount: "$100",
      title: "Guardian Angel",
      benefits: [
        "One week of medical supplies",
        "Recognition on donor wall",
        "Quarterly impact reports",
        "Invitation to events",
      ],
      icon: Crown,
      color: "from-blue-500 to-purple-500",
      popular: true,
    },
    {
      amount: "$500",
      title: "Lifetime Supporter",
      benefits: [
        "Sponsor a room upgrade",
        "Personalized thank you video",
        "Annual facility tour",
        "VIP event access",
        "Legacy recognition",
      ],
      icon: Sparkles,
      color: "from-yellow-500 to-orange-500",
    },
  ];

  const volunteerOpportunities = [
    {
      title: "Companionship Visits",
      description:
        "Spend quality time with residents, share stories, play games, or simply be a caring presence.",
      icon: Heart,
      time: "2-4 hours/week",
    },
    {
      title: "Activity Coordination",
      description:
        "Help organize arts, crafts, music sessions, or cultural programs that bring joy to our residents.",
      icon: Music,
      time: "Flexible schedule",
    },
    {
      title: "Reading & Education",
      description:
        "Read books, newspapers, or teach new skills like technology, languages, or hobbies.",
      icon: BookOpen,
      time: "1-3 hours/week",
    },
    {
      title: "Garden Maintenance",
      description:
        "Maintain our beautiful gardens, help residents with therapeutic gardening activities.",
      icon: Flower2,
      time: "Weekends",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1531058020387-3be344556be6?w=1600&h=900&fit=crop"
          className="absolute inset-0 w-full h-full object-cover"
          alt="Senior care"
        />
        <div className="relative z-20 text-white px-4 max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/30">
              <Heart className="w-5 h-5" />
              <span className="text-sm font-bold">Make a Difference Today</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              Empowering Their{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
                Golden Years
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
              Every senior deserves to live with dignity, joy, and the
              comprehensive care they've earned. Join us in creating meaningful
              impact in their lives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-xl hover:scale-105">
                <HandHeart className="w-5 h-5" />
                <span>Support a Cause</span>
              </button>
              <button className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all">
                <Users className="w-5 h-5" />
                <span>Volunteer With Us</span>
              </button>
            </div>
          </div>
        </div>

        {/* Decorative gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent z-20"></div>
      </section>

      {/* Impact Stats */}
      <section className="relative -mt-20 z-30 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {impactStats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2"
              >
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-4 mx-auto`}
                >
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-center">
                  <div className="text-4xl font-black text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Priority Causes */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4">
              <Target className="w-4 h-4" />
              <span className="text-sm font-bold">
                Our Priority Initiatives
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Where Your Support Makes Impact
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose a cause that resonates with you and help us continue
              providing exceptional care to our beloved seniors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {priorityCauses.map((cause, index) => (
              <div
                key={cause.id}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-gray-100 hover:border-blue-300 group"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={cause.image}
                    alt={cause.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                    <div
                      className={`bg-gradient-to-r ${cause.color} text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg`}
                    >
                      {cause.category}
                    </div>
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-900">
                      {cause.supporters} supporters
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${cause.color} rounded-xl flex items-center justify-center mb-4`}
                  >
                    <cause.icon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {cause.title}
                  </h3>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {cause.description}
                  </p>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        Raised: {cause.raised}
                      </span>
                      <span>Goal: {cause.goal}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${cause.color} rounded-full transition-all duration-500`}
                        style={{ width: `${cause.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {cause.progress}% funded
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <Zap className="w-4 h-4 text-blue-600" />
                      <span className="font-bold">Impact:</span>
                      <span>{cause.impact}</span>
                    </div>
                  </div>

                  <button
                    className={`w-full bg-gradient-to-r ${cause.color} text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2 group-hover:gap-3`}
                  >
                    <DollarSign className="w-5 h-5" />
                    <span>Donate Now</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Tiers */}
      <section className="py-16 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 text-white">
            <h2 className="text-4xl font-black mb-4">
              Choose Your Impact Level
            </h2>
            <p className="text-xl text-blue-100">
              Every contribution makes a meaningful difference
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {donationTiers.map((tier, index) => (
              <div
                key={index}
                className={`bg-white rounded-3xl p-8 shadow-2xl transition-all hover:-translate-y-2 ${
                  tier.popular ? "ring-4 ring-yellow-400 scale-105" : ""
                }`}
              >
                {tier.popular && (
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold inline-block mb-4">
                    ⭐ Most Popular
                  </div>
                )}
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${tier.color} rounded-2xl flex items-center justify-center mb-4`}
                >
                  <tier.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-5xl font-black text-gray-900 mb-2">
                  {tier.amount}
                </div>
                <div className="text-xl font-bold text-gray-700 mb-6">
                  {tier.title}
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full bg-gradient-to-r ${tier.color} text-white py-4 rounded-xl font-bold hover:shadow-lg transition-all`}
                >
                  Select This Tier
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Opportunities */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-4">
              <Users className="w-4 h-4" />
              <span className="text-sm font-bold">Volunteer Programs</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Give Your Time, Share Your Heart
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Beyond financial support, our residents cherish companionship and
              engagement. Volunteer and make lasting connections.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {volunteerOpportunities.map((opportunity, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-200 hover:border-purple-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                  <opportunity.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {opportunity.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {opportunity.description}
                </p>
                <div className="flex items-center gap-2 text-sm text-purple-600 font-medium">
                  <Clock className="w-4 h-4" />
                  <span>{opportunity.time}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all hover:scale-105">
              <Heart className="w-5 h-5" />
              <span>Apply to Volunteer</span>
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-purple-900 to-pink-900"></div>
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-md rounded-full mb-6 border-4 border-white/30">
            <Gift className="w-10 h-10" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Want to Donate Goods or Supplies?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
            We welcome donations of clothing, books, medical supplies, and daily
            essentials. Every contribution helps create a better life for our
            residents.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <Phone className="w-8 h-8 mx-auto mb-3" />
              <div className="font-bold mb-1">Call Us</div>
              <div className="text-sm text-blue-100">+91-9971673592</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <Mail className="w-8 h-8 mx-auto mb-3" />
              <div className="font-bold mb-1">Email Us</div>
              <div className="text-sm text-blue-100">care@shantihari.org</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <MapPin className="w-8 h-8 mx-auto mb-3" />
              <div className="font-bold mb-1">Visit Us</div>
              <div className="text-sm text-blue-100">Patna, Bihar, India</div>
            </div>
          </div>

          <button className="inline-flex items-center gap-3 bg-white text-blue-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl hover:scale-105">
            <MessageCircle className="w-5 h-5" />
            <span>Get In Touch</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Causes;
