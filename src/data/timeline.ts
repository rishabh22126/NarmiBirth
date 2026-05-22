/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TimelinePhase, LoveLetter, ReasonLove, MemoryItem } from '../types';
import { IMAGES } from './images';

export const TIMELINE_PHASES: TimelinePhase[] = [
  {
    id: 'childhood',
    yearRange: '2005 – 2012',
    title: 'The Stormy Shadows of Childhood',
    subtitle: 'The unheard silence of childhood and that lonely heart...',
    theme: 'childhood',
    emotionalText: '“Narmatha’s early years were painted in the darkest shades of fears and silence. Instead of peaceful lullabies, she heard echoes of anger and terrifying storms. Her father drank alcohol almost every night, and every single night the precious house became a terrifying battlefield. She watched her beloved mother cry silently, and little Narmatha learned to hide in the corners, watching pain become normal before she even knew what happiness meant. She was weak in studies early on, and for that, she was punished instead of understood—turning her school marks into reasons for immense fear, trembling in silence.”',
    badge: 'Silence & Fear',
    imageSrc: IMAGES.timeline.childhoodRainWindow,
    accentColors: {
      from: 'from-[#4B1B61]/20',
      to: 'to-[#721B3E]/10',
      shadow: 'shadow-[#4B1B61]/20',
    },
    details: [
      'Grew up hearing fights instead of comforting bedtime stories and sweet lullabies.',
      'A father fighting his own dark demons, turning the sanctuary into a daily battlefield.',
      'Sinking deep in fear, holding a heavy school bag, scared of marks and painful punishments.',
      'Watching her mother wipe away silent tears, learning the cold language of loneliness too early.'
    ],
    icons: ['CloudRain', 'HeartPulse', 'Frown', 'BookOpen']
  },
  {
    id: 'growing',
    yearRange: '2013 – 2018',
    title: 'The Rise of a Warrior Soul',
    subtitle: 'Pain never broke her, it turned her into steel...',
    theme: 'growing',
    emotionalText: '“But pain has a spectacular, divine power—it either destroys a soul or births a majestic warrior. Narmatha slowly, silently started fighting for herself. No one saw her unseen tears on quiet midnight study logs; no one understood how much pressure survived in her tiny, fragile chest. With relentless sleepless nights and hard work, she shocked her critics! She passed her 10th grade with beautiful, stellar marks; then she triumphed over her 12th exams too. She grew stronger than the very storms that tried to drag her into the mud.”',
    badge: 'The Warrior Rise',
    imageSrc: IMAGES.timeline.risingWarriorLamp,
    accentColors: {
      from: 'from-[#D4AF37]/20',
      to: 'to-[#4B1B61]/10',
      shadow: 'shadow-[#D4AF37]/20',
    },
    details: [
      'Studied under poor flickering lights while the rest of the world slept in quiet peace.',
      'Cried silently behind locked doors, converting agonizing pain into fierce academic fire.',
      'Shattered all expectations by passing 10th and 12th standards with beautiful, brilliant grades.',
      'Realized that she holds the pen to write her own victory, ignoring those who doubted her.'
    ],
    icons: ['Award', 'Sparkles', 'Flame', 'Sun']
  },
  {
    id: 'teenage',
    yearRange: '2019 – 2021',
    title: 'Family’s Soft & Sacred Shield',
    subtitle: 'Shouldering responsibilities and selfless devotion...',
    theme: 'teenage',
    emotionalText: '“Some daughters grow up with pampering and silver spoons, but Narmatha grew up holding her shattered family together. She became the absolute emotional backbone of her house, handling immense burdens quietly so others could breathe peacefully. Even after witnessing violence, fear, and toxic relationships, she consciously chose radical kindness. She kept helping her mother, protected her siblings, swallowed her tears, and continued smiling under starry skies.”',
    badge: 'Our Sacred Pillar',
    imageSrc: IMAGES.timeline.familyWarmLight,
    accentColors: {
      from: 'from-[#721B3E]/20',
      to: 'to-[#D4AF37]/10',
      shadow: 'shadow-[#721B3E]/20',
    },
    details: [
      'Stood as an unyielding protective wall for her mother and sister during heavy times.',
      'Carried painful administrative, financial, and emotional burdens no youngster ever should.',
      'Kept choosing soft-hearted kindness, pure empathy, and unconditional love over cold bitterness.',
      'Maintained her beautiful gentle smile, stargazing at night and believing in a better tomorrow.'
    ],
    icons: ['Shield', 'Heart', 'Smile', 'Moon']
  },
  {
    id: 'love',
    yearRange: '2022 – 2026',
    title: 'CSE Triumph & The Destined Sanctuary',
    subtitle: 'The heavy path of engineering, and then... my soul finds its peace...',
    theme: 'love',
    emotionalText: '“In 2022, she stepped into the demanding world of Computer Science Engineering (CSE). The little girl who once trembled in silent fear began coding her own beautiful destiny! She battled heavy stress, daunting assignments, expectations, and self-doubt. Step by step, she completed CSE in 21st-century style with amazing, jaw-dropping grades! And right in the middle of these chaotic lines of code, she found someone who truly saw her soul. Not just her captivating smile, but the scars behind it—someone who loved her gently, safe-locked her heart, and made sure she would never have to fight her battles alone again.”',
    badge: 'CSE Graduation & True Love',
    imageSrc: IMAGES.timeline.cseGraduationTech,
    accentColors: {
      from: 'from-[#4B1B61]/25',
      to: 'to-[#D4AF37]/20',
      shadow: 'shadow-[#D4AF37]/35',
    },
    details: [
      'Mastered complex computing algorithms and code, building custom engineering projects.',
      'Successfully graduated in 2026 from CSE with majestic, proud grades!',
      'Healed her childhood wounds in quiet sunset walks, holding hands with her destiny.',
      'Discovered that her soul is courage, survival, and home—making her king incredibly proud.'
    ],
    icons: ['GraduationCap', 'Code', 'Heart', 'Anchor']
  },
  {
    id: 'birthday',
    yearRange: '23 May 2026',
    title: 'Happy 21st Birthday, My Entire Universe!',
    subtitle: 'Your sheer existence is the most precious gift to my world...',
    theme: 'birthday',
    emotionalText: '“Today, on the 23rd of May, 2026, we crown her majestic journey as she stepping into her Golden 21st! The little girl who nobody celebrated at birth is today the absolute champion, the pride of her own movie, and the queen of my galaxy. Narmatha, you were never unwanted—the world was simply too blind to comprehend your infinite cosmic worth. You conquered everything that tried to smash you, and you still remained the softest, kindest, most gorgeous soul I have ever known.”',
    badge: 'The Golden 21st Climax',
    imageSrc: IMAGES.timeline.goldenFestiveSparkle,
    accentColors: {
      from: 'from-[#D4AF37]/30',
      to: 'to-[#F9F6F2]/10',
      shadow: 'shadow-[#D4AF37]/40',
    },
    details: [
      'Celebrating 21 glorious, majestic years of your beautiful existence on Earth.',
      'The ultimate proud moment: born in pain, built through wars, destined to shine forever.',
      'Unveiling the birthday portal, floating gold lanterns in the starry heavens for you.',
      'Our infinite promise: I will choose you, again and again, with every heartbeat, for eternity.'
    ],
    icons: ['Cake', 'Sparkles', 'Gift', 'Crown']
  }
];

