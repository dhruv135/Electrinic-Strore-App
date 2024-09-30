import React, { useEffect, useState } from "react";
import { privateAxois } from "../Service/axios.service";
import { toast } from "react-toastify";

function useLoader() {
  const [loa, setLoa] = useState(false);

  useEffect(() => {
    privateAxois.interceptors.request.use(
      (config) => {
        setLoa(true);
        return config;
      },
      (error) => {
        return Promise.reject();
      }
    );

    privateAxois.interceptors.response.use(
      (config) => {
        setLoa(false);
        return config;
      },
      (error) => {
        setLoa(false);
        if (error.code === "ERR_NETWORk") {
          toast.error("Backend Server is Down");
        }
        return Promise.reject();
      }
    );
  }, []);
  return loa;
}

export default useLoader;
