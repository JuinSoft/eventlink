// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./EventNFT.sol";

contract Event {
    struct EventDetail {
        uint256 id;
        string name;
        string description;
        string location;
        uint256 date;
        uint256 capacity;
        address creator;
        bool isPrivate;
        uint256 nftPrice;
    }

    struct RSVP {
        address attendee;
        bool isAttending;
    }

    EventDetail[] public events;
    mapping(uint256 => RSVP[]) public rsvps;
    uint256 public nextEventId;
    EventNFT public eventNFT;

    constructor(address _eventNFTAddress) {
        eventNFT = EventNFT(_eventNFTAddress);
    }

    function createEvent(
        string memory _name,
        string memory _description,
        string memory _location,
        uint256 _date,
        uint256 _capacity,
        bool _isPrivate,
        uint256 _nftPrice
    ) public {
        events.push(
            EventDetail({
                id: nextEventId,
                name: _name,
                description: _description,
                location: _location,
                date: _date,
                capacity: _capacity,
                creator: msg.sender,
                isPrivate: _isPrivate,
                nftPrice: _nftPrice
            })
        );
        nextEventId++;
    }

    function getEvents() public view returns (EventDetail[] memory) {
        return events;
    }

    function getEvent(
        uint256 _eventId
    ) public view returns (EventDetail memory) {
        return events[_eventId];
    }

    function rsvpEvent(uint256 _eventId) public {
        RSVP[] storage eventRsvps = rsvps[_eventId];
        for (uint256 i = 0; i < eventRsvps.length; i++) {
            require(
                eventRsvps[i].attendee != msg.sender,
                "You have already RSVPed."
            );
        }
        require(
            events[_eventId].capacity > eventRsvps.length,
            "Event is full."
        );
        eventRsvps.push(RSVP({attendee: msg.sender, isAttending: true}));
    }

    function buyEventNFT(
        uint256 _eventId,
        string memory tokenURI
    ) public payable {
        require(
            msg.value >= events[_eventId].nftPrice,
            "Insufficient funds to buy NFT"
        );
        eventNFT.mintNFT(msg.sender, tokenURI);
    }

    function getRsvps(uint256 _eventId) public view returns (RSVP[] memory) {
        return rsvps[_eventId];
    }

    function distributePOAP(uint256 _eventId, string memory tokenURI) public {
        require(
            events[_eventId].creator == msg.sender,
            "Only the event creator can distribute POAP"
        );
        RSVP[] storage eventRsvps = rsvps[_eventId];
        for (uint256 i = 0; i < eventRsvps.length; i++) {
            if (eventRsvps[i].isAttending) {
                eventNFT.mintNFT(eventRsvps[i].attendee, tokenURI);
            }
        }
    }
}
