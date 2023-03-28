import React from 'react'

function GlobalFilter ({ filter , setFilter }) {
  return (
    <div>
        <input className="search-bar" value={filter || ''} onChange={e=> setFilter(e.target.value)}  />
    </div>
  )
}

export default GlobalFilter