"use client"

import { flexRender, type Table } from "@tanstack/react-table"
import { TableHeader as TableHeaderPrimitive, TableRow, TableHead } from "valkoma-package/primitive"
import type { ExtendedColumnDef } from "./column"

interface HeaderProps<TData> {
    table: Table<TData>
}

export function DataTableHeader<TData>({ table }: HeaderProps<TData>) {
    return (
        <TableHeaderPrimitive>
            {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="border-b">
                    {headerGroup.headers.map((header) => {
                        const headerAlign = (header.column.columnDef as ExtendedColumnDef<TData>).headerAlign ?? 'left';
                        const alignClass =
                            headerAlign === 'center'
                                ? 'text-center'
                                : headerAlign === 'right'
                                    ? 'text-right'
                                    : 'text-left';
                        return (
                            <TableHead
                                key={header.id}
                                style={{ width: header.getSize() }}
                                className={`px-2 py-2  bg-background whitespace-nowrap sticky top-0 z-10 border-b ${alignClass}`}
                            >
                                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                            </TableHead>
                        );
                    })}
                </TableRow>
            ))}
        </TableHeaderPrimitive>
    )
}