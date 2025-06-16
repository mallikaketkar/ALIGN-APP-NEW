"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, BookOpen, Zap, Heart, Target, TrendingUp } from "lucide-react"
import ArticleView from "@/components/article-view"

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

interface ProTipsPageProps {
  onBack: () => void
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

const articles: Article[] = [
  {
    id: "whey-protein-benefits",
    title: "Whey protein: Health benefits, side effects, and dangers",
    description:
      "Whey protein is a supplement that some people use to increase their protein intake or to help boost muscle protein synthesis and lean muscle mass growth.",
    author: "Dr. Kimberly Holland",
    source: "Medical News Today",
    date: "Feb 28, 2025",
    category: "nutrition",
    url: "https://www.medicalnewstoday.com/articles/263371",
    imageUrl: "/placeholder.svg?height=80&width=120",
  },
  {
    id: "start-day-protein",
    title: "Reasons You Should Always Start Your Day With Protein",
    description:
      "Starting your morning with protein can help stabilize blood sugar, increase satiety, and support muscle maintenance throughout the day.",
    author: "Karla Walsh",
    source: "Real Simple",
    date: "Mar 15, 2025",
    category: "nutrition",
    url: "https://www.realsimple.com/reasons-you-should-always-start-your-day-with-protein-11753560",
    imageUrl: "/placeholder.svg?height=80&width=120",
  },
  {
    id: "protein-benefits",
    title: "10 Science-Based Reasons to Eat More Protein",
    description:
      "Protein is incredibly important for your health, weight loss, and body composition. Here are 10 science-based reasons to eat more protein.",
    author: "Kris Gunnars, BSc",
    source: "Healthline",
    date: "Mar 10, 2025",
    category: "nutrition",
    url: "https://www.healthline.com/nutrition/10-reasons-to-eat-more-protein",
    imageUrl: "/placeholder.svg?height=80&width=120",
  },
  {
    id: "whey-protein-health",
    title: "10 Evidence-Based Health Benefits of Whey Protein",
    description:
      "Whey protein is not just for bodybuilders. Studies show it may help with weight loss, muscle gain, and overall health improvements.",
    author: "Rudy Mawer, MSc, CISSN",
    source: "Healthline",
    date: "Mar 5, 2025",
    category: "nutrition",
    url: "https://www.healthline.com/nutrition/10-health-benefits-of-whey-protein",
    imageUrl: "/placeholder.svg?height=80&width=120",
  },
  {
    id: "mental-skills-overview",
    title: "Nine Mental Skills Overview",
    description:
      "Learn the nine fundamental mental skills that can help athletes perform at their peak and maintain focus under pressure.",
    author: "Dr. Rob Bell",
    source: "Sport Psychology",
    date: "Mar 20, 2025",
    category: "mindset",
    url: "https://www.sportpsych.org/nine-mental-skills-overview",
    imageUrl: "/placeholder.svg?height=80&width=120",
  },
  {
    id: "train-mind-race-day",
    title: "Train Your Mind for Race Day",
    description:
      "Mental preparation is just as important as physical training. Learn strategies to optimize your mindset for competition day.",
    author: "Dr. Sarah Johnson",
    source: "Mayo Clinic",
    date: "Mar 18, 2025",
    category: "mindset",
    url: "https://www.mayoclinichealthsystem.org/hometown-health/speaking-of-health/train-your-mind-for-race-day",
    imageUrl: "/placeholder.svg?height=80&width=120",
  },
]

const categories = [
  {
    id: "nutrition",
    title: "NUTRITION",
    subtitle: "Fuel Your Performance",
    icon: <Heart className="w-6 h-6" />,
    color: "from-red-900 to-black",
  },
  {
    id: "training",
    title: "TRAINING",
    subtitle: "Optimize Your Workouts",
    icon: <Zap className="w-6 h-6" />,
    color: "from-red-800 to-black",
  },
  {
    id: "recovery",
    title: "RECOVERY",
    subtitle: "Rest & Regeneration",
    icon: <Target className="w-6 h-6" />,
    color: "from-black to-red-950",
  },
  {
    id: "mindset",
    title: "MINDSET",
    subtitle: "Mental Performance",
    icon: <TrendingUp className="w-6 h-6" />,
    color: "from-red-950 to-red-900",
  },
]

export default function ProTipsPage({ onBack }: ProTipsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)

  if (selectedArticle) {
    return <ArticleView article={selectedArticle} onBack={() => setSelectedArticle(null)} />
  }

