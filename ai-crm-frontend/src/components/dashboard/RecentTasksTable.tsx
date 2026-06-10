interface Props {

  tasks: any[];

}

export default function RecentTasksTable({

  tasks,

}: Props) {

  return (

    <div className="bg-white border rounded-xl p-5 shadow-sm">

      <h2 className="text-xl font-semibold mb-5">

        Recent Tasks

      </h2>

      <table className="w-full">

        <thead>

          <tr className="text-left border-b">

            <th className="pb-3">

              Task

            </th>

            <th className="pb-3">

              Status

            </th>

          </tr>

        </thead>

        <tbody>

          {tasks.map((task) => (

            <tr

              key={task.id}

              className="border-b"

            >

              <td className="py-3">

                {task.title}

              </td>

              <td className="py-3">

                {task.completed

                  ? "Completed"

                  : "Pending"}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}