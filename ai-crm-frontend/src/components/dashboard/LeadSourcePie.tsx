import {

  PieChart,

  Pie,

  Cell,

  Tooltip,

  ResponsiveContainer,

  Legend,

} from "recharts";

interface Props {

  sources: Record<string, number>;

}

const COLORS = [

  "#3B82F6",

  "#8B5CF6",

  "#10B981",

  "#F59E0B",

  "#EF4444",

  "#06B6D4",

];

export default function LeadSourcePie({

  sources,

}: Props) {

  const data = Object.entries(

    sources

  ).map(

    ([name, value]) => ({

      name,

      value,

    })

  );

  return (

    <div className="bg-white border rounded-xl p-5 shadow-sm">

      <h2 className="text-xl font-semibold mb-5">

        Lead Sources

      </h2>

      <ResponsiveContainer

        width="100%"

        height={320}

      >

        <PieChart>

          <Pie

            data={data}

            dataKey="value"

            nameKey="name"

            outerRadius={110}

            label

          >

            {data.map((entry, index) => (

              <Cell

                key={index}

                fill={

                  COLORS[

                    index %

                      COLORS.length

                  ]

                }

              />

            ))}

          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>

  );

}