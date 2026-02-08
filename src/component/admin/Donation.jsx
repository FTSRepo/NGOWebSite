import React, { useState, useEffect } from 'react'
import { Search, Download, Filter, TrendingUp, DollarSign, Users, Heart, Calendar, Gift, Phone, Mail, Loader2, CheckCircle, XCircle } from 'lucide-react'

function Donation() {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [donations, setDonations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [updatingStatus, setUpdatingStatus] = useState({})

  // Fetch donations from API
  useEffect(() => {
    fetchDonations()
  }, [])

  const fetchDonations = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('https://fileupload.friensys.com/api/Common/GetDonations?WebsiteId=1001', {
        method: 'GET',
        headers: {
          'accept': '*/*'
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch donations')
      }

      const result = await response.json()
      
      if (result.status && result.data) {
        // Transform API data to match the component's expected format
        const transformedData = result.data.map((donation, index) => ({
          id: `DON${String(index + 1).padStart(3, '0')}`,
          donationId: donation.donationId, // Store actual donation ID from API
          donorName: donation.fullName,
          email: donation.emailId,
          phone: donation.mobile,
          amount: donation.amount,
          date: new Date(donation.tranDate).toISOString().split('T')[0],
          category: donation.cause,
          purpose: `${donation.donationType} - ${donation.cause}`,
          paymentMethod: donation.donationType,
          receiptNo: `RCP2024${String(index + 1).padStart(3, '0')}`,
          panCard: 'N/A',
          donationType: donation.donationType,
          cause: donation.cause,
          webSiteId: donation.webSiteId,
          isPaymentConfirmed: donation.isPaymentConfirmed // Payment confirmation status
        }))
        
        setDonations(transformedData)
      } else {
        throw new Error(result.message || 'Failed to fetch donations')
      }
    } catch (err) {
      setError(err.message)
      console.error('Error fetching donations:', err)
    } finally {
      setLoading(false)
    }
  }

  // Update payment status using the API
  const updatePaymentStatus = async (donation, newStatus) => {
    try {
      setUpdatingStatus(prev => ({ ...prev, [donation.donationId]: true }))
      
      const response = await fetch(
        `https://fileupload.friensys.com/api/Common/updateDonationStatus?webSiteId=${donation.webSiteId}&donnerId=${donation.donationId}&status=${newStatus}`,
        {
          method: 'POST',
          headers: {
            'accept': '*/*'
          }
        }
      )

      if (!response.ok) {
        throw new Error('Failed to update payment status')
      }

      // Update local state after successful API call
      setDonations(prevDonations =>
        prevDonations.map(d =>
          d.donationId === donation.donationId
            ? { ...d, isPaymentConfirmed: newStatus }
            : d
        )
      )

      // Success notification
      console.log(`Payment status updated successfully to ${newStatus ? 'Confirmed' : 'Pending'}`)
      
    } catch (err) {
      console.error('Error updating payment status:', err)
      alert('Failed to update payment status: ' + err.message)
    } finally {
      setUpdatingStatus(prev => ({ ...prev, [donation.donationId]: false }))
    }
  }

  // Calculate statistics
  const stats = {
    totalReceived: donations
    .filter(d => d.isPaymentConfirmed)
    .reduce((sum, d) => sum + d.amount, 0),
    totalDonors: donations.length,
    thisMonth: donations.filter(d => new Date(d.date).getMonth() === new Date().getMonth()).reduce((sum, d) => sum + d.amount, 0),
    categories: [...new Set(donations.map(d => d.category))].length,
    paymentsConfirmed: donations.filter(d => d.isPaymentConfirmed).length,
    paymentsPending: donations.filter(d => !d.isPaymentConfirmed).length
  }

  // Filter donations
  const filteredDonations = donations.filter(donation => {
    const matchesSearch = donation.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donation.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donation.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donation.receiptNo.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || donation.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const getCategoryColor = (category) => {
    const colors = {
      'General Support': 'bg-blue-100 text-blue-800',
      'Medical': 'bg-red-100 text-red-800',
      'Food': 'bg-green-100 text-green-800',
      'Infrastructure': 'bg-blue-100 text-blue-800',
      'Healthcare': 'bg-purple-100 text-purple-800',
      'General': 'bg-gray-100 text-gray-800',
      'Recreation': 'bg-yellow-100 text-yellow-800',
      'Education': 'bg-indigo-100 text-indigo-800',
      'Singh': 'bg-teal-100 text-teal-800',
      'Fever': 'bg-pink-100 text-pink-800',
      'string': 'bg-gray-100 text-gray-800'
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  // Get unique categories from actual data
  const availableCategories = [...new Set(donations.map(d => d.category))]

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-8 h-8 text-red-500" fill="currentColor" />
            <h1 className="text-3xl font-bold text-gray-900">Donation Management</h1>
          </div>
          <p className="text-gray-600">Old Age Home & Trust - Track received donations and donor contributions</p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Loading donations...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
            <div className="flex items-start gap-3">
              <div className="text-red-500 mt-0.5">⚠️</div>
              <div>
                <h3 className="text-red-800 font-semibold mb-1">Error loading donations</h3>
                <p className="text-red-600 text-sm">{error}</p>
                <button 
                  onClick={fetchDonations}
                  className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content - Only show when not loading */}
        {!loading && !error && (
          <>
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white/20 rounded-lg">
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <TrendingUp className="w-5 h-5 opacity-80" />
                </div>
                <h3 className="text-2xl font-bold">₹{stats.totalReceived.toLocaleString()}</h3>
                <p className="text-blue-100 text-sm mt-1">Total Received</p>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white/20 rounded-lg">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <TrendingUp className="w-5 h-5 opacity-80" />
                </div>
                <h3 className="text-2xl font-bold">{stats.paymentsConfirmed}</h3>
                <p className="text-green-100 text-sm mt-1">Payments Confirmed</p>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white/20 rounded-lg">
                    <Users className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold">{stats.totalDonors}</h3>
                <p className="text-purple-100 text-sm mt-1">Total Donors</p>
              </div>

              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white/20 rounded-lg">
                    <XCircle className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold">{stats.paymentsPending}</h3>
                <p className="text-orange-100 text-sm mt-1">Payments Pending</p>
              </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by donor name, purpose, receipt no..."
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Category Filter */}
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-gray-400" />
                  <select
                    className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    <option value="all">All Categories</option>
                    {availableCategories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Refresh & Export Buttons */}
                <button 
                  onClick={fetchDonations}
                  className="px-6 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2 font-medium"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Refresh
                </button>
                
                <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium">
                  <Download className="w-4 h-4" />
                  Export Report
                </button>
              </div>
            </div>

            {/* Donations Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Receipt / ID
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Donor Details
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Purpose
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Payment Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredDonations.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="px-6 py-12 text-center">
                          <div className="text-gray-400">
                            <Gift className="w-12 h-12 mx-auto mb-3 opacity-50" />
                            <p className="text-lg font-medium">No donations found</p>
                            <p className="text-sm mt-1">Try adjusting your search or filters</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredDonations.map((donation) => (
                        <tr key={donation.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{donation.receiptNo}</div>
                            <div className="text-xs text-gray-500">{donation.id}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-start gap-2">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold">
                                {donation.donorName.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">{donation.donorName}</div>
                                {donation.email !== 'N/A' && donation.email !== 'string' && (
                                  <div className="text-xs text-gray-500 flex items-center gap-1">
                                    <Mail className="w-3 h-3" />
                                    {donation.email}
                                  </div>
                                )}
                                {donation.phone !== 'N/A' && donation.phone !== 'string' && (
                                  <div className="text-xs text-gray-500 flex items-center gap-1">
                                    <Phone className="w-3 h-3" />
                                    {donation.phone}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900 mb-1">{donation.purpose}</div>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(donation.category)}`}>
                              {donation.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-lg font-bold text-green-600">
                              ₹{donation.amount.toLocaleString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{donation.date}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={() => updatePaymentStatus(donation, !donation.isPaymentConfirmed)}
                              disabled={updatingStatus[donation.donationId]}
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                donation.isPaymentConfirmed
                                  ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                  : 'bg-orange-100 text-orange-800 hover:bg-orange-200'
                              } ${updatingStatus[donation.donationId] ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                            >
                              {updatingStatus[donation.donationId] ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              ) : donation.isPaymentConfirmed ? (
                                <CheckCircle className="w-3.5 h-3.5" />
                              ) : (
                                <XCircle className="w-3.5 h-3.5" />
                              )}
                              {updatingStatus[donation.donationId] 
                                ? 'Updating...' 
                                : donation.isPaymentConfirmed 
                                  ? 'Confirmed' 
                                  : 'Pending'
                              }
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
                <div className="text-sm text-gray-600">
                  Showing <span className="font-medium">{filteredDonations.length}</span> of <span className="font-medium">{donations.length}</span> donations
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-white disabled:opacity-50 transition-colors">
                    Previous
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                    1
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-white transition-colors">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Donation