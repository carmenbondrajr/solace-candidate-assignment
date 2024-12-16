"use client";

import {useEffect, useRef, useState} from "react";
import {Advocate} from "@/app/types";
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/table";
import {Input} from "@nextui-org/input";
import {Button} from "@nextui-org/button";
import {useDebounceValue} from "usehooks-ts";
import {Spinner} from "@nextui-org/spinner";

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [queryParam, setQueryParam] = useDebounceValue<string>('', 500);
  const [loading, setLoading] = useState<boolean>(false);

  const getAdvocates = () => {
    console.log(queryParam ? `Fetching advocates: ${queryParam}` : "Fetching all advocates");
    setLoading(true);
    fetch(`/api/advocates?query=${encodeURIComponent(queryParam)}`).then((response) => {
      response.json().then((data) => {
        setAdvocates(data);
        // Fake loading time for demo purposes
        setTimeout(() => {setLoading(false);}, 500);
      });
    });
  };

  useEffect(() => {
    getAdvocates();
  }, [queryParam]);

  const handleReset = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }

    setQueryParam('');
  };


  const renderAdvocates = () => {
    return advocates.map((advocate: Advocate) =>
      <TableRow aria-label={`advocate-search-row-${advocate.phoneNumber}}`} key={advocate.phoneNumber}>
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
    <main style={{margin: "24px"}}>
      <h1>Solace Advocates</h1>
      <br/>
      <br/>
      <div className="flex items-center space-x-4">
        <h3><strong>Search</strong></h3>
        <Input ref={inputRef} onChange={e => setQueryParam(e.target.value)} />
        <Button onPress={handleReset}>Reset Search</Button>
      </div>
      <br/>
      {queryParam && (
        <p>
          Searching for: <span id="search-term">{queryParam}</span>
        </p>
      )}
      <br/>
      <Table aria-label="advocate-search-table">
        <TableHeader>
          <TableColumn>First Name</TableColumn>
          <TableColumn>Last Name</TableColumn>
          <TableColumn>City</TableColumn>
          <TableColumn>Degree</TableColumn>
          <TableColumn>Specialties</TableColumn>
          <TableColumn>Years of Experience</TableColumn>
          <TableColumn>Phone Number</TableColumn>
        </TableHeader>
        <TableBody
          isLoading={loading}
          loadingContent={<Spinner label="Loading..." />}
        >
          {renderAdvocates()}
        </TableBody>
      </Table>
    </main>
  );
}
