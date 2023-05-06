// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/access/Ownable.sol";

contract MatchCreator is Ownable {
    // Match Struct that is created when the match is added
    // winner is according to the team number 1 & 2
    struct Match {
        string team1;
        string team2;
        uint256 win;
    }
    /// mapping from match id --> struct Match
    mapping(uint256 => Match) public matches;

    /// just pushing all the records so that it can be returned later
    Match[] public matchesrecord;
    uint256 TotalMatches = 0;

    /// this creates the match and add it to the mapping we can change the win status later according to the results
    function createMatch(string memory _t1, string memory _t2)
        public
        onlyOwner
    {
        matches[TotalMatches] = Match(_t1, _t2, 0);
        matchesrecord.push(Match(_t1, _t2, 0));
        TotalMatches += 1;
    }

    // to get the match details we want
    function getMatch(uint256 _id) public view returns (Match memory) {
        return matches[_id];
    }

    function getRecord() public view returns (Match[] memory) {
        return matchesrecord;
    }

    /// to declare the result
    function changeResult(uint256 _id, uint256 _teamId) public onlyOwner {
        Match memory _match = matches[_id];
        _match.win = _teamId;
    }

    function getResult(uint256 _id) public view returns (uint256) {
        return matches[_id].win;
    }

    // function checkMatch(uint256 _id) public view returns(bool) {
    //     return (matches[_id].win != 0) ;
    // }
}
