import Head from "next/head";
import Link from "next/link";

import { api } from "@/utils/api";
import { DataTable } from "@/components/datatable/data-table";
import { bugReportColumns } from "@/components/datatable/columns/bugs";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { data: bugs, refetch } = api.bug.getAll.useQuery();

  return (
    <>
      <Head>
        <title>BugTracker</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col bg-gradient-to-b  from-[#2e026d] to-[#15162c] text-white">
        <div className="w-full p-3 text-center text-2xl text-white">
          Bug Tracker
        </div>

        <div className="flex w-full w-full flex-col items-center justify-center">
          <div className="w-11/12">
            {bugs && (
              <DataTable columns={bugReportColumns(refetch)} data={bugs} />
            )}
          </div>
        </div>

        <div className="flex w-full flex-col items-center justify-center">
          <Link href="/create">
            <Button className="mt-4">Create Bug Report</Button>
          </Link>
        </div>
      </main>
    </>
  );
}
