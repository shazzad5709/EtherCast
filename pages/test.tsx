import  {useState, useEffect } from "react";
import Image from "next/image";
import { getServerSession } from "next-auth";
import axios from "axios";
import { resolvePtr } from "dns";
import CandidateTable from "../components/Table/CandidateTable";
import VoterTable from "../components/Table/OfficerTable";
import ChairmanTable from "../components/Table/ChairmanTable";


type Props = {};

export default function Test({}: Props) {
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");
  const [regDeadline, setRegDeadline] = useState(new Date());
  const [voteStart, setVoteStart] = useState(new Date());
  const [voteEnd, setVoteEnd] = useState(new Date());
  const [officers, setOfficers] = useState("");
  const [chairman, setChairman] = useState("");
  const [electionCode, setElectionCode] = useState("");
  const [org_name, setOrgName] =useState("");
  const [showCandidateTable, setShowCandidateTable] = useState(true);

  const handleCandidate = async () => {
    return(
      <> <CandidateTable /> </>
    )
  }
  useEffect(() => {
    const getElection = async () => {
      const res = await axios.get("/api/getElection");
      // console.log(res.data._election)
      setCode(res.data._election.electionCode);
      setTitle(res.data._election.electionName);
      setRegDeadline(new Date(parseInt(res.data._election.regDeadlineDate)));
      setVoteStart(new Date(parseInt(res.data._election.voteStartDate)));
      setVoteEnd(new Date(parseInt(res.data._election.voteEndDate)));
      // setOfficers(res.data.officers)
      setChairman(res.data._election.chairman);
      const response = await axios.get("/api/data/Chairman/chairman");
      console.log("sdgsdfsd");
      console.log(response.data);
      // console.log(response.data.name)
      // setElectionCode(response.data.electionId)

      // setChairman(res.data.name)
      // setOrgName(response.data.org_name)
    };
    getElection();
  }, []);

  return (
    <>
      <div className="flex flex-col bg-gray-50 h-screen items-center justify-center">
        {/* <div className="flex flex-col bg-gray-100 justify-center h-screen"> */}
        <div
          className="relative flex flex-col md:flex-row md:space-x-10 space-y-3 
    md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border
     border-gray-200 bg-white"
          style={{ width: "4000px", height: "320px" }}
        >
          <div className="w-full md:w-1/3 bg-white grid place-items-center">
            <Image
              src="/ec-black-high.png"
              alt="heart"
              width={300}
              height={300}
            />{" "}
          </div>
          <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
            <div className="flex justify-between item-center">
              <div className="bg-[#a7daa7] px-3 py-1 rounded-full text-sm font-medium text-gray-800 hidden md:block">
                <button className="text-gray-500 font-medium hidden md:block">
                  {" "}
                  Officer List{" "}
                </button>
              </div>
              {/* <p className="text-gray-500 font-medium hidden md:block">Vacations</p> */}
              <div className="bg-[#a7daa7] px-3 py-1 rounded-full text-sm font-medium text-gray-800 hidden md:block">
                <button onClick={handleCandidate} className="text-gray-500 font-medium hidden md:block">
                  {" "}
                  Candidate List{" "}
                </button>
              </div>

              <div className="bg-[#a7daa7] px-3 py-1 rounded-full text-sm font-medium text-gray-800 hidden md:block">
                <button className="text-gray-500 font-medium hidden md:block">
                  Voter List{" "}
                </button>
              </div>
            </div>
            <br />
            <p className="px-1 py-1 block mb-2 bold text-md font-medium ">
              <b>Organization Name:</b>     {org_name}
            </p>
            <p className="px-1 py-1 block mb-2 text-md font-medium ">
              
              <b>Title of the Election:</b> {title}
            </p>
            <p className="px-1 py-1 block mb-2 text-md font-medium ">
              <b>Registration Deadline:</b> {regDeadline.toLocaleString()}
            </p>
            <p className="px-1 py-1 block mb-2 text-md font-medium ">
              <b>Voting Start Time: </b>    {voteStart.toLocaleString()}
            </p>
            <p className="px-1 py-1 block mb-2 text-md font-medium ">
              <b>Voting End Time:</b>{voteEnd.toLocaleString()}
            </p>
            {/* <p>Officers: {code}</p> */}
            {/* <p>Chairman: {chairman}</p> */}
          </div>
        </div>
        {/* </div> */}
      </div>
    </>
  );
}
