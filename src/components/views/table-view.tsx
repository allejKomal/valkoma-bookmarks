"use client"

import { flexRender, type Table } from "@tanstack/react-table"
import {
    Table as TableComponent,
    TableBody,
    TableCell,
    TableRow,
    TableHead,
    TableHeader,
} from "valkoma-package/primitive"
import type { ExtendedColumnDef } from "../column"

interface ContentProps<TData> {
    table: Table<TData>
}

export function TableView<TData>({ table }: ContentProps<TData>) {
    // Calculate columns length for colspan fallback
    const columnsLength = table.getVisibleFlatColumns().length

    // Use pagination rows to display paginated data
    const rows = table.getPaginationRowModel().rows

    return (
        <>
            <TableComponent className="table-fixed w-full">
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id} className="border-b">
                            {headerGroup.headers.map((header) => {
                                const headerAlign = (header.column.columnDef as ExtendedColumnDef<TData>).headerAlign ?? 'left'
                                const alignClass =
                                    headerAlign === 'center'
                                        ? 'text-center'
                                        : headerAlign === 'right'
                                            ? 'text-right'
                                            : 'text-left'
                                return (
                                    <TableHead
                                        key={header.id}
                                        style={{ width: header.getSize() }}
                                        className={`px-2 py-2 bg-background whitespace-nowrap sticky top-0 z-10 border-b ${alignClass}`}
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {rows.length ? (
                        rows.map((row) => (
                            <TableRow key={row.id} data-state={row.getIsSelected() ? 'selected' : undefined}>
                                {row.getVisibleCells().map((cell) => {
                                    const alignClass =
                                        (cell.column.columnDef as ExtendedColumnDef<TData>).cellAlign === 'center'
                                            ? 'text-center'
                                            : (cell.column.columnDef as ExtendedColumnDef<TData>).cellAlign === 'right'
                                                ? 'text-right'
                                                : 'text-left'

                                    return (
                                        <TableCell
                                            key={cell.id}
                                            style={{ width: cell.column.getSize() }}
                                            className={`px-2 py-2 text-sm whitespace-nowrap ${alignClass}`}
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columnsLength} className="h-[550px] text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </TableComponent>
        </>
    )
}
