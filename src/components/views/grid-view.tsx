"use client"

import type { Table } from "@tanstack/react-table"
import type { Bookmark } from "@/utils/note"
import { Card, CardContent, Badge } from "valkoma-package/primitive"
import { ExternalLink } from "lucide-react"

type Props = {
    data: Table<Bookmark>
}

export default function GridView({ data }: Props) {
    const rows = data.getPaginationRowModel().rows

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {rows.map((row) => {
                const bookmark = row.original
                const favicon = `https://www.google.com/s2/favicons?sz=64&domain_url=${encodeURIComponent(bookmark.URL)}`
                const title = bookmark.title || bookmark.URL

                return (
                    <Card
                        key={bookmark.id}
                        className="group hover:shadow-md transition-all duration-200 cursor-pointer"
                    >
                        <CardContent className="p-3 space-y-2">
                            {/* Favicon + Title */}
                            <div className="flex items-center space-x-2">
                                <img
                                    src={favicon}
                                    alt="favicon"
                                    className="w-4 h-4 rounded-sm"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = "/placeholder.svg"
                                    }}
                                />
                                <a
                                    href={bookmark.URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm font-medium text-gray-900 hover:underline line-clamp-1"
                                >
                                    {title}
                                </a>
                            </div>

                            {/* Description */}
                            <p className="text-xs text-gray-500 line-clamp-2">
                                {bookmark.Description}
                            </p>

                            {/* Footer Info */}
                            <div className="flex items-center justify-between text-xs text-gray-400">
                                <Badge variant="secondary" className="px-1.5 py-0.5 text-[10px]">
                                    {bookmark.Category}
                                </Badge>
                                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    )
}
