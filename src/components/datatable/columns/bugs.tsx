import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { api } from "@/utils/api";
import React from "react";
import { BugReport } from "@/server/api/routers/bug";

export const bugReportColumns = (refetch: Function): ColumnDef<BugReport>[] => {
  const columns: ColumnDef<BugReport>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => {
        return (
          <Button
            className="flex w-full flex-row items-center justify-center"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            ID
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "category",
      header: ({ column }) => {
        return (
          <Button
            className="flex w-full flex-row items-center justify-center"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Category
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            className="flex w-full flex-row items-center justify-center"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "description",
      header: ({ column }) => {
        return (
          <Button
            className="flex w-full flex-row items-center justify-center"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Description
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button
            className="flex w-full flex-row items-center justify-center"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const status = row.original.status;

        if (status === 0) {
          return <Badge variant="destructive">Open</Badge>;
        } else if (status === 1) {
          return <Badge>In Progress</Badge>;
        } else {
          return <Badge variant="secondary">Closed</Badge>;
        }
      },
    },

    {
      id: "actions",
      cell: ({ row }) => {
        const bugReport = row.original;
        const updateReport = api.bug.update.useMutation({
          onSuccess: () => refetch(),
        });
        return (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                {bugReport.status !== 0 && (
                  <DropdownMenuItem
                    onClick={() => {
                      updateReport.mutate({ reportId: bugReport.id, fixed: 0 });
                    }}
                    className="cursor-pointer"
                  >
                    Mark Open
                  </DropdownMenuItem>
                )}

                {bugReport.status !== 1 && (
                  <DropdownMenuItem
                    onClick={() => {
                      updateReport.mutate({ reportId: bugReport.id, fixed: 1 });
                    }}
                    className="cursor-pointer"
                  >
                    Mark In Progress
                  </DropdownMenuItem>
                )}

                {bugReport.status !== 2 && (
                  <DropdownMenuItem
                    onClick={() => {
                      updateReport.mutate({ reportId: bugReport.id, fixed: 2 });
                    }}
                    className="cursor-pointer"
                  >
                    Mark Closed
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        );
      },
    },
  ];
  return columns;
};
