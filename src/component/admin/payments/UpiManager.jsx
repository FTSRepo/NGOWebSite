import React, { useState, useEffect } from 'react'

function UpiManager() {
  const [upiList, setUpiList] = useState([])
  const [formData, setFormData] = useState({
    upI_Id: '',
    upI_Number: ''
  })
  const [editingId, setEditingId] = useState(null)
  const [errors, setErrors] = useState({})
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const WEBSITE_ID = 1001
  const API_BASE_URL = 'https://fileupload.friensys.com/api/Common'

  // Fetch UPI list on component mount
  useEffect(() => {
    fetchUpiList()
  }, [])

  // Fetch UPI list from API
  const fetchUpiList = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/get-payment-setup?WebsiteId=${WEBSITE_ID}`, {
        headers: {
          'accept': '*/*'
        }
      })

      if (response.ok) {
        const result = await response.json()
        if (result.statusCode === 200 && result.data) {
          setUpiList(result.data)
        }
      }
    } catch (error) {
      console.error('Error fetching UPI list:', error)
      setApiError('Failed to load UPI list')
    }
  }

  // Validate UPI ID format
  const validateUpiId = (upiId) => {
    const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/
    return upiRegex.test(upiId)
  }

  // Validate phone number
  const validatePhoneNumber = (number) => {
    const phoneRegex = /^[0-9]{10}$/
    return phoneRegex.test(number)
  }

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
    setApiError('')
    setSuccessMessage('')
  }

  // Validate form
  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.upI_Id.trim()) {
      newErrors.upI_Id = 'UPI ID is required'
    } else if (!validateUpiId(formData.upI_Id)) {
      newErrors.upI_Id = 'Invalid UPI ID format (e.g., username@paytm)'
    }
    
    if (!formData.upI_Number.trim()) {
      newErrors.upI_Number = 'UPI Number is required'
    } else if (!validatePhoneNumber(formData.upI_Number)) {
      newErrors.upI_Number = 'Invalid phone number (10 digits required)'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Add or Update UPI
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)
    setApiError('')
    setSuccessMessage('')

    try {
      const payload = {
        paymentSetupId: editingId || 0,
        webSiteId: WEBSITE_ID,
        upI_Id: formData.upI_Id,
        upI_Number: formData.upI_Number,
        tranDate: new Date().toISOString(),
        isActive: upiList.length === 0 || editingId !== null ? true : false
      }

      const response = await fetch(`${API_BASE_URL}/create-payment-setup`, {
        method: 'POST',
        headers: {
          'accept': '*/*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        const result = await response.json()
        if (result.status) {
          setSuccessMessage(result.message || 'UPI saved successfully')
          setFormData({ upI_Id: '', upI_Number: '' })
          setErrors({})
          setShowForm(false)
          setEditingId(null)
          
          // Refresh the list
          await fetchUpiList()
          
          // Hide success message after 3 seconds
          setTimeout(() => setSuccessMessage(''), 3000)
        } else {
          setApiError(result.message || 'Failed to save UPI')
        }
      } else {
        setApiError('Failed to save UPI. Please try again.')
      }
    } catch (error) {
      console.error('Error saving UPI:', error)
      setApiError('Network error. Please check your connection.')
    } finally {
      setLoading(false)
    }
  }

  // Toggle active UPI - FIXED VERSION
  const handleToggleActive = async (paymentSetupId, currentStatus) => {
    setLoading(true)
    setApiError('')

    try {
      if (currentStatus) {
        // If currently active, deactivate it
        const deactivateResponse = await fetch(
          `${API_BASE_URL}/update-payment-setup?webSitId=${paymentSetupId}&status=false`, 
          {
            method: 'POST',
            headers: {
              'accept': '*/*'
            },
            body: ''
          }
        )

        if (deactivateResponse.ok) {
          await fetchUpiList()
          setSuccessMessage('UPI deactivated successfully')
          setTimeout(() => setSuccessMessage(''), 3000)
        } else {
          setApiError('Failed to deactivate UPI')
        }
      } else {
        // If currently inactive, first deactivate all UPIs, then activate this one
        
        // Step 1: Deactivate all UPIs
        const deactivateAllResponse = await fetch(
          `${API_BASE_URL}/update-payment-setup?webSitId=${WEBSITE_ID}&status=false`, 
          {
            method: 'POST',
            headers: {
              'accept': '*/*'
            },
            body: ''
          }
        )

        if (!deactivateAllResponse.ok) {
          throw new Error('Failed to deactivate existing UPIs')
        }

        // Step 2: Activate the selected UPI
        const activateResponse = await fetch(
          `${API_BASE_URL}/update-payment-setup?webSitId=${paymentSetupId}&status=true`, 
          {
            method: 'POST',
            headers: {
              'accept': '*/*'
            },
            body: ''
          }
        )

        if (activateResponse.ok) {
          await fetchUpiList()
          setSuccessMessage('UPI activated successfully')
          setTimeout(() => setSuccessMessage(''), 3000)
        } else {
          setApiError('Failed to activate UPI')
        }
      }
    } catch (error) {
      console.error('Error toggling active UPI:', error)
      setApiError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Edit UPI
  const handleEdit = (upi) => {
    setFormData({
      upI_Id: upi.upI_Id,
      upI_Number: upi.upI_Number
    })
    setEditingId(upi.paymentSetupId)
    setErrors({})
    setApiError('')
    setSuccessMessage('')
    setShowForm(true)
  }

  // Delete UPI (Note: There's no delete API, so we'll just remove from local state)
  const handleDelete = (paymentSetupId) => {
    // Since there's no delete API endpoint shown, we'll need to handle this differently
    // For now, we'll just filter it out locally and show a message
    setApiError('Delete functionality requires API endpoint')
    
    // Uncomment below if delete API is available
    // setUpiList(prev => prev.filter(upi => upi.paymentSetupId !== paymentSetupId))
  }

  // Cancel edit
  const handleCancelEdit = () => {
    setEditingId(null)
    setFormData({ upI_Id: '', upI_Number: '' })
    setErrors({})
    setApiError('')
    setSuccessMessage('')
    setShowForm(false)
  }

  // Extract bank name from UPI ID
  const getBankName = (upiId) => {
    if (!upiId) return 'Unknown'
    const parts = upiId.split('@')
    return parts[1] || 'Unknown'
  }

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header with Add Button */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
              <span className="text-purple-500">💳</span>
              UPI Wallet
            </h1>
            <p className="text-gray-400">Manage your payment methods</p>
          </div>
          
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 flex items-center gap-2"
              disabled={loading}
            >
              <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 4v16m8-8H4"></path>
              </svg>
              Add New UPI
            </button>
          )}
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-500/20 border border-green-500 rounded-xl p-4 mb-6 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-green-400 flex-shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p className="text-white font-semibold">{successMessage}</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {apiError && (
          <div className="bg-red-500/20 border border-red-500 rounded-xl p-4 mb-6 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-red-400 flex-shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p className="text-white">{apiError}</p>
            </div>
          </div>
        )}

        {/* Add/Edit Form Modal */}
        {showForm && (
          <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8 border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                {editingId ? 'Edit UPI Account' : 'Add New UPI Account'}
              </h2>
              <button
                onClick={handleCancelEdit}
                className="text-gray-400 hover:text-white transition"
                disabled={loading}
              >
                <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  UPI ID <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="upI_Id"
                  value={formData.upI_Id}
                  onChange={handleInputChange}
                  placeholder="yourname@paytm"
                  disabled={loading}
                  className={`w-full px-4 py-3 bg-gray-900 border ${
                    errors.upI_Id ? 'border-red-500' : 'border-gray-700'
                  } text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition disabled:opacity-50`}
                />
                {errors.upI_Id && (
                  <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.upI_Id}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  UPI Number (Phone Number) <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="upI_Number"
                  value={formData.upI_Number}
                  onChange={handleInputChange}
                  placeholder="9876543210"
                  maxLength="10"
                  disabled={loading}
                  className={`w-full px-4 py-3 bg-gray-900 border ${
                    errors.upI_Number ? 'border-red-500' : 'border-gray-700'
                  } text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition disabled:opacity-50`}
                />
                {errors.upI_Number && (
                  <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.upI_Number}
                  </p>
                )}
                <p className="text-gray-400 text-xs mt-1">Enter 10-digit phone number linked to your UPI</p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    editingId ? 'Update Account' : 'Add Account'
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  disabled={loading}
                  className="px-6 py-3 bg-gray-700 text-gray-300 rounded-xl font-semibold hover:bg-gray-600 transition disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* UPI List Table */}
        {upiList.length === 0 ? (
          <div className="bg-gray-800 rounded-2xl p-16 text-center border border-gray-700">
            <div className="mb-4">
              <svg className="w-24 h-24 mx-auto text-gray-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-400 mb-2">No UPI Accounts Yet</h3>
            <p className="text-gray-500 mb-6">Get started by adding your first UPI account</p>
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                disabled={loading}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 inline-flex items-center gap-2 disabled:opacity-50"
              >
                <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 4v16m8-8H4"></path>
                </svg>
                Add Your First UPI
              </button>
            )}
          </div>
        ) : (
          <div className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-900 border-b border-gray-700">
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">
                      Bank/Provider
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">
                      UPI ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">
                      UPI Number
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">
                      Last Updated
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {upiList.map((upi, index) => (
                    <tr 
                      key={upi.paymentSetupId}
                      className={`transition-colors ${
                        upi.isActive 
                          ? 'bg-green-900/20 hover:bg-green-900/30' 
                          : 'bg-gray-800 hover:bg-gray-750'
                      }`}
                    >
                      {/* Status Column */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleToggleActive(upi.paymentSetupId, upi.isActive)}
                            disabled={loading}
                            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800 ${
                              upi.isActive 
                                ? 'bg-green-500' 
                                : 'bg-gray-600'
                            } ${loading ? 'opacity-50' : 'cursor-pointer hover:bg-opacity-80'}`}
                            title={upi.isActive ? 'Click to deactivate' : 'Click to activate'}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                upi.isActive ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                          {upi.isActive && (
                            <span className="text-green-400 text-xs font-semibold flex items-center gap-1">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              Active
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Bank/Provider Column */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                              <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                            </svg>
                          </div>
                          <div>
                            <p className="text-white font-semibold capitalize">{getBankName(upi.upI_Id)}</p>
                            <p className="text-gray-400 text-xs">Payment Provider</p>
                          </div>
                        </div>
                      </td>

                      {/* UPI ID Column */}
                      <td className="px-6 py-4">
                        <p className="text-white font-mono text-sm">{upi.upI_Id}</p>
                      </td>

                      {/* UPI Number Column */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-white font-semibold">{upi.upI_Number}</p>
                      </td>

                      {/* Last Updated Column */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-gray-300 text-sm">
                          {new Date(upi.tranDate).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {new Date(upi.tranDate).toLocaleTimeString('en-US', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </td>

                      {/* Actions Column */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(upi)}
                            disabled={loading}
                            className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Edit"
                          >
                            <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                              <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(upi.paymentSetupId)}
                            disabled={loading}
                            className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Delete"
                          >
                            <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                              <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="bg-gray-900 px-6 py-4 border-t border-gray-700">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">
                  Showing <span className="font-semibold text-white">{upiList.length}</span> UPI account{upiList.length !== 1 ? 's' : ''}
                </p>
                <p className="text-sm text-gray-400">
                  Active: <span className="font-semibold text-green-400">
                    {upiList.filter(upi => upi.isActive).length}
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UpiManager