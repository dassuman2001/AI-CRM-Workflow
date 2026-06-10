import { useEffect, useState } from "react";

import { getDashboard } from "../api/dashboard.api";

export default function useDashboard() {

  const [data, setData] = useState<any>(
    null
  );

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const load = async () => {

      try {

        const result =
          await getDashboard();

        setData(result);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

    load();

  }, []);

  return {

    data,

    loading,

  };

}