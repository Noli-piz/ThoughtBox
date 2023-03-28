import React, {useState ,useEffect, useMemo} from 'react'
import './tableStyle.css'
import { TbSortAscending, TbSortDescending } from 'react-icons/tb'
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md'
import { BiFirstPage , BiLastPage } from 'react-icons/bi'
import { useTable, useGlobalFilter, useFilters , useSortBy, usePagination } from 'react-table'
import { rcolumn } from './react-column'
import GlobalFilter from './GlobalFilter'
import fakeData from './MOCK_DATA.json'

function ReactTableTemplate( {columns, data, globalFilter} ) {

    
    const [inputPageIndex, setInputPageIndex] = useState();
    // const data = useMemo(()=> fakeData, []);
    // const columns = useMemo(()=> rcolumn, []);

    const {
        getTableProps, 
        getTableBodyProps, 
        headerGroups, 
        page,
        prepareRow,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        gotoPage,
        pageOptions,
        pageCount,
        setPageSize,
        state,
        setGlobalFilter,
    } = useTable(
    { 
        columns, 
        data,
        initialState: {pageIndex : 0, pageSize : 10},
    }, useFilters , useGlobalFilter, useSortBy, usePagination);

    const {pageIndex, pageSize} = state;

    useEffect(()=>{
        setInputPageIndex(pageIndex + 1)
    },[ pageIndex])

    useEffect(()=>{
        setGlobalFilter(globalFilter);
    },[ globalFilter])


return (
    <div>
        <div className="table-container">
        {/* <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/> */}
            <table {...getTableProps()} >
                <thead>
                    {
                        headerGroups.map((headerGroup)=> (
                            <>
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {
                                    headerGroup.headers.map((column)=> (
                                        <th>
                                            <div {...column.getHeaderProps( column.getSortByToggleProps())} >
                                                {column.render("Header")}
                                                {column.isSorted? (column.isSortedDesc ? <TbSortDescending className="sort-icon"/> : <TbSortAscending className="sort-icon"/> ) : '' }
                                            </div>
                                        </th>
                                    ))
                                }
                            </tr>

                            <tr {...headerGroup.getHeaderGroupProps()} >
                                {
                                    headerGroup.headers.map((column)=> (
                                        <th className="th-1">
                                            <div>
                                                { column.canFilter ? column.render('Filter') : null }
                                            </div>
                                        </th>
                                    ))
                                }
                            </tr>
                            
                            </>
                        ))
                    }
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        page.map((row)=> {
                            prepareRow(row);
                            return(
                                <tr {...row.getRowProps()}>
                                    {
                                        row.cells.map((cell)=>(
                                            <td {...cell.getCellProps()}> 
                                                {cell.render("Cell")}
                                            </td>
                                        ))
                                    }
                                </tr>
                            )
                        })
                    }
                    
                </tbody>
            </table>
            <div className="table-foot">
                <label>
                    Show 
                    <select className="row-count" value={pageSize} onChange={e=> setPageSize(Number(e.target.value))}>
                            {
                                [10, 20, 50, 100, 200, 500, 1000].map(pageSize=>(
                                    <option key={pageSize} value={pageSize}>
                                        {pageSize}
                                    </option>
                                ))
                            }
                    </select>
                    Entries
                </label>
                
                <label style={{"fontWeight" : "600", color:"black"}} >  Page { pageIndex +1 + " of "+ pageOptions.length} </label>
                
                <div className="table-pagination">
                    <button
                        className="btnPagination"
                        onClick={() => {gotoPage(0); }} 
                        disabled={!canPreviousPage}> <BiFirstPage/> </button>
                    <button 
                        className="btnPagination"
                        onClick={() => {previousPage(); }} 
                        disabled={!canPreviousPage} > <MdNavigateBefore/> </button>
                    <input 
                        className="page-count"
                        type="number"
                        value={inputPageIndex}
                        onChange={ e=> {gotoPage(Number(e.target.value) -1 ); setInputPageIndex(e.target.value) }} />
                    <button 
                        className="btnPagination"
                        onClick={() => {nextPage(); }} 
                        disabled={!canNextPage}> <MdNavigateNext/> </button>
                    <button 
                        className="btnPagination"
                        onClick={() => {gotoPage(pageCount-1); }}
                        disabled={!canNextPage}> <BiLastPage/> </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ReactTableTemplate;