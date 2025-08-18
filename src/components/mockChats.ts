export interface ChatThread {
  id: string;
  title: string;
  messages: Message[];
}

const mockChats: ChatThread[] = [
  {
    id: encodeURIComponent('1'),
    title: 'Explore Animal Behavior',
    messages: [
      {
        id: '1-1',
        text: 'Explore Animal Behavior',
        isUser: true,
        timestamp: new Date(),
      },
      {
        id: '1-2',
        text: 'Animals display a wide range of behaviors, including foraging, mating, and social interactions. Would you like to know about a specific animal or behavior?',
        isUser: false,
        timestamp: new Date(),
      },
    ],
  },
  {
    id: encodeURIComponent('2'),
    title: 'Analyze Tree Growth?',
    messages: [
      {
        id: '2-1',
        text: 'Analyze Tree Growth?',
        isUser: true,
        timestamp: new Date(),
      },
      {
        id: '2-2',
        text: 'Tree growth can be analyzed by measuring annual rings, monitoring height and diameter, and observing leaf development. Would you like a guide on how to measure tree growth?',
        isUser: false,
        timestamp: new Date(),
      },
    ],
  },
  {
    id: encodeURIComponent('3'),
    title: 'Photosynthesis Process',
    messages: [
      {
        id: '3-1',
        text: 'Explain the process of photosynthesis.',
        isUser: true,
        timestamp: new Date(),
      },
      {
        id: '3-2',
        text: 'Photosynthesis is the process by which green plants use sunlight to synthesize foods from carbon dioxide and water. The process generally involves the green pigment chlorophyll and generates oxygen as a byproduct. The overall equation is: 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂.',
        isUser: false,
        timestamp: new Date(),
      },
    ],
  },
  {
    id: encodeURIComponent('4'),
    title: 'HTML Landing Page Example',
    messages: [
      {
        id: '4-1',
        text: 'Can you give me an example of a simple HTML landing page?',
        isUser: true,
        timestamp: new Date(),
      },
      {
        id: '4-2',
        text: `Here's a basic HTML/CSS code structure for your agency design landing page:

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Agency Name - Design that Makes</title>
</head>
<body>
    <header>
        <nav>...</nav>
    </header>
    <main>
        <section class="hero">
            <h1>Design that Makes Impact</h1>
        </section>
    </main>
</body>
</html>
\`\`\`

This creates a clean, professional foundation for your landing page with proper SEO structure.
`,
        isUser: false,
        timestamp: new Date(),
      },
    ],
  },
  {
    id: encodeURIComponent('5'),
    title: 'DNA Replication Steps',
    messages: [
      {
        id: '5-1',
        text: 'What are the steps of DNA replication?',
        isUser: true,
        timestamp: new Date(),
      },
      {
        id: '5-2',
        text: 'DNA replication involves several steps: 1) Initiation: The DNA double helix is unwound. 2) Elongation: New complementary DNA strands are synthesized by DNA polymerase. 3) Termination: The process ends when the entire DNA molecule has been copied. Enzymes like helicase, primase, and ligase play key roles.',
        isUser: false,
        timestamp: new Date(),
      },
    ],
  },
];

export function fetchChatById(id: string): Promise<ChatThread | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockChats.find((chat) => chat.id === id));
    }, 300);
  });
}

export function getAllMockChats(): ChatThread[] {
  return mockChats;
}

export function getChatHistory(): HistoryItem[] {
  return mockChats.map((chat) => ({
    id: Number(decodeURIComponent(chat.id)),
    text: chat.title,
    timestamp: 'Just now',
  }));
}
