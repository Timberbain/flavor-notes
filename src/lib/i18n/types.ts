export type Locale = "en" | "sv";

export interface Dictionary {
  header: {
    title: string;
    subtitle: string;
  };
  footer: {
    copyright: string;
  };
  filters: {
    showAll: string;
    showMore: string;
    showLess: string;
  };
  noResults: {
    title: string;
    subtitle: string;
  };
  sections: {
    temperature: string;
    equipment: string;
    weather: string;
    ingredients: string;
    method: string;
    pairsWith: string;
    versionHistory: string;
    photos: string;
  };
  temperature: {
    grill: string;
    internal: string;
    oven: string;
    stovetop: string;
  };
  metadata: {
    prep: string;
    cook: string;
    servings: string;
    ratingOf: string;
  };
  time: {
    minutes: string;
    hours: string;
  };
  difficulty: {
    easy: string;
    medium: string;
    hard: string;
  };
  version: {
    viewing: string;
    of: string;
    viewLatest: string;
  };
  changelog: {
    whatChanged: string;
    notes: string;
  };
  notFound: {
    title: string;
    subtitle: string;
    backLink: string;
  };
}