export const LOVE_LETTERS: LoveLetter[] = [
  {
    id: 'letter-1',
    title: 'A Promise to the Girl Who Conquered Storms',
    date: 'Locked in the Celestial Orbits',
    letter: `Narmatha, the queen of my dreams,\n\nI want to write this directly into your soul so you can read it whenever a shadow of doubt tries to creep into your heart. You survived childhood storms that would have completely pulverized normal people. Yet, you chose to hold flowers instead of ashes.\n\nI promise to be your personal quiet harbor, your safe blanket during the freezing cold winters of anxiety, and your strongest hand to hold whenever you feel like slipping. Your painful days are gone forever, my love. From this day forward, I will guard your happiness with everything I have.\n\nAlways and forever yours,\nYour Destiny. ♡`,
    isUnlocked: true
  },
  {
    id: 'letter-2',
    title: 'Why May 23rd is My Personal Celebration',
    date: 'The Day My Earth Got its Sun',
    letter: `My beautiful Narmatha,\n\nThey say history remembers dates when emperors won kingdoms or wars ended. But for me, the most celestial, miraculous date in the history of this universe is May 23rd, 2005.\n\nIt was the day a little angel took her first breath in a dim silent room. Nobody celebrated you then, my love, because they were too small to see that a star had descended. But today, my entire world stands up and celebrates you. Thank you for living. Thank you for never giving up in the dark. You are my light, my prayer, and my absolute celebration.\n\nHappy 21st Birthday, my warrior princess!`,
    isUnlocked: true
  },
  {
    id: 'letter-3',
    title: 'To Our Beautiful Coding & Cozy Future',
    date: 'Our Infinite Horizons',
    letter: `My future wife, my partner in every code and cozy evening,\n\nWhen we grow old, look at our grey hairs, and sit on our beautiful warm balcony chairs drinking hot sweet tea, I will look at you with the exact same gold sparkle in my eyes that I have today.\n\nI see a spectacular future of quiet morning coffees, code lines debugged together, messy food fights in our little kitchen, cozy movies on rainy nights, and a love that doubles with every single breath. You completing CSE with flying grades is just the prologue—we are going to write a complete masterpiece together. Let me love you for the rest of our human days.\n\nEternally yours. ♡`,
    isUnlocked: true
  }
];

