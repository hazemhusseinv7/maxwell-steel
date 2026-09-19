import { Pagination } from "@heroui/react";
import NextLink from "next/link";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

import { formatNumberAr } from "@/lib/formatters";
import { cn } from "@/lib/utils";

interface Props {
  page: number;
  totalPages: number;
  hrefFor: (page: number) => string;
  numbered?: boolean;
  summary?: boolean;
}

export function ArPagination({
  page,
  totalPages,
  hrefFor,
  numbered = true,
  summary = false,
}: Props) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <Pagination.Root aria-label="ترقيم الصفحات" className="w-auto">
      {summary && (
        <Pagination.Summary>
          صفحة {formatNumberAr(page)} من {formatNumberAr(totalPages)}
        </Pagination.Summary>
      )}
      <Pagination.Content>
        {page > 1 && (
          <Pagination.Item>
            <NextLink
              href={hrefFor(page - 1)}
              className={cn("pagination__link", "pagination__link--nav")}
            >
              <HiChevronRight className="size-4" aria-hidden="true" />
              السابق
            </NextLink>
          </Pagination.Item>
        )}
        {numbered &&
          pages.map((p) =>
            p === page ? (
              <Pagination.Item key={p}>
                <span
                  aria-current="page"
                  data-active="true"
                  className="pagination__link"
                >
                  {formatNumberAr(p)}
                </span>
              </Pagination.Item>
            ) : (
              <Pagination.Item key={p}>
                <NextLink href={hrefFor(p)} className="pagination__link">
                  {formatNumberAr(p)}
                </NextLink>
              </Pagination.Item>
            ),
          )}
        {page < totalPages && (
          <Pagination.Item>
            <NextLink
              href={hrefFor(page + 1)}
              className={cn("pagination__link", "pagination__link--nav")}
            >
              التالي
              <HiChevronLeft className="size-4" aria-hidden="true" />
            </NextLink>
          </Pagination.Item>
        )}
      </Pagination.Content>
    </Pagination.Root>
  );
}
