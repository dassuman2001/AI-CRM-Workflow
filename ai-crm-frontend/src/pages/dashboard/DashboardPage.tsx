import MainLayout from "../../layouts/MainLayout";

import useDashboard from "../../hooks/useDashboard";

import StatsCard from "../../components/dashboard/StatsCard";

import PipelineChart from "../../components/dashboard/PipelineChart";

import LeadSourcePie from "../../components/dashboard/LeadSourcePie";

import PriorityPie from "../../components/dashboard/PriorityPie";

import RecentLeadsTable from "../../components/dashboard/RecentLeadsTable";

import TopAiLeadsTable from "../../components/dashboard/TopAiLeadsTable";

import RecentTasksTable from "../../components/dashboard/RecentTasksTable";

import RecentNotesTable from "../../components/dashboard/RecentNotesTable";

import AIInsightsCard from "../../components/dashboard/AIInsightsCard";

export default function DashboardPage() {

  const {

    data,

    loading,

  } = useDashboard();

  if (loading) {

    return (

      <MainLayout>

        <div className="space-y-4">

          {[1, 2, 3, 4, 5].map((item) => (

            <div

              key={item}

              className="h-24 bg-gray-200 rounded-xl animate-pulse"

            />

          ))}

        </div>

      </MainLayout>

    );

  }

  return (

    <MainLayout>

      <div className="mb-8">

        <h1 className="text-4xl font-bold">

          Dashboard

        </h1>

        <p className="text-gray-500 mt-2">

          Welcome to your AI CRM analytics dashboard

        </p>

      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">

        <StatsCard

          title="Total Leads"

          value={

            data.overview.total_leads

          }

        />

        <StatsCard

          title="Companies"

          value={

            data.overview.companies

          }

        />

        <StatsCard

          title="Tasks"

          value={

            data.overview.tasks

          }

        />

        <StatsCard

          title="Notes"

          value={

            data.overview.notes

          }

        />

        <StatsCard

          title="High Priority"

          value={

            data.overview.high_priority

          }

        />

        <StatsCard

          title="Completed Tasks"

          value={

            data.overview.completed_tasks

          }

        />

        <StatsCard

          title="Average AI Score"

          value={

            data.overview.average_ai_score

          }

        />

        <StatsCard

          title="Estimated Revenue"

          value={`$${Number(

            data.overview.estimated_revenue

          ).toLocaleString()}`}

        />

      </div>

      <div className="grid lg:grid-cols-2 gap-6 mt-8">

        <PipelineChart

          pipeline={

            data.pipeline

          }

        />

        <LeadSourcePie

          sources={

            data.lead_sources

          }

        />

      </div>

      <div className="grid lg:grid-cols-2 gap-6 mt-8">

        <PriorityPie

          priorities={

            data.priority_distribution

          }

        />

        <AIInsightsCard

          insights={

            data.ai_insights

          }

        />

      </div>

      <div className="grid lg:grid-cols-2 gap-6 mt-8">

        <RecentLeadsTable

          leads={

            data.recent_leads

          }

        />

        <TopAiLeadsTable

          leads={

            data.top_ai_leads

          }

        />

      </div>

      <div className="grid lg:grid-cols-2 gap-6 mt-8">

        <RecentTasksTable

          tasks={

            data.recent_tasks

          }

        />

        <RecentNotesTable

          notes={

            data.recent_notes

          }

        />

      </div>

    </MainLayout>

  );

}