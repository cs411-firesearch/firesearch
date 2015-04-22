CREATE TABLE Recommend (
 	UserId INT not null,
 	StockId INT not null,
 	Rate INT not null,
	FOREIGN KEY (StockId) REFERENCES Stock(StockId),
	FOREIGN KEY (UserId) REFERENCES User(UserId)
)