// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

contract voting_smart_contract {
    struct Vote {
        address voter_address;
        address candidate_address;
        uint256 timestamp;
    }

    struct Election {
        string election_name;
        uint256 registration_deadline;
        uint256 voting_start_time;
        uint256 voting_end_time;
        mapping(address => bool) voter_addresses;
        mapping(address => bool) candidate_addresses;
    }

    mapping(uint256 => mapping(address => uint256)) public vote_count;
    uint256 public election_count;

    Election[] public elections;

    function createElection(
        string memory _election_name,
        uint256 _registration_deadline,
        uint256 _voting_start_time,
        uint256 _voting_end_time,
        address[] memory _voter_addresses,
        address[] memory _candidate_addresses
    ) public {
        Election storage election = elections[election_count];
        election.election_name = _election_name;
        election.registration_deadline = _registration_deadline;
        election.voting_start_time = _voting_start_time;
        election.voting_end_time = _voting_end_time;
        for (uint256 i = 0; i < _voter_addresses.length; i++) {
            election.voter_addresses[_voter_addresses[i]] = true;
        }
        for (uint256 i = 0; i < _candidate_addresses.length; i++) {
            election.candidate_addresses[_candidate_addresses[i]] = true;
        }
        election_count++;
    }

    function vote(
        uint256 _election_index,
        address _candidate_address,
        uint256 _timestamp
    ) public {
        Election storage election = elections[_election_index];
        require(
            block.timestamp < election.voting_end_time,
            "Voting period has ended"
        );
        require(
            block.timestamp > election.voting_start_time,
            "Voting period has not started"
        );
        require(
            election.voter_addresses[msg.sender],
            "You are not registered to vote in this election"
        );
        require(
            !hasVoted(election, msg.sender),
            "You have already cast your vote in this election"
        );
        vote_count[_election_index][_candidate_address]++;
    }

//     function getResult(uint256 _election_index) public view returns (address[] memory, uint256[] memory) {
//     Election storage election = elections[_election_index];
//     require(
//         block.timestamp > election.voting_end_time,
//         "Voting period has not ended"
//     );
//     address[] memory candidates = new address[](election.num_candidates);
//     uint256[] memory voteCounts = new uint256[](election.num_candidates);
//     for (uint256 i = 0; i < election.num_candidates; i++) {
//         candidates[i] = election.candidate_addresses[i];
//         voteCounts[i] = vote_count[_election_index][election.candidate_addresses[i]];
//     }
//     return (candidates, voteCounts);
// }

    function getWinner(uint256 _election_index) public view returns (address[] memory) {
    Election storage election = elections[_election_index];
    require(
        block.timestamp > election.voting_end_time,
        "Voting period has not ended"
    );
    address[] memory candidateAddresses = new address[](election.num_candidates);
    uint256 count = 0;
    for (uint256 i = 0; i < election.num_candidates; i++) {
        if (count == 0 || vote_count[_election_index][election.candidate_addresses[i]] > vote_count[_election_index][candidateAddresses[0]]) {
            candidateAddresses[0] = election.candidate_addresses[i];
            count = 1;
        } else if (vote_count[_election_index][election.candidate_addresses[i]] == vote_count[_election_index][candidateAddresses[0]]) {
            candidateAddresses[count] = election.candidate_addresses[i];
            count++;
        }
    }
    address[] memory winners = new address[](count);
    for (uint256 i = 0; i < count; i++) {
        winners[i] = candidateAddresses[i];
    }
    return winners;
}

    function sortDescending(
        uint256[] memory arr,
        address[] memory candidates
    ) private pure {
        uint256 n = arr.length;
        for (uint256 i = 0; i < n; i++) {
            for (uint256 j = i + 1; j < n; j++) {
                if (arr[i] < arr[j]) {
                    uint256 temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                    address tempAddr = candidates[i];
                    candidates[i] = candidates[j];
                    candidates[j] = tempAddr;
                }
            }
        }
    }

    function isRegisteredVoter(
        Election storage _election,
        address _voter_address
    ) private view returns (bool) {
        for (uint256 i = 0; i < _election.voter_addresses.length; i++) {
            if (_election.voter_addresses[i] == _voter_address) {
                return true;
            }
        }
        return false;
    }

    function hasVoted(
        Election storage _election,
        address _voter_address
    ) private view returns (bool) {
        for (uint256 i = 0; i < _election.votes.length; i++) {
            if (_election.votes[i].voter_address == _voter_address) {
                return true;
            }
        }
        return false;
    }

    function getCandidates(
        uint256 _election_index
    ) public view returns (address[] memory) {
        Election storage election = elections[_election_index];
        return election.candidate_addresses;
    }
}










