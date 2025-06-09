import { useState, useEffect } from "react";
import emailjs from '@emailjs/browser';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Menu, 
  X, 
  Zap, 
  RefreshCw, 
  Shield, 
  Eye, 
  Rocket,
  Clock,
  Users,
  Check,
  ChevronRight,
  Mail,
  Github,
  Twitter,
  Linkedin,
  ArrowRight
} from "lucide-react";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [waitlistCount, setWaitlistCount] = useState(523);
  const [emailLoading, setEmailLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleWaitlistSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const name = formData.get('name') as string;

    try {
      await emailjs.send(
        'service_d8t3dco',
        'template_lx5cy1k',
        {
          user_email: email,
          user_name: name || 'Anonymous',
          signup_time: new Date().toISOString(),
          page_source: 'Stackmatch Landing Page',
          user_agent: navigator.userAgent
        },
        'jIfbigUEJwEs73kCr'
      );

      setWaitlistCount(prev => prev + 1);
      toast({
        title: "Welcome to the Stackmatch Waitlist! 🎉",
        description: "You'll be among the first to access Stackmatch when we launch.",
      });
      
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Error submitting to waitlist:', error);
      toast({
        title: "Oops! Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setEmailLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold gradient-text">Stackmatch</span>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <button onClick={() => scrollToSection('about')} className="hover:text-purple-400 transition-colors">About</button>
                <button onClick={() => scrollToSection('features')} className="hover:text-purple-400 transition-colors">Features</button>
                <button onClick={() => scrollToSection('how-it-works')} className="hover:text-purple-400 transition-colors">How It Works</button>
                <button onClick={() => scrollToSection('waitlist')} className="hover:text-purple-400 transition-colors">Join Waitlist</button>
              </div>
            </div>

            <div className="hidden md:block">
              <Button onClick={() => scrollToSection('waitlist')} className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                Join Waitlist
              </Button>
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button onClick={() => scrollToSection('about')} className="block px-3 py-2 text-white hover:text-purple-400">About</button>
              <button onClick={() => scrollToSection('features')} className="block px-3 py-2 text-white hover:text-purple-400">Features</button>
              <button onClick={() => scrollToSection('how-it-works')} className="block px-3 py-2 text-white hover:text-purple-400">How It Works</button>
              <button onClick={() => scrollToSection('waitlist')} className="block px-3 py-2 text-white hover:text-purple-400">Join Waitlist</button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-32">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20 animate-gradient-shift"></div>
        <div className="relative max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Stop Losing Days to{" "}
            <span className="gradient-text">'Works on My Machine'</span>{" "}
            Problems
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Stackmatch captures, syncs, and recreates your entire development environment in minutes—so your team can focus on building, not configuring.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12 text-left">
            <div className="flex items-center space-x-3 animate-slide-in-left">
              <Zap className="text-yellow-400 flex-shrink-0" />
              <span>One-click environment setup for new team members</span>
            </div>
            <div className="flex items-center space-x-3 animate-slide-in-left" style={{animationDelay: '0.1s'}}>
              <RefreshCw className="text-blue-400 flex-shrink-0" />
              <span>Automatic sync across all machines and projects</span>
            </div>
            <div className="flex items-center space-x-3 animate-slide-in-left" style={{animationDelay: '0.2s'}}>
              <Shield className="text-green-400 flex-shrink-0" />
              <span>End-to-end encryption keeps your configs secure</span>
            </div>
            <div className="flex items-center space-x-3 animate-slide-in-left" style={{animationDelay: '0.3s'}}>
              <Eye className="text-purple-400 flex-shrink-0" />
              <span>Visual environment tracking and version control</span>
            </div>
            <div className="flex items-center space-x-3 animate-slide-in-left" style={{animationDelay: '0.4s'}}>
              <Rocket className="text-red-400 flex-shrink-0" />
              <span>Works with any language, framework, or tool</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in" style={{animationDelay: '0.5s'}}>
            <Button 
              size="lg" 
              onClick={() => scrollToSection('waitlist')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-3"
            >
              Get Early Access <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => scrollToSection('waitlist')}
              className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white text-lg px-8 py-3"
            >
              Join Waitlist
            </Button>
          </div>

          <div className="mt-12 animate-fade-in" style={{animationDelay: '0.7s'}}>
            <img 
              src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop" 
              alt="Development Environment Dashboard" 
              className="rounded-lg shadow-2xl mx-auto max-w-full"
            />
          </div>
        </div>
      </section>

      {/* Current Pain Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Tired of These Daily Development Frustrations?
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <Card className="glass-effect border-white/20 hover:border-purple-400/50 transition-all duration-300 animate-slide-in-left backdrop-blur-xl">
              <CardContent className="p-8">
                <div className="text-4xl mb-4">😤</div>
                <h3 className="text-xl font-semibold mb-4 text-red-300">New Developer Onboarding Hell</h3>
                <p className="text-white/90 leading-relaxed">
                  Your new hire just joined and they're spending their entire first week installing Node, Python, Docker, configuring VS Code, setting up Git, and debugging why their environment doesn't match yours. Meanwhile, they're getting paid to... configure software.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-effect border-white/20 hover:border-purple-400/50 transition-all duration-300 animate-scale-in backdrop-blur-xl" style={{animationDelay: '0.1s'}}>
              <CardContent className="p-8">
                <div className="text-4xl mb-4">🔥</div>
                <h3 className="text-xl font-semibold mb-4 text-orange-300">The Mysterious 'Works on My Machine' Bug</h3>
                <p className="text-white/90 leading-relaxed">
                  Your code works perfectly on your laptop, but breaks in staging. After 3 hours of debugging, you discover it's because Sarah has Node 16 while you have Node 18. This has happened 12 times this month.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-effect border-white/20 hover:border-purple-400/50 transition-all duration-300 animate-slide-in-right backdrop-blur-xl" style={{animationDelay: '0.2s'}}>
              <CardContent className="p-8">
                <div className="text-4xl mb-4">⏰</div>
                <h3 className="text-xl font-semibold mb-4 text-yellow-300">Context Switching Nightmare</h3>
                <p className="text-white/90 leading-relaxed">
                  You're juggling 3 client projects. Each needs different Python versions, different environment variables, different IDE settings. You spend 30 minutes reconfiguring your setup every time you switch projects.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="glass-effect border-white/20 backdrop-blur-xl animate-fade-in" style={{animationDelay: '0.3s'}}>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-center gradient-text">
                Why Docker and Dotfiles Aren't Enough
              </h3>
              <p className="text-white/90 text-center text-lg leading-relaxed">
                You've tried Docker (too heavy for development), dotfiles (only covers configs, not dependencies), and Vagrant (slow and outdated). These solutions solve pieces of the puzzle, but none capture your COMPLETE development environment—the tools, versions, settings, and configurations that make you productive.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Desired Outcome Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-900/10 to-blue-900/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Imagine Your Development Team Running Like This...
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="glass-effect border-white/20 hover:border-green-400/50 transition-all duration-300 animate-slide-in-left backdrop-blur-xl">
              <CardContent className="p-8">
                <Zap className="text-green-400 w-12 h-12 mb-4" />
                <h3 className="text-xl font-semibold mb-4 text-green-300">New Team Members Productive in 30 Minutes</h3>
                <p className="text-white/90 leading-relaxed">
                  Sarah joins your team on Monday. She clicks one button, and by lunch, she has your exact development environment—every tool, every version, every configuration. She commits her first code that afternoon.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-effect border-white/20 hover:border-blue-400/50 transition-all duration-300 animate-scale-in backdrop-blur-xl" style={{animationDelay: '0.1s'}}>
              <CardContent className="p-8">
                <Check className="text-blue-400 w-12 h-12 mb-4" />
                <h3 className="text-xl font-semibold mb-4 text-blue-300">True Environment Consistency Across Your Team</h3>
                <p className="text-white/90 leading-relaxed">
                  Everyone on your team has identical development environments. 'Works on my machine' becomes a phrase of the past. Bugs are actually bugs, not environment differences.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-effect border-white/20 hover:border-purple-400/50 transition-all duration-300 animate-slide-in-right backdrop-blur-xl" style={{animationDelay: '0.2s'}}>
              <CardContent className="p-8">
                <RefreshCw className="text-purple-400 w-12 h-12 mb-4" />
                <h3 className="text-xl font-semibold mb-4 text-purple-300">Effortless Project Switching</h3>
                <p className="text-white/90 leading-relaxed">
                  Jump between client projects instantly. Stackmatch automatically loads the right Node version, environment variables, IDE settings, and dependencies. Your context switches take 30 seconds, not 30 minutes.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16 text-center animate-fade-in" style={{animationDelay: '0.3s'}}>
            <Card className="glass-effect border-blue-400/30 backdrop-blur-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 gradient-text">New Paradigm</h3>
                <p className="text-white/90 text-lg leading-relaxed">
                  Traditional solutions try to containerize or script your environment. Stackmatch takes a different approach—it creates a living snapshot of your complete development ecosystem and keeps it perfectly synchronized across your entire team.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Product Introduction */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 gradient-text">
              Stackmatch: The Complete Development Environment Synchronization Platform
            </h2>
          </div>

          <div id="how-it-works" className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center animate-slide-in-left">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Capture</h3>
              <p className="text-muted-foreground">Stackmatch scans your current environment and creates a comprehensive snapshot</p>
            </div>
            
            <div className="text-center animate-scale-in" style={{animationDelay: '0.1s'}}>
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Sync</h3>
              <p className="text-muted-foreground">Share environment profiles with your team through our secure platform</p>
            </div>
            
            <div className="text-center animate-slide-in-right" style={{animationDelay: '0.2s'}}>
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Deploy</h3>
              <p className="text-muted-foreground">New team members get your exact setup with one command</p>
            </div>
          </div>

          <Card className="glass-effect border-white/20 backdrop-blur-xl mb-16 animate-fade-in" style={{animationDelay: '0.3s'}}>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-center text-white">Founder Message</h3>
              <blockquote className="text-lg text-white/90 italic text-center leading-relaxed">
                "As a developer who's lost countless hours to environment setup, I built Stackmatch to solve the problem that every development team faces but no one talks about. We're not just syncing dotfiles—we're synchronizing your entire development identity."
              </blockquote>
              <p className="text-center mt-4 text-purple-300 font-semibold">— Alex Chen, Founder</p>
            </CardContent>
          </Card>

          <div className="text-center animate-fade-in" style={{animationDelay: '0.4s'}}>
            <Badge variant="secondary" className="bg-purple-900/50 text-purple-300 text-lg px-6 py-2 mb-4">
              {waitlistCount}+ Developers Already on the Waitlist
            </Badge>
            <p className="text-muted-foreground text-lg">Be among the first to eliminate 'works on my machine' forever</p>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-900/10 to-blue-900/10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Coming Soon - Summer 2025
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              Be the first to experience the future of development environment synchronization
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="glass-effect border-white/20 backdrop-blur-xl animate-slide-in-left">
              <CardContent className="p-6">
                <Clock className="text-blue-400 w-8 h-8 mb-4 mx-auto" />
                <h3 className="text-lg font-semibold mb-2 text-white">Launch Timeline</h3>
                <p className="text-white/90 leading-relaxed">Stackmatch launches Summer 2025 - Join the waitlist to get exclusive early access</p>
              </CardContent>
            </Card>

            <Card className="glass-effect border-white/20 backdrop-blur-xl animate-slide-in-right">
              <CardContent className="p-6">
                <Users className="text-green-400 w-8 h-8 mb-4 mx-auto" />
                <h3 className="text-lg font-semibold mb-2 text-white">Limited Spots</h3>
                <p className="text-white/90 leading-relaxed">⏰ Limited spots available for our founding user program</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
            {[
              "Priority access to beta testing",
              "Exclusive development updates", 
              "Early bird pricing when we launch",
              "Direct line to the founding team",
              "Community of forward-thinking developers"
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-2 animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <Check className="text-green-400 flex-shrink-0 w-5 h-5" />
                <span className="text-sm text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="waitlist" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Be First to Eliminate <span className="gradient-text">'Works on My Machine'</span> Forever
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              Join {waitlistCount}+ developers already on the waitlist. Stackmatch launches Summer 2025.
            </p>
          </div>

          <Card className="glass-effect border-purple-400/30 backdrop-blur-xl animate-scale-in">
            <CardContent className="p-8">
              <form onSubmit={handleWaitlistSignup} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground"
                  />
                  <Input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    required
                    className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground"
                  />
                  <Button 
                    type="submit" 
                    disabled={emailLoading}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 min-w-[140px]"
                  >
                    {emailLoading ? 'Joining...' : 'Join Waitlist'}
                  </Button>
                </div>
              </form>

              <div className="mt-8 text-center">
                <h3 className="text-lg font-semibold mb-4 text-white">Get exclusive updates, beta access, and founding user benefits</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-sm text-white/90">
                  <div>• First access when Stackmatch launches</div>
                  <div>• Exclusive development updates</div>
                  <div>• Founding user program eligibility</div>
                  <div>• Beta testing opportunities</div>
                  <div>• Direct feedback line to our team</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <span className="text-2xl font-bold gradient-text">Stackmatch</span>
              <p className="text-muted-foreground mt-4">
                The complete development environment synchronization platform. Stop losing days to 'works on my machine' problems.
              </p>
              <div className="flex space-x-4 mt-6">
                <Button variant="ghost" size="sm" className="p-2">
                  <Twitter className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm" className="p-2">
                  <Github className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm" className="p-2">
                  <Linkedin className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm" className="p-2">
                  <Mail className="w-5 h-5" />
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="mailto:hello@stackmatch.com" className="hover:text-foreground transition-colors">hello@stackmatch.com</a></li>
                <li><span>Summer 2025 Launch</span></li>
              </ul>
            </div>
          </div>
          
          <Separator className="my-8 bg-border" />
          
          <div className="flex flex-col sm:flex-row justify-between items-center text-muted-foreground">
            <p>&copy; 2024 Stackmatch. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <span className="text-sm">Privacy-first development environment sync</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
