import {

  useEffect,

  useState,

} from "react";

import {

  getLeads,

} from "../api/lead.api";

export default function useLeads() {

  const [

    leads,

    setLeads,

  ] = useState<any[]>([]);

  const [

    loading,

    setLoading,

  ] = useState(true);

  const loadLeads = async () => {

    try {

      const data =

        await getLeads();

      setLeads(

        data.items ||

        data.leads ||

        data

      );

    } catch (

      error

    ) {

      console.error(

        error

      );

    } finally {

      setLoading(

        false

      );

    }

  };

  useEffect(() => {

    loadLeads();

  }, []);

  return {

  leads,

  loading,

  reload: loadLeads,

};

}