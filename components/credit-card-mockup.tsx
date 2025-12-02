"use client"

import { useEffect, useState } from "react"
import { CreditCard } from "lucide-react"

interface CreditCardMockupProps {
  cardNumber?: string
  expiryDate?: string
  cvv?: string
  cardholderName?: string
}

interface BinLookupData {
  bank?: string
  type?: string
  brand?: string
  scheme?: string
}

function useBinLookup(cardNumber?: string) {
  const [binData, setBinData] = useState<BinLookupData | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!cardNumber || cardNumber.length < 6) {
      setBinData(null)
      return
    }

    const bin = cardNumber.replace(/\s/g, "").substring(0, 6)

    const fetchBinData = async () => {
      setLoading(true)
      try {
        const response = await fetch(`https://api.api-ninjas.com/v2/bin?bin=${bin}`, {
          headers: {
            "X-Api-Key": "p244V2UrQXjP7LJ1ER1Wlg==kjPsKpNr2cHk3FkN",
          },
        })

        if (response.ok) {
          const data = await response.json()
          console.log(" API Ninjas response:", data)
          const binInfo = Array.isArray(data) && data.length > 0 ? data[0] : null

          if (binInfo) {
            setBinData({
              bank: binInfo.issuer, // API uses "issuer" field for bank name
              type: binInfo.type,
              brand: binInfo.brand,
              scheme: binInfo.brand,
            })
          } else {
            setBinData(null)
          }
        } else {
          console.log(" API response not OK:", response.status)
          setBinData(null)
        }
      } catch (error) {
        console.error("BIN lookup failed:", error)
        setBinData(null)
      } finally {
        setLoading(false)
      }
    }

    fetchBinData()
  }, [cardNumber])

  return { binData, loading }
}

export function CreditCardMockup({ cardNumber, expiryDate, cvv, cardholderName }: CreditCardMockupProps) {
  const { binData, loading } = useBinLookup(cardNumber)

  const formatCardNumber = (num?: string) => {
    if (!num) return "•••• •••• •••• ••••"
    return num.replace(/(\d{4})/g, "$1 ").trim()
  }

  const getCardGradient = () => {
    const brand = binData?.brand?.toLowerCase() || binData?.scheme?.toLowerCase()

    switch (brand) {
      case "visa":
        return "from-blue-600 via-blue-500 to-blue-700 text-white"
      case "mastercard":
        return "from-orange-600 via-red-500 to-red-700 text-white"
      case "amex":
      case "american express":
        return "from-teal-600 via-teal-500 to-cyan-600 text-white"
      case "discover":
        return "from-orange-500 via-orange-600 to-yellow-600 text-white"
      default:
        return "from-primary via-chart-5 to-chart-4 text-white"
    }
  }

  const getCardTypeDisplay = () => {
    if (loading) return "جاري التحميل..."
    if (!binData) return "بطاقة ائتمان"

    const parts = []
    if (binData.bank) parts.push(binData.bank.toUpperCase())
    if (binData.type) {
      const typeMap: Record<string, string> = {
        debit: "debit",
        credit: "credit",
        prepaid: "prepaid",
      }
      parts.push(typeMap[binData.type.toLowerCase()] || binData.type)
    }

    return parts.length > 0 ? parts.join(" - ") : "بطاقة ائتمان"
  }

  return (
    <div
      className={`w-full aspect-[1.586/1] bg-gradient-to-br ${getCardGradient()} rounded-2xl p-6 text-primary-foreground shadow-2xl relative overflow-hidden`}
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl" />
      </div>

      <div className="flex flex-col h-full justify-between relative z-10">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 bg-warning/20 rounded-full flex items-center justify-center">
              <CreditCard className="w-6 h-6" />
            </div>
           
          </div>
          <span className="text-xs font-medium">{getCardTypeDisplay()}</span>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-xs opacity-70 mb-1">رقم البطاقة</p>
            <p className="text-lg font-mono tracking-wider" dir="ltr">
              {formatCardNumber(cardNumber)}
            </p>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs opacity-70 mb-1">اسم حامل البطاقة</p>
              <p className="text-sm font-medium">{cardholderName || "—"}</p>
            </div>
            <div className="text-left">
              <p className="text-xs opacity-70 mb-1">انتهاء الصلاحية</p>
              <p className="text-sm font-mono" dir="ltr">
                {expiryDate || "••/••"}
              </p>
            </div>
            <div className="text-left">
              <p className="text-xs opacity-70 mb-1">CVV</p>
              <p className="text-sm font-mono" dir="ltr">
                {cvv || "•••"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
