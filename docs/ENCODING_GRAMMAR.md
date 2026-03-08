**THE ENCODING GRAMMAR**

A Formal Specification of Vanity License Plate Encoding

For Puzzle Generation, Difficulty Classification, and Answer Validation

PLATE WIZ \| March 2026

**CONFIDENTIAL**

**Table of Contents**

1\. Purpose and Usage

2\. Physical Constraints

3\. The Five Encoding Layers

3.1 Layer 1: Number-Sound Substitution

3.2 Layer 2: Single-Letter Word Substitution

3.3 Layer 3: Vowel Deletion (Consonant Skeleton)

3.4 Layer 4: Phonetic Respelling

3.5 Layer 5: Rebus and Conceptual Encoding

4\. Combination Rules and Layer Stacking

5\. Difficulty Classification System

6\. Encoding Walkthrough Examples

7\. Puzzle Generator Specification

8\. Answer Validation Logic

9\. Quality Control Criteria

10\. Reference Tables

**1. Purpose and Usage**

This document defines the complete encoding grammar used to create and classify vanity license plate puzzles for the PLATE WIZ app. It serves three functions:

-   **For puzzle generation:** A formal rule set that a programmatic generator (or Claude API) can apply to any English phrase to produce valid vanity plate encodings. Given the phrase \"feeling great,\" the generator applies the rules in this document to produce FLNGR8, FLN GR8, FEELGR8, and other candidates, ranked by estimated difficulty.

-   **For manual puzzle authoring:** A reference for the creator when hand-crafting puzzles that require human judgment. The generator will produce good candidates, but the best puzzles often require creative leaps that a rule-based system can suggest but not guarantee.

-   **For answer validation:** A principled basis for the fuzzy matching system that evaluates player answers. Understanding how plates encode meaning tells us how to accept valid interpretations and reject wrong ones.

The grammar is descriptive, not prescriptive. Real vanity plates do not follow formal rules; people invent encodings intuitively. This document captures the patterns that recur across thousands of real plates, organized into a system that makes them reproducible and classifiable. Not every real plate will fit neatly into this framework, and the best puzzles sometimes break the rules. But the framework makes it possible to generate hundreds of valid puzzles at controlled difficulty levels without inventing each one from scratch.

**2. Physical Constraints**

