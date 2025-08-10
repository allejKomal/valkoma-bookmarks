import type { Table } from "@tanstack/react-table";

interface TerminalListViewProps<TData> {
    table: Table<TData>;
}

export function TerminalListView<TData extends { id: number; title: string; URL: string; Category: string; Description: string }>(
    { table }: TerminalListViewProps<TData>
) {
    // Get the rows from the table, optionally filtered/paginated by tanstack
    const rows = table.getRowModel().rows;

    // For padding and formatting like a terminal, helper function
    const padEnd = (str: string, length: number) => (str.length > length ? str.slice(0, length) : str.padEnd(length, " "));
    const padStart = (str: string, length: number) => str.padStart(length, " ");

    return (
        <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm select-text">
            <div className="text-green-400 mb-2">$ bookmarks --list --format=table</div>
            <div className="space-y-1">
                {rows.map((row, index) => {
                    const bookmark = row.original;
                    return (
                        <div key={bookmark.id} className="text-gray-300">
                            <span className="text-blue-400">{padStart(String(index + 1), 2)}</span>
                            <span className="text-white mx-2">│</span>
                            <span className="text-yellow-400">{padEnd(bookmark.title || bookmark.URL, 30)}</span>
                            <span className="text-white mx-2">│</span>
                            <span className="text-green-400">{padEnd(bookmark.Category, 12)}</span>
                            <span className="text-white mx-2">│</span>
                            <span className="text-cyan-400">No visits</span> {/* No visits info */}
                            <span className="text-white mx-2">│</span>
                            <span className="text-purple-400">N/A</span> {/* No dateAdded */}
                        </div>
                    );
                })}
            </div>
            <div className="text-green-400 mt-2">$ Found {rows.length} bookmarks</div>
        </div>
    );
}
