export interface DashboardResponse {

  overview: {

    total_leads: number;

    companies: number;

    tasks: number;

    high_priority: number;

    average_ai_score: number;

  };

  pipeline: Record<string, number>;

  recent_leads: any[];

  top_ai_leads: any[];

}