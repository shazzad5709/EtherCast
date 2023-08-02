// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

contract VotingContract {

    constructor(uint256 _N, uint256 _g)  {
            N = _N;
            g = _g;
            accumulator = 1; // Initialize accumulator to 1
    }

    struct Voter {
        address voterAddress;
        bool hasVoted;
    }

    uint256 public N;
    uint256 public g;

    // Accumulator state
    uint256 public accumulator;

    // Set to store elements that are members of the set
    mapping(uint256 => bool) public set; // hash of PII + salt

    struct Candidate {
        address candidateAddress;
        uint256 voteCount;
    }

    struct Vote {
        address voterAddress;
        address candidateAddress;
        uint256 timestamp;
    }

    struct Election {
        uint256 electionCode;
        string electionName;
        uint registrationDeadline;
        uint votingStartTime;
        uint votingEndTime;
        address chairman;
        address[] officers;
        Voter[] voters;
        Candidate[] candidates;
        Vote[] votes;
    }

    Election[] public elections;

    

    function createElection(
        uint256 _electionCode,
        string memory _electionName,
        uint256 _registrationDeadline,
        uint256 _votingStartTime,
        uint256 _votingEndTime,
        address[] memory _officers
    ) public {
        Election storage _election = elections.push();

        _election.electionCode = _electionCode;
        _election.electionName = _electionName;
        _election.registrationDeadline = _registrationDeadline;
        _election.votingStartTime = _votingStartTime;
        _election.votingEndTime = _votingEndTime;
        _election.chairman = msg.sender;
        _election.officers = _officers;
    }

    function VerifySignature(
        bytes32 _hashedMessage,
        uint8 _v,
        bytes32 _r,
        bytes32 _s
    ) public pure returns (address) {
        bytes memory prefix = '\x19Ethereum Signed Message:\n32';
        bytes32 prefixedHashMessage = keccak256(abi.encodePacked(prefix, _hashedMessage));
        address signer = ecrecover(prefixedHashMessage, _v, _r, _s);
        return signer;
    }

    function getElection(uint256 _electionCode)
        public
        view
        returns (uint256)
    {
        uint256 _code = _electionCode;
        for (uint256 i = 0; i < elections.length; i++) {
            if (elections[i].electionCode == _code) {
                return i;
            }
        }
        revert("Election not found");
    }

    // Modifiers
    modifier onlyDuringRegistration(uint256 _electionCode) {
        require(
            block.timestamp <
                elections[getElection(_electionCode)].registrationDeadline,
            "Registration closed!"
        );
        _;
    }

    modifier onlyUnregisteredVoter(uint256 _code, address _voter) {
        bool exists;
        Election memory _election = elections[getElection(_code)];
        for (uint256 i = 0; i < _election.voters.length; i++) {
            if (_election.voters[i].voterAddress == _voter) {
                exists = true;
                break;
            }
        }

        require(!exists, "Voter already registered!");
        _;
    }

    modifier onlyRegisteredVoter(uint256 _code, address _voter) {
        bool exists;
        Election memory _election = elections[getElection(_code)];
        for (uint256 i = 0; i < _election.voters.length; i++) {
            if (_election.voters[i].voterAddress == _voter) {
                exists = true;
                break;
            }
        }

        require(exists, "Voter not found!");
        _;
    }

    // modifier onlyRegisteredCandidate(uint256 _code, address _candidate) {
    //     bool exists;
    //     Election memory _election = elections[getElection(_code)];
    //     for (uint256 i = 0; i < _election.candidates.length; i++) {
    //         if (_election.candidates[i].candidateAddress == _candidate) {
    //             exists = true;
    //             break;
    //         }
    //     }

    //     require(exists, "Candidate is not registered!");
    //     _;
    // }

    // modifier onlyUnregisteredCandidate(uint256 _code, address _candidate) {
    //     bool exists;
    //     Election memory _election = elections[getElection(_code)];
    //     for (uint256 i = 0; i < _election.candidates.length; i++) {
    //         if (_election.candidates[i].candidateAddress == _candidate) {
    //             exists = true;
    //             break;
    //         }
    //     }

    //     require(!exists, "Candidate not found!");
    //     _;
    // }

    modifier onlyOfficer(uint256 _electionCode, address _officer) {
        bool exists;
        Election memory _election = elections[getElection(_electionCode)];
        for (uint256 i = 0; i < _election.officers.length; i++) {
            if (_election.officers[i] == _officer) {
                exists = true;
                break;
            }
        }

        require(exists, "Only officers can register voters!");
        _;
    }

    function registerVoter(
        uint256 _electionCode,
        address _voterAddress,
        bytes32 _hashedMessage,
        uint8 _v,
        bytes32 _r,
        bytes32 _s
        )
        public
        onlyDuringRegistration(_electionCode)
        onlyUnregisteredVoter(_electionCode, _voterAddress)
    {
        address addressToVerify = VerifySignature(_hashedMessage, _v, _r, _s);
        require(addressToVerify == _voterAddress, "Address do not match");
        Election storage _election = elections[getElection(_electionCode)];

        Voter storage _voter = _election.voters.push();
        _voter.voterAddress = _voterAddress;
    }

    function registerCandidate(uint256 _electionCode, address _candidateAddress)
        public
        onlyDuringRegistration(_electionCode)
        onlyRegisteredVoter(_electionCode, _candidateAddress)
        onlyOfficer(_electionCode, msg.sender)
    {
        Election storage _election = elections[getElection(_electionCode)];

        Candidate storage _candidate = _election.candidates.push();
        _candidate.candidateAddress = _candidateAddress;
    }

    // modifier onlyDuringVoting(uint256 _electionCode) {
    //     Election memory _election = elections[getElection(_electionCode)];
    //     require(
    //         block.timestamp >= _election.votingStartTime &&
    //             block.timestamp <= _election.votingEndTime,
    //         "Voting is not open"
    //     );
    //     _;
    // }

    // modifier voteOnlyOnce(uint256 _electionCode, address _voterAddress) {
    //     bool voted;
    //     Election memory _election = elections[getElection(_electionCode)];
    //     for (uint256 i = 0; i < _election.voters.length; i++) {
    //         if (_election.voters[i].voterAddress == _voterAddress) {
    //             voted = _election.voters[i].hasVoted;
    //             break;
    //         }
    //     }

    //     require(!voted, "Vote already casted!");
    //     _;
    // }

    modifier onlyAfterVoting(uint256 _electionCode) {
        require(
            block.timestamp >
                elections[getElection(_electionCode)].votingEndTime,
            "Voting is still open!"
        );
        _;
    }

    function voting(
        uint256 _electionCode,
        address _candidate
    ) public {
        Election storage _election = elections[getElection(_electionCode)];
        Voter storage _Voter;
        Candidate storage _Candidate;

        address _voter = msg.sender;

        require(
            block.timestamp >= _election.votingStartTime &&
                block.timestamp <= _election.votingEndTime,
            "Voting is not open!"
        );

        bool voterExists;
        bool candidateExists;
        bool voted;
        uint256 index;

        for (uint256 i = 0; i < _election.voters.length; i++) {
            if (_election.voters[i].voterAddress == _voter) {
                index = i;
                voted = _election.voters[i].hasVoted;
                voterExists = true;
                break;
            }
        }

        require(voterExists, "Voter is not registered!");
        require(!voted, "Vote already casted!");
        _Voter = _election.voters[index];

        for (uint256 i = 0; i < _election.candidates.length; i++) {
            if (_election.candidates[i].candidateAddress == _candidate) {
                index = i;
                candidateExists = true;
                break;
            }
        }

        require(candidateExists, "Candidate is not registered!");
        _Candidate = _election.candidates[index];

        Vote storage _vote = _election.votes.push();
        _vote.voterAddress = _voter;
        _vote.candidateAddress = _candidate;
        _vote.timestamp = block.timestamp;

        _Voter.hasVoted = true;
        _Candidate.voteCount++;
    }

    function getResults(uint256 _electionCode)
        public
        view
        onlyAfterVoting(_electionCode)
        returns (address[] memory, uint256[] memory)
    {
        Election storage _election = elections[getElection(_electionCode)];
        uint256 numOfCandidates = _election.candidates.length;
        uint256[] memory voteCounts = new uint256[](numOfCandidates);
        for (uint256 i = 0; i < numOfCandidates; i++) {
            voteCounts[i] = _election.candidates[i].voteCount;
        }

        Candidate[] memory candidateList = _election.candidates;
        address[] memory sortedCandidates = sortCandidates(
            candidateList,
            voteCounts
        );
        return (sortedCandidates, voteCounts);
    }

    function sortCandidates(
        Candidate[] memory _candidateList,
        uint256[] memory _voteCounts
    ) internal pure returns (address[] memory) {
        address[] memory sortedCandidates = new address[](
            _candidateList.length
        );
        for (uint256 i = 0; i < _candidateList.length; i++) {
            sortedCandidates[i] = _candidateList[i].candidateAddress;
        }
        for (uint256 i = 0; i < _candidateList.length; i++) {
            for (uint256 j = i + 1; j < _candidateList.length; j++) {
                if (_voteCounts[i] < _voteCounts[j]) {
                    address tempAddress = sortedCandidates[i];
                    sortedCandidates[i] = sortedCandidates[j];
                    sortedCandidates[j] = tempAddress;
                    uint256 tempVoteCount = _voteCounts[i];
                    _voteCounts[i] = _voteCounts[j];
                    _voteCounts[j] = tempVoteCount;
                }
            }
        }
        return sortedCandidates;
    }

    function addToSet(uint256 element) public {
        require(!set[element], "Element is already in the set");
        set[element] = true;
        accumulator = (accumulator * g**element) % N;
    }

    // Function to generate a set membership proof
    function generateProof(uint256 element) public view returns (uint256, uint256) { // Todo: reaquire to call only by who called teh addToSet function
        require(set[element], "Element is not in the set");

        // Generate a random value for the witness (private key)
        uint256 witness = uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty))) % N;

        // Calculate the proof components
        uint256 proofAccumulator = (accumulator * g**witness) % N;

        return (proofAccumulator, witness);
    }

    // Function to verify the set membership proof
    function verifyProof(uint256 proofAccumulator, uint256 witness) public view returns (bool) {
        // Check if the proofAccumulator matches the expected value
        if (proofAccumulator != (accumulator * g**witness) % N) {
            return false;
        }

        // Proof is valid
        return true;
    }
}