/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useState } from 'react'
import './index.scss'
interface TableHeader {
   name?: React.ReactNode;
   accessor?: string;
   colspan?: number;
   rowspan?: number;
   className?: string;
}
interface TableProps {
   body: any[];
   limit?: number;
   header?: TableHeader[];
   subHeader?: TableHeader[];
   isLoading?: boolean;
   className?: string;
   showFilter?: boolean;
   sortBy?: string;
   sortDirection?: SortOrder;
   style?: Record<string, string | number>;
   refetch?: (limit: number, page: number) => void;
   isRow?: boolean;
   Row?: any;
   rowProps?: Record<string, any>;
   Skeleton?: any;
   totalPages?: number;
   page?: number;
}

type SortOrder = 'asc' | 'desc';

export function Table({ header, body, limit = 7, showFilter = true, className, isLoading, style, isRow, Row, rowProps, refetch, page, totalPages }: TableProps) {
   const [sortedData, setSortedData] = useState(body)
   const [sortConfig, setSortConfig] = useState<{ accessor: keyof any; direction: SortOrder }>({
      accessor: '', // default sort by id
      direction: 'desc', // default sort direction
   });
   const [currentPage, setCurrentPage] = useState(page ?? 1);
   const [searchText, setSearchText] = useState('')


   // Calculate index of the first and last item of the current page
   const startIndex = (currentPage - 1) * limit;
   const endIndex = Math.min(startIndex + limit, body.length);

   // Filtered and paginated data based on search query
   const filteredData = useMemo(()=> {
      return sortedData.filter((item) =>
      Object.values(item).some((value: any) =>
         value.toString().toLowerCase().includes(searchText.toLowerCase())
      ))
   },[sortedData, searchText]);

   const currentPageData = filteredData.slice(startIndex, endIndex);

   // Calculate total number of pages
   const total = totalPages ?? Math.ceil(filteredData.length / limit);

   useEffect(() => {
      setSortedData(body)
   }, [body])

   // Handle page change
   const handlePageChange = (page: number) => {
      if (refetch) {
         refetch(limit, page);
      }
      setCurrentPage(page);
   };

   // Handle previous page
   const handlePreviousPage = () => {
      if (currentPage > 1 && refetch) {
         refetch(limit, currentPage - 1);
         setCurrentPage(currentPage - 1);
      }
   };

   // Handle next page
   const handleNextPage = () => {
      if (currentPage < total && refetch) {
         refetch(limit, currentPage + 1);
         setCurrentPage(currentPage + 1);
      }
   };

   let pageNumbers: any[] = []
   // Generate an array of page numbers to display
   useMemo(() => {
      const pgNumbers: number[] = [];
      for (let i = 1; i <= total; i++) {
         console.log(i, total);

         if (i <= 3 || i > total - 3 || (i >= currentPage - 1 && i <= currentPage + 1) || +i == +total) {
            pgNumbers.push(i);
         }
      }
      pageNumbers = pgNumbers;
   }, [currentPageData]);

   const handleSearch = (e: any) => {
      setSearchText(e.target.value)
      setCurrentPage(1)
   }


   const requestSort = (accessor: string) => {
      let direction: SortOrder = "desc"
      if (sortConfig.accessor === accessor && sortConfig.direction === "desc") {
         direction = "asc"
      }
      setSortConfig({ accessor, direction })

      if (refetch) {
         refetch(limit, currentPage)
         return
      }

      sortData(accessor, direction)
   }

   const sortData = (a?: string, d?: SortOrder) => {
      const accessor = a || sortConfig.accessor;
      const direction = d || sortConfig.direction;
      const s = [...body].sort((a, b) => {
         const valA =
            isNaN(Number(a[accessor])) && typeof a[accessor] === "string" ?
               a[accessor].toLowerCase()
               : +a[accessor]
         const valB =
            isNaN(Number(b[accessor])) && typeof b[accessor] === "string"
               ? b[accessor].toLowerCase()
               : +b[accessor]
         if (valA < valB) {
            return direction === "asc" ? -1 : 1
         }
         if (valA > valB) {
            return direction === "asc" ? 1 : -1
         }
         return 0
      })

      setSortedData(s)
   }
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
               header &&
               <thead>
                  <tr>
                     {
                        header?.map((item: TableHeader, idx: number) => (
                           <th className="" key={`head-${idx}`} onClick={() => item.accessor && requestSort(item.accessor)}>
                              {
                                 (!item.accessor) &&
                                 <span >{item.name}</span>
                              }

                              {
                                 (item.accessor) &&
                                 <div className='w-full col-text'>
                                    {item.name}
                                    {
                                       item.accessor == sortConfig.accessor ?
                                          <>
                                             {
                                                (sortConfig.direction === 'asc') ?
                                                   <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z"></path></svg> :
                                                   <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"></path></svg>
                                             }
                                          </> :
                                          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z"></path></svg>
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
                              Object.entries(item)?.map(([, value]: any, indx) => (
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
               <div style={{ textAlign: 'center', color: "black" }}>
                  Loading ....
               </div>
            </div>
         )}
         {currentPageData.length < 1 && !isLoading && (
            <h5 style={{ textAlign: 'center', color: "black" }}>
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
            <button onClick={handleNextPage} disabled={currentPage === total}>
               Next
            </button>
         </div>
      </div>
   )
}
