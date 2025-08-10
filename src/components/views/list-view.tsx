import type { Bookmark } from "@/utils/note";
import type { Table } from "@tanstack/react-table";
import { ExternalLink } from "lucide-react";
import { Badge } from "valkoma-package/primitive";

export default function ListView({ data }: { data: Table<Bookmark> }) {
    return (
        <div className="space-y-2">
            {data.getRowModel().rows.map((row) => {
                const bookmark = row.original;
                const title = bookmark.title?.trim() || bookmark.URL;
                const favicon = `https://www.google.com/s2/favicons?sz=64&domain_url=${encodeURIComponent(bookmark.URL)}`;

                return (
                    <div
                        key={bookmark.id}
                        className="group flex items-start space-x-3 p-3 hover:bg-muted rounded border rounded-md hover:border-gray-200 transition-all duration-200 cursor-pointer"
                    >
                        {/* Thumbnail */}
                        <div className="w-8 h-8 bg-gray-100 dark:bg-black rounded overflow-hidden flex-shrink-0">
                            <img
                                src={favicon}
                                alt={title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = "/placeholder.svg";
                                }}
                            />
                        </div>

                        {/* Main Content */}
                        <div className="flex-1 min-w-0 space-y-2">
                            {/* Title and icon */}
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-900 dark:text-gray-100 break-all">
                                    {title}
                                </span>
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ExternalLink className="w-4 h-4 text-gray-400" />
                                </div>
                            </div>

                            {/* Badge + Tags */}
                            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                                <Badge
                                    variant="secondary"
                                    className="text-[10px] px-2 py-0 h-4 whitespace-nowrap"
                                >
                                    {bookmark.Category}
                                </Badge>

                                {bookmark.Tags?.map((tag) => (
                                    <Badge
                                        key={tag}
                                        variant="outline"
                                        className="text-[10px] px-2 py-0 h-4 whitespace-nowrap"
                                    >
                                        {tag}
                                    </Badge>
                                ))}
                            </div>

                            {/* Description */}
                            <p className="text-xs text-gray-500 whitespace-normal break-words line-clamp-2">
                                {bookmark.Description}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
