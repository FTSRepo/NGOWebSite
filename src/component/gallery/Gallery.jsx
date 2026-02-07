import React, { useState, useEffect } from 'react';
import { 
  X, ChevronLeft, ChevronRight, Heart, Maximize2, Star, Quote,
  Grid, List, Camera, Home, Users, PartyPopper, Activity, 
  Stethoscope, Clock, Award, Shield, Utensils, Flower2, Brain,
  Dumbbell, Smartphone, Music, Book, Coffee, MapPin, Phone,
  Mail, Calendar, TrendingUp, CheckCircle, Play, Image as ImageIcon,
  Gamepad2
} from 'lucide-react';

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [isLoading, setIsLoading] = useState(true);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [galleryData, setGalleryData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  const schoolId = 1001; // You can make this dynamic based on your needs
  const tagName = 'galary'; // Main tag for gallery images

  // Icon mapping for different category types (you can customize this)
  const getCategoryIcon = (tagName) => {
    const lowerTag = tagName.toLowerCase();
    if (lowerTag.includes('event') || lowerTag.includes('celebration')) return PartyPopper;
    if (lowerTag.includes('facilit')) return Home;
    if (lowerTag.includes('food') || lowerTag.includes('dining') || lowerTag.includes('court')) return Utensils;
    if (lowerTag.includes('garden') || lowerTag.includes('outdoor')) return Flower2;
    if (lowerTag.includes('game') || lowerTag.includes('indoor') || lowerTag.includes('activity')) return Gamepad2;
    if (lowerTag.includes('test')) return Camera;
    return ImageIcon; // Default icon
  };

  // Color gradient mapping for categories
  const getCategoryGradient = (index) => {
    const gradients = [
      'from-orange-500 to-red-500',
      'from-red-500 to-pink-500',
      'from-orange-600 to-amber-600',
      'from-amber-500 to-yellow-500',
      'from-green-500 to-emerald-500',
      'from-red-600 to-orange-600',
      'from-yellow-500 to-orange-500',
      'from-purple-500 to-pink-500',
      'from-blue-500 to-indigo-500',
      'from-teal-500 to-cyan-500',
    ];
    return gradients[index % gradients.length];
  };

  // Fetch gallery images from API
  useEffect(() => {
    const fetchGalleryImages = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch(
          `https://fileupload.friensys.com/api/Image/getImages/${tagName}/${schoolId}`,
          {
            method: 'GET',
            headers: {
              'accept': '*/*'
            }
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }

        const result = await response.json();

        if (result.statusCode === 200 && result.data) {
          // Process the data to create gallery structure
          const processedData = result.data.map((category, categoryIndex) => ({
            tag: category.tag,
            images: category.imageList.map((imageUrl, imageIndex) => ({
              id: `${categoryIndex}-${imageIndex}`,
              url: imageUrl,
              title: category.tag,
              category: category.tag,
              description: `Image from ${category.tag}`,
              featured: imageIndex === 0 // Make first image of each category featured
            }))
          }));

          setGalleryData(processedData);

          // Create categories dynamically
          const allCategories = [
            { 
              id: 'all', 
              name: 'All Photos', 
              count: processedData.reduce((sum, cat) => sum + cat.images.length, 0), 
              icon: Camera, 
              gradient: 'from-orange-500 to-red-500' 
            },
            ...processedData.map((cat, index) => ({
              id: cat.tag,
              name: cat.tag,
              count: cat.images.length,
              icon: getCategoryIcon(cat.tag),
              gradient: getCategoryGradient(index)
            }))
          ];

          setCategories(allCategories);
        } else {
          throw new Error(result.message || 'Failed to fetch images');
        }
      } catch (err) {
        console.error('Error fetching gallery images:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGalleryImages();
  }, []);

  // Testimonial auto-rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      name: 'Mr. Rajesh Kumar',
      relation: 'Son',
      location: 'Delhi, India',
      text: 'My father has been living here for 2 years. The care is exceptional, and the staff treats him like family. They celebrate every festival, and he has made wonderful friends. I am so grateful we found this place.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    },
    {
      name: 'Mrs. Priya Sharma',
      relation: 'Daughter',
      location: 'Noida, India',
      text: 'My mother is incredibly happy here. The food is just like home cooking, and the medical care gives us complete peace of mind. The activities keep her engaged and joyful every day.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    },
    {
      name: 'Mr. Amit Patel',
      relation: 'Nephew',
      location: 'Ghaziabad, India',
      text: 'The facilities are outstanding. Doctors are always available, and the environment is peaceful and secure. My uncle enjoys the yoga sessions and game activities immensely.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    },
    {
      name: 'Mrs. Sunita Verma',
      relation: 'Daughter-in-law',
      location: 'Gurugram, India',
      text: 'Finding this care home was a blessing. The staff goes above and beyond to make residents feel valued. The cleanliness is impeccable, and the community atmosphere is wonderful.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    },
  ];

  const stats = [
    { icon: Award, value: '15+', label: 'Years of Excellence', color: 'from-orange-500 to-red-500' },
    { icon: Users, value: '500+', label: 'Happy Residents', color: 'from-red-500 to-pink-500' },
    { icon: Heart, value: '100+', label: 'Care Professionals', color: 'from-amber-500 to-orange-500' },
    { icon: Star, value: '4.9', label: 'Average Rating', color: 'from-yellow-500 to-orange-500' },
  ];

  const features = [
    { icon: Heart, title: 'Compassionate Care', desc: 'Personalized attention with love and respect', color: 'from-red-500 to-pink-500' },
    { icon: Stethoscope, title: '24/7 Medical Support', desc: 'Doctors and nurses always available', color: 'from-orange-500 to-amber-500' },
    { icon: Utensils, title: 'Nutritious Meals', desc: 'Chef-prepared healthy and delicious food', color: 'from-amber-500 to-yellow-500' },
    { icon: Shield, title: 'Safe Environment', desc: 'Secure premises with round-the-clock monitoring', color: 'from-red-600 to-orange-600' },
    { icon: Gamepad2, title: 'Engaging Activities', desc: 'Daily programs preventing isolation and loneliness', color: 'from-orange-600 to-red-600' },
    { icon: Flower2, title: 'Beautiful Spaces', desc: 'Gardens and comfortable living areas', color: 'from-green-500 to-emerald-500' },
  ];

  // Get all images from gallery data
  const getAllImages = () => {
    return galleryData.flatMap(category => category.images);
  };

  // Filter images based on active category
  const filteredImages = activeCategory === 'all' 
    ? getAllImages()
    : galleryData.find(cat => cat.tag === activeCategory)?.images || [];

  const handleCategoryChange = (categoryId) => {
    setIsLoading(true);
    setActiveCategory(categoryId);
    setTimeout(() => setIsLoading(false), 400);
  };

  const openLightbox = (image) => setSelectedImage(image);
  const closeLightbox = () => setSelectedImage(null);

  const navigateImage = (direction) => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % filteredImages.length 
      : currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
    setSelectedImage(filteredImages[newIndex]);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!selectedImage) return;
      if (e.key === 'ArrowRight') navigateImage('next');
      if (e.key === 'ArrowLeft') navigateImage('prev');
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-red-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-600 via-orange-600 to-amber-600 text-white py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full mb-8 border border-white/30 shadow-lg">
              <ImageIcon className="w-5 h-5" />
              <span className="text-sm font-bold tracking-wide">PHOTO GALLERY</span>
            </div>
            
            <h1 className="text-5xl sm:text-7xl font-black mb-6 leading-tight">
              Life at Our<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-300 to-white">
                Care Home
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-orange-100 mb-10 leading-relaxed max-w-3xl mx-auto">
              Discover the warmth, care, and vibrant community that makes our senior living facility a true home away from home
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setShowVideo(true)}
                className="inline-flex items-center gap-3 bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl hover:scale-105"
              >
                <Play className="w-5 h-5" />
                <span>Watch Virtual Tour</span>
              </button>
              <a
                href="#gallery"
                className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all"
              >
                <Camera className="w-5 h-5" />
                <span>Explore Gallery</span>
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </section>

      {/* Stats Section */}
      <section className="relative -mt-20 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 border border-orange-100">
                <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-4 mx-auto shadow-lg`}>
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-center">
                  <div className="text-4xl font-black text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full mb-4 font-semibold text-sm">
              <Shield className="w-4 h-4" />
              Why Choose Us
            </div>
            <h2 className="text-4xl font-black text-gray-900 mb-4">Excellence in Senior Care</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Creating a nurturing environment where seniors thrive</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group hover:scale-105 transition-transform duration-300">
                <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 h-full">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section id="gallery" className="bg-white/95 backdrop-blur-xl border-y border-gray-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`group relative px-5 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                    activeCategory === category.id
                      ? `bg-gradient-to-r ${category.gradient} text-white shadow-xl scale-105`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <category.icon className="w-5 h-5" />
                    <span className="hidden sm:inline">{category.name}</span>
                    <span className="sm:hidden">{category.name.split(' ')[0]}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      activeCategory === category.id ? 'bg-white/30' : 'bg-gray-300 text-gray-700'
                    }`}>
                      {category.count}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1.5 border border-gray-300 shadow-sm">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-lg transition-all ${
                  viewMode === 'grid' 
                    ? 'bg-white text-orange-600 shadow-md' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('masonry')}
                className={`p-3 rounded-lg transition-all ${
                  viewMode === 'masonry' 
                    ? 'bg-white text-orange-600 shadow-md' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-gradient-to-br from-gray-50 via-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {error ? (
            <div className="flex flex-col items-center justify-center py-32">
              <div className="bg-red-100 border border-red-400 text-red-700 px-8 py-6 rounded-xl mb-4">
                <p className="font-bold text-lg mb-2">Error Loading Gallery</p>
                <p>{error}</p>
              </div>
              <button 
                onClick={() => window.location.reload()}
                className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
              >
                Retry
              </button>
            </div>
          ) : isLoading ? (
            <div className="flex flex-col items-center justify-center py-32">
              <div className="relative mb-6">
                <div className="w-24 h-24 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
                <ImageIcon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-orange-600 w-10 h-10" />
              </div>
              <p className="text-gray-600 text-lg font-medium">Loading gallery...</p>
            </div>
          ) : filteredImages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32">
              <Camera className="w-24 h-24 text-gray-300 mb-4" />
              <p className="text-gray-600 text-lg font-medium">No images found in this category</p>
            </div>
          ) : (
            <>
              <div className="text-center mb-10">
                <h2 className="text-3xl font-black text-gray-900 mb-2">
                  {activeCategory === 'all' ? 'All Photos' : activeCategory}
                </h2>
                <p className="text-gray-600">Showing {filteredImages.length} {filteredImages.length === 1 ? 'photo' : 'photos'}</p>
              </div>

              <div className={viewMode === 'grid' 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
                : "columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
              }>
                {filteredImages.map((image) => (
                  <div
                    key={image.id}
                    onClick={() => openLightbox(image)}
                    className={`group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border-2 border-gray-100 hover:border-orange-300 ${
                      viewMode === 'masonry' ? 'break-inside-avoid' : ''
                    }`}
                  >
                    <div className={viewMode === 'grid' ? "aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200" : "overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200"}>
                      <img
                        src={image.url}
                        alt={image.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-white font-bold text-lg mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          {image.title}
                        </h3>
                        <p className="text-gray-200 text-sm leading-relaxed transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                          {image.description}
                        </p>
                      </div>

                      <div className="absolute top-4 right-4">
                        <div className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30 transform scale-0 group-hover:scale-100 transition-transform duration-300 shadow-lg">
                          <Maximize2 className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </div>

                    {image.featured && (
                      <div className="absolute top-4 left-4">
                        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-2 border border-white/20">
                          <Star className="w-4 h-4 fill-white" />
                          <span>Featured</span>
                        </div>
                      </div>
                    )}

                    <div className="p-4 bg-gradient-to-br from-white to-gray-50">
                      <h4 className="font-bold text-gray-900 text-base mb-1 truncate">{image.title}</h4>
                      <p className="text-gray-600 text-xs line-clamp-2">{image.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full mb-4 font-semibold text-sm">
              <Heart className="w-4 h-4" />
              Testimonials
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">Loved by Families</h2>
            <p className="text-xl text-gray-600">Real experiences from families who trust us with their loved ones</p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-orange-50 via-red-50 to-amber-50 rounded-3xl shadow-2xl p-8 sm:p-12 relative border-2 border-orange-200">
              <Quote className="absolute top-8 left-8 w-16 h-16 text-orange-200 opacity-50" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-6 mb-6">
                  <img
                    src={testimonials[activeTestimonial].image}
                    alt={testimonials[activeTestimonial].name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-orange-500 shadow-lg"
                  />
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900">
                      {testimonials[activeTestimonial].name}
                    </h4>
                    <p className="text-gray-600 flex items-center gap-2 mt-1">
                      <Users className="w-4 h-4" />
                      {testimonials[activeTestimonial].relation}
                    </p>
                    <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                      <MapPin className="w-4 h-4" />
                      {testimonials[activeTestimonial].location}
                    </p>
                  </div>
                </div>

                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>

                <p className="text-lg text-gray-700 leading-relaxed italic">
                  "{testimonials[activeTestimonial].text}"
                </p>
              </div>

              <div className="flex justify-center gap-3 mt-10">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`h-3 rounded-full transition-all ${
                      index === activeTestimonial
                        ? 'bg-orange-600 w-12'
                        : 'bg-gray-300 hover:bg-gray-400 w-3'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-6xl mx-auto">
            {testimonials.slice(0, 3).map((testimonial, idx) => (
              <div key={idx} className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic text-sm line-clamp-3">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover border-2 border-orange-300" />
                  <div>
                    <div className="font-bold text-sm text-gray-900">{testimonial.name}</div>
                    <div className="text-xs text-gray-500">{testimonial.relation}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-r from-red-600 via-orange-600 to-amber-600">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '30px 30px'
          }}></div>
        </div>

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/2 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-md rounded-full mb-8 border-4 border-white/30 shadow-2xl">
            <Heart className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-white mb-6">
            Visit Us Today
          </h2>
          <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed">
            See for yourself the warmth, care, and community spirit that makes us special. Schedule your personal tour and meet our family!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl hover:scale-105"
            >
              <Calendar className="w-5 h-5" />
              <span>Schedule a Visit</span>
            </a>
            <a
              href="tel:+917321985911"
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all"
            >
              <Phone className="w-5 h-5" />
              <span>Call: +91-73219 85911</span>
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/98 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-6 z-10">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div>
                <h2 className="text-white text-2xl font-bold">{selectedImage.title}</h2>
                <p className="text-gray-300 text-sm mt-1">{selectedImage.description}</p>
              </div>
              <button
                onClick={closeLightbox}
                className="text-white hover:text-gray-300 transition-colors bg-white/10 backdrop-blur-md p-3 rounded-full hover:bg-white/20"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <button
            onClick={() => navigateImage('prev')}
            className="absolute left-6 text-white hover:text-gray-300 transition-all bg-white/10 backdrop-blur-md p-4 rounded-full hover:bg-white/20 hover:scale-110 z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => navigateImage('next')}
            className="absolute right-6 text-white hover:text-gray-300 transition-all bg-white/10 backdrop-blur-md p-4 rounded-full hover:bg-white/20 hover:scale-110 z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <img
            src={selectedImage.url}
            alt={selectedImage.title}
            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
          />

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 z-10">
            <div className="max-w-7xl mx-auto flex items-center justify-center gap-4">
              <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full text-white text-sm font-medium border border-white/20">
                {filteredImages.findIndex(img => img.id === selectedImage.id) + 1} / {filteredImages.length}
              </div>
              {selectedImage.featured && (
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-2 rounded-full text-white text-sm font-bold flex items-center gap-2">
                  <Star className="w-4 h-4 fill-white" />
                  <span>Featured</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-5xl">
            <button
              onClick={() => setShowVideo(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 bg-white/10 backdrop-blur-md p-3 rounded-full hover:bg-white/20 transition-all"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl relative">
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <div className="text-white text-center">
                  <div className="w-20 h-20 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm hover:scale-110 transition-transform cursor-pointer">
                    <Play className="w-10 h-10 ml-1" />
                  </div>
                  <p className="text-lg font-semibold">Virtual Tour Coming Soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;