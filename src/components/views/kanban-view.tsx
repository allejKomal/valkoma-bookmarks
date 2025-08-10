import type { Table } from "@tanstack/react-table";
import { Card, CardContent, Badge } from "valkoma-package/primitive";

import type { Bookmark } from "@/utils/note";

interface CategoryCardsViewProps {
    table: Table<Bookmark>;
}

export function KanbanView({ table }: CategoryCardsViewProps) {
    const rows = table.getRowModel().rows;

    // Group rows by category
    const grouped: Record<string, Bookmark[]> = {};

    rows.forEach((row) => {
        const category = row.original.Category || "Uncategorized";
        if (!grouped[category]) grouped[category] = [];
        grouped[category].push(row.original);
    });

    // Helper to extract domain from URL safely
    const getDomain = (url: string) => {
        try {
            return new URL(url).hostname.replace("www.", "");
        } catch {
            return "";
        }
    };

    return (
        <div className="flex space-x-4 overflow-x-auto pb-4">
            {Object.entries(grouped).map(([category, bookmarks]) => (
                <div key={category} className="flex-shrink-0 w-72">
                    <div className="bg-white dark:bg-black rounded-lg border">
                        <div className="p-3 border-b bg-gray-50 dark:bg-gray-900">
                            <h3 className="font-medium  dark:text-gray-50 text-gray-900 flex items-center justify-between">
                                {category}
                                <Badge variant="secondary" className="text-xs">
                                    {bookmarks.length}
                                </Badge>
                            </h3>
                        </div>
                        <div className="p-2 space-y-2 max-h-96 overflow-y-auto">
                            {bookmarks.map((bookmark) => (
                                <Card
                                    key={bookmark.id}
                                    className="cursor-pointer hover:shadow-sm transition-shadow"
                                >
                                    <CardContent className="p-3">
                                        <h4 className="text-sm font-medium text-gray-900 dark:text-gray-50 mb-1">
                                            {bookmark.title || bookmark.URL}
                                        </h4>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 line-clamp-2">
                                            {bookmark.Description}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-gray-400 dark:text-gray-500">
                                                {getDomain(bookmark.URL)}
                                            </span>
                                            {/* No visits or extra info */}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
