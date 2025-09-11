import { useState } from 'react';
import Navigation from '@/components/Navigation';
import OverviewAgent from '@/components/agents/OverviewAgent';
import SymptomAgent from '@/components/agents/SymptomAgent';
import DrugAgent from '@/components/agents/DrugAgent';
import AssistantAgent from '@/components/agents/AssistantAgent';

const Index = () => {
  const [activeAgent, setActiveAgent] = useState('overview');

  const renderAgent = () => {
    switch (activeAgent) {
      case 'symptoms':
        return <SymptomAgent />;
      case 'drugs':
        return <DrugAgent />;
      case 'assistant':
        return <AssistantAgent />;
      default:
        return <OverviewAgent onAgentChange={setActiveAgent} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeAgent={activeAgent} onAgentChange={setActiveAgent} />
      <main className="container mx-auto px-4 py-8">
        {renderAgent()}
      </main>
    </div>
  );
};

export default Index;
