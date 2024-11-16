import LoadingIcon from './../../_assets/icons/loading.svg'
import s from './loading.module.css'
import { cn } from '@/core/utils'

function Loading({ className }: { className?: string }) {
  return (
    <div className={cn(s.loading, !className ? '' : className)}>
      <LoadingIcon />
    </div>
  )
}

export default Loading
