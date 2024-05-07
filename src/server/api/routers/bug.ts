import { string, z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import fs from "fs";

export type BugReport = {
  id: number;
  name: string;
  description: string;
  category: string;
  status: 0 | 1 | 2;
};

export const bugRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        category: z.string(),
        fixed: z.number().min(0).max(2),
      }),
    )
    .mutation(async ({ input }) => {
      //Read the JSON file into an object, and create an empty array if the file does not exist
      let data: BugReport[] = [];
      if (fs.existsSync("data.json")) {
        data = JSON.parse(fs.readFileSync("data.json").toString());
      }

      //Grab the highest ID from the existing bug reports, set to 0 if there are none
      const newId = data.length > 0 ? data[data.length - 1]!.id + 1 : 0;

      //Create a new bug report object
      let newReport: BugReport = {
        id: newId,
        name: input.name,
        description: input.description,
        category: input.category,
        status: input.fixed ? 2 : 0,
      };

      //Add the new bug report to the array
      data.push(newReport);

      //Write the array back to the JSON file, creating it if it does not exist
      fs.writeFileSync("data.json", JSON.stringify(data));
    }),

  update: publicProcedure
    .input(
      z.object({
        reportId: z.number(),
        name: z.string().optional(),
        description: z.string().optional(),
        category: z.string().optional(),
        fixed: z.number().min(0).max(2).optional(),
      }),
    )
    .mutation(({ input }) => {
      //Read in the JSON file
      const data: BugReport[] = JSON.parse(
        fs.readFileSync("data.json").toString(),
      );
      //Grab the bug report with the ID and return a 400 if it isn't found
      let report = data.find((r: BugReport) => r.id === input.reportId);
      if (!report) {
        return { error: "Report not found" };
      }

      //Update the fields if they are provided
      if (input.name) {
        report.name = input.name;
      }
      if (input.description) {
        report.description = input.description;
      }
      if (input.category) {
        report.category = input.category;
      }
      if (input.fixed !== undefined) {
        report.status = input.fixed as 0 | 1 | 2;
      }

      //Write the updated array back to the JSON file
      fs.writeFileSync("data.json", JSON.stringify(data));
    }),

  get: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => {
      //Read in the JSON file
      let data = JSON.parse(fs.readFileSync("data.json").toString());
      //Grab the bug report with the ID and return a 400 if it isn't found
      let report = data.find((r: BugReport) => r.id === input.id);
      if (!report) {
        return { error: "Report not found" };
      }
      return report;
    }),
  getAll: publicProcedure.query(() => {
    //Read in the JSON file
    const data: BugReport[] = JSON.parse(
      fs.readFileSync("data.json").toString(),
    );
    return data;
  }),
});
