/*CREATE TABLE*/
CREATE TABLE Own(
	Volume INT DEFAULT 1,
 	Price FLOAT DEFAULT 0,
 	StockId INT not null,
 	UserId INT not null,
	FOREIGN KEY (StockId) REFERENCES Stock(StockId),
	FOREIGN KEY (UserId) REFERENCES User(UserId)
);
