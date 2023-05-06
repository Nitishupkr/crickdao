// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/access/Ownable.sol";

// import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

interface IMatchCreator {
    function getResult(uint256 _id) external view returns (uint256);

    // function getMatch(uint256 _id) external view returns (bool);
}

/// This contract will include the fetch score of matches from chainlink oracle , but as it is not yet present , we are leaving this.
/// That will be a betting kind of game , where before the games , the people will participate and then
///  after the results fetching ,the winner will be rewarded .

/// Users can bet on ongoing matches
/// accepts eth deposit
/// Results are declared when we update the win status
contract CricGame is Ownable {
    struct Bid {
        address team1;
        address team2;
        bool inProcess;
        uint256 startedAt;
        uint256 endedAt;
    }

    uint256 public bidPrice = 0.05 ether;

    IMatchCreator matches;
    /// mapping from matchId --> bids by users
    mapping(uint256 => Bid) public bids;

    constructor(address _match) {
        matches = IMatchCreator(_match);
    }

    /// check modifier if the Biding is started or not
    modifier biddingStarted(uint256 _matchId) {
        require(
            bids[_matchId].inProcess == true,
            "The Bidding is not yet Started"
        );
        _;
    }

    function startBidding(uint256 _matchId) public onlyOwner {
        // require(matches.getMatch(_matchId) != 0, "The matchId is not valid");
        bids[_matchId] = Bid(address(0), address(0), true, block.timestamp, 0);
    }

    function bid(uint256 _matchId, uint256 _teamId)
        public
        payable
        biddingStarted(_matchId)
    {
        require(msg.value == bidPrice, "Incorrect Entry Fees");
        require(_matchId == 1 || _matchId == 2, "Team Selected is not valid");
        if (_teamId == 1) {
            bids[_matchId].team1 = msg.sender;
            // _bid.team1.push(msg.sender)
        } else if (_teamId == 2) {
            bids[_matchId].team2 = msg.sender;
            // _bid.team1.push(msg.sender)
        }
    }

    /// ends the game , first checks the result
    /// then fetches the winning team and allocate the prizes directly to the winner
    function endGame(uint256 _matchId) public onlyOwner returns (bool) {
        uint256 winTeam = matches.getResult(_matchId);
        require(winTeam != 0, "Match not yet ended");
        bool success;
        /// shutting down the bidding
        Bid memory _bid = bids[_matchId];
        _bid.inProcess == false;
        _bid.endedAt == block.timestamp;

        ///checking the winning team and rewarding the user
        if (winTeam == 1) {
            address user = _bid.team1;
            (success, ) = user.call{value: 0.1 ether}("");
            return success;
        } else if (winTeam == 2) {
            address user = _bid.team2;
            (success, ) = user.call{value: 0.1 ether}("");
        }

        return success;
    }
}
