export interface Quote {
  id: string;
  author: 'Cristiano Ronaldo' | 'Virat Kohli';
  quote: string;
  category: 'Mindset' | 'Hard Work' | 'Discipline' | 'Fitness' | 'Belief';
  avatar: string;
  role: string;
  number: string;
}

export const RONALDO_AVATAR = 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=120&auto=format&fit=crop&q=80'; // Athletic football vibe
export const KOHLI_AVATAR = 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=120&auto=format&fit=crop&q=80'; // Cricket vibe

export const championQuotes: Quote[] = [
  // Cristiano Ronaldo Quotes
  {
    id: 'cr7-1',
    author: 'Cristiano Ronaldo',
    quote: 'Your love makes me strong, your hate makes me unstoppable.',
    category: 'Mindset',
    avatar: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=120&auto=format&fit=crop&q=80',
    role: 'Football Icon · CR7',
    number: '#7'
  },
  {
    id: 'cr7-2',
    author: 'Cristiano Ronaldo',
    quote: 'Talent without working hard is nothing.',
    category: 'Hard Work',
    avatar: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=120&auto=format&fit=crop&q=80',
    role: 'Football Icon · CR7',
    number: '#7'
  },
  {
    id: 'cr7-3',
    author: 'Cristiano Ronaldo',
    quote: 'If you don\'t believe you are the best, then you will never achieve all that you are capable of.',
    category: 'Belief',
    avatar: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=120&auto=format&fit=crop&q=80',
    role: 'Football Icon · CR7',
    number: '#7'
  },
  {
    id: 'cr7-4',
    author: 'Cristiano Ronaldo',
    quote: 'Dedication, hard work all the time, and total discipline. Dreams do not let you sleep.',
    category: 'Discipline',
    avatar: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=120&auto=format&fit=crop&q=80',
    role: 'Football Icon · CR7',
    number: '#7'
  },
  {
    id: 'cr7-5',
    author: 'Cristiano Ronaldo',
    quote: 'I\'m living a dream I never want to wake up from. Work harder today than yesterday.',
    category: 'Fitness',
    avatar: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=120&auto=format&fit=crop&q=80',
    role: 'Football Icon · CR7',
    number: '#7'
  },
  {
    id: 'cr7-6',
    author: 'Cristiano Ronaldo',
    quote: 'I don\'t have to show anything to anyone. There is nothing to prove except to myself.',
    category: 'Mindset',
    avatar: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=120&auto=format&fit=crop&q=80',
    role: 'Football Icon · CR7',
    number: '#7'
  },

  // Virat Kohli Quotes
  {
    id: 'vk-1',
    author: 'Virat Kohli',
    quote: 'Self-belief and hard work will always earn you success.',
    category: 'Belief',
    avatar: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=120&auto=format&fit=crop&q=80',
    role: 'Cricket Legend · King Kohli',
    number: '#18'
  },
  {
    id: 'vk-2',
    author: 'Virat Kohli',
    quote: 'Irrespective of whether you have talent or not, one has to work hard. Just being talented doesn\'t mean anything.',
    category: 'Hard Work',
    avatar: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=120&auto=format&fit=crop&q=80',
    role: 'Cricket Legend · King Kohli',
    number: '#18'
  },
  {
    id: 'vk-3',
    author: 'Virat Kohli',
    quote: 'When you are fit, you feel as if you can do anything. The mind stays sharp and focus never drops.',
    category: 'Fitness',
    avatar: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=120&auto=format&fit=crop&q=80',
    role: 'Cricket Legend · King Kohli',
    number: '#18'
  },
  {
    id: 'vk-4',
    author: 'Virat Kohli',
    quote: 'Whatever you want to do, do it with passion and give it 100 percent every single day.',
    category: 'Discipline',
    avatar: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=120&auto=format&fit=crop&q=80',
    role: 'Cricket Legend · King Kohli',
    number: '#18'
  },
  {
    id: 'vk-5',
    author: 'Virat Kohli',
    quote: 'Never give up. Today is hard, tomorrow may be tough, but consistency brings glory.',
    category: 'Mindset',
    avatar: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=120&auto=format&fit=crop&q=80',
    role: 'Cricket Legend · King Kohli',
    number: '#18'
  },
  {
    id: 'vk-6',
    author: 'Virat Kohli',
    quote: 'If you stay true to your preparation and process, results will follow naturally.',
    category: 'Belief',
    avatar: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=120&auto=format&fit=crop&q=80',
    role: 'Cricket Legend · King Kohli',
    number: '#18'
  }
];

export function getDailyQuote(): Quote {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24
  );
  const index = dayOfYear % championQuotes.length;
  return championQuotes[index];
}

export function getRandomQuote(excludeId?: string): Quote {
  const available = championQuotes.filter((q) => q.id !== excludeId);
  return available[Math.floor(Math.random() * available.length)];
}
