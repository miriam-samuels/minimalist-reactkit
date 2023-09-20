import { useState } from 'react';

import { formatDate, isDateString } from '../../helper/date-helper';
import './index.scss'

interface TableProps<T> {
   data: T[];
   columns: Array<{ header: string; accessor: string, align?: string }>;
   isLoading?: boolean;
   itemsPerPage?: number;
   backendPagination?: boolean;
   backendPaginationHandler?: (limit: number, offset: number) => void;
   onRowClick?: (row: any) => void;
   tableBody?: any;
}

function Table<T>({ data, columns, isLoading = false, itemsPerPage = 7, backendPagination = false, onRowClick, backendPaginationHandler, tableBody: Row }: TableProps<T>): JSX.Element {
   const [currentPage, setCurrentPage] = useState(1);
   const [offset, setOffset] = useState(0)

   const startIndex = (currentPage - 1) * itemsPerPage;
   const endIndex = startIndex + itemsPerPage;

   const paginatedData = backendPagination ? data : data?.slice(startIndex, endIndex);

   const totalPages = Math.ceil(data?.length / itemsPerPage);

   const handlePageChange = (page: number): void => {

      // Add backend pagination logic here
      if (backendPaginationHandler) {
         if (page > currentPage) {
            backendPaginationHandler(itemsPerPage, offset + itemsPerPage)
            setOffset(current => current + itemsPerPage)
         } else {
            backendPaginationHandler(itemsPerPage, offset - itemsPerPage)
            setOffset(current => current - itemsPerPage)
         }
      }
      setCurrentPage(page);
   };

   return (
      <div className='table-wrapper'>
         <div>
            <table>
               <thead>
                  <tr>
                     {columns.map((column, index) => (
                        <th key={index} className={column.align}>{column.header}</th>
                     ))}
                  </tr>
               </thead>
               <tbody>
                  {/* form table row for you */}
                  {!isLoading && !Row && paginatedData.map((item: any, rowIndex) => (
                     <tr key={rowIndex} onClick={() => { onRowClick && onRowClick(item) }}>
                        {columns.map((column, colIndex) => (
                           <td key={colIndex}>
                              {isDateString(item[column.accessor]) ?
                                 formatDate(item[column.accessor]) : item[column.accessor]}
                           </td>
                        ))}
                     </tr>
                  ))}
                  {/* pass in already built table rows */}
                  {!isLoading && Row && paginatedData.map((item: any, rowIndex, array: any[]) => (
                     <Row key={rowIndex} data={item} totalNum={array?.length} />
                  ))}
               </tbody>
            </table>

            {isLoading && 'loading...'}
            {!isLoading && !data?.length && (
               <h1 className='text-center'>No data</h1>
            )}
            {!backendPagination && (
               <div>
                  {Array.from({ length: totalPages }, (_, index) => (
                     <button key={index} onClick={() => handlePageChange(index + 1)}>
                        {index + 1}
                     </button>
                  ))}
               </div>
            )}
            {backendPagination && (
               <div>
                  <button className='prev' disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
                     prev
                  </button>
                  <button className='next' onClick={() => handlePageChange(currentPage + 1)}>
                     next
                  </button>
               </div>
            )}
         </div>
      </div>
   );
}

export default Table;
