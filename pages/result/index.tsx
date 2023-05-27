import axios from "axios";
import { Router, useRouter } from "next/router";
import React, { FormEvent, useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";

type Props = {};
//id, title, org_name,

interface Election {
  id: string;
  org_name: string;
  title: string;
}

export default function Result({}: Props) {
  const [elections, setElections] = useState<Election[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedElection, setSelectedElection] = useState<Election | null>(
    null
  );
  const [selected, setSelected] = useState("");
  const router = useRouter();
  const handleOptionClick = (option: string) => {
    setSelected(option);
  };

  const handleResult = async (e: FormEvent) => {
    e.preventDefault();
    const election = elections.find((item) => item.id === selected);
    // setSelectedElection(election);
    // console.log(election);
    
    router.push(`/result/${election?.id}`);
  }

  const fetchElections = async () => {
    const res = await axios
      .get("/api/data/elections/elections")
      .then((res) => {
        console.log(res.data);
        setElections(res.data);
        console.log(elections);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchElections();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-2xl">
        <InfinitySpin width="200" color="#4fa94d" />
      </div>
    );
  }

  return (
    // <div className='flex h-screen items-center justify-center'>
    //   {elections.map((election) => (
    //     <div key={election.id} className='scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-white overflow-y-scroll'>
    //       <h1>{election.title}</h1>
    //       <h2>{election.org_name}</h2>
    //     </div>
    //   ))}
    // className={`bg-white w-full border-2 border-gray-300 flex space-x-10
    //           items-center shadow-md space-y-2 rounded-lg mb-4
    //           p-4 cursor-pointer hover:bg-green-light hover:border-green-light
    //           ${selected === `${option.email}` ? "border-green-dark bg-green-light hover:border-green-dark" : ""
    //             }`}
    // </div>
    <>
      <div className="flex flex-col w-screen px-4 md:px-8 py-8 items-center lg:justify-center min-h-screen">
        <h1 className="text-2xl w-full lg:w-fit font-bold mb-4">
          Choose Election
        </h1>
        <form className="flex flex-col w-full items-center" onSubmit={handleResult}>
          {/* <div className="flex flex-col w-full items-center"> */}
          <div className="lg:grid lg:grid-cols-2 xl:grid-cols-3 w-full gap-10 lg:px-10 xl:px-20">
            {elections.map((election) => (
              <div
                key={election.id}
                className={`bg-white w-full border-2 border-gray-300 flex space-x-10 items-center shadow-md space-y-2 
            rounded-lg mb-4 p-4 cursor-pointer hover:bg-green-light hover:border-green-light 
            ${
              selected === `${election.id}`
                ? "border-green-dark bg-green-light hover:border-green-dark"
                : ""
            }`}
                onClick={() => handleOptionClick(election.id)}
              >
                <div className="space-y-2">
                  <h2 className="text-xl font-bold">{election.title}</h2>
                  <p className="text-gray-800 text-lg">{election.org_name}</p>
                </div>
                </div>
                ))}
                
              </div>

              <button
          type="submit"
          className={`bg-green text-white w-full hover:bg-green-dark md:w-fit md:px-16 py-2 px-4 rounded-lg ${selected ? "" : "opacity-50  cursor-not-allowed"
            }`}
          disabled={!selected}
        >
          Submit
        </button>
            
          {/* </div> */}
          {/* </div> */}
        </form>
      </div>
    </>
  );
}
