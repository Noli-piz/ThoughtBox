import {AiOutlineEdit} from 'react-icons/ai'
import ColumnFilter from './ColumnFilter'
import Moment from 'moment'

export const rcolumn = [
  {
    Header: 'ID',
    accessor: 'id',
    Filter : ColumnFilter
  },
  {
    Header: 'Titles',
    accessor: 'title',
    Filter : ColumnFilter

  },
  {
    Header: 'User ID',
    accessor: 'userId',
    Filter : ColumnFilter
  },
  {
    Header: 'Completed',
    accessor: d => d.completed.toString(),
    Filter : ColumnFilter
  },
  {
    Header: 'Action',
    Filter : ColumnFilter,
    Cell: ({ cell }) => (
      <button className="btnEdit" onClick={()=> { alert( "Edit " + cell.row.original.id)} }>
        <AiOutlineEdit/>
      </button>
    )
  }
]


export const accountsColumn = [
  {
    Header: 'Account Id',
    accessor: 'id',
    Filter : ColumnFilter
  },
  {
    Header: 'Username',
    accessor: 'username',
    Filter : ColumnFilter

  },
  {
    Header: 'Fullname',
    accessor: 'fullname',
    Filter : ColumnFilter
  },
  {
    Header: 'Email',
    accessor:'email',
    Filter : ColumnFilter
  },
  {
    Header: 'Created At',
    accessor: d=> Moment(d).format("LL"),
    Filter : false,
    disableGlobalFilter: true,
    // disableSortBy : true
  },
  {
    Header: 'Action',
    Filter : false,
    Cell: ({ cell }) => (
      <button className="btnEdit"  onClick={()=> { alert( "Not Available. " + cell.row.original.id) } } dis>
        <AiOutlineEdit className="button-icons"/>
      </button>
    )
  }
]

// const test = ()=>{
//   alert("Tests")
// }



export const adminsColumn = [
  {
    Header: 'Admin Id',
    accessor: 'id',
    Filter : ColumnFilter
  },
  {
    Header: 'Username',
    accessor: 'username',
    Filter : ColumnFilter

  },
  {
    Header: 'Fullname',
    accessor: 'fullname',
    Filter : ColumnFilter
  },
  {
    Header: 'Status',
    accessor: d => d.disabled +'',
    Filter : ColumnFilter
  },
  {
    Header: 'Created At',
    accessor: d=> Moment(d).format("LL"),
    Filter : false,
    disableGlobalFilter: true,
    // disableSortBy : true
  },
  {
    Header: 'Action',
    Filter : false,
    Cell: ({ cell }) => (
      <button className="btnEdit"  onClick={()=> { alert( "Not Available. " + cell.row.original.id) } } dis>
        <AiOutlineEdit className="button-icons"/>
      </button>
    )
  }
]

