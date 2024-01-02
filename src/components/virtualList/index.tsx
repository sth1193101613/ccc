import React, { useState, FunctionComponent } from 'react';
import { flushSync } from 'react-dom';

interface virtuaType {
  containerHeight: number
  itemHeight: number
  itemCount: number
  children: FunctionComponent<any>
}

function FixedSizeList({ containerHeight, itemHeight, itemCount, children }: virtuaType) {
  const Component = children
  const contentHeight = itemHeight * itemCount
  const [scrollTop, setScrollTop] = useState(0)
  let startIdx = Math.floor(scrollTop / itemHeight);
  let endIdx = Math.floor((scrollTop + containerHeight) / itemHeight);
  const paddingCount = 2;
  startIdx = Math.max(startIdx - paddingCount, 0)
  endIdx = Math.min(endIdx + paddingCount, itemCount - 1)
  const top = itemHeight * startIdx
  const items = [];
  for (let i = startIdx; i <= endIdx; i++) {
    items.push(<Component key={i} index={i} style={{ height: itemHeight }} />);
  }

  return (
    <div
      style={{ height: containerHeight, overflow: 'auto' }}
      onScroll={(e) => {
        flushSync(() => {
          setScrollTop((e.target as HTMLElement).scrollTop)
        });
      }}
    >
      <div style={{ height: contentHeight }}>
        <div style={{ transform: `translate3d(0px, ${top}px, 0` }}>{items}</div>
      </div>
    </div>
  );
}

export default FixedSizeList;
