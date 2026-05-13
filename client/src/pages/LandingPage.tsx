import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Zap, Target, Users, TrendingUp, ChevronRight, Cpu } from "lucide-react";

export function LandingPage() {
  return (
    <div className="relative isolate overflow-hidden">
      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:pt-40">
        <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
          <div className="mt-24 sm:mt-32 lg:mt-16">
            <motion.a 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              href="#" 
              className="inline-flex space-x-6"
            >
              <span className="rounded-full bg-verse-600/10 px-3 py-1 text-sm font-semibold leading-6 text-energy-neon ring-1 ring-inset ring-verse-600/20">
                What's new
              </span>
              <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-ink-300">
                <span>Just shipped v1.0</span>
                <ChevronRight className="h-5 w-5 text-ink-500" aria-hidden="true" />
              </span>
            </motion.a>
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-10 font-display text-4xl font-bold tracking-tight text-white sm:text-6xl"
          >
            Passive viewing is <span className="text-energy-neon">History</span>.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg leading-8 text-ink-300"
          >
            FanVerse AI transforms every match into an intelligent interactive experience. 
            Get real-time insights, make predictions, and engage with fans like never before.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex items-center gap-x-6"
          >
            <Link to="/dashboard" className="btn-primary">
              Enter FanVerse
            </Link>
            <a href="#features" className="text-sm font-semibold leading-6 text-white flex items-center gap-1 hover:text-energy-neon transition-colors">
              Live Demo <span aria-hidden="true">→</span>
            </a>
          </motion.div>
        </div>
        
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none"
          >
            <div className="rounded-2xl glass-card p-2 bg-ink-900/50">
              <img
                src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=1200"
                alt="App screenshot"
                width={2432}
                height={1442}
                className="w-[76rem] rounded-xl shadow-2xl ring-1 ring-white/10"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features */}
      <div id="features" className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-energy-neon">Dominate the Second Screen</h2>
          <p className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Everything you need to level up your fan experience
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {[
              { name: 'AI Insights', icon: Cpu, desc: 'Real-time strategic analysis powered by Google Gemini.' },
              { name: 'Live Pulse', icon: Zap, desc: 'Context-aware updates that react to every play.' },
              { name: 'Gamified Play', icon: Target, desc: 'Make predictions and climb the global leaderboards.' },
              { name: 'Fan Synergy', icon: Users, desc: 'Connect with other fans in synchronized chat rooms.' },
            ].map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-verse-600 shadow-neon">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-ink-400">
                  <p className="flex-auto">{feature.desc}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
