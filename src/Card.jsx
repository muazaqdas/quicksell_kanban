import { TbCircleDotted } from "react-icons/tb";
import { MdOutlineCircle } from "react-icons/md";
import { MdCheckCircle } from "react-icons/md";
import { useState } from "react";

const Card = ({item,getIconGrp,groupOpt})=>{

    const [isClicked,setClicked] = useState(false);
    const priorityNames = {
        4: 'Urgent',
        3: 'High',
        2: 'Medium',
        1: 'Low',
        0: 'No priority',
    };
    return(
        <div className='card'>
        <div className='content'>
            <div style={{display:"flex",flexDirection:"column",gap:"4px"}}>
                <p style={{fontSize:"12px", color:"#818589"}}>{item.id}</p>
                <div style={{"display":"flex","gap":"0.375rem","alignItems":"flex-start",textAlign:"start"}}>
                    <div onClick={()=>{setClicked(!isClicked)}} style={{display:groupOpt==='status'?"none":""}}>{groupOpt==='user'?<TbCircleDotted size={15}/>: groupOpt==='priority'?(isClicked?<MdCheckCircle size={15}/>:<MdOutlineCircle size={15}/>):<></>}</div>
                    <label className=''>{item?.title}</label>
                </div>
            </div>
            <div className="tags" style={{display:"flex", alignItems:"flex-start", alignContent:"center"}}>
            {groupOpt==='priority'?<></>:<img width={12} height={12}  src={getIconGrp('priority',priorityNames[item.priority])} alt="logo" />}
                <div className='tagBox'>
                    <div className='circle'></div>
                    <p>{item?.tag.map((item,index)=>item)}</p>
                </div>
            </div>
        </div>

        <div className='profile'>
                <div style={{position:"relative"}}>
                    <img width={20} height={20} style={{borderRadius:"50%"}} className='' src={`https://picsum.photos/seed/${item.id}/200`} alt='profile'/>
                    <div className='profileDot'></div>
                </div>
        </div>
    </div>
    )
}

export default Card;