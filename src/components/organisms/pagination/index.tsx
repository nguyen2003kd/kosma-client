// Core
import { FC, useMemo } from 'react'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal } from 'lucide-react'

// Core
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

// Internal
import { type PaginationProps } from './lib'

// Component
export const Pagination: FC<PaginationProps> = (props) => {
  // Props
  const {
    page,
    pageCount,
    isHasPreviousPage,
    isHasNextPage,
    neighborPageCount = 1,
    jumpedPageCount = 5,
    onChangePage,
    onGoToPreviousPage,
    onGoToNextPage
  } = props

  // Hooks

  // Methods
  // Handle go to previous page
  const handleGoToPreviousPage = () => {
    if (onGoToPreviousPage) {
      return onGoToPreviousPage()
    }
    onChangePage(page - 1)
  }

  // Handle go to next page
  const handleGoToNextPage = () => {
    if (onGoToNextPage) {
      return onGoToNextPage()
    }
    onChangePage(page + 1)
  }

  // Handle jump previous pages
  const handleJumpPreviousPages = () => {
    const newPage = Math.max(1, page - jumpedPageCount)
    onChangePage(newPage)
  }

  // Handle jump next pages
  const handleJumpNextPages = () => {
    const newPage = Math.min(pageCount, page + jumpedPageCount)
    onChangePage(newPage)
  }

  // Memos
  // Displayed pages
  const displayedPages = useMemo(() => {
    const result: number[] = []

    if (pageCount <= 3 + neighborPageCount * 2) {
      if (pageCount === 0) {
        result.push(1)
      }

      for (let i = 1; i <= pageCount; i += 1) {
        result.push(i)
      }
    } else {
      let left = Math.max(1, page - neighborPageCount)
      let right = Math.min(page + neighborPageCount, pageCount)

      if (page - 1 <= neighborPageCount) {
        right = 1 + neighborPageCount * 2
      }

      if (pageCount - page <= neighborPageCount) {
        left = pageCount - neighborPageCount * 2
      }

      for (let i = left; i <= right; i += 1) {
        result.push(i)
      }

      if (page - 1 >= neighborPageCount * 2 && page !== 1 + 2) {
        result.unshift(-Infinity)
      }

      if (pageCount - page >= neighborPageCount * 2 && page !== pageCount - 2) {
        result.push(Infinity)
      }

      if (left !== 1) {
        result.unshift(1)
      }

      if (right !== pageCount) {
        result.push(pageCount)
      }
    }

    return result
  }, [neighborPageCount, page, pageCount])

  // Template
  return (
    <div className='flex items-center gap-1 select-none'>
      {/* Previous */}
      <Button
        variant='ghost'
        className='hidden xl:inline-flex'
        disabled={!(isHasPreviousPage || page > 1)}
        onClick={handleGoToPreviousPage}
      >
        <ChevronLeft />
            <span className='hidden xl:inline-block'>Trang trước</span>
      </Button>

      {displayedPages.map((displayedPage) => {
        // Previous jumping
        if (displayedPage === -Infinity) {
          return (
            <TooltipProvider key={displayedPage} delayDuration={400}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size='icon' className='group' variant='ghost' onClick={handleJumpPreviousPages}>
                    <MoreHorizontal className='block group-hover:hidden' />
                    <ChevronsLeft className='hidden group-hover:block' />
                  </Button>
                </TooltipTrigger>

                <TooltipContent>
                  {jumpedPageCount} trang trước
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )
        }

        // Next jumping
        if (displayedPage === Infinity) {
          return (
            <TooltipProvider key={displayedPage} delayDuration={400}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size='icon' className='group' variant='ghost' onClick={handleJumpNextPages}>
                    <MoreHorizontal className='block group-hover:hidden' />
                    <ChevronsRight className='hidden group-hover:block' />
                  </Button>
                </TooltipTrigger>

                <TooltipContent>
                  {jumpedPageCount} trang tiếp theo
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )
        }

        const isActive = displayedPage === page

        // Page
        return (
          <Button
            key={displayedPage}
            variant={isActive ? 'default' : 'ghost'}
            className={cn('relative w-fit min-w-10', isActive && 'cursor-default')}
            onClick={() => onChangePage(displayedPage)}
          >
            <span className={cn('z-10 tabular-nums', isActive && 'text-primary-foreground')}>{displayedPage}</span>
          </Button>
        )
      })}

      {/* Next */}
      <Button
        variant='ghost'
        className='hidden xl:inline-flex'
        disabled={!(isHasNextPage || page < pageCount)}
        onClick={handleGoToNextPage}
      >
        <span className='hidden xl:inline-block'>Trang tiếp theo</span>
        <ChevronRight />
      </Button>
    </div>
  )
}

export * from './lib'
