import type { StateMetadata } from "@/types/content";

// Import all state JSON files statically for offline bundling
import AK from "@/content/states/AK.json";
import AL from "@/content/states/AL.json";
import AR from "@/content/states/AR.json";
import AZ from "@/content/states/AZ.json";
import CA from "@/content/states/CA.json";
import CO from "@/content/states/CO.json";
import CT from "@/content/states/CT.json";
import DC from "@/content/states/DC.json";
import DE from "@/content/states/DE.json";
import FL from "@/content/states/FL.json";
import GA from "@/content/states/GA.json";
import HI from "@/content/states/HI.json";
import IA from "@/content/states/IA.json";
import ID from "@/content/states/ID.json";
import IL from "@/content/states/IL.json";
import IN from "@/content/states/IN.json";
import KS from "@/content/states/KS.json";
import KY from "@/content/states/KY.json";
import LA from "@/content/states/LA.json";
import MA from "@/content/states/MA.json";
import MD from "@/content/states/MD.json";
import ME from "@/content/states/ME.json";
import MI from "@/content/states/MI.json";
import MN from "@/content/states/MN.json";
import MO from "@/content/states/MO.json";
import MS from "@/content/states/MS.json";
import MT from "@/content/states/MT.json";
import NC from "@/content/states/NC.json";
import ND from "@/content/states/ND.json";
import NE from "@/content/states/NE.json";
import NH from "@/content/states/NH.json";
import NJ from "@/content/states/NJ.json";
import NM from "@/content/states/NM.json";
import NV from "@/content/states/NV.json";
import NY from "@/content/states/NY.json";
import OH from "@/content/states/OH.json";
import OK from "@/content/states/OK.json";
import OR from "@/content/states/OR.json";
import PA from "@/content/states/PA.json";
import RI from "@/content/states/RI.json";
import SC from "@/content/states/SC.json";
import SD from "@/content/states/SD.json";
import TN from "@/content/states/TN.json";
import TX from "@/content/states/TX.json";
import UT from "@/content/states/UT.json";
import VA from "@/content/states/VA.json";
import VT from "@/content/states/VT.json";
import WA from "@/content/states/WA.json";
import WI from "@/content/states/WI.json";
import WV from "@/content/states/WV.json";
import WY from "@/content/states/WY.json";

const stateDataMap: Record<string, StateMetadata> = {
  AK: AK as StateMetadata,
  AL: AL as StateMetadata,
  AR: AR as StateMetadata,
  AZ: AZ as StateMetadata,
  CA: CA as StateMetadata,
  CO: CO as StateMetadata,
  CT: CT as StateMetadata,
  DC: DC as StateMetadata,
  DE: DE as StateMetadata,
  FL: FL as StateMetadata,
  GA: GA as StateMetadata,
  HI: HI as StateMetadata,
  IA: IA as StateMetadata,
  ID: ID as StateMetadata,
  IL: IL as StateMetadata,
  IN: IN as StateMetadata,
  KS: KS as StateMetadata,
  KY: KY as StateMetadata,
  LA: LA as StateMetadata,
  MA: MA as StateMetadata,
  MD: MD as StateMetadata,
  ME: ME as StateMetadata,
  MI: MI as StateMetadata,
  MN: MN as StateMetadata,
  MO: MO as StateMetadata,
  MS: MS as StateMetadata,
  MT: MT as StateMetadata,
  NC: NC as StateMetadata,
  ND: ND as StateMetadata,
  NE: NE as StateMetadata,
  NH: NH as StateMetadata,
  NJ: NJ as StateMetadata,
  NM: NM as StateMetadata,
  NV: NV as StateMetadata,
  NY: NY as StateMetadata,
  OH: OH as StateMetadata,
  OK: OK as StateMetadata,
  OR: OR as StateMetadata,
  PA: PA as StateMetadata,
  RI: RI as StateMetadata,
  SC: SC as StateMetadata,
  SD: SD as StateMetadata,
  TN: TN as StateMetadata,
  TX: TX as StateMetadata,
  UT: UT as StateMetadata,
  VA: VA as StateMetadata,
  VT: VT as StateMetadata,
  WA: WA as StateMetadata,
  WI: WI as StateMetadata,
  WV: WV as StateMetadata,
  WY: WY as StateMetadata,
};

const STATE_CODES = Object.keys(stateDataMap);

export function getStateMetadata(stateCode: string): StateMetadata | null {
  return stateDataMap[stateCode.toUpperCase()] ?? null;
}

export function getAllStates(): StateMetadata[] {
  return STATE_CODES.map((code) => stateDataMap[code]);
}

export function getAllStateCodes(): string[] {
  return [...STATE_CODES];
}

export function getRandomState(): StateMetadata {
  const index = Math.floor(Math.random() * STATE_CODES.length);
  return stateDataMap[STATE_CODES[index]];
}

export function validateStateMetadata(data: unknown): data is StateMetadata {
  if (typeof data !== "object" || data === null) return false;
  const obj = data as Record<string, unknown>;
  return (
    typeof obj.state_code === "string" &&
    typeof obj.state_name === "string" &&
    typeof obj.capital === "string" &&
    typeof obj.slogan === "string" &&
    typeof obj.nickname === "string" &&
    Array.isArray(obj.symbols) &&
    typeof obj.plate_colors === "object" &&
    obj.plate_colors !== null &&
    typeof obj.time_zone === "string" &&
    Array.isArray(obj.notable_facts)
  );
}
