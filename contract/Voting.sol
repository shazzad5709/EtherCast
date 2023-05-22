// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19 .0;

contract VotingContract {
    struct Voter {
        address voterAddress;
        bool hasVoted;
    }

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
        uint256 registrationDeadline;
        uint256 votingStartTime;
        uint256 votingEndTime;
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

    function getElection(uint256 _electionCode)
        internal
        view
        returns (uint256)
    {
        for (uint256 i = 0; i < elections.length; i++) {
            if (elections[i].electionCode == _electionCode) {
                return i;
            }
        }
        revert("Election not found");
    }

    function searchElection(uint256 _electionCode)
        public
        view
        returns (Election memory _election)
    {
        _election = elections[getElection(_electionCode)];
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

        require(exists, "Voter is not registered!");
        _;
    }

    modifier onlyRegisteredCandidate(uint256 _code, address _candidate) {
        bool exists;
        Election memory _election = elections[getElection(_code)];
        for (uint256 i = 0; i < _election.candidates.length; i++) {
            if (_election.candidates[i].candidateAddress == _candidate) {
                exists = true;
                break;
            }
        }

        require(exists, "Voter is not registered!");
        _;
    }

    modifier onlyUnregisteredCandidate(uint256 _code, address _candidate) {
        bool exists;
        Election memory _election = elections[getElection(_code)];
        for (uint256 i = 0; i < _election.candidates.length; i++) {
            if (_election.candidates[i].candidateAddress == _candidate) {
                exists = true;
                break;
            }
        }

        require(!exists, "Candidate already registered!");
        _;
    }

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

    function registerVoter(uint256 _electionCode, address _voterAddress)
        public
        onlyDuringRegistration(_electionCode)
        onlyUnregisteredVoter(_electionCode, _voterAddress)
    {
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

    modifier onlyDuringVoting(uint256 _electionCode) {
        Election memory _election = elections[getElection(_electionCode)];
        require(
            block.timestamp >= _election.votingStartTime &&
                block.timestamp <= _election.votingEndTime,
            "Voting is not open"
        );
        _;
    }

    modifier voteOnlyOnce(uint256 _electionCode, address _voterAddress) {
        bool voted;
        Election memory _election = elections[getElection(_electionCode)];
        for (uint256 i = 0; i < _election.voters.length; i++) {
            if (_election.voters[i].voterAddress == _voterAddress) {
                voted = _election.voters[i].hasVoted;
                break;
            }
        }

        require(!voted, "Only officers can register voters!");
        _;
    }

    modifier onlyAfterVoting(uint256 _electionCode) {
        require(
            block.timestamp >
                elections[getElection(_electionCode)].votingEndTime,
            "Voting is still open"
        );
        _;
    }

    function voting(
        uint256 _electionCode,
        address _voter,
        address _candidate
    ) public {
        Election storage _election = elections[getElection(_electionCode)];
        Voter storage _Voter;
        Candidate storage _Candidate;

        require(
            block.timestamp >= _election.votingStartTime &&
                block.timestamp <= _election.votingEndTime,
            "Voting is not open"
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
        require(!voted, "Only officers can register voters!");
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
}