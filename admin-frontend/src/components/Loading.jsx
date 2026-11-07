import React from 'react'

const Loading = () => {
    const loaderStyle = {
        border: '8px solid #f3f3f3', // Light grey
        borderTop: '8px solid green', // Blue
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        animation: 'spin 2s linear infinite',
      };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div style={loaderStyle}></div>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  )
}

export default Loading