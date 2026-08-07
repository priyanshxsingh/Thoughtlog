import React from 'react'

function Button({
    children,
    type = 'button',
    bgColor = 'bg-blue-600',
    textcolor = 'text-white',
    className = '',
    ...props
}) {
  return (
    <Button className={`px-4 py-2 rounded-lg ${className} ${bgcolor} ${textcolor}`} {...props}>
      {children}
    </Button>
    
  )
}

export default Button
