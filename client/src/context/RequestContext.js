import { createContext, useState } from "react";
import { sampleRequests } from "../data/sampleData";

const RequestsContext = createContext();

const RequestProvider = ({ children }) => {
  const [requests, setRequests] = useState(sampleRequests);

  const fetchRequests = () => {
    setRequests(sampleRequests);
  };

  const createRequest = (requester, variant, store) => {
    const newRequest = {
      _id: `req_${Date.now()}`,
      requester,
      variantId: variant,
      store,
      requestType: "Transfer",
      requestStatus: "Requested",
      readStatus: "notSeen",
      createdAt: new Date().toISOString(),
    };
    setRequests((prev) => [...prev, newRequest]);
  };

  const updateRequest = (id) => {
    setRequests((prev) =>
      prev.map((r) =>
        r._id === id
          ? { ...r, readStatus: "seen", requestStatus: "Pending" }
          : r,
      ),
    );
  };

  const valueToShare = {
    requests,
    createRequest,
    updateRequest,
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
