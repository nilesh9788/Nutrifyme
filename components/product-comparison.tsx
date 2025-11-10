"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProductComparisonProps {
  currentProduct: string
}

export function ProductComparison({ currentProduct }: ProductComparisonProps) {
  const similarProducts = [
    {
      name: "Whole Grain Bread",
      brand: "Dave's Killer Bread",
      score: 82,
      risk: "low",
      price: "$4.99",
    },
    {
      name: "Sprouted Grain Bread",
      brand: "Ezekiel",
      score: 88,
      risk: "low",
      price: "$5.49",
    },
    {
      name: "Multigrain Bread",
      brand: "Sara Lee",
      score: 65,
      risk: "medium",
      price: "$2.99",
    },
  ]

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold text-foreground mb-6">Similar Products</h2>

      <div className="space-y-4">
        {similarProducts.map((product, idx) => (
          <div key={idx} className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold text-foreground">{product.name}</h3>
                <p className="text-sm text-muted-foreground">{product.brand}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">{product.score}</div>
                <p className="text-xs text-muted-foreground">Score</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge
                  className={
                    product.risk === "low"
                      ? "bg-green-100 text-green-800"
                      : product.risk === "medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                  }
                >
                  {product.risk.charAt(0).toUpperCase() + product.risk.slice(1)} Risk
                </Badge>
              </div>
              <span className="font-semibold text-foreground">{product.price}</span>
            </div>
          </div>
        ))}
      </div>

      <p className="text-sm text-muted-foreground mt-6 text-center">
        Prices and availability may vary by location. Click on a product to compare in detail.
      </p>
    </Card>
  )
}