Every encoding must operate within the physical limits of real license plates. These constraints are not arbitrary; they shape the puzzle design space and define what feels authentic.

  -------------------- ---------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Constraint**       **Value**        **Notes**

  Maximum characters   7                The most common limit across US states. Some states allow 8 (California specialty plates). The app uses 7 as the default, with 8 available as an exception.

  Minimum characters   2                Most states require at least 2 characters. Single-character plates exist but are vanity collectibles, not message plates.

  Character set        A-Z, 0-9         Standard alphanumeric. No lowercase. No punctuation. Some states allow spaces (counted as a character); the app treats spaces as optional formatting.

  Space handling       Optional         Many states allow one space (e.g., SLR ENRG). The app renders spaces for readability but does not count them toward the character limit. Spaces are a visual aid, not an encoding element.

  Case                 Uppercase only   Plates are uppercase. Player input should be case-insensitive. Internal encoding is always uppercase.
  -------------------- ---------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Design implication:** The 7-character limit is the fundamental creative constraint. Encoding a 3-word phrase into 7 characters requires aggressive compression, which is what makes the puzzles challenging. Longer phrases require more layers of encoding, which increases difficulty. A phrase that fits naturally in 7 characters (e.g., LWYRUP = \"Lawyer up\") is easier than one that requires heavy compression (e.g., FZNTDRA = \"Frozen tundra\").

**3. The Five Encoding Layers**

Vanity plate encoding uses five distinct strategies, which we call layers. Each layer is a type of compression or substitution. Most plates use two or three layers simultaneously. The layers are ordered from most transparent (easiest to decode) to most opaque (hardest to decode).

**3.1 Layer 1: Number-Sound Substitution**

A digit replaces a syllable, word, or sound that matches its spoken name. This is the most universally recognized encoding strategy. Even people who have never thought about vanity plates will read GR8 as \"great\" without effort.

  ----------- ------------------------ -------------- ----------------------------------------------------------
  **Digit**   **Sound(s) Replaced**    **Position**   **Examples**

  0           oh, o (long)             Any            0MG = OMG, N0 = no, G0LD = gold

  1           one, won, un             Any            1DRFL = wonderful, NO1 = no one, 1CE = once

  2           to, too, two, tu         Any            2NITE = tonight, LUV2 = love to, 2L8 = too late

  3           three, free, e (long)    Any            3DOM = freedom, THR3 = three

  4           for, four, fore          Any            4EVR = forever, B4 = before, GR84U = great for you

  5           five, S (visual)         Rare           HI5 = high five, 5TAR = star (visual S)

  6           six, sex                 Rare           6APPEAL = sex appeal

  7           seven, T (visual)        Very rare      24/7 conceptual only; rarely phonetic

  8           ate, eight, ait, et      Very common    GR8 = great, L8R = later, CR8V = creative, SK8R = skater

  9           nine, nein, N (visual)   Rare           K9 = canine, CL0UD9 = cloud nine
  ----------- ------------------------ -------------- ----------------------------------------------------------

**Layer 1 Rules**

-   Digits 8, 4, 2, and 1 are high-frequency. Design the majority of number-substitution puzzles around these.

-   Digits 0, 3, and 9 are medium-frequency. They work in specific contexts but are less universally readable.

-   Digits 5, 6, and 7 are low-frequency. Avoid in puzzles below difficulty 4 unless the context makes them obvious (HI5, K9).

-   A digit can replace a sound at the beginning, middle, or end of a word. GR8 (end), 2NITE (beginning), CR8V (middle).

-   Multiple digits in one plate increase difficulty: 4G0T10 = \"forgotten\" uses three digits and is difficulty 5.

**3.2 Layer 2: Single-Letter Word Substitution**

A single letter replaces a common short word based on how the letter sounds when spoken aloud. This is the second most transparent encoding strategy. Virtually everyone reads U as \"you\" and R as \"are\" without conscious effort.

  ------------ ------------------------------------- --------------- --------------------------------------------------------
  **Letter**   **Word(s) Replaced**                  **Frequency**   **Examples**

  U            you                                   Very high       THNKU = thank you, CU = see you, URG8 = you\'re great

  R            are                                   Very high       RU = are you, RUDE = are you D.E.?, WR = we are

  B            be, bee                               High            B4 = before, 2BOR = to be or, BHAPPY = be happy

  C            see, sea                              High            CU = see you, ICU = I see you, BCUZ = because

  I            I, eye                                High            ILVIT = I love it, IM1DRFL = I\'m wonderful

  Y            why, wise                             Medium          YNT = why not, YRULKN = why are you looking

  O            oh, owe                               Medium          OIC = oh I see, OMG = oh my god

  N            in, and, en                           Medium          NJY = enjoy, ROCK N = rock and, NCHNTD = enchanted

  Q            queue, cue                            Low             BBQ = barbecue, QT = cutie

  X            ex, cross, trans                      Low             XCLNCE = excellence, XLR8 = accelerate, XPERT = expert

  T            tea, tee                              Low             QT = cutie, T42 = tea for two

  P            pea, pee                              Low             EZ2P = easy to pee, PB4WEGO = pee before we go

  S            es, is                                Low             S OK = it\'s OK (informal)

  W            double-u (rarely used phonetically)   Very low        Primarily visual/abbreviation

  G            gee                                   Very low        OG = oh gee (rare)

  J            jay                                   Very low        Used primarily in names, e.g. JWALKER

  K            okay (in combination)                 Low             KO = knockout, K9 = canine (K + nine)

  M            am, em                                Low             IM = I am, MNM = M&M, MPTY = empty

  D            the (in some dialects), did           Very low        DMan = the man (informal)

  F            eff                                   Low             FU = eff you, FCANCER = eff cancer

  L            el, hell                              Very low        L0L = LOL (acronym, not encoding)

  A            a, eh                                 Medium          A1 = A-one, AGRDN = a garden
  ------------ ------------------------------------- --------------- --------------------------------------------------------

**Layer 2 Rules**

-   U, R, B, C, and I are the core set. Any plate-literate person recognizes them instantly. Use these for difficulty 1-2.

-   Y, O, N, X, and Q form the extended set. They require a beat of recognition. Use for difficulty 2-3.

-   The remaining letters (T, P, S, M, F, etc.) function as word substitutions only in very specific, well-known combinations (QT, PB4WEGO, K9). Do not use them as general-purpose substitutions in puzzles below difficulty 4.

-   Letter-word substitutions chain naturally with number-sound substitutions: CUL8R = see you later (C + U + L + 8 + R). These chains are the bread and butter of mid-difficulty puzzles.

-   When a letter serves as both itself (part of a word) and a word substitution, the plate becomes ambiguous. This can be a feature (multiple valid readings) or a flaw (no clear answer). Puzzles should have one unambiguous primary reading.

**3.3 Layer 3: Vowel Deletion (Consonant Skeleton)**

Remove some or all vowels from a word, leaving a consonant skeleton that remains readable because English consonant patterns carry most of the semantic information. This is the primary compression strategy for fitting longer words and phrases into 7 characters.

**How Vowel Deletion Works**

English readers reconstruct vowels from context and consonant patterns. The word \"NVRMND\" is readable as \"nevermind\" because the consonant sequence N-V-R-M-N-D has only one plausible English word interpretation. The word \"DR\" is not readable because D-R could be \"door,\" \"deer,\" \"dear,\" \"dire,\" \"dare,\" or \"dry.\" The key principle: vowel deletion works when the remaining consonants are unambiguous.

  --------------- ------------------- ---------------------- --------------------------------------------------
  **Full Word**   **Vowel-Deleted**   **Characters Saved**   **Ambiguous?**

  NEVERMIND       NVRMND              3                      No --- unique consonant pattern

  DRIVER          DRVR                2                      No --- recognizable

  FEELING         FLNG                2                      Low --- context usually resolves

  ANIMAL          ANML                2                      No --- distinctive pattern

  EXCELLENT       XCLNT               3                      Low --- XC opening is distinctive

  WONDERFUL       WNDRFL              3                      No --- unique pattern

  PERFECT         PRFCT               2                      No --- common word, clear

  DOCTOR          DCTR                2                      Low --- but DR alone is ambiguous

  LOVE            LV                  2                      Yes --- LV = love, live, leave. Needs context

  GREAT           GRT                 2                      Medium --- grit, great, grout. But GR8 is better

  TEACHER         TCHR                3                      No --- distinctive pattern

  MONSTER         MNSTR               2                      No --- clear reading
  --------------- ------------------- ---------------------- --------------------------------------------------

**Layer 3 Rules**

-   Delete interior vowels first, preserve leading vowels when they carry stress or are essential to pronunciation (ANML not NML for \"animal\").

-   Preserve vowels that prevent ambiguity. If removing a vowel creates a consonant cluster that reads as a different word, keep it.

-   Single-syllable words with short vowels are poor candidates for vowel deletion. \"CAT\" becomes \"CT\" which is unreadable. Multi-syllable words are the sweet spot.

-   Doubled consonants after vowel deletion should be reduced to one: RUNNING with vowels removed = RNNNG, but RNNG is more readable.

-   Vowel deletion compounds with other layers: FLNGR8 = feeling + great, where \"feeling\" uses vowel deletion and \"great\" uses number substitution.

-   The difficulty of vowel-deleted plates depends entirely on the uniqueness of the consonant skeleton. NVRMND is difficulty 2. LV is difficulty 4 without additional context.

**3.4 Layer 4: Phonetic Respelling**

Rewrite a word or syllable using different letters that produce the same sound when spoken aloud. Unlike vowel deletion (which removes characters) or number substitution (which replaces with digits), phonetic respelling replaces letters with other letters based on sound equivalence.

  ------------ ----------------------- --------------------------- ------------------------------------------------------
  **Sound**    **Standard Spelling**   **Phonetic Alternatives**   **Examples**

  hard K       C, K, CK                K for C, C for K            KOOL = cool, KAR = car, KRAZY = crazy

  F            F, PH                   F for PH                    FONE = phone, FOTO = photo, FUN = fun

  S (soft C)   S, C (before e/i)       S for C, C for S            SINE = sign (rare), NISE = nice

  Z            Z, S (voiced)           Z for S                     EZ = easy, PLEEZ = please, BOYZ = boys

  SH           SH                      SH, XN (rare)               XLNT = excellent (the X absorbs \"eks\" sound)

  KS / EKS     X, CKS, KS              X for KS/EKS                XCLNCE = excellence, XTRA = extra, XTREME = extreme

  W            W, WH                   W for WH                    WY = why, WEN = when (informal)

  long A       A, AY, AI, EI           A for AY                    GR8 preferred, but GRA = gray variant

  long E       E, EE, EA               E for EE/EA                 EZ = easy, SWET = sweet (rare)

  long I       I, Y, IGH               I for IGH, Y for I          HI = high, NITE = night, LIT = light

  OO           OO, U, EW               OO for U, U for OO          KOOL = cool, SKOOL = school, TUNA (no change needed)

  ER           ER, IR, UR              R alone (see Layer 3)       DRVR = driver, LOVR = lover, PLAYR = player
  ------------ ----------------------- --------------------------- ------------------------------------------------------

**Layer 4 Rules**

-   Phonetic respelling is most effective when it saves characters (PH to F saves one character) or resolves ambiguity (NITE is clearer than NIT for \"night\").

-   K-for-C and Z-for-S are the most widely recognized phonetic respellings. They carry a casual/playful tone that fits the plate medium.

-   X is the most powerful phonetic substitution because it replaces 3-4 characters (\"ecks\" or \"excess\" or \"ex-\") with one. XCLNCE, XLR8, XPERT.

-   Phonetic respelling increases difficulty when combined with vowel deletion because the reader must both reconstruct vowels AND map unfamiliar spellings to sounds. FZNTDRA = \"frozen tundra\" uses phonetic respelling (FZ for \"froz\") plus vowel deletion (TNDRA), making it difficulty 4-5.

-   Avoid phonetic respellings that create unintended readings. SHAG could be \"shag\" or an attempt at something else. Every respelling should have one dominant reading.

**3.5 Layer 5: Rebus and Conceptual Encoding**

The plate represents meaning through conceptual association rather than phonetic spelling. The reader must make a lateral connection, not just sound out letters and numbers. This is the most opaque encoding layer and produces the hardest puzzles.

**Rebus Types**

**Type A --- Digit-Word Rebus:** A digit represents a word that, when combined with adjacent characters, forms a larger word. The digit does not represent its sound; it represents its name, which embeds inside the target word. Example: 10SNE1 = tennis, anyone. The digit 10 represents \"ten,\" which begins the word \"tennis\" (ten + nis). The digit 1 represents \"one,\" which forms \"anyone\" (any + one). The reader must recognize that the digits are embedded word fragments, not phonetic substitutions.

**Type B --- Syllable Rebus:** A letter or digit represents a syllable from its name, not its sound. Example: NRG = energy (N = \"en\" + R = \"er\" + G = \"gee\" = en-er-gee). Example: MT = empty (M = \"em\" + T = \"tee\" = em-tee). Example: QT = cutie (Q = \"cue\" + T = \"tee\" = cue-tee). The reader must mentally pronounce each character\'s full name to reconstruct the word.

**Type C --- Visual/Structural Rebus:** The arrangement or appearance of characters conveys meaning beyond their phonetic value. Example: YYUR YYUB = too wise you are, too wise you be (YY = two Y\'s = \"too wise\"). Example: \|I\| = Roman numeral III = three. These are rare on real plates but make for excellent high-difficulty puzzles.

**Type D --- Abbreviation Rebus:** Standard abbreviations or acronyms where each letter stands for a word. Example: OMG = oh my god. Example: LOL = laughing out loud. Example: BFF = best friends forever. These are transparent (low difficulty) when the abbreviation is widely known, and opaque (high difficulty) when it\'s domain-specific.

**Layer 5 Rules**

-   Rebus puzzles are the crown jewels of the puzzle library. They should constitute no more than 15-20% of total puzzles, reserved for difficulty 4-5.

-   Every rebus puzzle must have a clear, singular answer. If a rebus can be plausibly read multiple ways with equal validity, it is too ambiguous for a timed game.

-   Digit-word rebuses (Type A) are the most satisfying to solve because the \"aha\" moment is sharp: the player suddenly sees that 10 = ten = beginning of tennis. Design these carefully.

-   Syllable rebuses (Type B) like NRG and MT are surprisingly accessible once the player learns the pattern. Include 2-3 easy syllable rebuses early in the difficulty curve to teach the concept.

-   Hints for rebus puzzles should point toward the conceptual leap, not the phonetics. For 10SNE1, the hint should be \"A sport played with rackets\" not \"Think about the number ten.\"

**4. Combination Rules and Layer Stacking**

Most real vanity plates, and most good puzzles, combine two or more encoding layers within a single plate. Understanding how layers stack is essential for both generating puzzles and classifying their difficulty.

**4.1 Common Layer Combinations**

  --------------------------------- ----------------- ------------- ------------------- ----------------
  **Combination**                   **Layers Used**   **Example**   **Decoded**         **Difficulty**

  Number + Letter-word              1 + 2             CUL8R         See you later       1

  Vowel deletion + Number           3 + 1             FLNGR8        Feeling great       2

  Letter-word + Vowel deletion      2 + 3             URXQZD        You\'re excused     4

  Vowel deletion + Phonetic         3 + 4             FZNTDRA       Frozen tundra       4

  Number + Rebus                    1 + 5             10SNE1        Tennis, anyone?     4

  Letter-word + Number + Vowel      2 + 1 + 3         IM1DRFL       I\'m wonderful      3

  All phonetic + vowel              3 + 4             XCLNCE        Excellence          3

  Letter-word + Phonetic + Number   2 + 4 + 1         UR GR8        You\'re great       1

  Triple stack                      1 + 2 + 3         ULVNIT        You\'re loving it   3
  --------------------------------- ----------------- ------------- ------------------- ----------------

**4.2 Stacking Principles**

-   Each additional layer increases difficulty by approximately one level, but familiar combinations (like CUL8R) have been absorbed into cultural literacy and read as difficulty 1 despite using two layers.

-   Layers 1 and 2 (numbers and letter-words) stack cleanly with everything. They are the connective tissue of plate encoding.

-   Layers 3 and 4 (vowel deletion and phonetic respelling) stack with each other cautiously. Heavy vowel deletion plus heavy phonetic respelling produces consonant sequences that can become unreadable. FZNTDRA works because \"frozen tundra\" is a well-known phrase. FZNTPN would not work for \"frozen turnip\" because the consonant skeleton is too ambiguous.

-   Layer 5 (rebus) generally should not be stacked with heavy Layer 3 or 4. The conceptual leap is hard enough without also requiring the reader to reconstruct vowels from consonant skeletons. Keep rebus plates relatively transparent in their non-rebus portions.

-   The golden rule: the reader should only need to make ONE type of cognitive leap per plate. Either they\'re sounding it out (Layers 1-4) or they\'re making a conceptual connection (Layer 5). Plates that require both simultaneously are too hard for all but the most expert players.

**5. Difficulty Classification System**

Every puzzle is assigned a difficulty rating from 1 to 5. The rating determines which game modes and session positions the puzzle appears in, what time limits apply, and how points are scored. The classification is based on encoding layers used, familiarity of the phrase, and ambiguity of the reading.

  ----------- ---------- --------------------------------------- ---------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Level**   **Name**   **Layers**                              **Recognition Time**   **Description**

  1           Instant    1-2 (familiar combos)                   Under 3 seconds        The plate reads almost as plainly as English. Common abbreviations, single-substitution plates, culturally embedded encodings. A non-puzzle player would get these. Examples: LUV2RUN, GR8, HIOFCR, CUL8R, NRVOUS.

  2           Quick      1-2 (less familiar) or clean Layer 3    3-8 seconds            Requires one beat of recognition. The reader needs to sound it out or notice one substitution they might not see instantly. Examples: NVRMND, FLNGR8, PB4WEGO, LWYRUP, ANMLLVR.

  3           Moderate   2-3 layers stacked                      8-15 seconds           Multiple encoding strategies at work. The reader needs to parse the plate into segments and decode each one. Examples: IM1DRFL, XCLNCE, SLR ENRG, SPDY SNS, BSTFRND.

  4           Hard       3+ layers or Layer 5 rebus              15-25 seconds          Requires either heavy multi-layer decoding or a conceptual leap. The reader may need to try multiple interpretations before landing on the right one. Examples: 10SNE1, URXQZD, FZNTDRA, 4G0T10.

  5           Expert     Layer 5 (complex) or extreme stacking   25+ seconds            Requires a non-obvious conceptual leap, domain-specific knowledge, or an encoding so compressed that only expert decoders will crack it within the time limit. Reserve for bonus rounds and daily challenges. Examples: NRG (energy), YYURYYUB, obscure cultural references.
  ----------- ---------- --------------------------------------- ---------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**5.1 Classification Heuristics for the Generator**

When a generator produces a candidate encoding, assign difficulty using these rules in order:

-   If the plate uses only Layer 1 or Layer 2 with a common phrase and the encoding appears in popular culture (CUL8R, GR8, OMG): Difficulty 1.

-   If the plate uses one layer cleanly (pure vowel deletion of a common word, or a single number substitution in context): Difficulty 2.

-   If the plate stacks two layers (vowel deletion + number, or letter-word + phonetic respelling): Difficulty 3.

-   If the plate stacks three layers, or uses any rebus element, or requires knowledge of a specific phrase to decode: Difficulty 4.

-   If the plate requires a non-obvious conceptual leap, uses a complex rebus, or has an encoding so compressed that multiple valid-sounding readings exist before the correct one emerges: Difficulty 5.

-   Familiarity discount: a well-known phrase (\"see you later\") encoded at what would otherwise be difficulty 3 drops to difficulty 2, because the phrase itself helps the reader confirm they\'re on the right track.

-   Ambiguity penalty: if an encoding has a plausible secondary reading, add one difficulty level. If it has two or more plausible secondary readings, it may be unsuitable for the game.

**6. Encoding Walkthrough Examples**

The following examples demonstrate the encoding process from target phrase to final plate, showing which layers are applied and why. These walkthroughs are the model for how the puzzle generator should think.

**Example 1: \"Feeling great\"**

**Target phrase:** Feeling great (13 characters with space)

**Target length:** 7 characters or fewer

**Step 1 --- Number substitution:** \"great\" contains the sound \"ate\" → GR8. Running total: FEELING GR8 (10 chars). Still too long.

**Step 2 --- Vowel deletion on \"feeling\":** FEELING → FLNG (drop E, E, I). Running total: FLNG GR8 (7 chars). Fits.

**Final plate:** FLNGR8

**Layers used:** Layer 1 (8 = ate) + Layer 3 (vowel deletion on \"feeling\")

**Difficulty:** 2 --- two layers, but both are clean and the phrase is common.

**Example 2: \"Tennis, anyone?\"**

**Target phrase:** Tennis, anyone? (14 characters)

**Target length:** 7 characters

**Step 1 --- Identify rebus opportunity:** \"Tennis\" starts with \"ten\" → 10 can replace \"ten\". TENNIS → 10NIS. But 10NIS is 5 characters for one word, leaving only 2 for \"anyone.\"

**Step 2 --- Compress \"anyone\":** \"anyone\" = \"any\" + \"one\" → \"one\" = 1. But \"any\" needs compression. ANE1? ANY1? NE1? \"NE1\" reads as \"anyone\" if you read N = \"an\" + E = \"ee\"\... no. Read it as: N + E + 1 = \"nee-wun\"\... no. Actually: NE1 = \"any one\" only works if you already know the answer. Try: 10SNE1. Read it as: 10S = \"tens\" = \"tennis\" + NE1 = \"anyone\" phonetically (n-ee-wun).

**Step 3 --- Test readability:** 10SNE1. A cold reader would struggle. But with the hint \"a sport played with rackets,\" the \"10S\" becomes \"tennis\" quickly and \"NE1\" resolves as \"anyone\" in context.

**Final plate:** 10SNE1

**Layers used:** Layer 5 (digit-word rebus: 10 = ten in tennis) + Layer 1 (1 = one) + implicit Layer 3 (vowel compression in NE1)

**Difficulty:** 4 --- rebus element requires a conceptual leap, but the phrase is well-known and a good hint resolves it.

**Example 3: \"I\'m wonderful\"**

**Target phrase:** I\'m wonderful (13 characters)

**Step 1 --- Letter-word substitution:** \"I\'m\" → IM (Layer 2). Running: IM WONDERFUL (12 chars).

**Step 2 --- Number substitution:** \"wonderful\" contains \"one\" → W + 1 + DERFUL. Running: IM W1DERFUL (10 chars). Still too long.

**Step 3 --- Vowel deletion:** W1DERFUL → W1DRFL (drop E, U). Running: IM1DRFL (7 chars). Fits.

**Final plate:** IM1DRFL

**Layers used:** Layer 2 (I = I\'m) + Layer 1 (1 = one) + Layer 3 (vowel deletion)

**Difficulty:** 3 --- three layers stacked, but each is individually clean.

**Example 4: \"Excellence\"**

**Target phrase:** Excellence (10 characters)

**Step 1 --- Phonetic respelling:** \"Ex\" = X (the letter X sounds like \"eks\"). EXCELLENCE → XCELLENCE (9 chars).

**Step 2 --- Vowel deletion:** XCELLENCE → XCLNCE (drop E, E, E; keep the final E for readability). 6 chars. Fits.

**Final plate:** XCLNCE

**Layers used:** Layer 4 (X = eks) + Layer 3 (vowel deletion)

**Difficulty:** 3 --- two layers, but the phonetic X is less intuitive than number substitutions.

**7. Puzzle Generator Specification**

The puzzle generator takes an English phrase as input and produces ranked candidate vanity plate encodings. It is a utility tool, not a component of the app itself. It runs as a script (or Claude API call) during content authoring.

**7.1 Generator Input**

-   A target English phrase (e.g., \"frozen tundra\").

-   Maximum character length (default: 7).

-   Target difficulty range (e.g., 2-4).

-   Optional: preferred layers to use or avoid.

**7.2 Generator Algorithm (Pseudocode)**

Step 1: Normalize the phrase. Lowercase, strip punctuation, split into words.

Step 2: For each word, generate all valid single-layer encodings by applying each layer\'s substitution rules independently. This produces a set of encoded variants per word. For \"great\": GR8, GRT, GR8, GRAT, etc.

Step 3: Combine word-level encodings into full-plate candidates. For each combination of word encodings, concatenate and check against the character limit. If the combination exceeds 7 characters, apply additional compression (more aggressive vowel deletion, merge words at boundaries).

Step 4: Score each candidate on estimated difficulty using the classification heuristics from Section 5. Filter to the requested difficulty range.

Step 5: Score each candidate on readability: can the original phrase be unambiguously reconstructed? Penalize candidates with plausible secondary readings. Rank by readability within the difficulty band.

Step 6: Return the top 5-10 candidates with their difficulty scores and the layers used.

**7.3 Generator Output Format**

The generator outputs candidate puzzles in the app\'s content schema:

-   plate_text: the encoded plate string

-   answer: the original target phrase

-   difficulty: estimated difficulty (1-5)

-   layers_used: array of layer numbers applied

-   readability_score: 0-100 confidence that the plate has one clear reading

-   notes: any flags (ambiguous secondary reading, unfamiliar encoding, etc.)

**7.4 Human Review**

The generator is a tool, not an authority. Every generated puzzle must be reviewed by a human before entering the content library. The reviewer checks:

-   Does the plate have one clear, unambiguous primary reading?

-   Is the difficulty rating accurate? (Test by showing it to someone cold.)

-   Is the phrase appropriate? (No unintended offensive readings.)

-   Does the plate feel natural? (Would someone actually put this on a car?)

-   Is the hint sufficient to guide a stuck player toward the answer without giving it away?

**8. Answer Validation Logic**

When a player types their answer, the app must determine whether it matches the target phrase. Because vanity plate decoding is inherently imprecise, the validation system must be forgiving without accepting clearly wrong answers.

**8.1 Normalization (Applied to Both Player Input and Correct Answer)**

-   Convert to lowercase.

-   Strip all punctuation (apostrophes, commas, question marks, periods, hyphens).

-   Collapse multiple spaces to single space.

-   Trim leading/trailing whitespace.

-   Result: \"Tennis, anyone?\" becomes \"tennis anyone\". Player input \"Tennis Anyone\" also becomes \"tennis anyone\". Match.

**8.2 Match Levels**

  ------------------ -------------------------------------------------------------------- -------------- -----------------------------------------------------------
  **Level**          **Condition**                                                        **Result**     **Player Feedback**

  Exact match        Normalized input = normalized answer                                 Correct        Green highlight, points awarded, celebration animation

  Alt answer match   Normalized input matches any entry in alt_answers array              Correct        Same as exact match

  Close match        Levenshtein distance ≤ 2 from correct answer (after normalization)   Prompt retry   \"Close! Try again.\" (no point penalty, timer continues)

  Wrong              None of the above                                                    Incorrect      Red highlight, show correct answer, brief explanation
  ------------------ -------------------------------------------------------------------- -------------- -----------------------------------------------------------

**8.3 Alt Answers**

The alt_answers array captures legitimate variant readings. For \"Tennis, anyone?\" the alt_answers might include: \[\"tennis anyone\", \"tennis any one\"\]. For \"Feeling great\": \[\"feeling great\", \"feelin great\", \"feelin gr8\"\]. The content author should populate alt_answers for any puzzle where reasonable variant interpretations exist. When in doubt, err toward acceptance.

**8.4 Edge Cases**

-   Articles: \"a new start\" and \"new start\" should both be accepted. The answer should include the article; alt_answers should include the version without it.

-   Contractions: \"I\'m wonderful\" and \"I am wonderful\" should both be accepted.

-   Tense: \"Feeling great\" and \"Feel great\" are meaningfully different. Do not accept tense changes unless explicitly added as alt_answers.

-   Spelling variants: \"Color\" and \"colour\" should both be accepted for international players (Track 2).

**9. Quality Control Criteria**

Not every valid encoding makes a good puzzle. The following criteria determine whether a generated or authored puzzle enters the content library.

**9.1 Must-Pass Criteria (Reject If Failed)**

-   Single clear reading: A cold reader (given unlimited time) should arrive at the correct answer and no other equally plausible answer. Test this with at least one person who hasn\'t seen the answer.

-   Solvable under time limit: At least one tester should solve the puzzle within the game\'s time limit for its difficulty level. If expert players can\'t solve it in time, the difficulty rating is wrong or the puzzle is too hard.

-   No offensive readings: The plate must not have a plausible reading that is offensive, vulgar, or inappropriate. Remember that DMVs reject plates for this reason; game puzzles should pass the same bar.

-   Character limit: 7 characters maximum (8 for designated exceptions). No exceptions.

**9.2 Quality Criteria (Prefer If Met)**

-   Satisfying decode: The moment of recognition should feel rewarding. The best puzzles produce an audible \"oh!\" when the answer clicks. Plates where the answer feels obvious in hindsight are better than plates where the answer feels arbitrary.

-   Common phrase: Plates that encode well-known phrases, idioms, or references are more satisfying than plates encoding obscure or generic phrases. \"NVRMND\" (Nevermind) is better than \"NVRDLY\" (Never daily) because Nevermind is a thing people say.

-   Natural encoding: The encoding should feel like something a real person would put on a real car. Forced or overly clever encodings that no one would actually use feel inauthentic.

-   Phonetic flow: When spoken aloud, the plate characters should flow toward the answer. GR8 sounds like \"great\" when you say it. FZNTDRA does not flow phonetically but works through recognition. Both are valid but phonetically flowing plates are more accessible.

-   Visual distinctiveness: Plates with a mix of letters and numbers are more visually interesting than all-letter plates. All-letter plates are fine but should not dominate the library.

**10. Reference Tables**

Comprehensive reference for encoding rules, organized for quick lookup during puzzle authoring.

**10.1 Complete Number Substitution Reference**

  ----------- ------------------- ----------------------- --------------- -----------------------------------------------------------
  **Digit**   **Primary Sound**   **Secondary Sounds**    **Frequency**   **Best At**

  0           oh                  o (long), zero          Medium          Word-initial (0MG), word-medial (G0LD)

  1           one, won            un, wun                 High            Rebus (W1NDER = wonder), word-final (NO1 = no one)

  2           to, too, two        tu                      Very high       Prepositions (LUV2 = love to), prefixes (2NITE = tonight)

  3           three, free         e (long, rare)          Medium          Word-initial (3DOM = freedom)

  4           for, four           fore                    Very high       Prepositions (4EVR = forever, B4 = before, 4U = for you)

  5           five                S (visual only)         Low             Specific phrases only (HI5 = high five)

  6           six                 sex (careful)           Low             Specific phrases only (6APPEAL)

  7           seven               T (visual, very rare)   Very low        Avoid except in culturally fixed expressions (24/7)

  8           ate, eight          ait, et, eat            Very high       Ubiquitous: GR8, L8, CR8, SK8, H8, W8, F8, M8, R8, D8, G8

  9           nine                nein, N (visual)        Low             K9 = canine, CL0UD9 = cloud nine
  ----------- ------------------- ----------------------- --------------- -----------------------------------------------------------

**10.2 Complete Letter-Word Substitution Reference**

  ------------ ------------------ ---------------------- --------------- --------------------------------------------------
  **Letter**   **Primary Word**   **Secondary Words**    **Frequency**   **Notes**

  A            a (article)        eh, ay                 Medium          Works as article: AGRDN = a garden

  B            be, bee            by (rare)              High            B4 = before, BHAPPY = be happy, 2BOR = to be or

  C            see                sea                    High            CU = see you, ICU = I see you

  D            did (rare)         dee                    Very low        Mostly in names or fixed expressions

  F            eff                                       Low             Primarily emphatic: FCANCER, FKGAS

  G            gee                                       Very low        OG = oh gee (uncommon)

  I            I                  eye                    High            Universal: ILVIT, IM = I\'m, IWISH

  J            jay                                       Very low        Names only: JWALKER = jaywalker

  K            okay (K alone)     kay                    Low             K = okay in text speak. K9 uses K + 9 = canine

  L            el                 hell (slang)           Very low        Rarely used as word substitution

  M            am, em                                    Low             IM = I am, MNM = M&M, MPTY = empty

  N            in, and, en                               Medium          ROCK N = rock and, NJY = enjoy

  O            oh, owe                                   Medium          OIC = oh I see, OMG = oh my god

  P            pea, pee                                  Low             PB4WEGO = pee before we go

  Q            cue, queue                                Low             QT = cutie, BBQ = barbecue

  R            are                                       Very high       RU = are you, RGREAT = are great

  S            is, es                                    Low             Uncommon as standalone word sub

  T            tea, tee                                  Low             QT = cutie, T42 = tea for two

  U            you                ewe (rare)             Very high       Most common letter-word sub. THNKU, URG8, CU, 4U

  V            vee (rare)                                Very low        Not standard

  W            double-u           we (informal)          Very low        Not phonetically useful

  X            ex, cross, trans                          Low             XCLNCE = excellence, XLR8 = accelerate

  Y            why                wise (YY = too wise)   Medium          YNT = why not

  Z            zee, zed                                  Very low        EZ uses Z for voiced S, not Z-as-word
  ------------ ------------------ ---------------------- --------------- --------------------------------------------------

**10.3 Common Phonetic Respellings**

  -------------- ---------------- ------------ -----------------------------------------------
  **Standard**   **Respelled**    **Saving**   **Example**

  PH             F                1 char       FONE, FOTO, FARMCY (pharmacy)

  CK             K                1 char       ROK, BAK, TRAK

  C (hard)       K                0 chars      KAR, KOOL, KRAZY (stylistic, no savings)

  C (soft)       S                0 chars      SINE = sign? No --- rarely saves characters

  S (voiced)     Z                0 chars      EZ, PLEEZ, BOYZ (stylistic)

  GHT            TE / T           1-2 chars    NITE = night, LITE = light, RITE = right

  OUGH           O / UF / AW      2-3 chars    THRO = through, ENUF = enough, THOT = thought

  TION           SHUN / XN        1-2 chars    Rarely compressed on plates; too ambiguous

  EX / EKS       X                1-2 chars    XTRA, XCLNCE, XPERT, XLR8

  ER             R                1 char       DRVR, PLAYR, LOVR (combines with Layer 3)

  ING            NG / N           1-2 chars    FLNG = feeling, DRVNG = driving

  OULD           UD / D           2-3 chars    SHUD = should, CUD = could
  -------------- ---------------- ------------ -----------------------------------------------

**10.4 High-Value Rebus Patterns**

These are the rebus structures that produce the best puzzles. Each pattern is a template that can be applied to multiple phrases.

  ----------------- -------------------------------- ---------------------------- ----------------------------------------------------------------
  **Pattern**       **Mechanism**                    **Template**                 **Examples**

  10 + \[word\]     10 = \"ten\" embeds in target    10 + remaining letters       10SNE1 (tennis anyone), 10DER (tender), 10SHUN (tension)

  4 + \[word\]      4 = \"for\" starts the target    4 + remaining                4CAST (forecast), 4TIFY (fortify), 4TUNUS (fortuitous)

  NRG pattern       Letter names = syllables         Letter sequence = word       NRG (energy), MT (empty), QT (cutie), XTC (ecstasy), NV (envy)

  K9 pattern        Letter + digit = compound        Letter sound + digit sound   K9 (canine), B4 (before), T42 (tea for two)

  11 / 22 pattern   Repeated digit = doubled sound   NN = \"won-won\" etc.        Limited utility; mostly K9-type

  IC pattern        I + C = I see                    Prefix for observation       ICUQT (I see you cutie), ICUP (I see you pee)
  ----------------- -------------------------------- ---------------------------- ----------------------------------------------------------------

**10.5 Encoding Priority Order**

When the generator has multiple valid encodings for a phrase, prefer encodings in this order:

-   1\. Encodings that use the fewest layers (simpler is better unless targeting high difficulty).

-   2\. Encodings where every character contributes to the reading (no dead characters that the reader must skip).

-   3\. Encodings that sound like the phrase when read aloud (phonetic flow over visual cleverness).

-   4\. Encodings that use high-frequency substitutions (8, 4, 2, U, R) over low-frequency ones (5, 7, W, G).

-   5\. Encodings that look like something a real person would put on a car (natural over forced).

-   6\. Encodings that have visual balance (mix of letters and numbers, not front-loaded or back-loaded with digits).
