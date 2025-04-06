import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Rocket, Zap, BrainCircuit, GitMerge, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const LandingPage = () => {
  useEffect(() => {
    document.title = "Dwel | Where Ideas Live and Grow";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-8 sm:px-6 md:pt-16 lg:px-8">
        <nav className="flex items-center justify-between py-6">
          <div className="flex items-center animate-fade-in">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-synergy-purple to-synergy-blue animate-pulse-slow" />
            <span className="ml-3 text-2xl font-bold text-white">Dwel</span>
          </div>
          <div className="flex items-center gap-4 animate-slide-in">
            <Link to="/auth" className="text-sm text-muted-foreground hover:text-white transition-colors">
              Login
            </Link>
            <Link to="/auth">
              <Button className="bg-gradient-to-r from-synergy-purple to-synergy-blue hover:brightness-110 transition-all">
                Get Started
              </Button>
            </Link>
          </div>
        </nav>

        <div className="mt-16 flex flex-col items-center text-center">
          <h1 className="text-5xl font-bold sm:text-6xl md:text-7xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Where Ideas
            </span>
            <br />
            <span className="bg-gradient-to-r from-synergy-purple to-synergy-blue bg-clip-text text-transparent">
              Live and Grow
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground animate-fade-in" style={{ animationDelay: "0.4s" }}>
            Break the red tape. Dwel combines AI-powered insights, team management, and project 
            tracking in one seamless platform to maximize your team's potential.
          </p>
          <div className="mt-10 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <Link to="/auth">
              <Button size="lg" className="bg-gradient-to-r from-synergy-purple to-synergy-blue hover:brightness-110 transition-all hover-scale">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-24 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-border bg-card/30 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-synergy-purple/50 hover:shadow-synergy-purple/20 animate-fade-in" style={{ animationDelay: "0.8s" }}>
            <div className="rounded-full bg-synergy-purple/20 p-3 w-fit">
              <BrainCircuit className="h-6 w-6 text-synergy-purple" />
            </div>
            <h3 className="mt-4 text-xl font-medium">AI-Powered Insights</h3>
            <p className="mt-2 text-muted-foreground">
              Make data-driven decisions with our advanced AI analytics and team recommendations.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card/30 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-synergy-blue/50 hover:shadow-synergy-blue/20 animate-fade-in" style={{ animationDelay: "1s" }}>
            <div className="rounded-full bg-synergy-blue/20 p-3 w-fit">
              <GitMerge className="h-6 w-6 text-synergy-blue" />
            </div>
            <h3 className="mt-4 text-xl font-medium">Streamlined Workflow</h3>
            <p className="mt-2 text-muted-foreground">
              Cut through bureaucracy with intelligent task allocation and progress tracking.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card/30 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-amber-500/50 hover:shadow-amber-500/20 animate-fade-in" style={{ animationDelay: "1.2s" }}>
            <div className="rounded-full bg-amber-500/20 p-3 w-fit">
              <Zap className="h-6 w-6 text-amber-500" />
            </div>
            <h3 className="mt-4 text-xl font-medium">Team Recognition</h3>
            <p className="mt-2 text-muted-foreground">
              Motivate your team with our innovative Egg Ranking System that celebrates excellence.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card/30 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-green-500/50 hover:shadow-green-500/20 animate-fade-in" style={{ animationDelay: "1.4s" }}>
            <div className="rounded-full bg-green-500/20 p-3 w-fit">
              <Sparkles className="h-6 w-6 text-green-500" />
            </div>
            <h3 className="mt-4 text-xl font-medium">Real-time Collaboration</h3>
            <p className="mt-2 text-muted-foreground">
              Connect your team with powerful tools for seamless communication and project management.
            </p>
          </div>
        </div>

        <div className="mt-24 rounded-xl border border-border bg-card/30 p-8 shadow-lg backdrop-blur-sm hover:shadow-synergy-purple/10 transition-all duration-300 animate-fade-in" style={{ animationDelay: "1.6s" }}>
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Break the red tape. Simplify operations.
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Join thousands of teams who have improved their productivity by 35% using Dwel's 
              streamlined approach. Available for everyone.
            </p>
            <Link to="/auth" className="mt-8">
              <Button size="lg" className="bg-gradient-to-r from-synergy-purple to-synergy-blue hover:brightness-110 transition-all hover-scale">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>

        <footer className="mt-24 border-t border-border py-8 text-center text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "1.8s" }}>
          <p>© 2025 Dwel. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
