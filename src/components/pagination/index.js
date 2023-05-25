import React, {memo} from 'react';
import './style.css';

function Pagination({total, limit, setPage, activePage}) {
   const activeIndex = activePage - 1
   const pagesCount = Math.ceil(total / limit)
   return (
      <div className='pagination'>
         {
            [...new Array(pagesCount)].map((_, i) => {
               const isRenderSeparate = (i === 1 && activeIndex > 2 && pagesCount > 4) || (i === pagesCount - 2 && activeIndex < pagesCount - 3 && pagesCount > 4)
               const isFirstItem = i === 0
               const isLastItem = i === pagesCount - 1
               const isRenderItem = isFirstItem || isLastItem || (i < 3 && activeIndex < 4) || (i > pagesCount - 4 && activeIndex > pagesCount - 4) || i === activeIndex - 1 || i === activeIndex + 1 || i === activeIndex
               
               if(isRenderSeparate){
                  return(
                     <div 
                        className='pagination-separateItem'
                        key={i}
                     >
                        ...
                     </div>
                  )
               }
               else if(isRenderItem){
                  return(
                     <div 
                        className={`pagination-item ${i === activeIndex && 'pagination-item__active '}`}
                        onClick={() => setPage(i + 1)}
                        key={i}
                     >
                        {i + 1}
                     </div>
                  )
               }
            })
         }
      </div>
   );
}

export default memo(Pagination);