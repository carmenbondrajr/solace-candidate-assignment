import {advocates} from "@/db/schema";
import db from "@/db";
import {eq, ilike, or, sql} from "drizzle-orm";
import {advocateData} from "@/db/seed/advocates";
import {Advocate} from "@/app/types";
import {NextResponse} from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get('query') || '';

  let searchResults: Advocate[];
debugger;
  if (!process.env.DATABASE_URL) {
    searchResults = filterMockAdvocates(query);
  } else {

    const conditions = [
      ilike(advocates.firstName, `%${query}%`),
      ilike(advocates.lastName, `%${query}%`),
      ilike(advocates.city, `%${query}%`),
      eq(advocates.degree, query),
      sql`${advocates.specialties}::TEXT ILIKE ${`%${query}%`}`, // Cast JSONB to text for fuzzy match
      // eq(advocates.phoneNumber, query), // TODO Uncomment once phone number migrated to string
    ];

    if (parseInt(query)) {
      conditions.push(eq(advocates.yearsOfExperience, parseInt(query as string)));
    }

    const searchCondition = or(...conditions);

    searchResults = await (db.select().from(advocates).where(searchCondition)) as Advocate[];
  }

  return NextResponse.json(searchResults);
}

const filterMockAdvocates = (query: string) => {
  return advocateData.filter((advocate: Advocate) =>
    advocate.firstName.includes(query) ||
    advocate.lastName.includes(query) ||
    advocate.city.includes(query) ||
    advocate.degree === query ||
    advocate.specialties.includes(query) ||
    advocate.yearsOfExperience === parseInt(query)
  )
};