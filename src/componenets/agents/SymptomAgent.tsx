// import { useState } from 'react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Badge } from '@/components/ui/badge';
// import { 
//   Stethoscope, 
//   Plus, 
//   X, 
//   AlertTriangle, 
//   CheckCircle, 
//   Clock,
//   Thermometer
// } from 'lucide-react';

// const SymptomAgent = () => {
//   const [symptoms, setSymptoms] = useState<string[]>([]);
//   const [newSymptom, setNewSymptom] = useState('');
//   const [analysis, setAnalysis] = useState<any>(null);
//   const [isAnalyzing, setIsAnalyzing] = useState(false);

//   const commonSymptoms = [
//     'Headache', 'Fever', 'Cough', 'Fatigue', 'Nausea', 'Dizziness',
//     'Chest pain', 'Shortness of breath', 'Abdominal pain', 'Back pain'
//   ];

//   const addSymptom = (symptom: string) => {
//     if (symptom && !symptoms.includes(symptom)) {
//       setSymptoms([...symptoms, symptom]);
//       setNewSymptom('');
//     }
//   };

//   const removeSymptom = (symptom: string) => {
//     setSymptoms(symptoms.filter(s => s !== symptom));
//   };

//   const analyzeSymptoms = () => {
//     if (symptoms.length === 0) return;
    
//     setIsAnalyzing(true);
    
//     // Simulate AI analysis
//     setTimeout(() => {
//       setAnalysis({
//         severity: symptoms.includes('Chest pain') || symptoms.includes('Shortness of breath') ? 'High' : 
//                  symptoms.includes('Fever') || symptoms.includes('Abdominal pain') ? 'Medium' : 'Low',
//         possibleConditions: [
//           { name: 'Common Cold', probability: 75, description: 'Viral upper respiratory infection' },
//           { name: 'Tension Headache', probability: 60, description: 'Stress-related headache' },
//           { name: 'Gastritis', probability: 40, description: 'Stomach lining inflammation' }
//         ],
//         recommendations: [
//           'Rest and stay hydrated',
//           'Monitor symptoms closely',
//           'Consider over-the-counter pain relief',
//           'Consult healthcare provider if symptoms worsen'
//         ],
//         urgency: symptoms.includes('Chest pain') ? 'Seek immediate medical attention' : 
//                 symptoms.includes('Fever') ? 'Schedule appointment within 24 hours' : 
//                 'Monitor and schedule routine appointment if needed'
//       });
//       setIsAnalyzing(false);
//     }, 2000);
//   };

//   const getSeverityColor = (severity: string) => {
//     switch (severity) {
//       case 'High': return 'text-red-600 bg-red-50 border-red-200';
//       case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
//       default: return 'text-green-600 bg-green-50 border-green-200';
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto space-y-6">
//       {/* Header */}
//       <div className="text-center space-y-2">
//         <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto shadow-glow">
//           <Stethoscope className="w-8 h-8 text-white" />
//         </div>
//         <h1 className="text-3xl font-bold text-foreground">Symptom Checker Agent</h1>
//         <p className="text-muted-foreground">
//           Describe your symptoms and get AI-powered preliminary assessment
//         </p>
//       </div>

//       {/* Symptom Input */}
//       <Card className="bg-gradient-card shadow-card-medical">
//         <CardHeader>
//           <CardTitle>Add Your Symptoms</CardTitle>
//           <CardDescription>
//             Enter symptoms you're experiencing or select from common options
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div className="flex space-x-2">
//             <Input
//               placeholder="Enter a symptom..."
//               value={newSymptom}
//               onChange={(e) => setNewSymptom(e.target.value)}
//               onKeyPress={(e) => e.key === 'Enter' && addSymptom(newSymptom)}
//               className="flex-1"
//             />
//             <Button onClick={() => addSymptom(newSymptom)} disabled={!newSymptom}>
//               <Plus className="w-4 h-4" />
//             </Button>
//           </div>

//           {/* Common Symptoms */}
//           <div>
//             <p className="text-sm font-medium mb-2">Quick Add:</p>
//             <div className="flex flex-wrap gap-2">
//               {commonSymptoms.map((symptom) => (
//                 <Button
//                   key={symptom}
//                   variant="outline"
//                   size="sm"
//                   onClick={() => addSymptom(symptom)}
//                   disabled={symptoms.includes(symptom)}
//                   className="text-xs"
//                 >
//                   {symptom}
//                 </Button>
//               ))}
//             </div>
//           </div>

//           {/* Selected Symptoms */}
//           {symptoms.length > 0 && (
//             <div>
//               <p className="text-sm font-medium mb-2">Your Symptoms:</p>
//               <div className="flex flex-wrap gap-2">
//                 {symptoms.map((symptom) => (
//                   <Badge key={symptom} variant="secondary" className="flex items-center space-x-1">
//                     <span>{symptom}</span>
//                     <X
//                       className="w-3 h-3 cursor-pointer hover:text-red-500"
//                       onClick={() => removeSymptom(symptom)}
//                     />
//                   </Badge>
//                 ))}
//               </div>
//             </div>
//           )}

