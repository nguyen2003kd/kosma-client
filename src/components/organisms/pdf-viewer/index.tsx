// Core
import { useState } from 'react'
import { Document, Page } from 'react-pdf'
import { LoaderCircle, Minus, Plus } from 'lucide-react'

// App
import '@/configs/pdf-worker'
import { cn } from '@/lib/utils'
import { Button } from '@components/ui/button'
import { Pagination } from '@components/organisms/pagination'

// Internal
import { PdfViewerProps } from './lib'

// Component
export const PdfViewer = (props: PdfViewerProps) => {
  // Props
  const { documentProps, containerClassName } = props

  // States
  const [pageCount, setPageCount] = useState<number>(1)
  const [page, setPage] = useState(1)
  const [scale, setScale] = useState(1)

  // Methods
  // Handle load success
  const handleLoadSuccess = ({ numPages }: { numPages: number }) => {
    setPageCount(numPages)
  }

  // Template
  return (
    <div className={cn('space-y-4', containerClassName)}>
      <div className='flex items-center gap-2'>
        <Button size='icon' variant='outline' disabled={scale === 1} onClick={() => setScale((prev) => (prev -= 1))}>
          <Minus />
        </Button>

        <Button size='icon' variant='outline' disabled={scale === 3} onClick={() => setScale((prev) => (prev += 1))}>
          <Plus />
        </Button>
      </div>

      <div className='max-w-full overflow-auto'>
        <Document
          loading={<LoaderCircle className='mx-auto animate-spin' />}
          className='w-fit'
          onLoadSuccess={handleLoadSuccess}
          {...documentProps}
        >
          <Page pageNumber={page} loading={<LoaderCircle className='animate-spin' />} scale={scale} />
        </Document>
      </div>

      <Pagination
        page={page}
        pageCount={pageCount}
        isHasPreviousPage={page > 1}
        isHasNextPage={page < pageCount}
        onGoToPreviousPage={() => setPage((prev) => prev - 1)}
        onGoToNextPage={() => setPage((prev) => prev + 1)}
        onChangePage={setPage}
      />
    </div>
  )
}
