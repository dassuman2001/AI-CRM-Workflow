import { Link } from "react-router-dom";

type Props = {

  tasks: any[];

  onDelete: (
    id: number
  ) => void;

};

export default function TaskTable({

  tasks,

  onDelete,

}: Props) {

  if (!tasks.length) {

    return (

      <div className="bg-white border rounded-lg p-10 text-center text-gray-500">

        No tasks found.

      </div>

    );

  }

  return (

    <div className="bg-white border rounded-lg overflow-hidden">

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="text-left p-4">

              Title

            </th>

            <th className="text-left p-4">

              Due Date

            </th>

            <th className="text-left p-4">

              Status

            </th>

            <th className="text-left p-4">

              Lead ID

            </th>

            <th className="text-center p-4">

              Actions

            </th>

          </tr>

        </thead>

        <tbody>

          {tasks.map((task) => (

            <tr

              key={task.id}

              className="border-t hover:bg-gray-50"

            >

              <td className="p-4 font-medium">

                {task.title}

              </td>

              <td className="p-4">

                {task.due_date || "-"}

              </td>

              <td className="p-4">

                {task.completed

                  ? "Completed"

                  : "Pending"}

              </td>

              <td className="p-4">

                {task.lead_id || "-"}

              </td>

              <td className="p-4">

                <div className="flex justify-center gap-2">

                  <Link

                    to={`/tasks/${task.id}`}

                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm"

                  >

                    View

                  </Link>

                  <Link

                    to={`/tasks/${task.id}/edit`}

                    className="bg-purple-600 text-white px-3 py-1 rounded text-sm"

                  >

                    Edit

                  </Link>

                  <button

                    onClick={() =>
                      onDelete(task.id)
                    }

                    className="bg-red-600 text-white px-3 py-1 rounded text-sm"

                  >

                    Delete

                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}
