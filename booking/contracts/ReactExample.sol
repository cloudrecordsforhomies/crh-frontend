pragma solidity ^0.4.17;

contract ReactExample {
    address private owner;
    string public you_awesome;
    string private secret;

    string private host;
    string private renter;
    uint8 private booking_id;
    uint private startTime; // unix time
    uint private endTime;
    uint private squareFootage;
    string private location;


    constructor() public {
        owner = msg.sender;
        you_awesome = "You are awesome";
        secret = "secret data";
        location = "asdfasdfw";
    }

    function getSecret() public view returns (string) {
        return "THIS IS THE DATA";
    }

    function returnsSecret() public view returns (string) {
        return secret;
    }

    function kill() public {
        require(msg.sender == owner);
        selfdestruct(owner);
    }

    function() public payable {
        revert();
    }


    function setState(string newLocation) payable public {
        // require( newStartTime < newEndTime );

        location = newLocation;
        // startTime = newStartTime;
        // endTime = newEndTime;
        // squareFootage = newSF;
    }

    function getState() public returns (string) {
        return location;
    }


}
