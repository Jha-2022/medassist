import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Pill, 
  Plus, 
  X, 
  AlertTriangle, 
  Shield, 
  Clock,
  Search,
  Zap
} from 'lucide-react';

const DrugAgent = () => {
  const [medications, setMedications] = useState<string[]>([]);
  const [newMedication, setNewMedication] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const commonMedications = [
    'Aspirin', 'Ibuprofen', 'Acetaminophen', 'Lisinopril', 'Metformin', 
    'Atorvastatin', 'Omeprazole', 'Warfarin', 'Levothyroxine', 'Amlodipine'
  ];

  const addMedication = (medication: string) => {
    if (medication && !medications.includes(medication)) {
      setMedications([...medications, medication]);
      setNewMedication('');
    }
  };

  const removeMedication = (medication: string) => {
    setMedications(medications.filter(m => m !== medication));
  };

  const analyzeDrugs = () => {
    if (medications.length === 0) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const hasWarfarin = medications.includes('Warfarin');
      const hasAspirin = medications.includes('Aspirin');
      
      setAnalysis({
        interactions: hasWarfarin && hasAspirin ? [
          {
            drugs: ['Warfarin', 'Aspirin'],
            severity: 'High',
            description: 'Increased risk of bleeding when taken together',
            recommendation: 'Monitor closely, consider alternative pain relief'
          }
        ] : [
          {
            drugs: ['Ibuprofen', 'Lisinopril'],
            severity: 'Medium',
            description: 'May reduce effectiveness of blood pressure medication',
            recommendation: 'Monitor blood pressure regularly'
          }
        ],
        sideEffects: [
          { drug: 'Aspirin', effects: ['Stomach irritation', 'Bleeding risk'], frequency: 'Common' },
          { drug: 'Ibuprofen', effects: ['Stomach upset', 'Kidney issues'], frequency: 'Uncommon' }
        ],
        recommendations: [
          'Take medications with food to reduce stomach irritation',
          'Regular monitoring of kidney function recommended',
          'Maintain consistent timing for blood pressure medications',
          'Consult prescriber before adding new medications'
        ],
        safetyScore: hasWarfarin && hasAspirin ? 65 : 85
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'text-red-600 bg-red-50 border-red-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-green-600 bg-green-50 border-green-200';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto shadow-glow">
          <Pill className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">Drug Interaction Agent</h1>
        <p className="text-muted-foreground">
          Analyze medication interactions and safety concerns
        </p>
      </div>

      {/* Medication Input */}
      <Card className="bg-gradient-card shadow-card-medical">
        <CardHeader>
          <CardTitle>Current Medications</CardTitle>
          <CardDescription>
            Add all medications you're currently taking (prescription and over-the-counter)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Enter medication name..."
              value={newMedication}
              onChange={(e) => setNewMedication(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addMedication(newMedication)}
              className="flex-1"
            />
            <Button onClick={() => addMedication(newMedication)} disabled={!newMedication}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {/* Common Medications */}
          <div>
            <p className="text-sm font-medium mb-2">Common Medications:</p>
            <div className="flex flex-wrap gap-2">
              {commonMedications.map((medication) => (
                <Button
                  key={medication}
                  variant="outline"
                  size="sm"
                  onClick={() => addMedication(medication)}
                  disabled={medications.includes(medication)}
                  className="text-xs"
                >
                  {medication}
                </Button>
              ))}
            </div>
          </div>

          {/* Selected Medications */}
          {medications.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2">Your Medications:</p>
              <div className="flex flex-wrap gap-2">
                {medications.map((medication) => (
                  <Badge key={medication} variant="secondary" className="flex items-center space-x-1">
                    <span>{medication}</span>
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-red-500"
                      onClick={() => removeMedication(medication)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <Button 
            onClick={analyzeDrugs} 
            disabled={medications.length === 0 || isAnalyzing}
            className="w-full"
          >
            {isAnalyzing ? (
              <>
                <Clock className="w-4 h-4 mr-2 animate-spin" />
                Analyzing Interactions...
              </>
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                Analyze Drug Interactions
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysis && (
        <div className="space-y-4">
          {/* Safety Score */}
          <Card className="bg-gradient-card shadow-card-medical">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Safety Assessment</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Overall Safety Score</p>
                  <p className={`text-3xl font-bold ${getScoreColor(analysis.safetyScore)}`}>
                    {analysis.safetyScore}/100
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Risk Level</p>
                  <p className={`font-semibold ${getScoreColor(analysis.safetyScore)}`}>
                    {analysis.safetyScore >= 80 ? 'Low Risk' : 
                     analysis.safetyScore >= 60 ? 'Medium Risk' : 'High Risk'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Drug Interactions */}
          <Card className="bg-gradient-card shadow-card-medical">
            <CardHeader>
              <CardTitle>Drug Interactions</CardTitle>
              <CardDescription>Potential interactions between your medications</CardDescription>
            </CardHeader>
            <CardContent>
              {analysis.interactions.length > 0 ? (
                <div className="space-y-3">
                  {analysis.interactions.map((interaction: any, index: number) => (
                    <div key={index} className={`border-2 rounded-lg p-4 ${getSeverityColor(interaction.severity)}`}>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">
                          {interaction.drugs.join(' + ')}
                        </h4>
                        <Badge variant="outline" className={getSeverityColor(interaction.severity)}>
                          {interaction.severity} Risk
                        </Badge>
                      </div>
                      <p className="text-sm mb-2">{interaction.description}</p>
                      <p className="text-xs font-medium">
                        Recommendation: {interaction.recommendation}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <Shield className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="text-green-600 font-medium">No major interactions detected</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Side Effects */}
          <Card className="bg-gradient-card shadow-card-medical">
            <CardHeader>
              <CardTitle>Common Side Effects</CardTitle>
              <CardDescription>Potential side effects to monitor</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analysis.sideEffects.map((item: any, index: number) => (
                  <div key={index} className="border border-border rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">{item.drug}</h4>
                      <Badge variant="outline">
                        {item.frequency}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {item.effects.map((effect: string, idx: number) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {effect}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card className="bg-gradient-card shadow-card-medical">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>Recommendations</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {analysis.recommendations.map((rec: string, index: number) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm">{rec}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-yellow-800 font-medium">Important Notice</p>
                  <p className="text-xs text-yellow-700 mt-1">
                    This analysis is for informational purposes only. Always consult your pharmacist or healthcare provider 
                    before making changes to your medication regimen. Do not stop or start medications without medical supervision.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default DrugAgent;