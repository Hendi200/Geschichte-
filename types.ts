export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  image?: string;
}

export enum AnalysisTopic {
  THREAT = 'Bedrohung',
  FASCINATION = 'Faszination',
  EXCHANGE = 'Kulturaustausch'
}