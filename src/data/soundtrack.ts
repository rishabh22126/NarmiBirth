/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Core progressive chords in the custom synthesized Retro Rhodes Ambient Soundtrack:
// Fmaj7, G6, Am7, Em7
export const CHORD_PROGRESSIONS = [
  [174.61, 220.00, 261.63, 329.63], // Fmaj7 (F3, A3, C4, E4)
  [196.00, 246.94, 293.66, 392.00], // G6 (G3, B3, D4, G4)
  [220.00, 261.63, 329.63, 392.00], // Am7 (A3, C4, E4, G4)
  [164.81, 196.00, 246.94, 329.63], // Em7 (E3, G3, B3, E4)
];

// Starry, sparkling celestial melody sequences layered on top at higher frequencies (C5, D5, E5, G5, A5, B5, C6):
export const STARRY_MELODIES = [
  [523.25, 587.33, 659.25, 783.99], // C5, D5, E5, G5 (high stellar notes)
  [587.33, 659.25, 783.99, 880.00], // D5, E5, G5, A5
  [659.25, 783.99, 880.00, 987.77], // E5, G5, A5, B5
  [523.25, 659.25, 783.99, 1046.50] // C5, E5, G5, C6 (very sparkling)
];

// Aesthetic music descriptor
export const SOUNDTRACK_METADATA = {
  title: "Ambient Soft Piano & Rhodes Synth",
  tempo: "60 BPM",
  scale: "C Major / A Minor Pentatonic",
  description: "Instrumental, Soft Space Chill"
};
