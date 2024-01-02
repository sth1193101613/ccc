import { useEffect, useRef } from 'react'

interface ITypes {
  loaderRef: { current: undefined | HTMLElement };
  loadMore: (pageNo: number) => void;
  page: number;
}
export default function useInfiniteScroll({ loaderRef, loadMore, page }: ITypes) {
  const pageRef = useRef(page)
  useEffect(() => {
    let ob: IntersectionObserver
    if (loaderRef.current) {
      ob = new IntersectionObserver((entries) => {
        const entry = entries[0]
        if (entries.length !== 1) {
          loadMore(1)
        }
        if (entry.isIntersecting) {
          loadMore(pageRef.current)
          pageRef.current += 1
        }
      })
      ob.observe(loaderRef.current)
    }
    return () => {
      ob && ob.disconnect()
    }
  }, [loadMore, loaderRef])
}