import { createContext, useState } from "react";
import axios from "axios";

const RequestsContext = createContext();

const RequestProvider = ({ children }) => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    const response = await axios.get("http://localhost:4040/api/request");
    setRequests(response.data);
  };

  const createRequest = async (requester, variant) => {
    const response = await axios.post("http://localhost:4040/api/request", {
      requester,
      variant,
      requestType: "Transfer",
      requestStatus: "Requested",
      readStatus: "notSeen",
    });

    const updatedRequests = [...requests, response.data];
    setRequests(updatedRequests);
  };
  const valueToShare = {
    requests,
    createRequest,
    fetchRequests,
  };

  return (
    <RequestsContext.Provider value={valueToShare}>
      {children}
    </RequestsContext.Provider>
  );
};

export { RequestProvider };

export default RequestsContext;
