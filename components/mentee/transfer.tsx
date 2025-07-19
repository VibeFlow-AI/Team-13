"use client"

import React, { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Upload, FileText, CheckCircle, AlertCircle, X, Home, User, Menu } from 'lucide-react'

interface TransferSlipProps {
  mentorName?: string
  sessionDate?: string
  sessionTime?: string
  amount?: string
  onPaymentConfirmed?: () => void
  onCancel?: () => void
}

interface UploadedFile {
  name: string
  size: number
  type: string
  preview?: string
}

export default function TransferSlip({
  mentorName = "Miraj Ahmed",
  sessionDate = "2025-07-19",
  sessionTime = "10:00",
  amount = "LKR 1500",
  onPaymentConfirmed,
  onCancel
}: TransferSlipProps) {
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string>('')
  const [isConfirmed, setIsConfirmed] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'application/pdf']
    if (!allowedTypes.includes(file.type)) {
      setUploadError('Please upload an image (JPEG, PNG, GIF) or PDF file.')
      return
    }

    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      setUploadError('File size must be less than 5MB.')
      return
    }

    setUploadError('')
    setIsUploading(true)

    setTimeout(() => {
      const uploadedFile: UploadedFile = {
        name: file.name,
        size: file.size,
        type: file.type
      }

      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          uploadedFile.preview = e.target?.result as string
          setUploadedFile(uploadedFile)
          setIsUploading(false)
        }
        reader.readAsDataURL(file)
      } else {
        setUploadedFile(uploadedFile)
        setIsUploading(false)
      }
    }, 1000)
  }

  const handleRemoveFile = () => {
    setUploadedFile(null)
    setUploadError('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleConfirmPayment = async () => {
    if (!uploadedFile) {
      setUploadError('Please upload a bank transfer slip before confirming payment.')
      return
    }

    setIsUploading(true)
    
    setTimeout(() => {
      setIsConfirmed(true)
      setIsUploading(false)
      
      setTimeout(() => {
        if (onPaymentConfirmed) {
          onPaymentConfirmed()
        } else {
          window.location.href = '/mentee-dashboard'
        }
      }, 2000)
    }, 1500)
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-gray-900 hover:text-gray-600 transition-colors">
                Home
              </a>
              <a href="/about" className="text-gray-900 hover:text-gray-600 transition-colors">
                About
              </a>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Dashboard
              </Button>
              <button className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center">
                <Menu className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content - Fullscreen */}
      <div className="flex-1 flex items-center justify-center p-4 relative">
        <Card className="w-full max-w-md bg-white shadow-xl border-0">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-xl font-semibold text-gray-900">
              Upload Bank Transfer Slip
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Session Details */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Session with:</span>
                <span className="font-medium text-gray-900">{mentorName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Session Date:</span>
                <span className="font-medium text-gray-900">{formatDate(sessionDate)}</span>
              </div>
            </div>

            {/* File Upload Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Bank Transfer Slip
              </label>
              
              {!uploadedFile ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors bg-gray-50">
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    id="bank-slip-upload"
                    accept="image/*,.pdf"
                    onChange={handleFileSelect}
                    disabled={isUploading}
                  />
                  <label htmlFor="bank-slip-upload" className="cursor-pointer block">
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <div className="text-gray-600">
                      <p className="font-medium">Choose file</p>
                      <p className="text-xs text-gray-500 mt-1">
                        No file chosen
                      </p>
                    </div>
                  </label>
                </div>
              ) : (
                <div className="border border-gray-200 rounded-lg p-4 bg-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-8 w-8 text-blue-500" />
                      <div>
                        <p className="font-medium text-sm text-gray-900">{uploadedFile.name}</p>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(uploadedFile.size)}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleRemoveFile}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                      disabled={isUploading}
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  
                  {uploadedFile.preview && (
                    <div className="mt-3">
                      <img
                        src={uploadedFile.preview}
                        alt="Upload preview"
                        className="w-full h-32 object-cover rounded border"
                      />
                    </div>
                  )}
                </div>
              )}

              {uploadError && (
                <div className="flex items-center space-x-2 text-red-600 text-sm mt-2">
                  <AlertCircle className="h-4 w-4" />
                  <span>{uploadError}</span>
                </div>
              )}

              <p className="text-xs text-gray-500 mt-2">
                Please upload a clear image of your bank transfer slip to confirm your payment.
              </p>
            </div>

            {/* Loading States */}
            {isUploading && (
              <div className="flex items-center justify-center space-x-2 text-blue-600">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <span className="text-sm">
                  {uploadedFile ? 'Processing payment...' : 'Uploading file...'}
                </span>
              </div>
            )}

            {isConfirmed && (
              <div className="flex items-center justify-center space-x-2 text-green-600 bg-green-50 rounded-lg p-4">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">Payment confirmed! Redirecting to dashboard...</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-4">
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 text-base"
                onClick={handleConfirmPayment}
                disabled={!uploadedFile || isUploading || isConfirmed}
              >
                {isConfirmed ? 'Confirmed' : 'Confirm Payment'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Bottom-left branding icon */}
        <div className="absolute bottom-4 left-4">
          <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">N</span>
          </div>
        </div>
      </div>
    </div>
  )
} 