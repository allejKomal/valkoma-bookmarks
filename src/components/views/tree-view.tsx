"use client"

import { useState } from "react"
import { Folder, File } from "lucide-react"
import type { Bookmark } from "@/utils/note"
import type { Table } from "@tanstack/react-table"

type Props = {
    table: Table<Bookmark>
}

export default function TreeView({ table }: Props) {
    const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({})

    const grouped = table
        .getRowModel()
        .rows.reduce<Record<string, Bookmark[]>>((acc, row) => {
            const category = row.original.Category || "Uncategorized"
            if (!acc[category]) acc[category] = []
            acc[category].push(row.original)
            return acc
        }, {})

    const toggleCategory = (category: string) => {
        setOpenCategories((prev) => ({
            ...prev,
            [category]: !prev[category],
        }))
    }

    return (
        <div className="bg-white dark:bg-black rounded-lg border p-4">
            <div className="space-y-3 font-mono text-sm">
                {Object.entries(grouped).map(([category, bookmarks]) => {
                    const isOpen = openCategories[category]

                    return (
                        <div key={category}>
                            {/* Category Header */}
                            <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 cursor-pointer select-none" onClick={() => toggleCategory(category)}>
                                <Folder className="w-4 h-4 text-blue-500" />
                                <span className="font-medium">{category}</span>
                                <span className="text-gray-400 dark:text-gray-500">({bookmarks.length})</span>
                            </div>

                            {/* Bookmarks under this category */}
                            {isOpen && bookmarks.map((bookmark, i) => (
                                <div key={bookmark.id} className="ml-6 flex flex-col text-gray-600 dark:text-gray-300 space-y-1 mt-1">
                                    <div className="flex items-center space-x-2">
                                        <div className="text-gray-400">
                                            {i === bookmarks.length - 1 ? "└─" : "├─"}
                                        </div>
                                        <File className="w-3 h-3 text-gray-400 dark:text-gray-500" />
                                        <a
                                            href={bookmark.URL}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="truncate hover:underline text-blue-600"
                                        >
                                            {bookmark.title || bookmark.URL}
                                        </a>
                                    </div>
                                    {/* Description visible only when category is open */}
                                    {bookmark.Description && (
                                        <div className="ml-6 text-xs text-gray-500">
                                            {bookmark.Description}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
