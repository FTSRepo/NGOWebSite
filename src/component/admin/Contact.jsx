import React, { useState, useEffect } from 'react'
import { Search, Filter, Mail, Phone, MapPin, Calendar, User, MessageSquare, Clock, CheckCircle, XCircle, AlertCircle, Download, Eye, RefreshCw } from 'lucide-react'

function Contact() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [enquiries, setEnquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch enquiries from API
  const fetchEnquiries = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('https://fileupload.friensys.com/api/Common/GetContactDetails?WebsiteId=1001', {
        method: 'GET',
        headers: {
          'accept': '*/*'
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch contact details')
      }

      const result = await response.json()
      
      if (result.statusCode === 200 && result.data) {
        // Transform API data to match component structure
        const transformedData = result.data.map((item, index) => ({
          id: `ENQ${String(index + 1).padStart(3, '0')}`,
          name: item.fullName || 'Unknown',
          email: item.emailId || 'N/A',
          phone: item.mobile || 'N/A',
          type: determineEnquiryType(item.message, item.visitDate),
          subject: generateSubject(item.message, item.relation),
          message: item.message || 'No message provided',
          date: formatDate(item.visitDate || item.tranDate),
          time: formatTime(item.tranDate),
          status: determineStatus(item.visitDate),
          location: 'India', // Default location as API doesn't provide this
          age: null,
          medicalCondition: null,
          relation: item.relation || null,
          visitDate: item.visitDate,
          tranDate: item.tranDate
        }))
        
        setEnquiries(transformedData)
      }
    } catch (err) {
      setError(err.message)
      console.error('Error fetching enquiries:', err)
    } finally {
      setLoading(false)
    }
  }

  // Helper function to determine enquiry type
  const determineEnquiryType = (message, visitDate) => {
    const lowerMessage = (message || '').toLowerCase()
    if (visitDate) return 'Visit'
    if (lowerMessage.includes('admission') || lowerMessage.includes('admit')) return 'Admission'
    if (lowerMessage.includes('donation') || lowerMessage.includes('donate')) return 'Donation'
    if (lowerMessage.includes('volunteer')) return 'Volunteer'
    return 'General'
  }

  // Helper function to generate subject
  const generateSubject = (message, relation) => {
    const lowerMessage = (message || '').toLowerCase()
    if (lowerMessage.includes('visit')) return `Visit Request${relation ? ` for ${relation}` : ''}`
    if (lowerMessage.includes('admission')) return `Admission Enquiry${relation ? ` for ${relation}` : ''}`
    if (lowerMessage.includes('donation')) return 'Donation Enquiry'
    if (lowerMessage.includes('volunteer')) return 'Volunteer Enquiry'
    return 'General Enquiry'
  }

  // Helper function to determine status based on visit date
  const determineStatus = (visitDate) => {
    if (!visitDate) return 'pending'
    const visit = new Date(visitDate)
    const now = new Date()
    const diffDays = Math.floor((visit - now) / (1000 * 60 * 60 * 24))
    
    if (diffDays < 0) return 'responded'
    if (diffDays <= 2) return 'in-progress'
    return 'pending'
  }

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN', { year: 'numeric', month: '2-digit', day: '2-digit' })
  }

  // Format time
  const formatTime = (dateString) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })
  }

  // Load data on component mount
  useEffect(() => {
    fetchEnquiries()
  }, [])

  // Calculate statistics
  const stats = {
    total: enquiries.length,
    pending: enquiries.filter(e => e.status === 'pending').length,
    inProgress: enquiries.filter(e => e.status === 'in-progress').length,
    responded: enquiries.filter(e => e.status === 'responded').length,
    admission: enquiries.filter(e => e.type === 'Admission').length
  }

  // Filter enquiries
  const filteredEnquiries = enquiries.filter(enquiry => {
    const matchesSearch = enquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         enquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         enquiry.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         enquiry.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || enquiry.status === statusFilter
    const matchesType = typeFilter === 'all' || enquiry.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'in-progress': return 'bg-blue-100 text-blue-800'
      case 'responded': return 'bg-green-100 text-green-800'
      case 'closed': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch(status) {
      case 'pending': return <Clock className="w-4 h-4" />
      case 'in-progress': return <AlertCircle className="w-4 h-4" />
      case 'responded': return <CheckCircle className="w-4 h-4" />
      case 'closed': return <XCircle className="w-4 h-4" />
      default: return null
    }
  }

  const getTypeColor = (type) => {
    const colors = {
      'Admission': 'bg-purple-100 text-purple-800 border-purple-200',
      'Visit': 'bg-blue-100 text-blue-800 border-blue-200',
      'General': 'bg-gray-100 text-gray-800 border-gray-200',
      'Donation': 'bg-green-100 text-green-800 border-green-200',
      'Volunteer': 'bg-orange-100 text-orange-800 border-orange-200'
    }
    return colors[type] || 'bg-gray-100 text-gray-800 border-gray-200'
  }

  // Export to CSV
  const handleExport = () => {
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Type', 'Subject', 'Message', 'Date', 'Time', 'Status', 'Relation', 'Visit Date']
    const csvData = filteredEnquiries.map(e => [
      e.id,
      e.name,
      e.email,
      e.phone,
      e.type,
      e.subject,
      e.message,
      e.date,
      e.time,
      e.status,
      e.relation || '',
      e.visitDate ? formatDate(e.visitDate) : ''
    ])

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `enquiries_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading enquiries...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Data</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchEnquiries}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium mx-auto"
          >
            <RefreshCw className="w-4 h-4" />
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <MessageSquare className="w-8 h-8 text-blue-600" />
                <h1 className="text-3xl font-bold text-gray-900">Contact & Enquiries</h1>
              </div>
              <p className="text-gray-600">Manage admission requests, visitor enquiries, and contact form submissions</p>
            </div>
            <button
              onClick={fetchEnquiries}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="text-sm text-gray-600 mb-1">Total Enquiries</div>
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="text-sm text-gray-600 mb-1">Pending</div>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="text-sm text-gray-600 mb-1">In Progress</div>
            <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="text-sm text-gray-600 mb-1">Responded</div>
            <div className="text-2xl font-bold text-green-600">{stats.responded}</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="text-sm text-gray-600 mb-1">Admission</div>
            <div className="text-2xl font-bold text-purple-600">{stats.admission}</div>
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
                placeholder="Search by name, email, subject, or ID..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Type Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="Admission">Admission</option>
                <option value="Visit">Visit</option>
                <option value="General">General</option>
                <option value="Donation">Donation</option>
                <option value="Volunteer">Volunteer</option>
              </select>
            </div>

            {/* Status Filter */}
            <select
              className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="responded">Responded</option>
              <option value="closed">Closed</option>
            </select>

            {/* Export Button */}
            <button
              onClick={handleExport}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Enquiries List */}
        {filteredEnquiries.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-100">
            <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Enquiries Found</h3>
            <p className="text-gray-600">
              {searchTerm || statusFilter !== 'all' || typeFilter !== 'all'
                ? 'Try adjusting your filters or search terms'
                : 'No contact enquiries available at the moment'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredEnquiries.map((enquiry) => (
              <div key={enquiry.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    {/* Left Section - Main Info */}
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        {/* Avatar */}
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                          {enquiry.name.charAt(0).toUpperCase()}
                        </div>

                        {/* Details */}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <h3 className="text-lg font-semibold text-gray-900">{enquiry.name}</h3>
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(enquiry.type)}`}>
                              {enquiry.type}
                            </span>
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(enquiry.status)}`}>
                              {getStatusIcon(enquiry.status)}
                              {enquiry.status.charAt(0).toUpperCase() + enquiry.status.slice(1).replace('-', ' ')}
                            </span>
                          </div>

                          <p className="text-sm font-medium text-gray-700 mb-3">{enquiry.subject}</p>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Mail className="w-4 h-4 text-gray-400" />
                              {enquiry.email}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Phone className="w-4 h-4 text-gray-400" />
                              {enquiry.phone}
                            </div>
                            {enquiry.relation && (
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <User className="w-4 h-4 text-gray-400" />
                                Relation: {enquiry.relation}
                              </div>
                            )}
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              {enquiry.date} at {enquiry.time}
                            </div>
                            {enquiry.visitDate && (
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Calendar className="w-4 h-4 text-green-400" />
                                Visit: {formatDate(enquiry.visitDate)}
                              </div>
                            )}
                          </div>

                          <div className="bg-gray-50 rounded-lg p-4 mb-3">
                            <p className="text-sm text-gray-700 leading-relaxed">{enquiry.message}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Section - Actions */}
                    <div className="flex lg:flex-col gap-2 flex-shrink-0">
                      {enquiry.status === 'pending' && (
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                          Respond
                        </button>
                      )}
                      {enquiry.status === 'in-progress' && (
                        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
                          Update
                        </button>
                      )}
                    </div>
                  </div>

                  {/* ID Footer */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-500 font-mono">ID: {enquiry.id}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {filteredEnquiries.length > 0 && (
          <div className="mt-6 bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing <span className="font-medium">{filteredEnquiries.length}</span> of <span className="font-medium">{enquiries.length}</span> enquiries
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  Previous
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  1
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Contact