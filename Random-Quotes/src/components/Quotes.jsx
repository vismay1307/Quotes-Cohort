import { useEffect, useState } from 'react'

const Quotes = () => {
  const [quotes, setQuotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const res = await fetch("https://api.freeapi.app/api/v1/public/quotes")
        const data = await res.json()
        setQuotes(data.data.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchQuotes()
  }, [])

  const colors = [
    { border: 'border-orange-300/30', accent: 'text-orange-300', bg: 'bg-orange-300/5' },
    { border: 'border-blue-300/30',   accent: 'text-blue-300',   bg: 'bg-blue-300/5'   },
    { border: 'border-white/20',      accent: 'text-white/60',   bg: 'bg-white/5'       },
  ]

  return (
    <div className="min-h-screen bg-[#0c0c0f] px-4 py-12">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs tracking-widest text-slate-500 uppercase mb-2">Collection</p>
          <h1 className="text-2xl font-medium text-white">Motivation Lelllooooo</h1>
        </div>

        <div className="flex flex-col gap-4">
          {loading
            ? [...Array(4)].map((_, i) => (
                <div key={i} className="rounded-2xl border border-white/8 bg-white/5 p-6 animate-pulse">
                  <div className="h-3 bg-white/10 rounded-full w-full mb-2" />
                  <div className="h-3 bg-white/10 rounded-full w-4/5 mb-2" />
                  <div className="h-3 bg-white/10 rounded-full w-3/5 mb-6" />
                  <div className="h-3 bg-white/10 rounded-full w-1/4" />
                </div>
              ))
            : quotes.map((quote, i) => {
                const c = colors[i % colors.length]
                return (
                  <div
                    key={quote.id}
                    className={`rounded-2xl border ${c.border} ${c.bg} p-6 hover:brightness-110 transition-all duration-200`}
                  >
                    {/* Quote mark */}
                    <span className={`text-4xl leading-none font-serif ${c.accent} opacity-60`}>"</span>

                    <p className="text-slate-200 text-[15px] leading-relaxed -mt-2 mb-5">
                      {quote.content}
                    </p>

                    <div className="flex items-center gap-3">
                      {/* Avatar circle */}
                      <div className={`w-8 h-8 rounded-full border ${c.border} flex items-center justify-center shrink-0`}>
                        <span className={`text-xs font-medium ${c.accent}`}>
                          {quote.author?.[0] ?? '?'}
                        </span>
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium leading-none">{quote.author}</p>
                        <p className="text-slate-500 text-xs mt-1">@{quote.authorSlug}</p>
                      </div>
                    </div>
                  </div>
                )
              })
          }
        </div>
      </div>
    </div>
  )
}

export default Quotes