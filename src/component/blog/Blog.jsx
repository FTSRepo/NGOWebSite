import React, { useState } from 'react';
import { Calendar, Heart, Users, Home, ArrowRight, Clock, User, BookOpen, Star, Zap, Shield, Activity, Award, MessageCircle, TrendingUp } from 'lucide-react';

function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const featuredPost = {
    id: 'featured',
    title: "Revolutionizing Elder Care: A Holistic Approach to Senior Wellbeing",
    excerpt: "Exploring innovative methods that combine traditional care with modern wellness practices to enhance the quality of life for seniors in residential care facilities.",
    category: "Featured",
    author: "Dr. Margaret Chen",
    date: "January 20, 2026",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?w=1200&h=600&fit=crop"
  };

  const blogPosts = [
    {
      id: 1,
      title: "The Science Behind Memory Care: Understanding Dementia and Alzheimer's",
      excerpt: "A comprehensive guide to understanding cognitive decline and implementing effective memory care strategies that preserve dignity and promote mental engagement.",
      category: "Health",
      author: "Dr. Sarah Mitchell",
      date: "January 18, 2026",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&h=500&fit=crop",
      tags: ["Memory Care", "Alzheimer's", "Brain Health"]
    },
    {
      id: 2,
      title: "Building Meaningful Connections: Social Programs That Transform Lives",
      excerpt: "Discover how structured social programs, intergenerational activities, and community partnerships create vibrant, engaging environments for elderly residents.",
      category: "Wellness",
      author: "Emily Rodriguez",
      date: "January 16, 2026",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=800&h=500&fit=crop",
      tags: ["Social Activities", "Community", "Mental Health"]
    },
    {
      id: 3,
      title: "Nutrition After 65: Creating Meal Plans for Optimal Health",
      excerpt: "Expert nutritionists share insights on designing balanced, appetizing meals that address age-related dietary needs, chronic conditions, and individual preferences.",
      category: "Nutrition",
      author: "Chef Maria Thompson",
      date: "January 14, 2026",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=500&fit=crop",
      tags: ["Diet", "Healthy Eating", "Meal Planning"]
    },
    {
      id: 4,
      title: "Physical Therapy for Seniors: Maintaining Mobility and Independence",
      excerpt: "Learn about gentle exercise programs, physical therapy techniques, and adaptive equipment that help seniors maintain strength, balance, and autonomy.",
      category: "Fitness",
      author: "Dr. James Peterson",
      date: "January 12, 2026",
      readTime: "9 min read",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=500&fit=crop",
      tags: ["Exercise", "Mobility", "Physical Therapy"]
    },
    {
      id: 5,
      title: "Technology in Elder Care: Smart Solutions for Safety and Comfort",
      excerpt: "Exploring how wearable devices, monitoring systems, and assistive technologies enhance safety while respecting privacy and promoting independence.",
      category: "Technology",
      author: "Tech Specialist David Kim",
      date: "January 10, 2026",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&h=500&fit=crop",
      tags: ["Smart Tech", "Safety", "Innovation"]
    },
    {
      id: 6,
      title: "Emotional Support and Mental Health: Breaking the Stigma",
      excerpt: "Addressing depression, anxiety, and isolation in elderly care with compassionate counseling services, support groups, and mindfulness practices.",
      category: "Mental Health",
      author: "Counselor Lisa Anderson",
      date: "January 8, 2026",
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=500&fit=crop",
      tags: ["Mental Wellness", "Counseling", "Support"]
    },
    {
      id: 7,
      title: "Creating Home-Like Environments: Interior Design for Senior Living",
      excerpt: "Design principles that transform institutional spaces into warm, familiar environments that promote comfort, safety, and a sense of belonging.",
      category: "Design",
      author: "Interior Designer Rachel Green",
      date: "January 6, 2026",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1556910110-a5a63dfd393c?w=800&h=500&fit=crop",
      tags: ["Interior Design", "Comfort", "Safety"]
    },
    {
      id: 8,
      title: "Family Involvement: Strengthening Bonds Across Generations",
      excerpt: "Practical strategies for families to stay connected with their loved ones, participate in care decisions, and maintain meaningful relationships.",
      category: "Family",
      author: "Family Therapist Michael Brown",
      date: "January 4, 2026",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&h=500&fit=crop",
      tags: ["Family Bonds", "Communication", "Support"]
    },
    {
      id: 9,
      title: "End-of-Life Care: Providing Dignity and Compassion",
      excerpt: "Sensitive approaches to palliative and hospice care that honor individual wishes while providing comfort and support to both residents and families.",
      category: "Palliative Care",
      author: "Dr. Catherine Williams",
      date: "January 2, 2026",
      readTime: "11 min read",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=500&fit=crop",
      tags: ["Hospice", "Dignity", "Compassion"]
    }
  ];

  const categories = ['all', 'Health', 'Wellness', 'Nutrition', 'Fitness', 'Technology', 'Mental Health', 'Design', 'Family', 'Palliative Care'];

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const stats = [
    { icon: BookOpen, value: "150+", label: "Expert Articles" },
    { icon: Users, value: "50K+", label: "Monthly Readers" },
    { icon: Star, value: "4.9/5", label: "Reader Rating" },
    { icon: Award, value: "25+", label: "Care Experts" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern Hero Section with Overlay */}
      <div className="relative bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-24">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-12 h-1 bg-yellow-400"></div>
              <span className="text-yellow-300 font-semibold tracking-wider uppercase text-sm">Expert Insights & Care Resources</span>
            </div>
            <h1 className="text-6xl font-bold mb-6 leading-tight">
              Empowering Better Care for Our Beloved Seniors
            </h1>
            <p className="text-xl text-teal-50 mb-8 leading-relaxed">
              Your trusted source for evidence-based care strategies, heartwarming stories, and practical guidance on creating fulfilling lives for elderly residents in care homes.
            </p>
            <div className="flex gap-4">
              <button className="bg-white text-teal-700 px-8 py-4 rounded-lg font-bold hover:bg-yellow-300 hover:text-teal-900 transition-all shadow-lg">
                Explore Articles
              </button>
              <button className="border-2 border-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-teal-700 transition-all">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-3">
                  <stat.icon className="w-8 h-8 text-teal-600" />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Article */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center gap-3 mb-8">
          <Zap className="w-6 h-6 text-yellow-500" />
          <h2 className="text-2xl font-bold text-gray-800">Featured Story</h2>
        </div>
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow">
          <div className="grid md:grid-cols-2">
            <div className="aspect-[4/3] md:aspect-auto">
              <img 
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-10 flex flex-col justify-center">
              <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4 self-start">
                ⭐ Featured Article
              </div>
              <h3 className="text-3xl font-bold mb-4 text-gray-800 leading-tight">
                {featuredPost.title}
              </h3>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                {featuredPost.excerpt}
              </p>
              <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {featuredPost.author}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {featuredPost.readTime}
                </div>
              </div>
              <button className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-8 py-4 rounded-xl font-bold hover:from-teal-700 hover:to-cyan-700 transition-all flex items-center gap-2 self-start shadow-lg">
                Read Full Article <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Gallery Section */}
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Video Resources</h2>
            <p className="text-gray-600 text-lg">Watch our expert-led tutorials and inspiring resident stories</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Daily Care Routines", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=400&fit=crop" },
              { title: "Exercise Programs", img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop" },
              { title: "Arts & Crafts Activities", img: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&h=400&fit=crop" }
            ].map((video, idx) => (
              <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow group cursor-pointer">
                <div className="aspect-video relative overflow-hidden">
                  <img src={video.img} alt={video.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <div className="w-0 h-0 border-t-8 border-t-transparent border-l-14 border-l-teal-600 border-b-8 border-b-transparent ml-1"></div>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-800">{video.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Filter with Modern Design */}
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Browse by Category</h2>
        <div className="flex gap-3 flex-wrap">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow hover:shadow-md'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Posts Grid with Modern Cards */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <article key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2 duration-300 group">
              <div className="aspect-video overflow-hidden bg-gray-200 relative">
                <img 
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white text-teal-700 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-teal-600 transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <User className="w-3 h-3" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <button className="mt-4 text-teal-600 font-bold hover:text-teal-700 flex items-center gap-2 group-hover:gap-3 transition-all text-sm">
                  Continue Reading <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Benefits Section with Icons */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Pillars of Quality Senior Care</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Our comprehensive approach ensures every aspect of wellbeing is addressed with compassion and expertise
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Heart, title: "Emotional Support", desc: "Compassionate care that nurtures mental and emotional wellbeing through personalized attention and meaningful engagement.", color: "from-pink-500 to-rose-500" },
              { icon: Shield, title: "Safety First", desc: "State-of-the-art safety measures and monitoring systems that protect residents while maintaining their dignity and independence.", color: "from-blue-500 to-indigo-500" },
              { icon: Activity, title: "Active Lifestyle", desc: "Tailored fitness programs and activities that promote physical health, mobility, and social connection among residents.", color: "from-green-500 to-emerald-500" },
              { icon: TrendingUp, title: "Continuous Improvement", desc: "Regular assessments and care plan updates ensure evolving needs are met with the highest standards of quality.", color: "from-purple-500 to-violet-500" }
            ].map((item, idx) => (
              <div key={idx} className="group hover:scale-105 transition-transform">
                <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow h-full border border-gray-100">
                  <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gradient-to-br from-teal-50 to-cyan-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">What Families Are Saying</h2>
            <p className="text-gray-600 text-lg">Real experiences from families who trust us with their loved ones</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Jennifer Martinez", relation: "Daughter", text: "The care my mother receives here is exceptional. The staff treats her like family, and I can see the joy in her eyes during our visits." },
              { name: "Robert Thompson", relation: "Son", text: "I was nervous about the transition, but the team made it seamless. Dad is more active and social now than he's been in years." },
              { name: "Susan Lee", relation: "Granddaughter", text: "Grandma loves the activities and has made wonderful friends. It's comforting knowing she's in such caring hands." }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg">
                <MessageCircle className="w-10 h-10 text-teal-600 mb-4" />
                <p className="text-gray-700 italic mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-gray-800">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.relation}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter CTA with Modern Design */}
      <div className="relative bg-gradient-to-br from-teal-700 via-cyan-700 to-blue-800 py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '30px 30px'
          }}></div>
        </div>
        <div className="relative max-w-4xl mx-auto text-center text-white">
          <div className="inline-block bg-yellow-400 text-teal-900 px-4 py-2 rounded-full text-sm font-bold mb-6">
            📧 Join Our Community
          </div>
          <h2 className="text-5xl font-bold mb-6">Stay Informed, Stay Connected</h2>
          <p className="text-xl text-teal-50 mb-10 leading-relaxed max-w-2xl mx-auto">
            Get weekly insights, care tips, and inspiring stories delivered straight to your inbox. Join thousands of families committed to exceptional senior care.
          </p>
          <div className="flex gap-4 max-w-lg mx-auto mb-6">
            <input 
              type="email" 
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 rounded-xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-yellow-400 shadow-lg text-lg"
            />
            <button className="bg-yellow-400 text-teal-900 px-8 py-4 rounded-xl font-bold hover:bg-yellow-300 transition-all shadow-lg hover:shadow-xl">
              Subscribe
            </button>
          </div>
          <p className="text-teal-200 text-sm">🔒 Your privacy is protected. Unsubscribe anytime.</p>
        </div>
      </div>

      {/* Footer Section */}
      <div className="bg-gray-900 text-gray-300 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Heart className="w-6 h-6 text-teal-400" />
            <span className="text-2xl font-bold text-white">Senior Care Chronicles</span>
          </div>
          <p className="text-gray-400 mb-6">Dedicated to improving lives through compassionate care and expert guidance</p>
          <div className="text-sm text-gray-500">
            © 2026 Old Age Home Care Blog. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;