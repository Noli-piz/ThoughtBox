import React from 'react'

function ColumnFilter ({ column }) {

  const { filterValue, setFilter } = column

  return (
    <div style={{ display: "flex" ,justifyContent:"center"}}>
        <input className="column-search-bar" value={filterValue || ''} onChange={e=> setFilter(e.target.value)} />
    </div>
  )
}

export default ColumnFilter