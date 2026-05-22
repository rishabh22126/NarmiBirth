/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TimelinePhase {
  id: string;
  yearRange: string;
  title: string;
  subtitle: string;
  theme: 'childhood' | 'growing' | 'teenage' | 'love' | 'birthday';
  emotionalText: string;
  badge: string;
  imageSrc: string;
  accentColors: {
    from: string;
    to: string;
    shadow: string;
  };
  details: string[];
  icons: string[]; // lucide icon names or descriptions for floating symbols
}

export interface LoveLetter {
  id: string;
  title: string;
  date: string;
  letter: string;
  isUnlocked: boolean;
}

export interface ReasonLove {
  id: number;
  title: string;
  description: string;
  iconName: string;
}

export interface MemoryItem {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
  category: string;
}
