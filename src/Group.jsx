import Card from "./Card";
import { BsPlus } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";
const Group = ({title,array,getIconGrp,groupingOption})=>{
    return(
        <div className='group'>
        <div  style={{display:"flex", justifyContent:"space-between"}}>
            <div className='title'>
                <span className='icon'>{getIconGrp(groupingOption,title)?
                    <img width={18} height={18} src={getIconGrp(groupingOption,title)} alt='logo' />:
                    <img width={15} height={15} style={{borderRadius:"50%"}} className='' src={`https://picsum.photos/seed/${title}/200`} alt='logo'/>}
                </span>
                <span>{title}</span>
                <span style={{color:"#D3D3D3"}}>{array.length}</span>
            </div>
            <div style={{ display:"flex", alignItems:"flex-start", color:"#70747B !important", gap:"0.5rem"}}>
                <button><BsPlus/></button>
                <button><BsThreeDots/></button>
            </div>
        </div>
        <div style={{display:"flex", flexDirection:"column", gap:"0.5rem"}}>
            {array?.map((item,index)=><Card key={index} item={item} groupOpt={groupingOption} getIconGrp={getIconGrp}/>)}
        </div>
    </div>
    )
}

export default Group;