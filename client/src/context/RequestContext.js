import { createContext, useState, useEffect } from "react";
import axios from "axios";

const RequestsContext = createContext();

const RequestProvider = ({ children }) => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const response = await axios.get("http://localhost:4040/api/request");
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  const createRequest = async (requester, variant, store) => {
    try {
      const response = await axios.post("http://localhost:4040/api/request", {
        store,
        requester,
        variant,
        requestType: "Transfer",
        requestStatus: "Requested",
        readStatus: "notSeen",
      });

      const updatedRequests = [...requests, response.data];
      setRequests(updatedRequests);
    } catch (error) {
      console.error("Error creating request:", error);
    }
  };

  const updateRequest = async (id) => {
    try {
      await axios.patch(`http://localhost:4040/api/request/${id}`, {
        readStatus: "seen",
        requestStatus: "Pending",
      });

      fetchRequests();
    } catch (error) {
      console.error("Error updating request:", error);
    }
  };

  // real time require
  useEffect(() => {
    const pollingInterval = 500; // Polling interval in milliseconds (e.g., every 5 seconds)
    const intervalId = setInterval(fetchRequests, pollingInterval);
    return () => clearInterval(intervalId);
  }, []);

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
