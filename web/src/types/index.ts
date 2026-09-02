export interface Source {
  name: string;
  slug: string;
  reliability_tier: string;
}

export interface FigureMentioned {
  amount: string;
  currency: string;
}

export interface ArticleSummary {
  id: string;
  tldr_bullets: string[];
  civic_impact: string;
  actors_entities: string[];
  figures_mentioned: FigureMentioned[];
  corroboration_sources?: string[];
  confidence_score: number;
  status: string;
}

export interface Article {
  id: string;
  title: string;
  url: string;
  author?: string;
  image_url?: string;
  category?: string;
  is_breaking?: boolean;
  is_retracted?: boolean;
  correction_note?: string;
  corrected_at?: string;
  published_at: string;
  sources: Source;
  article_summaries?: ArticleSummary;
}


export interface StateData {
  id: string;
  name: string;
  code: string;
  geopolitical_zone: string;
}

export interface LGAData {
  id: string;
  name: string;
  slug: string;
  allocation?: number;
}

export interface FAACAllocation {
  id: string;
  year: number;
  month: number;
  tier: 'federal' | 'state' | 'lga';
  gross_amount: number;
  deductions: number;
  net_amount: number;
  source_document_url?: string;
}

export interface EducationEntry {
  school: string;
  degree_or_cert: string;
  field_of_study?: string;
  period?: string;
}

export interface PastOfficeEntry {
  title: string;
  organization_or_level: string;
  period: string;
  summary?: string;
}

export interface TrackedPromise {
  id: string;
  title: string;
  category: 'Economy' | 'Infrastructure' | 'Education' | 'Healthcare' | 'Security' | 'Governance';
  description: string;
  status: 'fulfilled' | 'in_progress' | 'not_started' | 'broken';
  date_made: string;
  budget_allocated?: string;
  progress_pct: number;
  milestones: string[];
  evidence_url?: string;
}

export interface CitizenRating {
  overall_score: number; // e.g. 4.4 / 5.0
  approval_pct: number; // e.g. 88%
  total_votes: number;
  breakdown: {
    infrastructure: number;
    economy: number;
    transparency: number;
    security_or_education: number;
  };
}

export interface ConstituencyQualityOfLife {
  score: number; // 0 - 100
  rating_label: 'Critical' | 'Developing' | 'Moderate' | 'Improving' | 'High';
  clean_water_pct: number; // % of households with piped/treated water
  daily_power_hours: number; // Average hours of electricity daily
  paved_roads_pct: number; // % of primary & feeder roads paved
  primary_healthcare_access: string; // e.g. '1 Clinic per 8,500 Citizens'
  public_school_quality: string; // e.g. '78% Basic Literacy Rate'
  youth_unemployment_pct: number; // %
  security_safety_score: number; // Score out of 10
}

export interface OfficialProfile {
  id: string;
  name: string;
  office_title: string;
  role: 'governor' | 'senator' | 'house_of_rep' | 'president';
  state_code: string;
  state_name: string;
  district_constituency?: string; // e.g. 'Abia North Senatorial District' or 'Bende Federal Constituency'
  party: string;
  term_period: string;
  photo_url: string;
  initials: string;
  bio_summary: string;
  citizen_rating: CitizenRating;
  quality_of_life: ConstituencyQualityOfLife;
  education: EducationEntry[];
  past_offices: PastOfficeEntry[];
  promises: TrackedPromise[];
}

export interface FOIRequest {
  id: string;
  tracking_code: string;
  mda_name: string;
  subject: string;
  details: string;
  date_filed: string;
  due_date: string;
  status: 'submitted' | 'acknowledged' | 'under_review' | 'fulfilled' | 'denied' | 'overdue';
}
