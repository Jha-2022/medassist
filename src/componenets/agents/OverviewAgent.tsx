import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Stethoscope, 
  Pill, 
  MessageSquare, 
  Shield, 
  Zap, 
  Users,
  ArrowRight
} from 'lucide-react';

interface OverviewAgentProps {
  onAgentChange: (agent: string) => void;
}

const OverviewAgent = ({ onAgentChange }: OverviewAgentProps) => {
  const agents = [
    {
      id: 'symptoms',
      title: 'Symptom Checker',
      description: 'AI-powered symptom analysis and preliminary assessment',
      icon: Stethoscope,
      features: ['Interactive symptom mapping', 'Severity assessment', 'Condition suggestions'],
      color: 'from-emerald-500 to-teal-600'
    },
    {
      id: 'drugs',
      title: 'Drug Interaction Analyzer',
      description: 'Check medication safety and potential interactions',
      icon: Pill,
      features: ['Drug interaction detection', 'Dosage recommendations', 'Side effect analysis'],
      color: 'from-blue-500 to-cyan-600'
    },
    {
      id: 'assistant',
      title: 'Medical Query Assistant',
      description: 'Comprehensive medical information and guidance',
      icon: MessageSquare,
      features: ['Natural language queries', 'Evidence-based responses', '24/7 availability'],
      color: 'from-purple-500 to-pink-600'
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'Reliable & Safe',
      description: 'Evidence-based medical information with safety checks'
    },
    {
      icon: Zap,
      title: 'Instant Analysis',
      description: 'Get immediate insights from specialized AI agents'
    },
    {
      icon: Users,
      title: 'Multi-Agent Collaboration',
      description: 'Different AI specialists working together for better results'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-8">
        <div className="w-20 h-20 bg-gradient-hero rounded-full flex items-center justify-center mx-auto shadow-glow mb-6">
          <img src="/favicon.png" alt="Medical AI Assistant" className="w-21 h-21"/>
        </div>
        <h1 className="text-4xl font-bold text-foreground">
          Multi-Agent Medical Assistant
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Advanced AI-powered healthcare assistance with specialized agents for comprehensive medical support
        </p>
      </div>

      {/* Benefits */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <Card key={index} className="text-center bg-gradient-card shadow-card-medical">
              <CardContent className="pt-6">
                <Icon className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Agent Cards */}
      <div className="grid lg:grid-cols-3 gap-6">
        {agents.map((agent) => {
          const Icon = agent.icon;
          return (
            <Card key={agent.id} className="group hover:shadow-medical transition-all duration-300 bg-gradient-card">
              <CardHeader>
                <div className={`w-12 h-12 bg-gradient-to-r ${agent.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">{agent.title}</CardTitle>
                <CardDescription className="text-base">
                  {agent.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {agent.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  onClick={() => onAgentChange(agent.id)}
                  className="w-full group-hover:shadow-glow transition-all"
                >
                  Access Agent
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Start */}
      <Card className="bg-gradient-card shadow-medical">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Ready to Get Started?</CardTitle>
          <CardDescription className="text-base">
            Choose an AI agent above to begin your medical consultation
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-muted-foreground mb-6">
            Our multi-agent system provides specialized expertise for different medical needs. 
            Each agent is designed to collaborate and provide the most accurate assistance possible.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" onClick={() => onAgentChange('symptoms')}>
              Check Symptoms
            </Button>
            <Button variant="outline" onClick={() => onAgentChange('drugs')}>
              Analyze Medications
            </Button>
            <Button variant="outline" onClick={() => onAgentChange('assistant')}>
              Ask Medical Questions
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewAgent;