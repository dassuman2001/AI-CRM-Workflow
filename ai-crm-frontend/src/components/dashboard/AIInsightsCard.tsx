interface Props {

  insights: any;

}

export default function AIInsightsCard({

  insights,

}: Props) {

  return (

    <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-xl p-6 shadow-lg">

      <h2 className="text-2xl font-bold mb-6">

        AI Insights

      </h2>

      <div className="space-y-5">

        <div>

          <p className="text-sm opacity-80">

            Highest AI Lead

          </p>

          <p className="text-xl font-semibold">

            {

              insights.highest_ai_lead

            }

          </p>

        </div>

        <div>

          <p className="text-sm opacity-80">

            AI Score

          </p>

          <p className="text-3xl font-bold">

            {

              insights.highest_ai_score

            }

          </p>

        </div>

        <div>

          <p className="text-sm opacity-80">

            Revenue Opportunity

          </p>

          <p className="text-xl font-semibold">

            $

            {Number(

              insights.estimated_revenue

            ).toLocaleString()}

          </p>

        </div>

        <div>

          <p className="text-sm opacity-80">

            Recommendation

          </p>

          <p className="leading-7">

            {

              insights.recommendation

            }

          </p>

        </div>

      </div>

    </div>

  );

}