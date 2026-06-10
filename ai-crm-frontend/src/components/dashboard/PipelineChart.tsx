import {

  BarChart,

  Bar,

  XAxis,

  YAxis,

  Tooltip,

  ResponsiveContainer,

} from "recharts";

export default function PipelineChart({

  pipeline,

}: {

  pipeline: Record<string, number>;

}) {

  const data = Object.entries(

    pipeline

  ).map(

    ([name, value]) => ({

      name,

      value,

    })

  );

  return (

    <div className="border rounded-lg p-4">

      <h2 className="font-bold mb-4">

        Pipeline

      </h2>

      <ResponsiveContainer

        width="100%"

        height={300}

      >

        <BarChart data={data}>

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="value" />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

}