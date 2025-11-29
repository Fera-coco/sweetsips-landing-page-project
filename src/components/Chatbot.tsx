import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ChatbotProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

const presetQuestions = [
  {
    question: "What are the health benefits of parfaits?",
    answer: "Our parfaits are packed with nutrients! Greek yogurt provides protein and probiotics for gut health, fresh fruits offer vitamins and antioxidants, and granola adds fiber and energy. They're perfect for a nutritious breakfast or snack that keeps you energized throughout the day."
  },
  {
    question: "What's in your smoothies?",
    answer: "All our smoothies are made with 100% fresh fruits blended to perfection. We use real mango, strawberries, pineapple, watermelon, and cucumber - no artificial flavors or preservatives. Each smoothie is rich in vitamins, minerals, and natural hydration."
  },
  {
    question: "Can I customize my parfait?",
    answer: "Absolutely! Choose our Plain Yogurt Parfait base (1,000 CFA) and add any toppings you like at 500 CFA each. Options include Fresh Mango, Pineapple, Banana, Strawberries, Blueberries, Granola, Honey Drizzle, and Mixed Berries."
  },
  {
    question: "How much protein is in a parfait?",
    answer: "Each parfait contains approximately 15-20g of protein from Greek yogurt, making it an excellent post-workout snack or protein-rich meal option. The protein helps with muscle recovery and keeps you feeling full longer."
  },
  {
    question: "Are your products suitable for weight management?",
    answer: "Yes! Our parfaits and smoothies are nutrient-dense yet portion-controlled. They're low in processed sugars and high in natural ingredients. The protein and fiber content helps control appetite, making them ideal for healthy weight management."
  },
  {
    question: "Do you use fresh ingredients?",
    answer: "We pride ourselves on using only the freshest, highest-quality fruits and yogurt. All ingredients are carefully sourced and prepared daily to ensure maximum freshness, taste, and nutritional value in every serving."
  },
  {
    question: "What's the difference between shared and regular delivery?",
    answer: "Regular delivery (1,000 CFA) is direct delivery to your location. Shared delivery (500 CFA) is a cost-effective option where orders are batched and delivered along a route, which may take slightly longer but saves you money."
  },
  {
    question: "Can parfaits help with digestion?",
    answer: "Yes! The Greek yogurt in our parfaits contains live probiotics that promote healthy gut bacteria and improve digestion. Combined with fiber from fruits and granola, parfaits support overall digestive health."
  }
];

const Chatbot = ({ open, onOpenChange }: ChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm here to answer your questions about Sweet Sips parfaits and smoothies. Click any question below to learn more!",
      isUser: false
    }
  ]);
  const [showQuestions, setShowQuestions] = useState(true);

  const handleQuestionClick = (qa: typeof presetQuestions[0]) => {
    setMessages(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        text: qa.question,
        isUser: true
      },
      {
        id: (Date.now() + 1).toString(),
        text: qa.answer,
        isUser: false
      }
    ]);
    setShowQuestions(false);
  };

  const handleStartOver = () => {
    setMessages([
      {
        id: '1',
        text: "Hi! I'm here to answer your questions about Sweet Sips parfaits and smoothies. Click any question below to learn more!",
        isUser: false
      }
    ]);
    setShowQuestions(true);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle>Sweet Sips Assistant</DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.isUser
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}

            {showQuestions && (
              <div className="space-y-2 mt-4">
                <p className="text-sm font-medium text-muted-foreground mb-3">
                  Popular Questions:
                </p>
                {presetQuestions.map((qa, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start text-left h-auto py-3 px-4"
                    onClick={() => handleQuestionClick(qa)}
                  >
                    <span className="text-sm">{qa.question}</span>
                  </Button>
                ))}
              </div>
            )}

            {!showQuestions && (
              <div className="mt-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleStartOver}
                >
                  Ask Another Question
                </Button>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default Chatbot;
