import React from 'react'
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';


const NoData = ({details}) => {
  return (
    <div className='flex justify-center items-center flex-col'>
        <DescriptionRoundedIcon sx={{fontSize:300, color:"#757575"}}/>
        <br />
        <h1 className='text-2xl'>Oops! No {details} Data Found</h1>
    </div>
  )
}

export default NoData