//           <Button 
//             onClick={analyzeSymptoms} 
//             disabled={symptoms.length === 0 || isAnalyzing}
//             className="w-full"
//           >
//             {isAnalyzing ? (
//               <>
//                 <Clock className="w-4 h-4 mr-2 animate-spin" />
//                 Analyzing Symptoms...
//               </>
//             ) : (
//               <>
//                 <Thermometer className="w-4 h-4 mr-2" />
//                 Analyze Symptoms
//               </>
//             )}
//           </Button>
//         </CardContent>
//       </Card>

//       {/* Analysis Results */}
//       {analysis && (
//         <div className="space-y-4">
//           {/* Severity Assessment */}
//           <Card className="bg-gradient-card shadow-card-medical">
//             <CardHeader>
//               <CardTitle className="flex items-center space-x-2">
//                 <AlertTriangle className="w-5 h-5" />
//                 <span>Severity Assessment</span>
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className={`p-4 rounded-lg border-2 ${getSeverityColor(analysis.severity)}`}>
//                 <div className="flex items-center justify-between">
//                   <span className="font-semibold">Severity Level: {analysis.severity}</span>
//                   {analysis.severity === 'High' && <AlertTriangle className="w-5 h-5" />}
//                   {analysis.severity === 'Medium' && <Clock className="w-5 h-5" />}
//                   {analysis.severity === 'Low' && <CheckCircle className="w-5 h-5" />}
//                 </div>
//                 <p className="mt-2 font-medium">{analysis.urgency}</p>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Possible Conditions */}
//           <Card className="bg-gradient-card shadow-card-medical">
//             <CardHeader>
//               <CardTitle>Possible Conditions</CardTitle>
//               <CardDescription>Based on your symptoms, here are potential conditions</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-3">
//                 {analysis.possibleConditions.map((condition: any, index: number) => (
//                   <div key={index} className="border border-border rounded-lg p-4">
//                     <div className="flex justify-between items-start mb-2">
//                       <h4 className="font-semibold">{condition.name}</h4>
//                       <Badge variant="outline">{condition.probability}% match</Badge>
//                     </div>
//                     <p className="text-sm text-muted-foreground">{condition.description}</p>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>

//           {/* Recommendations */}
//           <Card className="bg-gradient-card shadow-card-medical">
//             <CardHeader>
//               <CardTitle>Recommendations</CardTitle>
//               <CardDescription>Suggested next steps based on your symptoms</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <ul className="space-y-2">
//                 {analysis.recommendations.map((rec: string, index: number) => (
//                   <li key={index} className="flex items-start space-x-2">
//                     <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
//                     <span className="text-sm">{rec}</span>
//                   </li>
//                 ))}
//               </ul>
//             </CardContent>
//           </Card>

//           {/* Disclaimer */}
//           <Card className="bg-yellow-50 border-yellow-200">
//             <CardContent className="pt-6">
//               <div className="flex items-start space-x-2">
//                 <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
//                 <div>
//                   <p className="text-sm text-yellow-800 font-medium">Medical Disclaimer</p>
//                   <p className="text-xs text-yellow-700 mt-1">
//                     This analysis is for informational purposes only and should not replace professional medical advice. 
//                     Always consult with a healthcare provider for proper diagnosis and treatment.
//                   </p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SymptomAgent;






import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Stethoscope,
  Plus,
  X,
  AlertTriangle,
  CheckCircle,
  Clock,
  Thermometer,
  Upload,
  KeyRound,
} from 'lucide-react';

// A helper function to convert an image file to a base64 string
const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string).split(',')[1]); // remove the data:image/jpeg;base64, part
    reader.onerror = (error) => reject(error);
  });

