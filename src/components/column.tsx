import type { ColumnDef } from '@tanstack/react-table';
import { Tooltip, TooltipContent, TooltipTrigger, Badge } from 'valkoma-package/primitive';
import { Star, ExternalLink } from 'lucide-react';
import type { Bookmark } from '@/utils/note';
import { DataTableColumnHeader } from './data-table-column-header';

export type ExtendedColumnDef<TData, TValue = unknown> = ColumnDef<TData, TValue> & {
    headerAlign?: 'left' | 'center' | 'right';
    cellAlign?: 'left' | 'center' | 'right';
};

export const bookmarkColumns: ExtendedColumnDef<Bookmark>[] = [
    {
        accessorKey: 'faviconUrl', // assuming your Bookmark type has this (or generate dynamically)
        header: ({ column }) => <DataTableColumnHeader column={column} title="Favicon" />,
        cell: ({ row }) => {
            // If you don't have faviconUrl in Bookmark, fallback to Google's favicon service
            const url = row.original.URL;
            const faviconUrl = `https://www.google.com/s2/favicons?sz=64&domain_url=${encodeURIComponent(url)}`;
            return (
                <div className="flex items-center justify-center">
                    <img
                        src={faviconUrl}
                        alt="favicon"
                        className="w-5 h-5 rounded-sm"
                        loading="lazy"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = "/placeholder.svg";
                        }}
                    />
                </div>
            );
        },
        cellAlign: 'center',
        headerAlign: 'center',
        enableSorting: false,
        size: 70,
    },

    {
        accessorKey: 'title',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
        cell: ({ row }) => {
            const { title, URL } = row.original;
            const displayTitle = title?.trim() || URL;
            return (
                <a
                    href={URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 active:text-primary-800 visited:text-secondary-500 no-underline transition-all duration-300 font-medium break-words"
                    title={displayTitle}
                >
                    {displayTitle}
                </a>
            );
        },
        enableSorting: true,
        size: 280,
        enableColumnFilter: true,
    },

    {
        accessorKey: 'URL',
        header: ({ column }) => <DataTableColumnHeader column={column} title="URL" />,
        cell: ({ getValue }) => {
            const url = getValue<string>();
            return (
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 active:text-primary-800 visited:text-secondary-500 no-underline transition-all duration-300 break-all"
                    title={url}
                >
                    {url}
                </a>
            );
        },
        enableSorting: true,
        size: 320,
        enableColumnFilter: true,
        enableHiding: true,
    },

    {
        accessorKey: 'Category',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Category" />,
        cell: ({ getValue }) => {
            const category = getValue<string>();
            return category ? (
                <Badge variant="secondary" className="text-[10px] px-2 py-0 h-5 whitespace-nowrap">
                    {category}
                </Badge>
            ) : (
                <span className="italic text-gray-400">-</span>
            );
        },
        enableSorting: true,
        size: 140,
        enableColumnFilter: true,
    },

    {
        accessorKey: 'Tags',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Tags" />,
        cell: ({ getValue }) => {
            const tags = getValue<string[]>() || [];
            if (tags.length === 0) return <span className="italic text-gray-400">-</span>;

            return (
                <div className="flex flex-wrap gap-1 max-w-[200px]">
                    {tags.length > 2 ? (
                        <Tooltip>
                            <TooltipTrigger className="cursor-pointer select-none whitespace-nowrap text-xs text-gray-600">
                                {tags.slice(0, 1).map((tag) => (
                                    <Badge variant="outline" key={tag} className="text-[10px] px-2 py-0 h-5">
                                        {tag}
                                    </Badge>
                                ))}
                                <Badge variant="outline" className="text-[10px] px-2 py-0 h-5">
                                    +{tags.length - 1}
                                </Badge>
                            </TooltipTrigger>
                            <TooltipContent className="text-xs">
                                {tags.map((tag, i) => (
                                    <span key={i}>
                                        {tag}
                                        {i !== tags.length - 1 && " | "}
                                    </span>
                                ))}
                            </TooltipContent>
                        </Tooltip>
                    ) : (
                        tags.map((tag) => (
                            <Badge variant="outline" key={tag} className="text-[10px] px-2 py-0 h-5 whitespace-nowrap">
                                {tag}
                            </Badge>
                        ))
                    )}
                </div>
            );
        },
        enableSorting: false,
        size: 180,
        enableColumnFilter: true,
        enableHiding: true,
    },

    {
        accessorKey: 'Description',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Description" />,
        cell: ({ getValue }) => {
            const description = getValue<string>();
            if (!description) return <span className="italic text-gray-400">No description</span>;

            return description.length > 50 ? (
                <Tooltip>
                    <TooltipTrigger className="line-clamp-3 cursor-pointer">
                        {description.slice(0, 50)}...
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{description}</p>
                    </TooltipContent>
                </Tooltip>
            ) : (
                <span className="line-clamp-3">{description}</span>
            );
        },
        enableSorting: false,
        size: 400,
        enableColumnFilter: true,
        enableHiding: true,
    },
];
