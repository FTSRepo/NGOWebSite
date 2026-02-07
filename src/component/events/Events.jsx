import React, { useState } from 'react';
import { Calendar, MapPin, Users, Image, Smile, Award } from 'lucide-react';

import adult from '../../assets/Events/adult.jpg';
import Event from '../../assets/Events/Event.jpeg';
import Event1 from '../../assets/Events/Event1.jpeg';
import Event2 from '../../assets/Events/Event2.jpeg';
import Event3 from '../../assets/Events/Event3.jpeg';
import Event4 from '../../assets/Events/Event4.jpeg';
import Event5 from '../../assets/Events/Event5.jpeg';

function Events() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  const pastEvents = [
    {
      id: 1,
      title: "Republic Day Celebration 2026",
      date: "January 26, 2026",
      location: "Main Courtyard",
      attendees: 65,
      images: [Event, Event1],
      highlights: [
        "Flag hoisting ceremony",
        "Patriotic songs performance",
        "Traditional sweets distribution",
        "Cultural program by residents"
      ],
      description: "A memorable celebration of India's 77th Republic Day with our beloved residents participating in cultural activities and sharing stories of independence."
    },
    {
      id: 2,
      title: "New Year Gala 2026",
      date: "January 1, 2026",
      location: "Community Hall",
      attendees: 72,
      images: [Event2, Event3],
      highlights: [
        "Live music and dance",
        "Special dinner buffet",
        "Midnight cake cutting",
        "Games and entertainment"
      ],
      description: "We welcomed 2026 with joy, laughter, and togetherness. The evening was filled with music, delicious food, and heartwarming moments."
    },
    {
      id: 3,
      title: "Winter Festival & Bonfire Night",
      date: "December 22, 2025",
      location: "Garden Area",
      attendees: 58,
      images: [Event4, Event5],
      highlights: [
        "Cozy bonfire gathering",
        "Hot chocolate and snacks",
        "Story sharing session",
        "Traditional folk songs"
      ],
      description: "A magical evening under the stars where residents gathered around the bonfire, sharing stories and creating beautiful memories."
    },
    {
      id: 4,
      title: "Christmas Celebration",
      date: "December 25, 2025",
      location: "Dining Hall",
      attendees: 68,
      images: [adult, Event],
      highlights: [
        "Christmas tree decoration",
        "Secret Santa gift exchange",
        "Carol singing",
        "Festive feast"
      ],
      description: "The spirit of Christmas filled our home with joy as residents exchanged gifts, sang carols, and enjoyed a wonderful festive meal together."
    },
    {
      id: 5,
      title: "Health & Wellness Week",
      date: "December 10-15, 2025",
      location: "Wellness Center",
      attendees: 45,
      images: [Event1, Event2],
      highlights: [
        "Daily yoga sessions",
        "Health checkup camp",
        "Nutrition workshops",
        "Meditation classes"
      ],
      description: "A week dedicated to physical and mental wellness with yoga, meditation, health screenings, and informative sessions on healthy living."
    },
    {
      id: 6,
      title: "Diwali Festival of Lights",
      date: "November 12, 2025",
      location: "Entire Premises",
      attendees: 80,
      images: [Event3, Event4],
      highlights: [
        "Diya decoration ceremony",
        "Rangoli competition",
        "Traditional sweet distribution",
        "Fireworks display"
      ],
      description: "Our home sparkled with thousands of diyas as residents celebrated the festival of lights with traditional rituals, sweets, and joyful celebrations."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-red-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 text-white overflow-hidden">
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

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white bg-opacity-20 backdrop-blur-md p-5 rounded-full border-4 border-white/30 shadow-2xl">
                <Image className="w-12 h-12" />
              </div>
            </div>
            <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 tracking-tight">Event Gallery</h1>
            <p className="text-xl sm:text-2xl text-orange-100 max-w-3xl mx-auto leading-relaxed">
              Relive the beautiful moments and joyful celebrations from our community events
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-sm sm:text-base">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20">
                <Award className="w-5 h-5" />
                <span className="font-semibold">{pastEvents.length} Events Celebrated</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20">
                <Smile className="w-5 h-5" />
                <span className="font-semibold">Countless Memories Created</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </div>

      {/* Events Timeline */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-8">
          {pastEvents.map((event, index) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border-l-8 border-gradient-to-b from-red-500 to-orange-500"
              style={{ borderLeftColor: index % 2 === 0 ? '#ef4444' : '#f97316' }}
            >
              <div className="grid md:grid-cols-5 gap-0">
                {/* Image Gallery Side */}
                <div className="md:col-span-2 relative">
                  <div className="h-full min-h-[300px] relative group cursor-pointer"
                       onClick={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}>
                    <img
                      src={event.images[0]}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-70 transition-opacity"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm border border-white/30 w-fit">
                        <Image className="w-4 h-4" />
                        <span className="font-semibold">{event.images.length} Photos</span>
                      </div>
                    </div>
                    {selectedEvent === event.id && (
                      <div className="absolute inset-0 bg-black bg-opacity-95 flex items-center justify-center p-4 animate-fadeIn">
                        <img
                          src={event.images[1]}
                          alt={event.title}
                          className="max-h-full max-w-full object-contain rounded-lg shadow-2xl"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Content Side */}
                <div className="md:col-span-3 p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-3">{event.title}</h2>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2 bg-orange-50 px-3 py-1.5 rounded-lg">
                          <Calendar className="w-4 h-4 text-orange-600" />
                          <span className="font-medium text-gray-700">{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-red-50 px-3 py-1.5 rounded-lg">
                          <MapPin className="w-4 h-4 text-red-600" />
                          <span className="text-gray-700">{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-lg">
                          <Users className="w-4 h-4 text-amber-600" />
                          <span className="text-gray-700">{event.attendees} Residents</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-6 leading-relaxed text-base">{event.description}</p>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2 text-lg">
                      <Award className="w-5 h-5 text-orange-600" />
                      Event Highlights
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {event.highlights.map((highlight, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 text-gray-700 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-3 border border-orange-100 hover:border-orange-300 transition-colors"
                        >
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-red-500 to-orange-500 mt-1.5 flex-shrink-0"></div>
                          <span className="text-sm font-medium">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Click to View Badge */}
                  <div className="mt-6">
                    <button
                      onClick={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold text-sm hover:from-red-600 hover:to-orange-700 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                    >
                      <Image className="w-4 h-4" />
                      <span>{selectedEvent === event.id ? 'Close Gallery' : 'View More Photos'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Message */}
        <div className="mt-16 text-center bg-gradient-to-r from-orange-50 via-red-50 to-amber-50 rounded-2xl p-10 border-2 border-orange-200 shadow-lg">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-orange-600 rounded-full mb-6 shadow-xl">
            <Smile className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-3">More Memories to Come!</h3>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto leading-relaxed">
            We believe in creating joyful experiences and celebrating life together. Stay tuned for more wonderful events and celebrations at our home.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-full shadow-md border border-orange-200">
              <Calendar className="w-5 h-5 text-orange-600" />
              <span className="font-semibold text-gray-800">Regular Events</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-full shadow-md border border-red-200">
              <Users className="w-5 h-5 text-red-600" />
              <span className="font-semibold text-gray-800">Community Bonding</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-full shadow-md border border-amber-200">
              <Award className="w-5 h-5 text-amber-600" />
              <span className="font-semibold text-gray-800">Memorable Moments</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Events;