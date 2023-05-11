// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract VotingContract {
    // Structs
    struct Voter {
        bool hasVoted;
        uint256 index;
    }

    struct Candidate {
        uint256 voteCount;
        uint256 index;
    }

    struct Vote {
        address voterAddress;
        address candidateAddress;
        uint256 timestamp;
    }

    // Variables
    string public electionName;
    uint256 public registrationDeadline;
    uint256 public votingStartTime;
    uint256 public votingEndTime;
    uint256 public numVoters;
    uint256 public numCandidates;
    mapping(address => Voter) public voters;
    mapping(address => Candidate) public candidates;
    Vote[] public votes;
    address[] public candidateList;

    // Constructor
    constructor(
        string memory _electionName,
        uint256 _registrationDeadline,
        uint256 _votingStartTime,
        uint256 _votingEndTime,
        address[] memory _candidateList
    ) {
        electionName = _electionName;
        registrationDeadline = _registrationDeadline;
        votingStartTime = _votingStartTime;
        votingEndTime = _votingEndTime;
        numCandidates = _candidateList.length;
        for (uint256 i = 0; i < numCandidates; i++) {
            candidates[_candidateList[i]].index = i;
            candidateList.push(_candidateList[i]);
        }
    }

    // Modifiers
    modifier onlyDuringRegistration() {
        require(
            block.timestamp < registrationDeadline,
            "Voting already started"
        );
        _;
    }

    modifier onlyDuringVoting() {
        require(
            block.timestamp >= votingStartTime &&
                block.timestamp <= votingEndTime,
            "Voting is not open"
        );
        _;
    }

    modifier onlyAfterVoting() {
        require(block.timestamp > votingEndTime, "Voting is still open");
        _;
    }

    modifier onlyOnce(address _voterAddress) {
        require(!voters[_voterAddress].hasVoted, "Voter has already voted");
        _;
    }

    // Functions
    function registerVoter(
        address _voterAddress
    ) public onlyDuringRegistration {
        voters[_voterAddress].hasVoted = false;
        voters[_voterAddress].index = numVoters;
        numVoters++;
    }

    function vote(
        address _voterAddress,
        address _candidateAddress
    ) public onlyDuringVoting onlyOnce(_voterAddress) {
        Voter storage voter = voters[_voterAddress];
        Candidate storage candidate = candidates[_candidateAddress];
        require(voter.index < numVoters, "Voter is not registered");
        require(candidate.index < numCandidates, "Candidate is not registered");
        voter.hasVoted = true;
        votes.push(Vote(_voterAddress, _candidateAddress, block.timestamp));
        candidate.voteCount++;
    }

    function getResults()
        public
        view
        onlyAfterVoting
        returns (address[] memory, uint256[] memory)
    {
        uint256 numResults = candidateList.length;
        uint256[] memory voteCounts = new uint256[](numResults);
        for (uint256 i = 0; i < numResults; i++) {
            voteCounts[i] = candidates[candidateList[i]].voteCount;
        }
        address[] memory sortedCandidates = sortCandidates(
            candidateList,
            voteCounts
        );
        return (sortedCandidates, voteCounts);
    }

    function sortCandidates(
        address[] memory _candidateList,
        uint256[] memory _voteCounts
    ) internal pure returns (address[] memory) {
        address[] memory sortedCandidates = new address[](_candidateList.length);
        for (uint256 i = 0; i < _candidateList.length; i++) {
            sortedCandidates[i] = _candidateList[i];
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
}
