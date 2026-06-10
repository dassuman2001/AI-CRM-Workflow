import {

  PieChart,

  Pie,

  Cell,

  Tooltip,

  ResponsiveContainer,

  Legend,

} from "recharts";

interface Props {

  priorities: Record<string, number>;

}

const COLORS = [

  "#DC2626",

  "#F59E0B",

  "#22C55E",

  "#6366F1",

];

export default function PriorityPie({

  priorities,

}: Props) {

  const data = Object.entries(

    priorities

  ).map(

    ([name, value]) => ({

      name,

      value,

    })

  );

  return (

    <div className="bg-white border rounded-xl p-5 shadow-sm">

      <h2 className="text-xl font-semibold mb-5">

        Priority Distribution

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

            {data.map((_, index) => (

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