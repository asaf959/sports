// Import the 'useMemo' hook from the 'react' library
import { useMemo } from "react";

// Define a constant for the ellipsis character
export const DOTS = "...";

// Define a utility function to create an array of numbers within a range
const range = (start: number, end: number) => {
  const length = end - start + 1;

  return Array.from({ length }, (_, idx) => idx + start);
};

// Define a custom hook for pagination
export const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage
}: {
  totalCount: number;
  pageSize: number;
  siblingCount?: number;
  currentPage: number | undefined;
}) => {
  // Use the useMemo hook to memoize the pagination range based on the current page and other parameters
  const paginationRange = useMemo(() => {
    // Calculate the total number of pages based on the total item count and page size
    const totalPageCount = Math.ceil(totalCount / pageSize);

    // Calculate the total number of page numbers to show, including left and right siblings and ellipses
    const totalPageNumbers = siblingCount + 5;

    // If the total number of pages is less than or equal to the number of page numbers to show, return a range of all pages
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    // console.log({ leftSiblingIndex, rightSiblingIndex, shouldShowLeftDots, shouldShowRightDots });

    // Calculate the index of the left sibling page
    const leftSiblingIndex = Math.max((currentPage ?? 1) - siblingCount, 1);

    // Calculate the index of the right sibling page
    const rightSiblingIndex = Math.min((currentPage ?? 1) + siblingCount, totalPageCount);

    // Determine whether to show ellipses on the left side of the pagination range
    const shouldShowLeftDots = leftSiblingIndex > 2;

    // Determine whether to show ellipses on the right side of the pagination range
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    // Define constants for the first and last page indices
    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    // If there are no left ellipses but there are right ellipses, show only the left sibling pages, ellipses, and last page
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    // If there are no right ellipses but there are left ellipses, show only the first page, ellipses, and right sibling pages
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);

      return [firstPageIndex, DOTS, ...rightRange];
    }

    // If there are both left and right ellipses, show the first page, ellipses, left sibling pages, current page, right sibling pages, ellipses, and last page
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);

      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }

    // Return null if there is an error
    return null;
  }, [totalCount, pageSize, siblingCount, currentPage]);

  // Return the calculated pagination range
  return paginationRange;
};
