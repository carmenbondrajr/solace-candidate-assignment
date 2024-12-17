import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import {advocateData} from "@/db/seed/advocates";

const setup = () => {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set");
    return {
      insert: () => ({
        values: () => ({
          returning: () => {},
        }),
      }),
      select: () => ({
        from: () => ({
          where: () => advocateData,
        }),
      }),
    };
  }

  const queryClient = postgres(process.env.DATABASE_URL);
  const db = drizzle(queryClient);
  return db;
};

export default setup();