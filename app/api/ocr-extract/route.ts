import { type NextRequest, NextResponse } from "next/server"
import { ocrService } from "@/lib/ocr-service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { imageData } = body

    if (!imageData) {
      return NextResponse.json({ error: "Missing imageData" }, { status: 400 })
    }

    // Extract nutrition data from image
    const extractedData = await ocrService.extractNutritionFromImage(imageData)

    // Validate extracted data
    if (!ocrService.validateNutritionData(extractedData)) {
      return NextResponse.json(
        { error: "Failed to extract valid nutrition data from image", data: extractedData },
        { status: 400 },
      )
    }

    // Calculate macro percentages
    const macros = ocrService.calculateMacroPercentages(extractedData)

    return NextResponse.json(
      {
        success: true,
        data: {
          ...extractedData,
          macroPercentages: macros,
        },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("OCR extraction error:", error)
    return NextResponse.json({ error: "Failed to extract nutrition data from image" }, { status: 500 })
  }
}
