import React, { useEffect, useMemo, useState } from 'react'
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa';
import './index.scss'
interface TableProps {
   head?: React.ReactNode[];
   body: any[];
   accessor?: string[];
   itemsPerPage?: number;
   className?: string
   showFilter?: boolean;
   style?: any
   isRow?: boolean
   Row?: any
   rowProps?: any,
   isLoading?: boolean
}

type SortOrder = 'asc' | 'desc';

function Table({ head, body, itemsPerPage = 7, showFilter = true, className, isLoading,  style, isRow, accessor, Row, rowProps }: TableProps) {
   const [sortedData, setSortedData] = useState(body)
   const [sortConfig, setSortConfig] = useState<{ accessor: keyof any; direction: SortOrder }>({
      accessor: 'marketCap', // default sort by id
      direction: 'desc', // default sort direction
   });
   const [currentPage, setCurrentPage] = useState(1);
   const [searchText, setSearchText] = useState('')


   // Calculate index of the first and last item of the current page
   const startIndex = (currentPage - 1) * itemsPerPage;
   const endIndex = Math.min(startIndex + itemsPerPage, body.length);

   // Filtered and paginated data based on search query
   const filteredData = sortedData.filter((item) =>
      Object.values(item).some((value: any) =>
         value.toString().toLowerCase().includes(searchText.toLowerCase())
      )
   );
   const currentPageData = filteredData.slice(startIndex, endIndex);

   // Calculate total number of pages
   const totalPages = Math.ceil(filteredData.length / itemsPerPage);

   useEffect(() => {
      setSortedData(body)
   }, [body])

   // Handle page change
   const handlePageChange = (page: number) => {
      setCurrentPage(page);
   };

   // Handle previous page
   const handlePreviousPage = () => {
      if (currentPage > 1) {
         setCurrentPage(currentPage - 1);
      }
   };

   // Handle next page
   const handleNextPage = () => {
      if (currentPage < totalPages) {
         setCurrentPage(currentPage + 1);
      }
   };

   let pageNumbers: any[] = []
   // Generate an array of page numbers to display
   useMemo(() => {
      const pgNumbers:number[] = [];
      for (let i = 1; i <= totalPages; i++) {
         console.log(i, totalPages);

         if (i <= 3 || i > totalPages - 3 || (i >= currentPage - 1 && i <= currentPage + 1) || +i == +totalPages) {
            pgNumbers.push(i);
         }
      }
      pageNumbers = pgNumbers;
   }, [currentPageData]);

   const handleSearch = (e: any) => {
      setSearchText(e.target.value)
      setCurrentPage(1)
   }


   const requestSort = (accessor: keyof any) => {
      let direction: SortOrder = 'asc';
      if (sortConfig.accessor === accessor && sortConfig.direction === 'asc') {
         direction = 'desc';
      }
      setSortConfig({ accessor, direction });

      const s = [...body].sort((a, b) => {
         const valA = typeof (a[accessor]) === 'string' ? a[accessor].toLowerCase() : +a[accessor]
         const valB = typeof (b[accessor]) === 'string' ? b[accessor].toLowerCase() : +b[accessor]
         if (valA < valB) {
            return direction === 'asc' ? -1 : 1;
         }
         if (valA > valB) {
            return direction === 'asc' ? 1 : -1;
         }
         return 0;
      });

      setSortedData(s)
   };
   return (
      <div id='table' className={`table ${className}`} style={style} >
         {
            showFilter &&
            <div className='table-search'>
               <input placeholder='Search' onChange={handleSearch} />
            </div>
         }

         <table>
            {
               head &&
               <thead>
                  <tr>
                     {
                        head?.map((item: React.ReactNode, idx: number) => (
                           <th className="" key={`head-${idx}`} onClick={() => accessor && requestSort(accessor[idx])}>
                              {
                                 (!accessor) &&
                                 <span >{item}</span>
                              }

                              {
                                 (accessor) &&
                                 <div className='w-full col-text'>
                                    {item}
                                    {
                                       (accessor[idx]) &&
                                       <>
                                          {
                                             accessor[idx] == sortConfig.accessor ?
                                                <>
                                                   {
                                                      (sortConfig.direction === 'asc') ?
                                                         <FaSortUp /> :
                                                         <FaSortDown />
                                                   }
                                                </> :
                                                <FaSort />
                                          }

                                       </>
                                    }
                                 </div>
                              }
                           </th>
                        ))
                     }
                  </tr>
               </thead>
            }
            {
               currentPageData &&
               <tbody>
                  {
                     (isRow) &&
                     currentPageData?.map((item: any, idx: number) => (
                        <Row key={`row-${idx}`} data={item} idx={idx}  {...rowProps} />
                     ))
                  }

                  {
                     !isRow && currentPageData?.map((item: any, idx: number) => (
                        <tr key={idx}>
                           {
                              Object.entries(item)?.map(([_, value]: any, indx) => (
                                 <td key={indx}>{value}</td>
                              ))
                           }
                        </tr>
                     ))
                  }
               </tbody>
            }
         </table>

         {isLoading && (
            <div className="flex justify-center">
               <div style={{ textAlign: 'center', color:"black" }}>
                  Loading ....
               </div>
            </div>
         )}
         {currentPageData.length < 1 && !isLoading && (
            <h5 style={{ textAlign: 'center', color:"black" }}>
               No Data
            </h5>
         )}
         {/* Pagination */}
         <div className="table-pagination">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
               Prev
            </button>
            {pageNumbers?.map((page) => (
               <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={currentPage === page ? 'active' : ''}
               >
                  {page}
               </button>
            ))}
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
               Next
            </button>
         </div>
      </div>
   )
}

export default Table