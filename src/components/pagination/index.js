import React, {memo} from 'react'
import PropTypes from "prop-types"
import './style.css'

function Pagination({total, limit, setPage, activePage}) {

   const activeIndex = activePage - 1
   const pagesCount = Math.ceil(total / limit)
   
   return (
      <div className='Pagination'>
         <div className='Pagination-paginationItems'>
            {
               [...new Array(pagesCount)].map((_, i) => {
                  const isRenderSeparateFirstCondition = i === 1 && activeIndex > 2 && pagesCount > 4
                  const isRenderSeparateSecondCondition = i === pagesCount - 2 && activeIndex < pagesCount - 3 && pagesCount > 4
                  
                  const isFirstItem = i === 0
                  const isLastItem = i === pagesCount - 1
                  const isWithinFirstThree = i < 3 && activeIndex < 4
                  const isWithinLastThree = i > pagesCount - 4 && activeIndex > pagesCount - 4
                  const isAdjacentToActive = i === activeIndex - 1 || i === activeIndex + 1
                  const isActive = i === activeIndex
                  
                  const isRenderSeparate = isRenderSeparateFirstCondition || isRenderSeparateSecondCondition
                  const isRenderItem = isFirstItem || isLastItem || isWithinFirstThree || isWithinLastThree || isAdjacentToActive || isActive

                  if(isRenderSeparate){
                     return(
                        <div 
                           className='paginationItems-separateItem'
                           key={i}
                        >
                           ...
                        </div>
                     )
                  }
                  else if(isRenderItem){
                     return(
                        <div 
                           className={`paginationItems-item ${i === activeIndex && 'paginationItems-item__active '}`}
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
      </div>
   )
}

Pagination.propTypes = {
   total: PropTypes.number,
   limit: PropTypes.number,
   setPage: PropTypes.func,
   activePage: PropTypes.number,
}

export default memo(Pagination)