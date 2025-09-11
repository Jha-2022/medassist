import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  MessageSquare, 
  Send, 
  Bot, 
  User, 
  Clock,
  Lightbulb,
  Heart,
  Shield
} from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

const AssistantAgent = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your Medical Query Assistant. I can help answer questions about health conditions, medications, symptoms, and general medical information. How can I assist you today?",
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    "What are the symptoms of diabetes?",
    "How does high blood pressure affect the body?",
    "What should I know about antibiotics?",
    "When should I see a doctor for chest pain?"
  ];

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on current medical literature, here's what you should know about your question...",
        "This is an important health topic. Let me provide you with evidence-based information...",
        "I understand your concern. Here's comprehensive information to help you...",
        "That's a great question about health management. Here are the key points..."
      ];

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)] + 
                "\n\nFor example, if you're asking about symptoms, I can help identify potential causes and recommend when to seek medical care. If you're curious about medications, I can explain how they work and what to expect.\n\nRemember, this information is for educational purposes and should complement, not replace, professional medical advice.",
        sender: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleQuickQuestion = (question: string) => {
    setNewMessage(question);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto shadow-glow">
          <MessageSquare className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">Medical Query Assistant</h1>
        <p className="text-muted-foreground">
          Get comprehensive medical information and guidance
        </p>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-gradient-card shadow-card-medical">
          <CardContent className="pt-6 text-center">
            <Lightbulb className="w-8 h-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Evidence-Based</h3>
            <p className="text-sm text-muted-foreground">Information backed by medical research</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card shadow-card-medical">
          <CardContent className="pt-6 text-center">
            <Heart className="w-8 h-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Comprehensive</h3>
            <p className="text-sm text-muted-foreground">Covering all aspects of health and wellness</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card shadow-card-medical">
          <CardContent className="pt-6 text-center">
            <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Safe & Reliable</h3>
            <p className="text-sm text-muted-foreground">Trusted medical guidance you can rely on</p>
          </CardContent>
        </Card>
      </div>

      {/* Chat Interface */}
      <Card className="bg-gradient-card shadow-card-medical">
        <CardHeader>
          <CardTitle>Medical Consultation Chat</CardTitle>
          <CardDescription>
            Ask any medical questions and get detailed, evidence-based responses
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Messages */}
          <div className="h-96 overflow-y-auto space-y-4 p-4 bg-muted/20 rounded-lg">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card border border-border'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    {message.sender === 'user' ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4" />
                    )}
                    <span className="text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-card border border-border px-4 py-2 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Bot className="w-4 h-4" />
                    <Clock className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Assistant is typing...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          <div>
            <p className="text-sm font-medium mb-2">Quick Questions:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickQuestion(question)}
                  className="text-left justify-start h-auto p-3 text-xs"
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="flex space-x-2">
            <Input
              placeholder="Ask a medical question..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1"
            />
            <Button onClick={sendMessage} disabled={!newMessage.trim() || isTyping}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-2">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-blue-800 font-medium">Medical Information Disclaimer</p>
              <p className="text-xs text-blue-700 mt-1">
                The information provided by this assistant is for educational purposes only and should not be used as a substitute 
                for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified 
                health provider with any questions you may have regarding a medical condition.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssistantAgent;