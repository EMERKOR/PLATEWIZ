**PLATE WIZ**

APP TECHNICAL SPECIFICATION

Build Reference for Claude Code

Version 1.0 \| March 2026

**CONFIDENTIAL**

**Table of Contents**

1\. Project Overview and Objectives

2\. Architecture and Tech Stack

3\. Data Architecture

4\. Content Data Schemas

5\. Theme Configuration System

6\. Game Mode Specifications

7\. Screen Flow and Navigation

8\. Content Strategy and Data Sources

9\. Figma Integration Workflow

10\. Build Phases and Milestones

11\. Appendix: Sample Puzzle Data

**1. Project Overview and Objectives**

PLATE WIZ is an original primetime game show format built around license plates. This document specifies the technical requirements for the PLATE WIZ companion app, which serves two tracks:

-   **Track 1 --- Pitch MVP:** A polished, playable demo used in pitch meetings with producers, studios, and networks. Must convincingly demonstrate the core gameplay loop, visual identity, and content depth. Runs as a web app accessible on any device without installation.

-   **Track 2 --- Consumer App:** A standalone App Store product with daily challenges, progression, and social sharing. Built from the same codebase as Track 1. Deployed via Expo to iOS (and eventually Android). This track is secondary to Track 1 but the architecture must support it without rebuilding.

**1.1 Success Criteria**

-   The pitch MVP must be demonstrable in under 60 seconds with zero onboarding friction.

-   A non-developer (the creator) must be able to adjust visual properties (colors, fonts, spacing, animation timing) by editing a theme configuration file without writing code or prompting an AI.

-   Puzzle content must be addable and editable through structured JSON files without code changes.

-   The app must feel intentional and designed, not generated. Every visual detail must be deliberate.

-   All game modes must be playable from start to finish with scored results.

**2. Architecture and Tech Stack**

**2.1 Framework**

  -------------------- ------------------------------------- -----------------------------------------------------------------------------------------------
  **Component**        **Technology**                        **Rationale**

  Framework            React Native with Expo                Single codebase for web and iOS. Expo provides web export (expo-router) and native packaging.

  Language             TypeScript (strict mode)              Type safety for puzzle schemas and theme config.

  Styling              NativeWind (Tailwind for RN)          Utility-first styling with design token integration.

  Navigation           Expo Router (file-based)              Clean URL structure for web, native nav for iOS.

  State Management     React Context + useReducer            Lightweight, no external dependencies. Game state is ephemeral per session.

  Data Storage (MVP)   JSON files bundled in app             No backend. All content ships with the app.

  Data Storage (v2)    Supabase or equivalent                For daily challenges, leaderboards, user accounts. Track 2 only.

  Animation            React Native Reanimated               Smooth 60fps animations for plate reveals, score updates, timers.

  Testing              Jest + React Native Testing Library   Component and game logic tests.
  -------------------- ------------------------------------- -----------------------------------------------------------------------------------------------

**2.2 Project Structure**

> plate-wiz-app/ ├─ app/ \# Expo Router screens │ ├─ (tabs)/ \# Tab navigator (Home, Play, Daily, Stats) │ ├─ game/ \# Game mode screens │ └─ \_layout.tsx \# Root layout ├─ components/ \# Reusable UI components │ ├─ plates/ \# Plate rendering components │ ├─ game/ \# Game UI (timer, score, answer input) │ └─ ui/ \# Buttons, cards, modals ├─ config/ │ ├─ theme.json \# EDITABLE: All visual properties │ └─ game-config.json \# EDITABLE: Game mode parameters ├─ content/ \# EDITABLE: All puzzle data │ ├─ vanity-puzzles.json │ ├─ trivia-questions.json │ ├─ observation-puzzles.json │ ├─ logic-puzzles.json │ └─ states/ \# Per-state metadata ├─ assets/ │ ├─ plates/ \# Plate images (from Keegan dataset) │ ├─ fonts/ │ └─ icons/ ├─ lib/ \# Game logic, scoring, utilities │ ├─ game-engine.ts │ ├─ scoring.ts │ ├─ plate-renderer.ts │ └─ content-loader.ts └─ types/ \# TypeScript interfaces

**2.3 Build and Deploy**

-   Development: expo start \--web for browser testing, expo start for native simulator.

-   Web deploy (Track 1): expo export \--platform web, host on Vercel or Netlify. Shareable URL for pitch meetings.

-   iOS deploy (Track 2): eas build \--platform ios, submit via App Store Connect.

-   No backend required for MVP. All content is bundled. Track 2 adds a backend for daily challenges and user data.

**3. Data Architecture**

The app separates three concerns into distinct, independently editable layers. This is the core architectural decision that solves the 75/25 problem: Claude Code builds the engine, the creator tunes the look and content.

  ----------- ------------------------------ -------------------------------------------------- ----------------------------------------------------------------------------------------------------
  **Layer**   **Files**                      **Who Edits**                                      **What It Controls**

  Theme       config/theme.json              Creator (manual edit)                              Colors, fonts, spacing, animation timing, border radii, shadows, gradients. Every visual property.

  Content     content/\*.json                Creator (manual edit) + Claude Code (generation)   Puzzle data, trivia questions, state metadata, difficulty ratings. All game content.

  Logic       lib/\*.ts, components/\*.tsx   Claude Code only                                   Game mechanics, scoring, navigation, rendering. The code itself.
  ----------- ------------------------------ -------------------------------------------------- ----------------------------------------------------------------------------------------------------

**Critical rule:** No visual property should ever be hardcoded in a component. Every color, font size, spacing value, border radius, shadow, and animation duration must be read from theme.json. If the creator wants to change the background color of the trivia screen from #1A5276 to #2C3E50, they edit one value in one file and the change propagates everywhere.

**4. Content Data Schemas**

All puzzle content lives in typed JSON files. Below are the schemas for each game mode\'s content format.

**4.1 Vanity Plate Puzzle Schema**

> { \"id\": \"vp_001\", \"plate_text\": \"10SNE1\", \"answer\": \"Tennis, anyone?\", \"alt_answers\": \[\"Tennis anyone\"\], \"difficulty\": 3, \"hint\": \"A sport played with rackets\", \"category\": \"hobbies\", \"source\": \"treatment_sample\", \"fun_fact\": \"This plate appeared in the PLATE WIZ treatment as the Vanity Plate of the Day.\", \"max_characters\": 7 }

**Difficulty scale:** 1 (obvious, e.g. LUV2RUN) through 5 (requires lateral thinking, e.g. 10SNE1). The answer matching system must be fuzzy: ignore case, ignore spaces, accept alt_answers. For the MVP, target 100+ vanity plate puzzles across all five difficulty levels.

**4.2 Trivia Question Schema**

> { \"id\": \"trv_001\", \"question\": \"What is the oldest continuously used slogan on any U.S. license plate?\", \"answer\": \"Vacationland\", \"options\": \[\"Vacationland\", \"Grand Canyon State\", \"Famous Potatoes\", \"Land of Lincoln\"\], \"state\": \"ME\", \"difficulty\": 3, \"category\": \"slogans\", \"explanation\": \"Maine has used Vacationland since 1936.\", \"source\": \"wikipedia\" }

Categories include: slogans, history, design, symbols, famous_plates, state_facts, rules_and_law, pop_culture. Target 200+ trivia questions for MVP.

**4.3 Observation Puzzle Schema (Plate or Fake)**

> { \"id\": \"obs_001\", \"type\": \"plate_or_fake\", \"state\": \"NV\", \"plate_image\": \"plates/NV/standard.png\", \"is_real\": false, \"modification\": \"Slogan changed from \'Home Means Nevada\' to \'Nevada Means Home\'\", \"difficulty\": 2, \"hint\": \"Look closely at the slogan.\" }

**4.4 Observation Puzzle Schema (What\'s Missing)**

> { \"id\": \"obs_020\", \"type\": \"whats_missing\", \"state\": \"WI\", \"plate_image\": \"plates/WI/standard_modified.png\", \"original_image\": \"plates/WI/standard.png\", \"missing_element\": \"Red barn in the top right corner\", \"difficulty\": 3, \"hint\": \"Something agricultural is absent.\" }

**4.5 State Identification Schema (Symbolism)**

> { \"id\": \"sym_001\", \"type\": \"symbolism\", \"symbol_description\": \"A pair of oranges\", \"symbol_image\": \"assets/symbols/oranges.png\", \"correct_state\": \"FL\", \"decoy_states\": \[\"CA\", \"GA\", \"TX\"\], \"difficulty\": 1, \"explanation\": \"Florida\'s standard plate features oranges, reflecting its citrus industry.\" }

**4.6 Logic Puzzle Schema (Odd Plate Out)**

> { \"id\": \"log_001\", \"type\": \"odd_plate_out\", \"plates\": \[ { \"state\": \"LA\", \"plate_image\": \"plates/LA/standard.png\" }, { \"state\": \"MS\", \"plate_image\": \"plates/MS/standard.png\" }, { \"state\": \"GA\", \"plate_image\": \"plates/GA/standard.png\" }, { \"state\": \"AL\", \"plate_image\": \"plates/AL/standard.png\" } \], \"odd_one_out\": \"GA\", \"trait\": \"All states are in the Central Time Zone except Georgia (Eastern).\", \"difficulty\": 4, \"hint\": \"Think about what time it is.\" }

**4.7 State Metadata Schema**

> { \"state_code\": \"ME\", \"state_name\": \"Maine\", \"slogan\": \"Vacationland\", \"slogan_since\": 1936, \"nickname\": \"The Pine Tree State\", \"capital\": \"Augusta\", \"symbols\": \[\"pine cone\", \"black-capped chickadee\", \"lobster\"\], \"plate_colors\": { \"background\": \"#FFFFFF\", \"text\": \"#000080\", \"accent\": \"#8B0000\" }, \"standard_plate_image\": \"plates/ME/standard.png\", \"specialty_plate_count\": 68, \"notable_facts\": \[ \"Maine\'s Vacationland is the oldest continuously used plate slogan in the US.\", \"The pine cone and chickadee appear on the standard plate design.\" \], \"time_zone\": \"Eastern\" }

A complete states/ directory with one JSON file per state (plus DC) provides the factual backbone for trivia generation, puzzle validation, and in-game explanations.

**5. Theme Configuration System**

The theme.json file is the creator\'s primary tool for visual control. Every visual property in the app reads from this file. The structure is designed to be self-documenting: property names are descriptive, values use standard CSS/RN formats, and comments (via \_comment fields) explain what each section controls.

**5.1 Theme Structure**

> { \"\_comment\": \"PLATE WIZ Theme Configuration. Edit values to change the app\'s appearance.\", \"colors\": { \"primary\": \"#1A5276\", \"primaryLight\": \"#2E86C1\", \"primaryDark\": \"#0E3A5C\", \"secondary\": \"#F39C12\", \"secondaryLight\": \"#F7C948\", \"accent\": \"#E74C3C\", \"background\": \"#0D1B2A\", \"backgroundLight\": \"#1B2838\", \"surface\": \"#FFFFFF\", \"surfaceElevated\": \"#F8F9FA\", \"text\": \"#FFFFFF\", \"textDark\": \"#1A1A2E\", \"textMuted\": \"#7F8C8D\", \"success\": \"#27AE60\", \"error\": \"#E74C3C\", \"warning\": \"#F39C12\", \"timerNormal\": \"#27AE60\", \"timerWarning\": \"#F39C12\", \"timerDanger\": \"#E74C3C\" }, \"typography\": { \"fontFamily\": { \"heading\": \"System\", \"body\": \"System\", \"plate\": \"LicensePlate\", \"mono\": \"Courier\" }, \"fontSize\": { \"xs\": 12, \"sm\": 14, \"base\": 16, \"lg\": 18, \"xl\": 22, \"2xl\": 28, \"3xl\": 36, \"4xl\": 48 }, \"fontWeight\": { \"normal\": \"400\", \"medium\": \"500\", \"semibold\": \"600\", \"bold\": \"700\", \"black\": \"900\" } }, \"spacing\": { \"xs\": 4, \"sm\": 8, \"md\": 16, \"lg\": 24, \"xl\": 32, \"2xl\": 48 }, \"borderRadius\": { \"none\": 0, \"sm\": 4, \"md\": 8, \"lg\": 12, \"xl\": 16, \"full\": 9999 }, \"animation\": { \"plateRevealDuration\": 600, \"scoreUpdateDuration\": 400, \"timerTickInterval\": 1000, \"correctAnswerDelay\": 1200, \"wrongAnswerShake\": 300, \"transitionDuration\": 250 }, \"plate\": { \"width\": 300, \"height\": 150, \"borderWidth\": 3, \"borderColor\": \"#333333\", \"borderRadius\": 8, \"textColor\": \"#1A1A2E\", \"backgroundColor\": \"#FFFFFF\", \"embossedShadow\": true, \"fontSize\": 42 }, \"game\": { \"timerHeight\": 6, \"scoreDisplaySize\": 32, \"optionButtonHeight\": 56, \"optionSpacing\": 12, \"headerHeight\": 64 } }

**Usage in code:** Components import the theme via a useTheme() hook. Example: const { colors, spacing } = useTheme(); then style={{ backgroundColor: colors.primary, padding: spacing.md }}. No hardcoded values anywhere.

**5.2 What the Creator Can Change Without Code**

-   All colors throughout the app (backgrounds, text, buttons, highlights, timer states)

-   Font families, sizes, and weights for all text elements

-   Spacing and padding at every level

-   Border radii on buttons, cards, plates, modals

-   Animation timing (how fast plates reveal, scores animate, timers tick)

-   Plate rendering properties (size, border, shadow, text size)

-   Game UI dimensions (timer bar height, button sizes, header height)

**What requires Claude Code:** Layout structure, component hierarchy, navigation flow, game logic, new game modes, new screen types. In other words: where things are and how they work. The theme controls how things look.

**6. Game Mode Specifications**

The MVP includes four game modes, each mapping to a category of games from the show treatment. Each mode has a standalone play flow and a daily challenge variant.

**6.1 Vanity Plate Decoder**

**Treatment reference:** Plate Auction, Fill in the Plate, Scramble, Rearview

  ------------------ --------------------------------------------------------------------------------------------------------------------------------
  **Parameter**      **Value**

  Core mechanic      Player sees an encoded vanity plate (e.g. 10SNE1) and must type the decoded phrase.

  Input method       Text input field with submit button. Fuzzy matching (case-insensitive, ignore spaces, accept alt answers).

  Time limit         Configurable per difficulty. Default: 30s (easy), 20s (medium), 15s (hard).

  Scoring            Base points \* difficulty multiplier \* time bonus. Time bonus = percentage of time remaining.

  Progression        Sequence of 10 plates per session, escalating difficulty. Session ends when time runs out on any plate or all 10 are answered.

  Daily variant      One plate per day, limited guesses (3 attempts), shareable result grid (Wordle-style).

  Hint system        One hint per plate (costs 50% of available points). Shows category or first word.

  Visual             Plate renders in stamped-metal style with state background. Reveal animation on correct answer.
  ------------------ --------------------------------------------------------------------------------------------------------------------------------

**6.2 Plate Trivia**

**Treatment reference:** Round 1 Plate Trivia, Famous Plates, Date the Plate

  ------------------ ----------------------------------------------------------------------------------------------------
  **Parameter**      **Value**

  Core mechanic      Multiple-choice trivia about license plates: history, slogans, state facts, famous plates, design.

  Input method       Four option buttons. Tap to select. Immediate feedback.

  Time limit         15 seconds per question (configurable).

  Scoring            1000 points base, minus 100 per second elapsed. Wrong answer = 0 points.

  Progression        20 questions per session. Categories rotate. Summary screen at end.

  Daily variant      5 questions, themed by category or state region. Shareable score.

  Visual             Question card with plate image when relevant. Correct/wrong animations with explanation reveal.
  ------------------ ----------------------------------------------------------------------------------------------------

**6.3 Plate Spotter (Observation)**

**Treatment reference:** Plate or Fake, What\'s Missing, Specialty Plate Match, Plate Mashup

  ------------------ ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter**      **Value**

  Core mechanic      Visual identification challenges. Sub-modes: (a) Real or Fake: spot the modified plate. (b) What\'s Missing: identify the removed element. (c) State Match: match plate images to states on a map.

  Input method       Varies by sub-mode. Tap to select real/fake, text input for missing element, drag-and-drop for map matching.

  Time limit         Varies. Real/Fake: 10s per plate. What\'s Missing: 20s. State Match: 60s total.

  Scoring            Points per correct identification. Streak bonuses for consecutive correct answers.

  Progression        Mixed set of 10 observation challenges per session.

  Daily variant      One Real or Fake challenge. Binary result: correct or not.

  Visual             High-quality plate images from the Keegan dataset. Side-by-side comparison for Real/Fake. Interactive US map for State Match.
  ------------------ ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**6.4 Plate Logic (Reasoning)**

**Treatment reference:** Odd Plate Out, Plate Detective, Road Trip

  ------------------ --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter**      **Value**

  Core mechanic      Deduction puzzles. Sub-modes: (a) Odd One Out: four plates, find the one that doesn\'t share a trait. (b) Plate Detective: match decoded vanity plates to character profiles. (c) Sequence: arrange plates in chronological or geographic order.

  Input method       Tap to select the outlier. Drag to match plates to profiles. Drag to reorder.

  Time limit         30-60s depending on sub-mode.

  Scoring            Points for correct answer. Bonus for speed. Partial credit for sequence puzzles (points per correct placement).

  Progression        8 puzzles per session, mixed sub-modes.

  Daily variant      One Odd One Out puzzle. Shareable result.

  Visual             4-plate grid layout. Character profile cards for Detective. Timeline UI for Sequence.
  ------------------ --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**7. Screen Flow and Navigation**

**7.1 Tab Structure**

  --------- ----------------- -------------------------------------------------------------------------------------------
  **Tab**   **Screen**        **Description**

  Home      Home Screen       Hero plate animation, daily challenge callout, quick play buttons. First thing users see.

  Play      Game Select       Grid of game mode cards (Decoder, Trivia, Spotter, Logic). Tap to enter any mode.

  Daily     Daily Challenge   Today\'s daily puzzle. Countdown to next. History of past results. Shareable result.

  Stats     Statistics        Lifetime scores, streaks, accuracy by category, states mastered. Achievement badges.
  --------- ----------------- -------------------------------------------------------------------------------------------

**7.2 Game Flow (Universal)**

Every game mode follows the same flow to reduce implementation complexity and ensure consistent UX:

-   1\. Mode Select: User taps a game mode from the Play tab or a quick-play button on Home.

-   2\. Pre-Game: Brief mode explainer (skippable after first play). Difficulty selection if applicable. Animated 3-2-1 countdown.

-   3\. Active Game: Timer running. Puzzle displayed. User inputs answer. Immediate feedback (correct/wrong + explanation). Next puzzle loads automatically.

-   4\. Results: Session score, accuracy, time stats. Compare to personal best. Share button for daily challenges. Play Again or Return to Menu.

**7.3 Pitch Demo Mode**

A special entry point for pitch meetings. Accessed via a hidden gesture (e.g., triple-tap the logo on the home screen) or a URL parameter (?mode=demo).

-   Auto-plays a curated sequence of puzzles from each mode (2-3 per mode).

-   Difficulty is tuned to be impressive but not punishing. Showcases breadth.

-   Timer is visible but generous. The goal is to demonstrate gameplay, not stress the player.

-   Ends with a summary screen that mirrors the show\'s Showroom concept: \'Your bankroll unlocks\...\' with car images at different tiers.

-   Total demo time: under 5 minutes.

**8. Content Strategy and Data Sources**

**8.1 Primary Data Source: Keegan License Plate Database**

The Jon Keegan / Beautiful Public Data repository (github.com/jonkeegan/us-license-plates) contains 8,331 license plate designs across all 50 states and DC, with a CSV index and plate images organized by state. This dataset provides:

-   Plate images for all observation and identification games (Plate or Fake, What\'s Missing, State Match, Specialty Plate Match).

-   Plate title metadata for trivia generation (specialty plate names, organization names).

-   Source URLs for verification and additional context.

**Integration approach:** Clone the repo. Copy plate images into assets/plates/ organized by state. Parse the CSV into the app\'s content schema. Curate a subset of 200-300 plates for MVP puzzles, prioritizing visually distinctive designs and well-known specialty plates.

**8.2 Secondary Data Sources**

-   Wikipedia: United States license plate designs and serial formats. Structured tables with slogans, symbols, color schemes, design dates. Scrape or manually compile into states/ metadata.

-   licenseplateroom.com/slogans: Year-by-year slogan history for all states. Critical for Date the Plate and historical trivia.

-   15q.net: Photographic archive of US passenger plates from 1969 to present. Reference for historical plate designs.

-   ALPCA.org: Collector community with an encyclopedia of plate data. Useful for obscure facts and specialty plate details.

-   Vanity plate collections: chaos.umd.edu vanity plate list, published books (Mahoney, Kakadelis), online quizzes. Source material for authoring vanity plate puzzles.

**8.3 Content Authoring Pipeline**

Vanity plate puzzles are the only content type that must be fully authored (not derived from existing datasets). The pipeline:

-   1\. Seed list: Compile 300+ real and invented vanity plates from published sources, treatment examples, and original creation.

-   2\. AI-assisted generation: Use Claude API to generate candidate plates from target phrases. Input: a phrase like \'Tennis, anyone?\' Output: candidate encodings like 10SNE1, TNSNE1, TNSN1. Human curates the best encoding.

-   3\. Difficulty rating: Each puzzle is rated 1-5 by the creator. Guidelines: Level 1 = phonetic (LUV2RUN), Level 2 = abbreviation (NVRMND), Level 3 = mixed (IM1DRFL), Level 4 = lateral (10SNE1), Level 5 = obscure (URXQZD).

-   4\. Quality check: Every puzzle must be solvable by at least one tester within the time limit. If nobody can solve it, it\'s either too hard or poorly encoded.

**8.4 Image Strategy**

For the MVP, plate images from the Keegan dataset are used directly for observation games. For vanity plate decoding, plates are rendered programmatically using the PlateRenderer component, which draws a styled plate using state colors, fonts, and the encoded text. This avoids any need for custom plate photography for the core gameplay loop.

The PlateRenderer reads from state metadata (plate_colors, standard background) and theme.json (plate dimensions, border, shadow) to produce consistent, on-brand plate graphics. This is also how plates would render in the consumer app at scale, since every vanity plate puzzle just needs text on a styled background.

**9. Figma Integration Workflow**

The creator has Figma access enabled. The workflow uses Figma as the design source of truth and the theme.json file as the bridge to code.

**9.1 Design-to-Code Pipeline**

-   1\. Design in Figma: Screen layouts, component designs, color palette, typography scale, plate styling. Use Figma\'s design token system (color styles, text styles, spacing variables).

-   2\. Export tokens: Extract colors, typography, and spacing from Figma into theme.json format. This can be done manually (copy hex values) or via Figma plugins that export design tokens as JSON.

-   3\. Build with Claude Code: Claude Code reads the spec (this document) and theme.json to implement components. The Figma MCP connection allows Claude Code to pull design context directly from Figma files for specific components.

-   4\. Visual tuning: Creator adjusts theme.json values to match Figma designs exactly. Hot reload shows changes instantly.

-   5\. Iterate: For structural changes, update Figma first, then describe the change to Claude Code. For visual changes, edit theme.json directly.

**9.2 What to Design in Figma**

Not everything needs a Figma mockup. Focus design effort on:

-   The plate rendering style (stamped metal aesthetic, embossed lettering, state color schemes). This is the visual identity of the app.

-   The home screen and game select screen (first impressions matter for the pitch).

-   Game UI during active play (timer, score display, answer input, feedback states).

-   The results/summary screen (this is what people screenshot and share).

-   The daily challenge share card (the Wordle-style grid that gets posted to social media).

Do NOT over-design: standard UI elements (settings, navigation chrome, loading states) should use the design system defaults. Claude Code handles these with theme.json values.

**10. Build Phases and Milestones**

**Phase 1: Foundation**

  --------------------- --------------------------------------------------------------------- ----------------------
  **Task**              **Deliverable**                                                       **Dependency**

  Project scaffolding   Expo + TypeScript + NativeWind project with file-based routing        None

  Theme system          useTheme() hook reading from theme.json. Every component uses it.     Project scaffolding

  Content loader        TypeScript functions that load and validate puzzle JSON files.        Project scaffolding

  Plate renderer        Component that draws a styled license plate from text + state code.   Theme system

  State metadata        50 states + DC JSON files with slogans, symbols, colors, facts.       Data research
  --------------------- --------------------------------------------------------------------- ----------------------

**Phase 2: Game Modes**

  ---------------------- ------------------------------------------------------------------------------- --------------------------------
  **Task**               **Deliverable**                                                                 **Dependency**

  Vanity Plate Decoder   Full play loop: plate display, text input, fuzzy matching, scoring, feedback.   Plate renderer, content loader

  Plate Trivia           Multiple choice, timer, scoring, explanation reveals.                           Content loader

  Plate Spotter          Real/Fake mode with plate image comparison. What\'s Missing mode.               Plate images (Keegan dataset)

  Plate Logic            Odd One Out mode with 4-plate grid. Tap to select outlier.                      Content loader, plate images
  ---------------------- ------------------------------------------------------------------------------- --------------------------------

**Phase 3: Polish and Content**

  ------------------------ ------------------------------------------------------------------------- -----------------------------
  **Task**                 **Deliverable**                                                           **Dependency**

  Home screen              Hero animation, daily challenge card, quick play grid.                    All game modes

  Daily challenge system   Date-based puzzle selection. Shareable result card.                       All game modes

  Results and stats        Session results, lifetime stats, streaks, accuracy breakdown.             All game modes

  Demo mode                Curated pitch sequence. Hidden activation.                                All game modes, home screen

  Content population       100+ vanity puzzles, 200+ trivia questions, 50+ observation, 30+ logic.   Schemas finalized

  Visual polish            Animations, transitions, micro-interactions. Theme tuning.                All screens built
  ------------------------ ------------------------------------------------------------------------- -----------------------------

**Phase 4: Distribution (Track 2)**

  -------------------- ------------------------------------------------------------- ----------------------
  **Task**             **Deliverable**                                               **Dependency**

  iOS build            Expo EAS build for App Store submission.                      Phase 3 complete

  App Store assets     Screenshots, description, keywords, privacy policy.           iOS build

  Backend (optional)   Supabase for daily challenges, leaderboards, user accounts.   Phase 3 complete
  -------------------- ------------------------------------------------------------- ----------------------

**11. Appendix: Sample Puzzle Data**

Below are sample entries for each puzzle type drawn from the show treatment. These serve as reference data for Claude Code to understand the expected content format and for the creator to populate initial content.

**11.1 Sample Vanity Plate Puzzles**

  ---------------- ------------------ ---------------- -------------- -------------------------------------------
  **Plate Text**   **Answer**         **Difficulty**   **Category**   **Source**

  10SNE1           Tennis, anyone?    4                hobbies        Treatment (Vanity Plate of the Day)

  FLNGR8           Feeling great      2                phrases        Treatment (Round 1)

  NVRMND           Nevermind          2                phrases        Treatment (Round 1)

  ANMLLVR          Animal lover       2                identity       Treatment (Round 1)

  IM1DRFL          I\'m wonderful     3                phrases        Treatment (Round 1)

  XCLNCE           Excellence         3                abstract       Treatment (Round 1)

  URXQZD           You\'re excused    4                phrases        Treatment (Round 1)

  HIOFCR           Hi, officer        1                humor          Treatment (Round 1)

  PB4WEGO          Pee before we go   2                humor          Treatment (Tone section)

  OUTATIME         Out of time        1                pop_culture    Back to the Future DeLorean

  NRVOUS           Nervous            1                pop_culture    Ferris Bueller\'s Day Off Ferrari

  LWYRUP           Lawyer up          2                pop_culture    Breaking Bad / Better Call Saul

  FCANCER          F cancer           1                causes         Real vanity plate (treatment)

  FKGAS            F gas              1                humor          Tesla owner (treatment)

  SLR ENRG         Solar energy       3                technology     Treatment (Fill in the Plate)

  SPDY SNS         Spidey senses      3                pop_culture    Treatment (Plate Detective)

  FZNTDRA          Frozen tundra      4                sports         Treatment (Plate Detective - Packers fan)
  ---------------- ------------------ ---------------- -------------- -------------------------------------------

**11.2 Sample Trivia Questions**

  ----------------------------------------------------------------------------- --------------------------------- --------------
  **Question**                                                                  **Answer**                        **Category**

  What animal appears on North Dakota\'s standard plate?                        Bison                             symbols

  What material, invented by 3M, is now standard on nearly all US plates?       Retroreflective sheeting          history

  The Wright Brothers\' plane appears on plates from which states?              North Carolina and Ohio           state_facts

  What is the first state to feature a slogan on a license plate? (1928)        Idaho                             slogans

  What state\'s slogan is \'Live Free or Die\'?                                 New Hampshire                     slogans

  Maryland leads the US with approximately how many distinct plate designs?     \~989                             design

  The DeLorean\'s OUTATIME plate is from which film franchise?                  Back to the Future                pop_culture

  Which state\'s plate features a cowboy on a bucking horse, used since 1936?   Wyoming                           symbols

  What is Louisiana\'s license plate slogan?                                    Sportsman\'s Paradise             slogans

  DC\'s plate carries what politically charged slogan?                          Taxation Without Representation   slogans
  ----------------------------------------------------------------------------- --------------------------------- --------------

**11.3 Key Technical Notes for Claude Code**

-   **Answer matching for vanity plates:** Normalize both user input and correct answer before comparison. Lowercase, strip spaces, strip punctuation. Also check against alt_answers array. Consider Levenshtein distance for near-misses (show \'Close!\' feedback).

-   **Timer behavior:** Timer is always visible. Changes color at thresholds (green \> yellow at 50% remaining \> red at 25% remaining). Thresholds configurable in theme.json.

-   **Plate rendering:** The PlateRenderer component must handle variable-length text (plates range from 2-8 characters). Auto-size text to fit within plate bounds. Apply the stamped/embossed visual style consistently.

-   **Daily challenge seed:** Use the current date as a seed to deterministically select the daily puzzle. Same date = same puzzle for all users. This is critical for the shareable result mechanic.

-   **Offline-first:** All content is bundled. No network requests for gameplay. The app must work in airplane mode. Track 2 adds optional network features.

-   **Share card format:** For daily challenges, generate a shareable text/image result. Example for vanity decoder: \'PLATE WIZ Daily #42 - Solved in 12.4s / Hint used: No / Streak: 7\'. For trivia: \'4/5 correct, 3200 pts\'. Visual style should be distinctive and immediately recognizable.
