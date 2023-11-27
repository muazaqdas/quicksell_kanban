import axios from 'axios'
import { useEffect, useState } from 'react';
import './App.css';
import KanbanBoard from './Kanban';

function useTicketsWithUserNames(jsonData) {
  const userLookup = jsonData?.users.reduce((lookup, user) => {
    lookup[user.id] = user;
    return lookup;
  }, {});
 
  return jsonData?.tickets.map(ticket => {
    const user = userLookup[ticket.userId];
    return {
      ...ticket,
      userName: user ? user.name : "Unknown"
    };
  });
 }

function App() {

  const url = "https://api.quicksell.co/v1/internal/frontend-assignment";
  const [jsonData, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(url)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setLoading(false);
      });
   }, []);

const ticketsWithUserNames = useTicketsWithUserNames(jsonData);
  return (
    <div className="App">
      {loading?
          <div style={{width:"100%",height:"100vh",display:"flex", justifyContent:"center", alignItems:"center"}}>
            <h1>Loading..</h1>
          </div>
          :<KanbanBoard tickets={ticketsWithUserNames}/> }
    </div>
  );
}

export default App;
