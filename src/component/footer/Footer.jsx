import React, { useState } from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Send,
  ChevronRight,
  Heart,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!email) {
      setError("Please enter your email address");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch('https://fileupload.friensys.com/api/Common/SaveWebsiteSubscriber', {
        method: 'POST',
        headers: {
          'accept': '*/*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          webSiteId: 1,
          emailId: email,
          tranDate: new Date().toISOString()
        })
      });

      const result = await response.json();

      if (response.ok && result.status) {
        setSubscribed(true);
        setEmail("");
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubscribed(false);
        }, 5000);
      } else {
        setError(result.message || "Failed to subscribe. Please try again.");
      }
    } catch (err) {
      console.error("Subscription error:", err);
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const footerLinks = {
    company: [
      { name: "About Us", href: "/about" },
      { name: "Our Team", href: "/about" },
      { name: "Gallery", href: "/gallery" },
      { name: "Blog", href: "/blog" },
      { name: "Events", href: "/events" },
    ],
    services: [
      { name: "Elder Care", href: "/about" },
      { name: "Medical Support", href: "/about" },
      { name: "Daily Activities", href: "/about" },
      { name: "Spiritual Care", href: "/about" },
      { name: "Counseling", href: "/about" },
    ],
    support: [
      { name: "Help Center", href: "/contact" },
      { name: "Contact Us", href: "/contact" },
      { name: "FAQ", href: "/contact" },
      { name: "Donate", href: "/donate" },
      { name: "Volunteer", href: "/contact" },
    ],
    legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
      { name: "Disclaimer", href: "#" },
      { name: "Licenses", href: "#" },
    ],
  };

  const socialPlatforms = [
    {
      icon: <Facebook className="w-5 h-5" />,
      name: "Facebook",
      followers: "5K+",
      path: "https://www.facebook.com/people/Shantiharinishulk-Vridhashram/pfbid0wRDtYkqpLMwp3uThktP8QpbnLnWCmADLqgbGfGdu1LhtNuxMnt2hh5TpqSzeLSV8l/",
    },
    {
      icon: <Twitter className="w-5 h-5" />,
      name: "Twitter",
      followers: "2K+",
      path: "#",
    },
    {
      icon: <Instagram className="w-5 h-5" />,
      name: "Instagram",
      followers: "8K+",
      path: "https://www.instagram.com/shantiharinishulkvridhashram?igsh=Y2J3MHM5bXlyendn",
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      name: "LinkedIn",
      followers: "3K+",
      path: "#",
    },
    {
      icon: <Youtube className="w-5 h-5" />,
      name: "YouTube",
      followers: "10K+",
      path: "https://www.youtube.com/@shantiharinishulkvridhashram",
    },
  ];

  const contactInfo = [
    { icon: <Phone className="w-5 h-5" />, text: "+91-73219 85911" },
    { icon: <Mail className="w-5 h-5" />, text: "shantiharivridhashram@gmail.com" },
    {
      icon: <MapPin className="w-5 h-5" />,
      text: "Barwat Sena, Areraj Road, Near Gorwa Tola, Bettiah West Champaran, Bihar 845438",
    },
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-950 text-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500 rounded-full blur-3xl"></div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 relative z-10">
        {/* Top Section - Newsletter */}
        <div className="bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 rounded-2xl p-8 mb-12 shadow-2xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-orange-50">
                Get updates about our events, activities, and how you can make a difference.
              </p>
            </div>
            <div>
              {subscribed ? (
                <div className="bg-white text-green-600 rounded-lg p-4 text-center font-semibold flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Successfully subscribed! Check your email.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError(""); // Clear error when user types
                      }}
                      placeholder="Enter your email"
                      className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                      disabled={loading}
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-all transform hover:scale-105 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span className="hidden sm:inline">Subscribing...</span>
                        </>
                      ) : (
                        <>
                          <span className="hidden sm:inline">Subscribe</span>
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                  {error && (
                    <div className="bg-red-500 bg-opacity-20 backdrop-blur-sm border border-red-300 text-white rounded-lg p-3 flex items-center gap-2 text-sm">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {/* Company Info */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-400 via-red-400 to-amber-400 bg-clip-text text-transparent">
                Shanti Hari Sudhanya Chand Vridhashram
              </h2>
              <p className="text-slate-400 mt-3 leading-relaxed">
                Dedicated to providing compassionate care and support for our elderly community. 
                Creating a home filled with love, dignity, and respect.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 text-slate-400 hover:text-orange-400 transition-colors group"
                >
                  <div className="mt-1 text-orange-500 group-hover:scale-110 transition-transform">{item.icon}</div>
                  <span className="text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-orange-400">Quick Links</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-orange-400 transition-colors flex items-center gap-1 group"
                  >
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-orange-500" />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-orange-400">Our Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-orange-400 transition-colors flex items-center gap-1 group"
                  >
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-orange-500" />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-orange-400">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-orange-400 transition-colors flex items-center gap-1 group"
                  >
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-orange-500" />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-orange-400">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-orange-400 transition-colors flex items-center gap-1 group"
                  >
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-orange-500" />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 my-8"></div>

        {/* Social Links */}
        <div className="bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 rounded-3xl p-8 text-white shadow-2xl">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Connect With Us</h3>
            <p className="text-orange-100">
              Join our community and stay updated with our mission
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {socialPlatforms.map((platform, index) => (
              <a
                key={index}
                href={platform.path}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-opacity-20 transition-all transform hover:scale-105 hover:shadow-xl border border-white/20"
              >
                <div className="flex justify-center mb-3">{platform.icon}</div>
                <p className="font-semibold mb-1">{platform.name}</p>
                <p className="text-sm text-orange-100">
                  {platform.followers} followers
                </p>
              </a>
            ))}
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mt-12 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-orange-500/20">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-6 h-6 text-red-500 fill-red-500" />
            <h3 className="text-xl font-bold text-orange-400">Our Mission</h3>
            <Heart className="w-6 h-6 text-red-500 fill-red-500" />
          </div>
          <p className="text-center text-slate-300 max-w-3xl mx-auto leading-relaxed">
            To provide a loving, safe, and dignified home for our elders, where they can live their golden years 
            with respect, care, and joy. Every donation and support helps us continue our mission of serving humanity.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-slate-950 py-6 relative z-10 border-t border-orange-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-400">
            <p className="flex items-center gap-2">
              © 2026 Shanti Hari Sudhanya Chand Vridhashram. 
              <span className="hidden sm:inline">All rights reserved.</span>
            </p>
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1">
                <span className="text-green-500">🔒</span> Secure
              </span>
              <span className="flex items-center gap-1">
                <span className="text-blue-500">✓</span> Verified
              </span>
              <span className="flex items-center gap-1">
                <Heart className="w-4 h-4 text-red-500 fill-red-500" /> Non-Profit
              </span>
            </div>
          </div>
          <p className="text-center text-xs text-slate-500 mt-3">
            Made with <Heart className="w-3 h-3 inline text-red-500 fill-red-500" /> for our beloved elders
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;