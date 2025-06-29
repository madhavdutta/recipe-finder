import React from 'react'

const PandaIcon = ({ className = "w-6 h-6", color = "currentColor" }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Panda ears */}
      <circle cx="7" cy="6" r="3" fill={color} />
      <circle cx="17" cy="6" r="3" fill={color} />
      
      {/* Panda head */}
      <circle cx="12" cy="12" r="7" fill="white" stroke={color} strokeWidth="1.5" />
      
      {/* Eye patches */}
      <ellipse cx="9.5" cy="10" rx="1.5" ry="2" fill={color} />
      <ellipse cx="14.5" cy="10" rx="1.5" ry="2" fill={color} />
      
      {/* Eyes */}
      <circle cx="9.5" cy="10" r="0.8" fill="white" />
      <circle cx="14.5" cy="10" r="0.8" fill="white" />
      
      {/* Nose */}
      <ellipse cx="12" cy="13" rx="0.8" ry="0.5" fill={color} />
      
      {/* Mouth */}
      <path
        d="M10.5 15c0.5 0.5 1 0.8 1.5 0.8s1-0.3 1.5-0.8"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

export default PandaIcon
