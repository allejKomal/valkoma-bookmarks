import { useState } from "react";
import { useReactTable, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, type ColumnFiltersState, type PaginationState, type SortingState, type VisibilityState } from "@tanstack/react-table";
import { bookmarkColumns, } from "./column";
import type { Bookmark } from "@/utils/note";

export function useTable(data: Bookmark[]) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 15,
    });


    const initialColumnVisibility: VisibilityState = {
        url: false,
        description: true,
        title: true,
        faviconUrl: true,
        folder: true,
        tags: true,
        isFavorite: true,
        createdAt: false,
        contentType: false,
        privacy: false,
    };
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(initialColumnVisibility);


    const table = useReactTable({
        data,
        columns: bookmarkColumns,
        state: {
            sorting,
            pagination,
            columnFilters,
            columnVisibility,
        },
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        debugTable: false,
    });

    return {
        table,
        sorting,
        setSorting,
        pagination,
        setPagination,
    };
}