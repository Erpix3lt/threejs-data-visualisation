import React from 'react'

const NavigationTip = () => {
  return (
    <div
    style={{
      position: "absolute",
      bottom: 10,
      left: '50%',
      zIndex: 9,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      transform: "translateX(-50%)",
      gap: 5,
      color: "white",
      fontSize: 10
    }}
    >
      <p>Navigate by clicking either on the left or right. Hover to see more information.</p>
    </div>
  )
}

export default NavigationTip