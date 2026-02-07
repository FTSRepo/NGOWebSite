import React, { useState, useEffect } from 'react';
import {
  Upload,
  Image as ImageIcon,
  Search,
  Trash2,
  Home,
  ChevronDown,
  X,
  FileImage,
  Calendar,
  Tag,
  FileText,
  RefreshCw,
} from 'lucide-react';

function ImageUpload() {
  const [selectedPage, setSelectedPage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [tagName, setTagName] = useState('');

  // Fixed schoolId - replace with your actual school ID
  const SCHOOL_ID = 1001;

  // Page configuration with pageId and titleId
  const pages = [
    { name: 'Gallery', pageId: 2, titleId: 2 },
    { name: 'Event', pageId: 3, titleId: 3 },
  ];

  // Fetch images on component mount
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://fileupload.friensys.com/api/Image/getImages?schoolId=${SCHOOL_ID}`
      );
      const result = await response.json();

      if (result.statusCode === 200) {
        // Transform API data to match component structure
        const transformedImages = result.data.map((img) => ({
          id: img.id,
          image: img.s3url,
          pageName: getPageName(img.pageId),
          titleName: img.tagName || '-',
          tagName: img.tagName || '',
          date: formatDate(img.uploadedAt),
          pageId: img.pageId,
          titleId: img.titleId,
        }));
        setImages(transformedImages);
      } else {
        console.error('Failed to fetch images:', result.message);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
      alert('Failed to fetch images. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getPageName = (pageId) => {
    switch (pageId) {
      case 2:
        return 'Gallery';
      case 3:
        return 'Event';
      default:
        return 'Unknown';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    setSelectedPage('');
    setSelectedFile(null);
    setPreviewUrl(null);
    setTagName('');
  };

  const handleUpload = async () => {
    if (!selectedPage || !selectedFile) {
      alert('Please select a page and choose an image');
      return;
    }

    const selectedPageData = pages.find((p) => p.name === selectedPage);
    if (!selectedPageData) {
      alert('Invalid page selection');
      return;
    }

    setUploadLoading(true);

    try {
      const formData = new FormData();
      formData.append('files', selectedFile);
      formData.append('schoolId', SCHOOL_ID);
      formData.append('pageId', selectedPageData.pageId);
      formData.append('titleId', selectedPageData.titleId);
      formData.append('TagName', tagName || selectedPage);

      const response = await fetch(
        'https://fileupload.friensys.com/api/Image/upload',
        {
          method: 'POST',
          body: formData,
        }
      );

      const result = await response.json();

      if (result.statusCode === 200) {
        alert('Image uploaded successfully!');
        handleReset();
        // Refresh the images list
        fetchImages();
      } else {
        alert('Upload failed: ' + result.message);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploadLoading(false);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      // TODO: Implement delete API call
      setImages(images.filter((img) => img.id !== id));
      alert('Delete functionality needs to be implemented with API');
    }
  };

  const filteredImages = images.filter(
    (img) =>
      img.pageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      img.titleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      img.tagName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold text-gray-900">Upload Images</h1>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Home className="w-4 h-4" />
              <span>Home</span>
              <span>/</span>
              <span className="text-orange-600 font-semibold">Dashboard</span>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Upload className="w-6 h-6 text-orange-600" />
            Image uploads for website
          </h2>

          <div className="space-y-6">
            {/* Page Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Choose Page for which want to change image
              </label>
              <div className="relative">
                <select
                  value={selectedPage}
                  onChange={(e) => setSelectedPage(e.target.value)}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 appearance-none cursor-pointer transition-all"
                >
                  <option value="">-- Select Page --</option>
                  {pages.map((page, index) => (
                    <option key={index} value={page.name}>
                      {page.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Tag Name Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tag Name (Optional)
              </label>
              <input
                type="text"
                value={tagName}
                onChange={(e) => setTagName(e.target.value)}
                placeholder="Enter tag name"
                className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 transition-all"
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Choose Image
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-all group"
                >
                  {previewUrl ? (
                    <div className="relative">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="max-h-48 rounded-lg shadow-md"
                      />
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleReset();
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <FileImage className="w-12 h-12 text-gray-400 mx-auto mb-3 group-hover:text-orange-500 transition-colors" />
                      <p className="text-sm text-gray-600 font-medium">
                        Choose file to upload
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Click to browse or drag and drop
                      </p>
                    </div>
                  )}
                </label>
                {selectedFile && (
                  <p className="mt-2 text-sm text-gray-600 flex items-center gap-2">
                    <FileImage className="w-4 h-4" />
                    <span className="font-medium">{selectedFile.name}</span>
                    <span className="text-gray-400">
                      ({(selectedFile.size / 1024).toFixed(2)} KB)
                    </span>
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleUpload}
                disabled={uploadLoading}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center gap-2 shadow-md hover:shadow-lg disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                <Upload className="w-4 h-4" />
                {uploadLoading ? 'Uploading...' : 'Upload to website'}
              </button>
              <button
                onClick={handleReset}
                disabled={uploadLoading}
                className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold flex items-center gap-2 shadow-md hover:shadow-lg disabled:bg-red-400 disabled:cursor-not-allowed"
              >
                <RefreshCw className="w-4 h-4" />
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          {/* Table Controls */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700 font-medium">Show</span>
                <select
                  value={entriesPerPage}
                  onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                  className="px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
                <span className="text-sm text-gray-700 font-medium">
                  entries
                </span>
              </div>

              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 w-64"
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <RefreshCw className="w-8 h-8 text-orange-600 animate-spin" />
                <span className="ml-3 text-gray-600 font-medium">
                  Loading images...
                </span>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                      Image
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                      Page Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                      Title Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                      Tag Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredImages.length > 0 ? (
                    filteredImages.slice(0, entriesPerPage).map((img) => (
                      <tr
                        key={img.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <img
                            src={img.image}
                            alt="Uploaded"
                            className="w-20 h-20 object-cover rounded-lg shadow-sm border border-gray-200"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-700 font-medium">
                            {img.pageName}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-700 font-medium">
                            {img.titleName}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-700 font-medium">
                            {img.tagName || '-'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-600">
                            {img.date}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleDelete(img.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <ImageIcon className="w-12 h-12 text-gray-300" />
                          <p className="text-gray-500 font-medium">
                            No images found
                          </p>
                          <p className="text-sm text-gray-400">
                            Upload your first image to get started
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>

          {/* Table Footer */}
          {filteredImages.length > 0 && (
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>
                  Showing{' '}
                  <span className="font-semibold text-gray-900">
                    1-{Math.min(entriesPerPage, filteredImages.length)}
                  </span>{' '}
                  of{' '}
                  <span className="font-semibold text-gray-900">
                    {filteredImages.length}
                  </span>{' '}
                  entries
                </span>
                <div className="flex gap-2">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-medium">
                    Previous
                  </button>
                  <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium">
                    1
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-medium">
                    2
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-medium">
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Powered By{' '}
            <span className="font-semibold text-gray-900">
              Friensys Info Labs Pvt. Ltd.
            </span>{' '}
            <span className="text-gray-400">^</span>
          </p>
          <p className="text-gray-500 mt-1">Version 3.0</p>
        </div>
      </div>
    </div>
  );
}

export default ImageUpload;