'use client';

import {
    ChevronDown,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import type { ReactNode } from 'react';

export interface Column<T> {
    key: keyof T | string;
    label: string;
    render?: (row: T) => ReactNode;
}

type DataTableProps<T> = {
    columns: Column<T>[];
    data: T[];
    totalItems?: number;
    currentPage?: number;
    totalPages?: number;
    columnWidths?: string;
};

export default function DataTable<T>({
    columns,
    data,
    totalItems = data.length,
    currentPage = 1,
    totalPages = 1,
    columnWidths,
}: DataTableProps<T>) {

    const gridTemplateColumns = columnWidths || `repeat(${columns.length}, minmax(0, 1fr))`;

    return (
        <div className="table-card">
            <div className="table-scroll">
                <div
                    className="table-grid"
                >
                    {/* Header */}
                    <div
                        className="table-head"
                        style={{
                            gridTemplateColumns,
                        }}>
                        {columns.map((column) => (
                            <div key={column.key}>
                                <span>{column.label}</span>

                                {column.sortable && (
                                    <ChevronDown size={12} />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Rows */}
                    {data.map((item, rowIndex) => (
                        <div
                            className="table-row"
                            key={rowIndex}
                            style={{
                                gridTemplateColumns,
                            }}>
                            {columns.map((column) => (
                                <div key={column.key}>
                                    {column.render(item)}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="table-footer">
                <span>
                    Showing 1 to {data.length} of {totalItems} items
                </span>

                <div className="pagination">
                    <button
                        className="page-btn"
                        type="button"
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft size={14} />
                    </button>

                    {Array.from(
                        { length: totalPages },
                        (_, index) => index + 1
                    ).map((page) => (
                        <button
                            key={page}
                            className={`page-btn ${page === currentPage ? 'active' : ''
                                }`}
                            type="button"
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        className="page-btn"
                        type="button"
                        disabled={currentPage === totalPages}
                    >
                        <ChevronRight size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
}