export const REASONS_WHY: ReasonLove[] = [
  {
    id: 1,
    title: 'The One Who Turned Childhood Pain into Love (Your Pure Heart)',
    description: 'Even after seeing hatred, fights, and fear, you chose absolute kindness. You heal others silently with your immense empathy.',
    iconName: 'Heart'
  },
  {
    id: 2,
    title: 'The Grace & Elegance of Your Courage',
    description: 'You carry immense burdens so gracefully, smiling through the storm so everyone around you can breathe comfortably.',
    iconName: 'Sparkles'
  },
  {
    id: 3,
    title: 'How Your Laugh Melts Away My Loneliness',
    description: 'When you laugh and your eyes crinkle, my world immediately finds its light. Your voice is my favorite sweet sound.',
    iconName: 'Smile'
  },
  {
    id: 4,
    title: 'Your Brilliant, Relentless CSE Warrior Mind',
    description: 'The girl who once feared her schoolbooks conquered Computer Science Engineering! Your brilliant mind makes me so proud.',
    iconName: 'GraduationCap'
  },
  {
    id: 5,
    title: 'The Way You Look At Floating Clouds',
    description: 'Your beautiful, innocent, childlike wonder for star gradients, clouds, and twilight skies is my favorite poetry.',
    iconName: 'Sun'
  },
  {
    id: 6,
    title: 'You Are My Ultimate Home and Sanctuary',
    description: 'You accept my flaws, cradle my struggles, and cherish my heart. In your arms, all my chaos falls perfectly silent.',
    iconName: 'Flame'
  }
];

export const MEMORY_GALLERY: MemoryItem[] = [
  {
    id: 'mem-1',
    title: 'The First Spark of Celestial Alignment',
    description: 'That late-night conversation where we talked about our deepest scars, and realized our paths were aligned by destiny.',
    date: 'The Starry Connection',
    image: IMAGES.memories.celestialSpark,
    category: 'Destiny'
  },
  {
    id: 'mem-2',
    title: 'Cozy Chai & Gentle Whispers',
    description: 'Sipping sweet warm tea under dim orange lights, looking into your deep eyes, and sharing beautiful secrets.',
    date: 'Quiet Peace',
    image: IMAGES.memories.cozyChaiWhispers,
    category: 'Healing'
  },
  {
    id: 'mem-3',
    title: 'Chasing Twilight Gradients',
    description: 'Watching the purple clouds dissolve into velvety golden nights, sealing our silent vows of staying together forever.',
    date: 'Twilight Vows',
    image: IMAGES.memories.twilightVelvetGradients,
    category: 'Promises'
  },
  {
    id: 'mem-4',
    title: 'Our Unspoken Sacred Language',
    description: 'Holding hands in complete, beautiful silence, realizing that words are too small to explain how our hearts beat in unison.',
    date: 'True Alignment',
    image: IMAGES.memories.unspokenLoyaltyHands,
    category: 'Home'
  }
];