  if (selectedCategory) {
    const categoryData = categories.find((cat) => cat.id === selectedCategory)
    const categoryArticles = articles.filter((article) => article.category === selectedCategory)

    return (
      <div
        className="min-h-screen bg-gray-50 p-4 text-gray-900 relative"
        style={{ fontFamily: "Avenir, -apple-system, BlinkMacSystemFont, sans-serif" }}
      >
        <DotMatrix />
        <div className="max-w-sm mx-auto space-y-6 relative z-10 pt-4 pb-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Button
              onClick={() => setSelectedCategory(null)}
              variant="ghost"
              size="sm"
              className="p-2 hover:bg-gray-200"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">{categoryData?.title}</h1>
            <div className="w-9" />
          </div>

          {/* Category Header */}
          <Card
            className={`relative overflow-hidden bg-gradient-to-br ${categoryData?.color} border-0 shadow-xl rounded-2xl`}
          >
            <CardContent className="relative p-6 text-white">
              <div className="flex items-center gap-4">
                {categoryData?.icon}
                <div>
                  <h2 className="text-xl font-bold tracking-tight">{categoryData?.title}</h2>
                  <p className="text-white/80 text-sm font-medium">{categoryData?.subtitle}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Articles List */}
          <div className="space-y-4">
            {categoryArticles.length > 0 ? (
              categoryArticles.map((article) => (
                <Card key={article.id} className="bg-white border-0 shadow-sm rounded-2xl overflow-hidden">
                  <CardContent className="p-0">
                    <Button
                      onClick={() => setSelectedArticle(article)}
                      variant="ghost"
                      className="w-full p-4 h-auto hover:bg-gray-50 rounded-2xl text-left"
                    >
                      <div className="w-full space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-gray-900 rounded-sm flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs font-bold">{article.source.charAt(0)}</span>
                          </div>
                          <span className="text-xs font-medium text-gray-600">{article.source}</span>
                        </div>
                        <h3 className="text-sm font-bold text-gray-900 leading-tight break-words whitespace-normal">
                          {article.title}
                        </h3>
                        <p className="text-xs text-gray-600 leading-relaxed break-words whitespace-normal">
                          By {article.author}
                        </p>
                        <p className="text-xs text-gray-500 font-medium">{article.date}</p>
                      </div>
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="bg-white border-0 shadow-sm rounded-2xl">
                <CardContent className="p-8 text-center">
                  <p className="text-gray-500 font-light">No articles available in this category yet.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Main Pro Tips view
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
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Pro Tips</h1>
          <div className="w-9" />
        </div>

        {/* Hero Card */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-red-900 to-black border-0 shadow-xl rounded-2xl">
          <CardContent className="relative p-6 text-white">
            <div className="text-center space-y-4">
              <BookOpen className="w-12 h-12 text-white mx-auto" />
              <div>
                <h2 className="text-2xl font-bold tracking-tight">EXPERT INSIGHTS</h2>
                <p className="text-gray-200 text-sm font-medium mt-2">Performance optimization content</p>
              </div>
              <p className="text-gray-200 font-medium text-sm leading-relaxed">
                Access curated articles from top sports scientists, nutritionists, and performance experts to elevate
                your training.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Categories Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-lg font-bold text-gray-900">Categories</h3>
            <Badge variant="secondary" className="text-xs">
              {articles.length} articles
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category) => {
              const articleCount = articles.filter((article) => article.category === category.id).length
              return (
                <Card
                  key={category.id}
                  className={`relative overflow-hidden bg-gradient-to-br ${category.color} border-0 shadow-xl rounded-2xl`}
                >
                  <CardContent className="relative p-0">
                    <Button
                      onClick={() => setSelectedCategory(category.id)}
                      variant="ghost"
                      className="w-full h-40 flex flex-col items-center justify-center gap-3 hover:bg-black/10 rounded-2xl text-white"
                    >
                      {category.icon}
                      <div className="text-center">
                        <div className="text-lg font-bold tracking-tight">{category.title}</div>
                        <div className="text-xs text-white/80 font-medium mt-1">{category.subtitle}</div>
                        <Badge className="bg-white/20 text-white text-xs px-2 py-1 font-medium mt-2">
                          {articleCount} articles
                        </Badge>
                      </div>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Latest Articles Preview */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900 px-2">Latest Articles</h3>
          <div className="space-y-3">
            {articles
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .slice(0, 3)
              .map((article) => (
                <Card key={article.id} className="bg-white border-0 shadow-sm rounded-2xl overflow-hidden">
                  <CardContent className="p-0">
                    <Button
                      onClick={() => setSelectedArticle(article)}
                      variant="ghost"
                      className="w-full p-4 h-auto hover:bg-gray-50 rounded-2xl text-left"
                    >
                      <div className="w-full space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <div className="w-6 h-6 bg-gray-900 rounded-sm flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs font-bold">{article.source.charAt(0)}</span>
                          </div>
                          <span className="text-xs font-medium text-gray-600">{article.source}</span>
                          <Badge variant="outline" className="text-xs px-2 py-0">
                            {categories.find((cat) => cat.id === article.category)?.title}
                          </Badge>
                        </div>
                        <h3 className="text-sm font-bold text-gray-900 leading-tight break-words whitespace-normal">
                          {article.title}
                        </h3>
                        <p className="text-xs text-gray-600 leading-relaxed break-words whitespace-normal">
                          By {article.author}
                        </p>
                        <p className="text-xs text-gray-500 font-medium">{article.date}</p>
                      </div>
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
