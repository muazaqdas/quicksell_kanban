import React, { useEffect, useState } from 'react';
import { IoMdOptions } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import icons  from './groupIcons';
import Group from './Group';


const KanbanBoard = ({ tickets, users }) => {

    const [isDisplayOpen, setDisplayOpen] = useState(false);
    const [groupingOpt, setgroupingOpt] = useState(localStorage.getItem('groupingOpt') || 'status');
    const [sortingOpt, setsortingOpt] = useState(localStorage.getItem('sortingOpt') || 'priority');

    useEffect(() => {
    localStorage.setItem('groupingOpt', groupingOpt);
    localStorage.setItem('sortingOpt', sortingOpt);
    }, [groupingOpt, sortingOpt]);

    const handleGrpChange = (e) => {
        setgroupingOpt(e.target.value);
    };

    const handleSortChange = (e) => {
        setsortingOpt(e.target.value);
    };


    const groupNSort = () => {
        let groupedTickets;
    
        if (groupingOpt === 'status') {
        groupedTickets = grpByS(tickets);
        } else if (groupingOpt === 'user') {
        groupedTickets = grpByU(tickets);
        } else if (groupingOpt === 'priority') {
        groupedTickets = grpByP(tickets);
        }
    
        if (sortingOpt === 'priority') {
        return sortByP(groupedTickets);
        } else if (sortingOpt === 'title') {
        return sortByT(groupedTickets);
        }
    
        return groupedTickets;
    };

//grouping tickets
    const grpByS = (tickets) => {
        const grouped = [];
        if (tickets) {
        tickets.forEach((ticket) => {
            const status = ticket.status;
            if (!grouped[status]) {
            grouped[status] = [];
            }
            grouped[status].push(ticket);
        });
        }
        return grouped;
    };

    const getIconGrp = (group, title) => {
        const groupConfig = icons?.find((config) => config.type === group);
        if (groupConfig) {
        const icon = groupConfig.icons.find((icon) => icon.title === title);
        return icon ? icon.iconPath : null;
        }
        return null;
    };


    const grpByU = (tickets) => {
        const grouped = [];
        if (tickets) {
        tickets.forEach((ticket) => {
            const userName = ticket.userName;
            if (!grouped[userName]) {
            grouped[userName] = [];
            }
            grouped[userName].push(ticket);
        });
        }
        return grouped;
    };
    

    const grpByP = (tickets) => {
        const priorityNames = {
        4: 'Urgent',
        3: 'High',
        2: 'Medium',
        1: 'Low',
        0: 'No priority',
        };

        const grouped = [];
        if (tickets) {
            tickets.forEach((ticket) => {
        const priority = ticket.priority;
        const priorityName = priorityNames[priority];

        if (!grouped[priorityName]) {
            grouped[priorityName] = [ticket];
        } else {
            grouped[priorityName].push(ticket);
        }
        });
        }
        return grouped;
    };

    
//sorting tickets
    const sortByP = (groupedTickets) => {
        const sorted = [];
        Object.keys(groupedTickets).forEach((key) => {
        sorted[key] = groupedTickets[key].sort((a, b) => a.priority - b.priority);
        });
        return sorted;
    };
    
    const sortByT = (groupedTickets) => {
        const sorted = [];
        Object.keys(groupedTickets).forEach((key) => {
        sorted[key] = groupedTickets[key].sort((a, b) => a.title.localeCompare(b.title));
        });
        return sorted;
    };

  return (
    <div>
        <div style={{backgroundColor:"white", padding:"20px"}}>
            <div style={{position:"relative", width:"fit-content", fontSize:"12px"}}>
                <button className='displayBtn' onClick={() =>{
                    setDisplayOpen(!isDisplayOpen);}}>
                    <IoMdOptions/><span>Display</span><IoIosArrowDown style={isDisplayOpen?{rotate:"180deg"}:{}}/>
                </button>
                {isDisplayOpen &&
                    <div className='displayDropDown'>
                        <div className=''>
                            <label style={{color:"#868686"}}>Grouping</label>
                            <select value={groupingOpt} onChange={(e)=>{handleGrpChange(e);setDisplayOpen(!isDisplayOpen)}}>
                            <option value="status">Status</option>
                            <option value="user">User</option>
                            <option value="priority">Priority</option>
                            </select>
                        </div>
                        <div>
                            <label style={{color:"#868686"}}>Ordering</label>
                            <select value={sortingOpt} onChange={(e)=>{handleSortChange(e);setDisplayOpen(!isDisplayOpen) }}>
                            <option value="priority">Priority</option>
                            <option value="title">Title</option>
                            </select>
                        </div>
                    </div>
                    }
            </div>
        </div>
      <div className='main'>
      {Object.entries(groupNSort())?.map(([title,array],index)=>{
            return(
                <Group key={index} title={title} array={array} groupingOption={groupingOpt} getIconGrp={getIconGrp} />
            )
      })}

      </div>
    </div>
  );
};

export default KanbanBoard;
