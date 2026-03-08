export interface VanityPuzzle {
  id: string;
  plate_text: string;
  answer: string;
  alt_answers: string[];
  difficulty: 1 | 2 | 3 | 4 | 5;
  hint: string;
  category: string;
  source: string;
  fun_fact?: string;
  max_characters: number;
}

export interface TriviaQuestion {
  id: string;
  question: string;
  answer: string;
  options: string[];
  state?: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  category:
    | "slogans"
    | "history"
    | "design"
    | "symbols"
    | "famous_plates"
    | "state_facts"
    | "rules_and_law"
    | "pop_culture";
  explanation: string;
  source?: string;
}

export interface ObservationPuzzlePlateOrFake {
  id: string;
  type: "plate_or_fake";
  state: string;
  plate_image: string;
  is_real: boolean;
  modification: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  hint: string;
}

export interface ObservationPuzzleWhatsMissing {
  id: string;
  type: "whats_missing";
  state: string;
  plate_image: string;
  original_image: string;
  missing_element: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  hint: string;
}

export type ObservationPuzzle =
  | ObservationPuzzlePlateOrFake
  | ObservationPuzzleWhatsMissing;

export interface SymbolismPuzzle {
  id: string;
  type: "symbolism";
  symbol_description: string;
  symbol_image: string;
  correct_state: string;
  decoy_states: string[];
  difficulty: 1 | 2 | 3 | 4 | 5;
  explanation: string;
}

export interface LogicPuzzlePlate {
  state: string;
  plate_image: string;
}

export interface LogicPuzzle {
  id: string;
  type: "odd_plate_out";
  plates: LogicPuzzlePlate[];
  odd_one_out: string;
  trait: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  hint: string;
}

export interface PlateColors {
  background: string;
  text: string;
  accent: string;
}

export interface StateMetadata {
  state_code: string;
  state_name: string;
  capital: string;
  slogan: string;
  slogan_since: number | null;
  previous_slogans: string[];
  nickname: string;
  symbols: string[];
  plate_colors: PlateColors;
  time_zone: string;
  notable_facts: string[];
}
