interface Props {

  title: string;

  value: number | string;

}

export default function StatsCard({

  title,

  value,

}: Props) {

  return (

    <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition">

      <p className="text-gray-500 text-sm">

        {title}

      </p>

      <h2 className="text-4xl font-bold mt-3 text-slate-800">

        {value}

      </h2>

    </div>

  );

}