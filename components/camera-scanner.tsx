"use client"

import type React from "react"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Camera, Upload, X, Zap, AlertCircle, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface CameraScannerProps {
  onCapture: (imageData: string) => void
  onManualInput?: (input: { type: "name" | "barcode"; value: string }) => void
}

export function CameraScanner({ onCapture, onManualInput }: CameraScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [error, setError] = useState("")
  const [scanQuality, setScanQuality] = useState<"good" | "poor" | null>(null)
  const [cameraPermission, setCameraPermission] = useState<"granted" | "denied" | "pending">("pending")
  const [showManualInput, setShowManualInput] = useState(false)
  const [manualFoodName, setManualFoodName] = useState("")
  const [manualBarcode, setManualBarcode] = useState("")

  const startCamera = async () => {
    try {
      setError("")
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
          aspectRatio: { ideal: 16 / 9 },
        },
        audio: false,
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play().catch((err) => {
            console.error("Play error:", err)
            setError("Failed to start camera stream")
          })
        }
        setIsCameraActive(true)
        setCameraPermission("granted")
      }
    } catch (err: any) {
      setCameraPermission("denied")
      if (err.name === "NotAllowedError") {
        setError("Camera permission denied. Please enable camera access in settings.")
      } else if (err.name === "NotFoundError") {
        setError("No camera device found on this device.")
      } else {
        setError("Unable to access camera. Please check permissions and try again.")
      }
    }
  }

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach((track) => track.stop())
      setIsCameraActive(false)
    }
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d")
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth
        canvasRef.current.height = videoRef.current.videoHeight
        context.drawImage(videoRef.current, 0, 0)
        const imageData = canvasRef.current.toDataURL("image/jpeg", 0.95)
        setCapturedImage(imageData)

        const imageDataArray = context.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height).data
        let brightness = 0
        let contrast = 0
        let sharpness = 0

        // Calculate brightness
        for (let i = 0; i < imageDataArray.length; i += 4) {
          brightness += (imageDataArray[i] + imageDataArray[i + 1] + imageDataArray[i + 2]) / 3
        }
        brightness = brightness / (imageDataArray.length / 4)

        // Calculate contrast (standard deviation)
        const mean = brightness
        let variance = 0
        for (let i = 0; i < imageDataArray.length; i += 4) {
          const pixelBrightness = (imageDataArray[i] + imageDataArray[i + 1] + imageDataArray[i + 2]) / 3
          variance += Math.pow(pixelBrightness - mean, 2)
        }
        contrast = Math.sqrt(variance / (imageDataArray.length / 4))

        // Estimate sharpness using edge detection
        const width = canvasRef.current.width
        const height = canvasRef.current.height
        let edgeCount = 0
        for (let i = 4; i < imageDataArray.length - 4; i += 4) {
          const diff = Math.abs(imageDataArray[i] - imageDataArray[i - 4])
          if (diff > 30) edgeCount++
        }
        sharpness = (edgeCount / (imageDataArray.length / 4)) * 100

        // Determine quality based on metrics
        const qualityScore =
          (brightness > 50 && brightness < 200 ? 30 : 0) +
          (contrast > 30 && contrast < 100 ? 35 : 0) +
          (sharpness > 5 ? 35 : 0)

        if (qualityScore >= 80) {
          setScanQuality("good")
        } else if (qualityScore >= 50) {
          setScanQuality("poor")
        } else {
          setScanQuality("poor")
        }

        stopCamera()
      }
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB")
        return
      }

      if (!file.type.startsWith("image/")) {
        setError("Please upload a valid image file")
        return
      }

      const reader = new FileReader()
      reader.onload = (event) => {
        const imageData = event.target?.result as string
        setCapturedImage(imageData)
        setScanQuality("good")
      }
      reader.readAsDataURL(file)
    }
  }

  const handleConfirm = () => {
    if (capturedImage) {
      onCapture(capturedImage)
      setCapturedImage(null)
      setScanQuality(null)
    }
  }

  const handleReset = () => {
    setCapturedImage(null)
    setScanQuality(null)
    setError("")
  }

  const handleManualInputSubmit = () => {
    if (manualFoodName.trim()) {
      onManualInput?.({ type: "name", value: manualFoodName })
      setManualFoodName("")
      setShowManualInput(false)
    } else if (manualBarcode.trim()) {
      onManualInput?.({ type: "barcode", value: manualBarcode })
      setManualBarcode("")
      setShowManualInput(false)
    } else {
      setError("Please enter a food name or barcode")
    }
  }

  if (capturedImage) {
    return (
      <Card className="p-6 space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Review Your Scan</h3>

        {scanQuality && (
          <div
            className={`p-3 rounded-lg flex items-center gap-2 ${
              scanQuality === "good" ? "bg-green-50 border border-green-200" : "bg-yellow-50 border border-yellow-200"
            }`}
          >
            {scanQuality === "good" ? (
              <>
                <Zap className="w-4 h-4 text-green-600" />
                <span className="text-sm font-semibold text-green-700">Excellent scan quality</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-4 h-4 text-yellow-600" />
                <span className="text-sm font-semibold text-yellow-700">
                  Poor lighting detected. Try again for better accuracy.
                </span>
              </>
            )}
          </div>
        )}

        <div className="relative rounded-lg overflow-hidden bg-muted">
          <img src={capturedImage || "/placeholder.svg"} alt="Captured food" className="w-full h-auto" />
        </div>

        <div className="flex gap-3">
          <Button onClick={handleConfirm} className="flex-1">
            Analyze This Image
          </Button>
          <Button onClick={handleReset} variant="outline" className="flex-1 bg-transparent">
            Retake
          </Button>
        </div>
      </Card>
    )
  }

  if (showManualInput) {
    return (
      <Card className="p-6 space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Search by Name or Barcode</h3>

        {error && (
          <div className="p-3 bg-destructive/10 text-destructive rounded-lg text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Food Name</label>
            <Input
              placeholder="e.g., Organic Whole Wheat Bread"
              value={manualFoodName}
              onChange={(e) => {
                setManualFoodName(e.target.value)
                setError("")
              }}
              className="w-full"
            />
          </div>

          <div className="text-center text-muted-foreground text-sm">OR</div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Barcode Number</label>
            <Input
              placeholder="e.g., 012345678901"
              value={manualBarcode}
              onChange={(e) => {
                setManualBarcode(e.target.value)
                setError("")
              }}
              className="w-full"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={handleManualInputSubmit} className="flex-1">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
          <Button
            onClick={() => {
              setShowManualInput(false)
              setManualFoodName("")
              setManualBarcode("")
              setError("")
            }}
            variant="outline"
            className="flex-1 bg-transparent"
          >
            Back
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6 space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Scan Food Label</h3>

      {error && (
        <div className="p-3 bg-destructive/10 text-destructive rounded-lg text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}

      {isCameraActive ? (
        <div className="space-y-4">
          <div className="relative rounded-lg overflow-hidden bg-black w-full">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-auto block"
              style={{ maxHeight: "500px", objectFit: "cover", display: "block" }}
            />
            <div className="absolute inset-0 border-2 border-primary/50 rounded-lg pointer-events-none">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-primary rounded-lg" />
              <div className="absolute top-2 left-2 right-2 text-white text-xs font-semibold bg-black/50 p-2 rounded">
                Position label within the frame
              </div>
              <div className="absolute bottom-2 left-2 right-2 text-white text-xs bg-black/50 p-2 rounded space-y-1">
                <p>Tips for best results:</p>
                <p>• Good lighting on label</p>
                <p>• Keep label flat and centered</p>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button onClick={capturePhoto} className="flex-1">
              <Camera className="w-4 h-4 mr-2" />
              Capture
            </Button>
            <Button onClick={stopCamera} variant="outline" className="flex-1 bg-transparent">
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative rounded-lg overflow-hidden bg-black border-2 border-dashed border-primary/30">
            <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 border-2 border-primary/40 rounded-lg" />
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 pointer-events-none">
                <Camera className="w-12 h-12 text-primary/40" />
                <p className="text-sm text-muted-foreground text-center px-4">Camera preview will appear here</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button onClick={startCamera} className="w-full">
              <Camera className="w-4 h-4 mr-2" />
              Open Camera
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-muted-foreground">Or</span>
              </div>
            </div>
            <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="w-full">
              <Upload className="w-4 h-4 mr-2" />
              Upload Image
            </Button>
            <Button onClick={() => setShowManualInput(true)} variant="outline" className="w-full">
              <Search className="w-4 h-4 mr-2" />
              Search by Name/Barcode
            </Button>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          </div>
        </div>
      )}

      <Card className="p-3 bg-blue-50 border-blue-200">
        <p className="text-xs font-semibold text-blue-900 mb-2">Tips for best results:</p>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>• Ensure good lighting on the nutrition label</li>
          <li>• Keep the label flat and centered in frame</li>
          <li>• Avoid shadows and glare</li>
          <li>• Make sure all text is clearly visible</li>
          <li>• Use steady hands or a tripod for better focus</li>
        </ul>
      </Card>

      <canvas ref={canvasRef} className="hidden" />
    </Card>
  )
}
