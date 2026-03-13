import Link from "next/link";
import { Code2, Blocks, ShoppingCart, Wrench, FileCode2, ArrowRight } from "lucide-react";

const features = [
  {
    title: "Developer Tools",
    description: "Online coding tools, editors, and playgrounds to test and run your code instantly.",
    icon: Code2,
    href: "/tools",
    color: "from-blue-500 to-cyan-400",
  },
  {
    title: "Widget Generator",
    description: "Ready-to-use embeddable widgets (forms, galleries, popups) for your websites.",
    icon: Blocks,
    href: "/widgets",
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Code Marketplace",
    description: "Premium UI templates, React components, and JS plugins ready for production.",
    icon: ShoppingCart,
    href: "/marketplace",
    color: "from-emerald-400 to-teal-500",
  },
  {
    title: "SaaS Utilities",
    description: "Powerful mini-tools like image processors, format converters, and code minifiers.",
    icon: Wrench,
    href: "/saas",
    color: "from-orange-400 to-red-500",
  },
  {
    title: "Free Resources",
    description: "Open-source snippets, CSS tricks, and UI components available for free.",
    icon: FileCode2,
    href: "/resources",
    color: "from-indigo-400 to-blue-600",
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[150px] -z-10" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full glass border-primary/30 text-primary text-sm font-medium">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          The Ultimate Developer Ecosystem
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
          Build Faster with <br />
          <span className="neon-text">Kodarafroj</span>
        </h1>
        
        <p className="text-xl text-neutral-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          Everything you need to ship products faster. From embeddable widgets and premium code templates to powerful online developer tools.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/tools" 
            className="px-8 py-4 rounded-full bg-foreground text-background font-semibold hover:scale-105 transition-transform flex items-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            Explore Tools <ArrowRight className="w-4 h-4" />
          </Link>
          <Link 
            href="/marketplace" 
            className="px-8 py-4 rounded-full glass font-semibold hover:bg-white/10 transition-colors"
          >
            Browse Marketplace
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">A complete ecosystem</h2>
          <p className="text-neutral-400">Five powerful platforms combined into one seamless experience.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <Link 
              key={idx} 
              href={feature.href}
              className="group glass-card p-8 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
            >
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${feature.color}`} />
              
              <div className={`w-14 h-14 rounded-2xl mb-6 flex items-center justify-center bg-gradient-to-br ${feature.color} bg-opacity-10`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-neutral-400 leading-relaxed group-hover:text-neutral-300 transition-colors">
                {feature.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
