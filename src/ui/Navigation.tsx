import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Stethoscope, 
  Brain, 
  Pill, 
  MessageSquare, 
  Menu, 
  X,
  Activity
} from 'lucide-react';

interface NavigationProps {
  activeAgent: string;
  onAgentChange: (agent: string) => void;
}

const Navigation = ({ activeAgent, onAgentChange }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const agents = [
    { id: 'overview', name: 'Overview', icon: Activity },
    { id: 'symptoms', name: 'Symptom Checker', icon: Stethoscope },
    { id: 'drugs', name: 'Drug Interactions', icon: Pill },
    { id: 'assistant', name: 'Medical Assistant', icon: MessageSquare },
  ];

  return (
    <nav className="bg-card shadow-card-medical border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
              <Brain className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">MedAssist AI</h1>
              <p className="text-xs text-muted-foreground">Multi-Agent Medical System</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {agents.map((agent) => {
              const Icon = agent.icon;
              return (
                <Button
                  key={agent.id}
                  variant={activeAgent === agent.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onAgentChange(agent.id)}
                  className="flex items-center space-x-2"
                >
                  <Icon className="w-4 h-4" />
                  <span>{agent.name}</span>
                </Button>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="space-y-2">
              {agents.map((agent) => {
                const Icon = agent.icon;
                return (
                  <Button
                    key={agent.id}
                    variant={activeAgent === agent.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => {
                      onAgentChange(agent.id);
                      setIsMenuOpen(false);
                    }}
                    className="w-full justify-start space-x-2"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{agent.name}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;