const Card = ({item})=>{
    return(
        <div className='card'>
        <div className='content'>
            <div>
                <p style={{fontSize:"12px", color:"#818589"}}>{item.id}</p>
                <div style={{"display":"flex","gap":"0.375rem","alignItems":"flex-start",textAlign:"start"}}>
                    <input className='text-xs w-2.5 h-2.5 mt-0.5' type='radio'/>
                    <label className='text-start text-xs p-0'>{item?.title}</label>
                </div>
            </div>
            <div className='tagBox'>
                <div className='circle'></div>
                <p>{item?.tag.map((item,index)=>item)}</p>
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