// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract Market {
	enum ListingStatus {
		Active,
		Sold,
		Cancelled
	}

	struct Listing {
		ListingStatus status;
		address seller;
		address token;
		uint tokenId;
		uint price;
	}

	event Listed(
		uint listingId,
		address seller,
		address token,
		uint tokenId,
		uint price
	);

	event Sale(
		uint listingId,
		address buyer,
		address token,
		uint tokenId,
		uint price
	);

	event Cancel(
		uint listingId,
		address seller
	);

	uint private _listingId = 0;
    uint private _soldId = 0;

	mapping(uint => Listing) private _listings;

	function listToken(address token, uint tokenId, uint price) external {
        require(price>0, "Price must be at least 1 wei");
        require(IERC721(token).ownerOf(tokenId)==msg.sender);
		IERC721(token).transferFrom(msg.sender, address(this), tokenId);

		Listing memory listing = Listing(
			ListingStatus.Active,
			msg.sender,
			token,
			tokenId,
			price
		);
		_listingId++;
		_listings[_listingId] = listing;
		emit Listed(
			_listingId,
			msg.sender,
			token,
			tokenId,
			price
		);
	}

	function getListing(uint listingId) public view returns (Listing memory) {
		return _listings[listingId];
	}
    
    //Returns all unsold market items
    function fetchMarketItems() public view returns (Listing[] memory) {
      uint itemCount = _listingId;
      uint unsoldItemCount = _listingId - _soldId;
      uint currentIndex = 0;

      Listing[] memory items = new Listing[](unsoldItemCount);
    
      for (uint i = 0; i < itemCount; i++) {
          Listing storage listing = _listings[i];
          if(listing.status == ListingStatus.Active){
              uint currentId = i + 1;
              Listing storage currentItem = _listings[currentId];
              items[currentIndex] = currentItem;
              currentIndex += 1;
          }
         
      }
      return items;
    }

	function buyToken(uint listingId) external payable {
		Listing storage listing = _listings[listingId];
		require(msg.sender != listing.seller, "Seller cannot be buyer");
		require(listing.status == ListingStatus.Active, "Listing is not active");
		require(msg.value >= listing.price, "Insufficient payment");

		listing.status = ListingStatus.Sold;
		IERC721(listing.token).transferFrom(address(this), msg.sender, listing.tokenId);
		payable(listing.seller).transfer(listing.price);
        _soldId +=1;

		emit Sale(
			listingId,
			msg.sender,
			listing.token,
			listing.tokenId,
			listing.price
		);
	}

	function cancel(uint listingId) public {
		Listing storage listing = _listings[listingId];

		require(msg.sender == listing.seller, "Only seller can cancel listing");
		require(listing.status == ListingStatus.Active, "Listing is not active");

		listing.status = ListingStatus.Cancelled;
	
		IERC721(listing.token).transferFrom(address(this), msg.sender, listing.tokenId);
        _soldId -=1;
		emit Cancel(listingId, listing.seller);
	}
}