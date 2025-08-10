"use client";

import { useState, useEffect } from "react";
import {
    TableIcon,
    GridIcon,
    ListIcon,
    KanbanIcon,
    TerminalIcon,
    TreesIcon,
} from "lucide-react";

import {
    Input,
} from "valkoma-package/primitive";

import { getBookmarks } from "@/utils/github-action";
import type { Bookmark } from "@/utils/note";
import ListView from "./views/list-view";
import { useTable } from "./use-table";
import { DataTablePagination } from "./pagination";
import { TableView } from "./views/table-view";
import { KanbanView } from "./views/kanban-view";
import { TerminalListView } from "./views/terminal-view";
import TreeView from "./views/tree-view";
import GridView from "./views/grid-view";
import { ButtonGroup } from "valkoma-package/design-system";

type view = "list" | "grid" | "table" | "kanban" | "terminal" | "tree";

export default function BookmarkManager() {
    const [activeView, setActiveView] = useState<view>("list");

    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
    const { table } = useTable(bookmarks);

    const viewOptions = [
        { id: "list", label: "List", icon: <ListIcon className="w-4 h-4" /> },
        { id: "grid", label: "Grid", icon: <GridIcon className="w-4 h-4" /> },
        { id: "table", label: "Table", icon: <TableIcon className="w-4 h-4" /> },
        { id: "kanban", label: "Kanban", icon: <KanbanIcon className="w-4 h-4" /> },
        { id: "terminal", label: "Terminal", icon: <TerminalIcon className="w-4 h-4" /> },
        { id: "tree", label: "Tree", icon: <TreesIcon className="w-4 h-4" /> },
    ]
    useEffect(() => {
        async function fetchData() {
            const data = await getBookmarks();
            setBookmarks(data);
        }
        fetchData();
    }, []);

    return (
        <div className="p-10">
            <div className="flex flex-col lg:flex-row gap-3">
                {/* Search input filters 'title' column */}
                <div className="flex justify-between gap-5">
                    <Input
                        placeholder="Search bookmarks..."
                        value={(table.getColumn("URL")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("URL")?.setFilterValue(event.target.value)
                        }
                        className="pl-10 h-8 text-sm w-[400px]"
                    />
                    <ButtonGroup
                        size="sm"
                        items={viewOptions.map((view) => ({
                            id: view.id,
                            label: view.label,
                            icon: view.icon,
                            active: activeView === view.id,
                            onClick: () => setActiveView(view.id as view),
                        }))}
                        activeButtonClassName="bg-black text-white dark:bg-white dark:!text-black"
                    />
                </div>

                {/* ListView container with vertical scroll */}
                <div className="h-[630px] pt-3 overflow-y-auto pr-2 custom-scroll">
                    {activeView === 'list' && <ListView data={table} />}
                    {activeView === 'grid' && <GridView data={table} />}
                    {activeView === 'table' && <TableView table={table} />}
                    {activeView === 'kanban' && <KanbanView table={table} />}
                    {activeView === 'terminal' && <TerminalListView table={table} />}
                    {activeView === 'tree' && <TreeView table={table} />}
                </div>
            </div>
            {/* Pagination below */}
            <div className="mt-4">
                <DataTablePagination table={table} />

            </div>
        </div>
    );
}
