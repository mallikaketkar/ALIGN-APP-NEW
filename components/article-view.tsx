"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ExternalLink, Calendar, User } from "lucide-react"

const DotMatrix = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <div
        className="w-full h-full opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle, #333 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      />
    </div>
  )
}

interface Article {
  id: string
  title: string
  description: string
  author: string
  source: string
  date: string
  category: "nutrition" | "training" | "recovery" | "mindset"
  url: string
  imageUrl: string
}

interface ArticleViewProps {
  article: Article
  onBack: () => void
}

const getCategoryColor = (category: string) => {
  const colors = {
    nutrition: "bg-red-600",
    training: "bg-black",
    recovery: "bg-red-600",
    mindset: "bg-black",
  }
  return colors[category as keyof typeof colors] || "bg-black"
}

const getCategoryTitle = (category: string) => {
  const titles = {
    nutrition: "NUTRITION",
    training: "TRAINING",
    recovery: "RECOVERY",
    mindset: "MINDSET",
  }
  return titles[category as keyof typeof titles] || category.toUpperCase()
}

export default function ArticleView({ article, onBack }: ArticleViewProps) {
  const handleReadFullArticle = () => {
    window.open(article.url, "_blank", "noopener,noreferrer")
  }

  return (
    <div
      className="min-h-screen bg-gray-50 p-4 text-gray-900 relative"
      style={{ fontFamily: "Avenir, -apple-system, BlinkMacSystemFont, sans-serif" }}
    >
      <DotMatrix />
      <div className="max-w-sm mx-auto space-y-6 relative z-10 pt-4 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button onClick={onBack} variant="ghost" size="sm" className="p-2 hover:bg-gray-200">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Badge className="bg-black text-white text-xs px-3 py-1 font-medium">
            {getCategoryTitle(article.category)}
          </Badge>
          <div className="w-9" />
        </div>

        {/* Article Header Card */}
        <Card className={`relative overflow-hidden ${getCategoryColor(article.category)} border-0 shadow-xl rounded-2xl`}>
          <CardContent className="relative p-6 text-white">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">{article.source.charAt(0)}</span>
                </div>
                <div>
                  <p className="text-white/90 text-sm font-medium">{article.source}</p>
                  <div className="flex items-center gap-2 text-white/70 text-xs">
                    <Calendar className="w-3 h-3" />
                    <span>{article.date}</span>
                  </div>
                </div>
              </div>
              <h1 className="text-xl font-bold tracking-tight leading-tight break-words">{article.title}</h1>
            </div>
          </CardContent>
        </Card>

        {/* Article Content */}
        <Card className="bg-white border-0 shadow-sm rounded-2xl">
          <CardContent className="p-6">
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-black">Article Summary</h2>
              <p className="text-gray-700 font-light text-sm leading-relaxed break-words">{article.description}</p>

              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-gray-600 text-xs mb-4">
                  <User className="w-3 h-3" />
                  <span>By {article.author}</span>
                </div>

                <Button
                  onClick={handleReadFullArticle}
                  className="w-full bg-red-600 text-white hover:bg-red-700 font-bold tracking-wide h-14 text-base rounded-xl shadow-lg"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  READ FULL ARTICLE
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <Card className="bg-white border-0 shadow-sm rounded-2xl">
          <CardContent className="p-6">
            <div className="text-center space-y-3">
              <h3 className="text-lg font-bold text-black">Expert Content</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                This article has been curated from trusted sources to provide you with evidence-based insights for
                optimizing your athletic performance.
              </p>
              <div className="pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-500 font-medium">
                  Content sourced from verified health and fitness publications
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}