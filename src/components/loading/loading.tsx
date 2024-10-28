
import { cn } from '@/core/utils';
import LoadingIcon from './../../_assets/icons/loading.svg';

import s from './loading.module.css';

function Loading({className}: {className?: string}) {
    return (
        <div className={cn(s.loading, (!className ? '' : className))}>
            <LoadingIcon></LoadingIcon>
        </div>
    );
}

export default Loading;