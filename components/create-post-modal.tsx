"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, ImageIcon } from "lucide-react"

interface CreatePostModalProps {
  onClose: () => void
}

export function CreatePostModal({ onClose }: CreatePostModalProps) {
  const [content, setContent] = useState("")
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)

  const recentProducts = [
    { id: "1", name: "Organic Whole Wheat Bread", score: 78 },
    { id: "2", name: "Greek Yogurt", score: 85 },
    { id: "3", name: "Granola Cereal", score: 62 },
  ]

  const handlePost = () => {
    // Handle post creation
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Share Your Discovery</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="space-y-4">
          {/* Content Input */}
          <textarea
            placeholder="What did you discover about this product? Share your thoughts..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-4 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            rows={4}
          />

          {/* Product Selection */}
          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">Select Product (Optional)</label>
            <div className="grid grid-cols-1 gap-2">
              {recentProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => setSelectedProduct(product.id)}
                  className={`p-3 rounded-lg border-2 text-left transition-colors ${
                    selectedProduct === product.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <p className="font-semibold text-foreground">{product.name}</p>
                  <p className="text-sm text-muted-foreground">Score: {product.score}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <ImageIcon className="w-4 h-4 mr-2" />
              Add Image
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handlePost} disabled={!content.trim()}>
                Post
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
