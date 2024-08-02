import { useVirtualizer } from '@tanstack/react-virtual';
import { type JSX, useCallback, useEffect, useRef, useState } from 'react';

const initialData = Array.from(new Array(20)).map((_, i) => `cat ${i + 1}`);

export const AnimalList = (): JSX.Element => {
  const [data, setData] = useState(initialData);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const parentRef = useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: data.length + 1,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
    overscan: 5,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();

  const fetchMore = useCallback(async () => {
    setIsLoadingMore(true);

    await new Promise((res) => {
      setTimeout(res, 500);
    });

    setData((prev) => [
      ...prev,
      ...Array.from(new Array(20)).map((_, i) => `cat ${i + 1 + prev.length}`),
    ]);

    setIsLoadingMore(false);
  }, []);

  useEffect(() => {
    const lastItem = virtualItems.at(-1);

    if (!lastItem) {
      return;
    }

    if (lastItem.index >= data.length - 1 && !isLoadingMore) {
      void fetchMore();
    }
  }, [fetchMore, data.length, isLoadingMore, rowVirtualizer, virtualItems]);

  return (
    <div
      ref={parentRef}
      className="List"
      style={{
        height: `200px`,
        width: `400px`,
        overflow: 'auto',
      }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualItems.map((virtualRow) => {
          const isLoaderRow = virtualRow.index > data.length - 1;

          return (
            <div
              key={virtualRow.index}
              className={virtualRow.index % 2 ? 'ListItemOdd' : 'ListItemEven'}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              {isLoaderRow && 'Loading more...'}
              {!isLoaderRow && data[virtualRow.index]}
            </div>
          );
        })}
      </div>
    </div>
  );
};
