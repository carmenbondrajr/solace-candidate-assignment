"use client";

import {ChangeEvent, useEffect, useState} from "react";
import {Advocate} from "@/app/types";
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/table";
import {Input} from "@nextui-org/input";
import {Button} from "@nextui-org/button";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getAdvocates = (searchTerm: string) => {
      setLoading(true);
      fetch(`/api/advocates?query=${encodeURIComponent(searchTerm)}`).then((response) => {
        if (response.status === 200) {
          response.json().then((jsonResponse) => {
            setAdvocates(jsonResponse.data);
          });
        } else {
          console.log({response})
        }
      });
  };

  useEffect(() => {
    console.log("fetching advocates...");
    getAdvocates('');
  });

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();

    console.log(searchTerm);
    console.log("filtering advocates...");
    getAdvocates(searchTerm);
  };

  const resetSearch = () => {
    setAdvocates([]);
  };


  const renderAdvocates = () => {
    return advocates.map((advocate: Advocate) =>
      <TableRow aria-label="advocate-search-table" key={advocate.phoneNumber}>
        <TableCell>{advocate.firstName}</TableCell>
        <TableCell>{advocate.lastName}</TableCell>
        <TableCell>{advocate.city}</TableCell>
        <TableCell>{advocate.degree}</TableCell>
        <TableCell>
          {advocate.specialties.map((s) => (
            <div key={s}>{s}</div>
          ))}
        </TableCell>
        <TableCell>{advocate.yearsOfExperience}</TableCell>
        <TableCell>{advocate.phoneNumber}</TableCell>
      </TableRow>
    );
  };

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <h3>Search</h3>
        <p>
          Searching for: <span id="search-term"></span>
        </p>
        <Input onChange={(e) => handleSearch(e)} />
        <Button onPress={resetSearch}>Reset Search</Button>
      </div>
      <br />
      <br />
      <Table>
        <TableHeader>
          <TableColumn>First Name</TableColumn>
          <TableColumn>Last Name</TableColumn>
          <TableColumn>City</TableColumn>
          <TableColumn>Degree</TableColumn>
          <TableColumn>Specialties</TableColumn>
          <TableColumn>Years of Experience</TableColumn>
          <TableColumn>Phone Number</TableColumn>
        </TableHeader>
        <TableBody>
          {renderAdvocates()}
        </TableBody>
      </Table>
    </main>
  );
}