const SymptomAgent = () => {
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [newSymptom, setNewSymptom] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // New state variables for the API key, image file, and any errors
  const [apiKey, setApiKey] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const commonSymptoms = [
    'Headache', 'Fever', 'Cough', 'Fatigue', 'Nausea', 'Dizziness',
    'Chest pain', 'Shortness of breath', 'Abdominal pain', 'Back pain'
  ];

  const addSymptom = (symptom: string) => {
    if (symptom && !symptoms.includes(symptom)) {
      setSymptoms([...symptoms, symptom]);
      setNewSymptom('');
    }
  };

  const removeSymptom = (symptom: string) => {
    setSymptoms(symptoms.filter(s => s !== symptom));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImageFile(event.target.files[0]);
    }
  };
  
  // The new function to handle the actual API call
  // The new, more robust function to handle the actual API call
  const analyzeWithApi = async () => {
    if (!apiKey) {
      setError('Please enter your Hugging Face API key.');
      return;
    }
    if (!imageFile) {
        setError('Please upload an image to analyze.');
        return;
    }

    setIsAnalyzing(true);
    setError(null);
    setAnalysis(null);

    try {
      const base64Image = await toBase64(imageFile);
      const allSymptoms = [...symptoms, newSymptom].filter(Boolean).join(', ');
      
      const promptText = `Based on the following symptoms: "${allSymptoms}", analyze the attached image. What might be the issue? Provide a preliminary analysis and suggest next steps. This is for informational purposes only.`;

      const response = await fetch(
        "https://api-inference.huggingface.co/models/llava-hf/llava-1.5-7b-hf",
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            inputs: `USER: <image>\n${promptText} ASSISTANT:`,
            parameters: {
              max_new_tokens: 200,
            },
            data: base64Image,
          }),
        }
      );

      // --- START OF THE FIX ---
      // First, get the response as plain text
      const responseText = await response.text();

      if (!response.ok) {
        // Now we can safely log the text response even if it's not JSON
        throw new Error(`API Error: ${response.status} ${response.statusText} - ${responseText}`);
      }

      let result;
      try {
        // Try to parse the text as JSON
        result = JSON.parse(responseText);
      } catch (e) {
        // If parsing fails, the response was not valid JSON.
        console.error("Failed to parse JSON:", responseText);
        throw new Error(`Received a non-JSON response from the server: ${responseText}`);
      }
      // --- END OF THE FIX ---

      const generatedText = result[0].generated_text;
      const assistantResponse = generatedText.split('ASSISTANT:')[1]?.trim() || "No response generated.";

      setAnalysis({
        response: assistantResponse,
      });

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto shadow-glow">
          <Stethoscope className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">Symptom Checker Agent</h1>
        <p className="text-muted-foreground">
          Describe your symptoms, upload an image, and get an AI-powered preliminary assessment.
        </p>
      </div>

      <Card className="bg-gradient-card shadow-card-medical">
        <CardHeader>
            <CardTitle>API Configuration</CardTitle>
            <CardDescription>Enter your Hugging Face API token to activate the agent.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex items-center space-x-2">
                <KeyRound className="w-5 h-5 text-muted-foreground" />
                <Input
                    type="password"
                    placeholder="Enter your Hugging Face API token..."
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                />
            </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-card shadow-card-medical">
        <CardHeader>
          <CardTitle>Add Your Symptoms & Image</CardTitle>
          <CardDescription>
            Enter symptoms, upload a relevant image, and get them analyzed together.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Enter a symptom (e.g., itchy skin)..."
              value={newSymptom}
              onChange={(e) => setNewSymptom(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addSymptom(newSymptom)}
              className="flex-1"
            />
            <Button onClick={() => addSymptom(newSymptom)} disabled={!newSymptom}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Quick Add:</p>
            <div className="flex flex-wrap gap-2">
              {commonSymptoms.map((symptom) => (
                <Button key={symptom} variant="outline" size="sm" onClick={() => addSymptom(symptom)} disabled={symptoms.includes(symptom)} className="text-xs">
                  {symptom}
                </Button>
              ))}
            </div>
          </div>
          
          {symptoms.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2">Your Symptoms:</p>
              <div className="flex flex-wrap gap-2">
                {symptoms.map((symptom) => (
                  <Badge key={symptom} variant="secondary" className="flex items-center space-x-1">
                    <span>{symptom}</span>
                    <X className="w-3 h-3 cursor-pointer hover:text-red-500" onClick={() => removeSymptom(symptom)} />
                  </Badge>
                ))}
              </div>
            </div>
          )}
        
         {/* New UI element for image upload */}
         <div>
            <p className="text-sm font-medium mb-2">Upload Image:</p>
            <div className="flex items-center space-x-2">
                <Input id="picture" type="file" accept="image/*" onChange={handleImageChange} className="flex-1" />
                <Button asChild variant="outline">
                    <label htmlFor="picture">
                        <Upload className="w-4 h-4" />
                    </label>
                </Button>
            </div>
            {imageFile && <p className="text-xs text-muted-foreground mt-2">Selected: {imageFile.name}</p>}
         </div>

          <Button onClick={analyzeWithApi} disabled={!imageFile || !apiKey || isAnalyzing} className="w-full">
            {isAnalyzing ? (
              <> <Clock className="w-4 h-4 mr-2 animate-spin" /> Analyzing with AI... </>
            ) : (
              <> <Thermometer className="w-4 h-4 mr-2" /> Analyze Symptoms & Image </>
            )}
          </Button>
        </CardContent>
      </Card>

      {error && (
        <Card className="bg-red-50 border-red-200">
            <CardContent className="pt-6">
                <div className="flex items-start space-x-2">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                        <p className="text-sm text-red-800 font-medium">An Error Occurred</p>
                        <p className="text-xs text-red-700 mt-1">{error}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
      )}

      {analysis && (
        <Card className="bg-gradient-card shadow-card-medical">
          <CardHeader>
            <CardTitle>AI Analysis Result</CardTitle>
            <CardDescription>This is a preliminary analysis based on your input.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border border-border rounded-lg p-4 bg-muted/20">
              <p className="text-sm whitespace-pre-wrap">{analysis.response}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SymptomAgent;