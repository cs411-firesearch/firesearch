/* CREATE TABLE */
CREATE TABLE Stock(
	StockId INT NOT NULL AUTO_INCREMENT,
	TransCode varchar(6) NOT NULL,	
	Volume INT,
	Season1 FLOAT,	
	Season2 FLOAT,	
	Season3 FLOAT,
	Season4 FLOAT,
	DivYield FLOAT,
	CompanyId INT NOT NULL,
	Type INT,
	PRIMARY KEY(StockId),
	FOREIGN KEY (CompanyId) REFERENCES Company(CompanyId)
);

/* INSERT QUERY */
INSERT INTO Stock(
TransCode, Volume, Season1, Season2,
Season3, Season4, DivYield, CompanyId, Type
)
VALUES
(
'AAN', 331756, 29.43, 30.33, 35.67,
24.25, 0.09, 1, 1
);
/* INSERT QUERY */
INSERT INTO Stock(
TransCode, Volume, Season1, Season2,
Season3, Season4, DivYield, CompanyId, Type
)
VALUES
(
'ABAX', 84123, 39.77, 39.04, 44.6, 50.85,
0.4, 2, 2
);
/* INSERT QUERY */
INSERT INTO Stock(
TransCode, Volume, Season1, Season2,
Season3, Season4, DivYield, CompanyId, Type
)
VALUES
(
'AIR', 360734, 27.49, 26.05, 27.59,
24.11, 0.3, 3, 3
);
/* INSERT QUERY */
INSERT INTO Stock(
TransCode, Volume, Season1, Season2,
Season3, Season4, DivYield, CompanyId, Type
)
VALUES
(
'BGS', 311842, 33.91, 30.24, 32.65,
27.54, 1.36, 4, 4
);
/* INSERT QUERY */
INSERT INTO Stock(
TransCode, Volume, Season1, Season2,
Season3, Season4, DivYield, CompanyId, Type
)
VALUES
(
'BIDU', 2615829, 179.73, 155.2, 188.05,
218, 0, 5, 7
);
/* INSERT QUERY */
INSERT INTO Stock(
TransCode, Volume, Season1, Season2,
Season3, Season4, DivYield, CompanyId, Type
)
VALUES
(
'CBM', 209902, 17.72, 19.08, 20.7, 18.73,
0, 6, 2
);
/* INSERT QUERY */
INSERT INTO Stock(
TransCode, Volume, Season1, Season2,
Season3, Season4, DivYield, CompanyId, Type
)
VALUES
(
'COG', 4052364, 38.73, 34.08, 34.15,
32.64, 0.08, 7, 6
);
/* INSERT QUERY */
INSERT INTO Stock(
TransCode, Volume, Season1, Season2,
Season3, Season4, DivYield, CompanyId, Type
)
VALUES
(
'DAL', 7983193, 28.37, 34.93, 39, 35.35,
0.36, 8, 5
);
/* INSERT QUERY */
INSERT INTO Stock(
TransCode, Volume, Season1, Season2,
Season3, Season4, DivYield, CompanyId, Type
)
VALUES
(
'DHR', 2120254, 76.45, 75.08, 79.16,
75.7, 0.54, 9, 3
);
/* INSERT QUERY */
INSERT INTO Stock(
TransCode, Volume, Season1, Season2,
Season3, Season4, DivYield, CompanyId, Type
)
VALUES
(
'ETN', 1386792, 75.74, 74.77, 77.49,
63.03, 2.2, 10, 6
);
/* INSERT QUERY */
INSERT INTO Stock(
TransCode, Volume, Season1, Season2,
Season3, Season4, DivYield, CompanyId, Type
)
VALUES
(
'EVEP', 572882.00, 33.93, 33.68,
39.61, 35.44, 2, 11, 6
);
/* INSERT QUERY */
INSERT INTO Stock(
TransCode, Volume, Season1, Season2,
Season3, Season4, DivYield, CompanyId, Type
)
VALUES
(
'EWBC', 393884, 34.5, 36.67, 35.09,
33.84, 0.8, 12, 5
);
/* INSERT QUERY */
INSERT INTO Stock(
TransCode, Volume, Season1, Season2,
Season3, Season4, DivYield, CompanyId, Type
)
VALUES
(
'FCAU', 4751092, 9.13, 12.1, 10.26,
10.02, 0, 13, 3
);
/* INSERT QUERY */
INSERT INTO Stock(
TransCode, Volume, Season1, Season2,
Season3, Season4, DivYield, CompanyId, Type
)
VALUES
(
'FFIV', 700353, 89.08, 107.05, 112,
118.5, 0, 14, 7
);
/* INSERT QUERY */
INSERT INTO Stock(
TransCode, Volume, Season1, Season2,
Season3, Season4, DivYield, CompanyId, Type
)
VALUES
(
'GPS', 2614326, 39.09, 40.49, 41.55,
41.63, 0.92, 15, 3
);
/* INSERT QUERY */
INSERT INTO Stock(
TransCode, Volume, Season1, Season2,
Season3, Season4, DivYield, CompanyId, Type
)
VALUES
(
'GRMN', 885245, 45.68, 55.6, 60.75,
51.76, 1.92, 16, 3
);
/* INSERT QUERY */
INSERT INTO Stock(
TransCode, Volume, Season1, Season2,
Season3, Season4, DivYield, CompanyId, Type
)
VALUES
(
'HAL', 11093310, 50.47, 58.69, 71.27,
64.63, 0.72, 17, 6
);
/* INSERT QUERY */
INSERT INTO Stock(
TransCode, Volume, Season1, Season2,
Season3, Season4, DivYield, CompanyId, Type
)
VALUES
(
'HBI', 2732056, 69.71, 76.74, 98.34,
107.17, 0.4, 18, 3
);
/* INSERT QUERY */
INSERT INTO Stock(
TransCode, Volume, Season1, Season2,
Season3, Season4, DivYield, CompanyId, Type
)
VALUES
(
'IBCP', 46890, 12.01, 12.99, 12.91,
11.87, 0.24, 19, 5
);
/* INSERT QUERY */
INSERT INTO Stock(
TransCode, Volume, Season1, Season2,
Season3, Season4, DivYield, CompanyId, Type
)
VALUES
(
'IMN', 69031.00, 4.7, 5.81, 3.44,
2.93, 0, 20, 7
);
/* INSERT QUERY */
INSERT INTO Stock(
TransCode, Volume, Season1, Season2,
Season3, Season4, DivYield, CompanyId, Type
)
VALUES
(
'JBLU', 5960583.00, 8.56, 8.7,
10.84, 10.37, 0, 21, 5
);
/* INSERT QUERY */
INSERT INTO Stock(
TransCode, Volume, Season1, Season2,
Season3, Season4, DivYield, CompanyId, Type
)
VALUES
(
'JPM', 11755819, 58.31, 60.95,
57.15, 60.24, 1.76, 22, 5
);
/* INSERT QUERY */
INSERT INTO Stock(
TransCode, Volume, Season1, Season2,
Season3, Season4, DivYield, CompanyId, Type
)
VALUES
(
'KEG', 3737991.00, 7.87, 9.49,
9.17, 4.38, 0, 23, 6
);
/* INSERT QUERY */
INSERT INTO Stock(
TransCode, Volume, Season1, Season2,
Season3, Season4, DivYield, CompanyId, Type
)
VALUES
(
'KRNY', 13841.00, 11.51, 14.77,
15.25, 13.37, 0, 24, 5
);
/* INSERT QUERY */
INSERT INTO Stock(
TransCode, Volume, Season1, Season2,
Season3, Season4, DivYield, CompanyId, Type
)
VALUES
(
'LAWS', 9975.00, 12.21, 16.1, 16.1,
22.31, 0, 25, 5
);
/* INSERT QUERY */
INSERT INTO Stock(
TransCode, Volume, Season1, Season2,
Season3, Season4, DivYield, CompanyId, Type
)
VALUES
(
'LBY', 62940.00, 20.89, 26.1, 26.75,
26.11, 0.44, 26, 3
);
/* INSERT QUERY */
INSERT INTO Stock(
TransCode, Volume, Season1, Season2,
Season3, Season4, DivYield, CompanyId, Type
)
VALUES
(
'MS', 9157774.00, 31.33, 31.37,
32.41, 34.37, 0.4, 27, 5
);
/* INSERT QUERY */
INSERT INTO Stock(
TransCode, Volume, Season1, Season2,
Season3, Season4, DivYield, CompanyId, Type
)
VALUES
(
'MSFT', 34401398.00, 37.35, 41.15,
41.86, 46.27, 1.24, 28, 7
);
/* INSERT QUERY */
INSERT INTO Stock(
TransCode, Volume, Season1, Season2,
Season3, Season4, DivYield, CompanyId, Type
)
VALUES
(
'NANO', 71254.00, 18.88, 18.2, 18.22,
15.04, 0, 29, 7
);
/* INSERT QUERY */
INSERT INTO Stock(
TransCode, Volume, Season1, Season2,
Season3, Season4, DivYield, CompanyId, Type
)
VALUES
(
'NGS', 25465.00, 27.36, 30.13, 33.38,
24.04, 0, 30, 6
);
/* INSERT QUERY */
INSERT INTO Stock(
TransCode, Volume, Season1, Season2,
Season3, Season4, DivYield, CompanyId, Type
)
VALUES
(
'OFLX', 8429.00, 20.48, 21.74, 20.71,
19.23, 0, 31, 3
);
/* INSERT QUERY */
INSERT INTO Stock(
TransCode, Volume, Season1, Season2,
Season3, Season4, DivYield, CompanyId, Type
)
VALUES
(
'ORCL', 18030789.00, 37.78, 41.04,
40.41, 38.32, 0.48, 32, 7
);
/* INSERT QUERY */
INSERT INTO Stock(
TransCode, Volume, Season1, Season2,
Season3, Season4, DivYield, CompanyId, Type
)
VALUES
(
'PTNR', 69826.00, 9.12, 8.99, 7.68,
7.04, 0, 33, 7
);
/* INSERT QUERY */
INSERT INTO Stock(
TransCode, Volume, Season1, Season2,
Season3, Season4, DivYield, CompanyId, Type
)
VALUES
(
'QCOM', 8560377.00, 73.61, 79.42,
79.35, 74.67, 1.68, 34, 7
);
/* INSERT QUERY */
INSERT INTO Stock(
TransCode, Volume, Season1, Season2,
Season3, Season4, DivYield, CompanyId, Type
)
VALUES
(
'QUMU', 1448.00, 12.8, 15.96, 14.27,
13, 0, 35, 7
);
/* INSERT QUERY */
INSERT INTO Stock(
TransCode, Volume, Season1, Season2,
Season3, Season4, DivYield, CompanyId, Type
)
VALUES
(
'RENN', 512341, 3.03, 3.3, 3.36, 3.42,
0, 36, 7
);
/* INSERT QUERY */
INSERT INTO Stock(
TransCode, Volume, Season1, Season2,
Season3, Season4, DivYield, CompanyId, Type
)
VALUES
(
'SAFM', 281104, 72.33, 78.81, 97.14,
87.43, 0.88, 37, 4
);
/* INSERT QUERY */
INSERT INTO Stock(
TransCode, Volume, Season1, Season2,
Season3, Season4, DivYield, CompanyId, Type
)
VALUES
(
'SB', 215323, 10.22, 9.57, 9.78, 6.66,
0.08, 38, 5
);
/* INSERT QUERY */
INSERT INTO Stock(
TransCode, Volume, Season1, Season2,
Season3, Season4, DivYield, CompanyId, Type
)
VALUES
(
'TATT', 1183, 8.05, 8.32, 7.33, 7.24,
0.23, 39, 3
);
/* INSERT QUERY */
INSERT INTO Stock(
TransCode, Volume, Season1, Season2,
Season3, Season4, DivYield, CompanyId, Type
)
VALUES
(
'TGT', 3753100, 63.53, 60.74, 58.39,
62.68, 2.08, 40, 1
);
/* INSERT QUERY */
INSERT INTO Stock(
TransCode, Volume, Season1, Season2,
Season3, Season4, DivYield, CompanyId, Type
)
VALUES
(
'UNB', 1222, 22.25, 22.94, 24.77, 24.44,
1.08, 41, 5
);
/* INSERT QUERY */
INSERT INTO Stock(
TransCode, Volume, Season1, Season2,
Season3, Season4, DivYield, CompanyId, Type
)
VALUES
(
'USB', 4816283, 39.87, 43.59, 43.45,
41.86, 0.98, 42, 5
);
/* INSERT QUERY */
INSERT INTO Stock(
TransCode, Volume, Season1, Season2,
Season3, Season4, DivYield, CompanyId, Type
)
VALUES
(
'VLY', 955022, 10.15, 10.45, 9.98, 9.72,
0.44, 43, 5
);
/* INSERT QUERY */
INSERT INTO Stock(
TransCode, Volume, Season1, Season2,
Season3, Season4, DivYield, CompanyId, Type
)
VALUES
(
'VOYA', 1869318, 35.01, 36.51, 36.36,
39.06, 0.04, 44, 5
);
/* INSERT QUERY */
INSERT INTO Stock(
TransCode, Volume, Season1, Season2,
Season3, Season4, DivYield, CompanyId, Type
)
VALUES
(
'WB', 507500, 16.27, 20.63, 18.59, 14.29,
0, 45, 7
);
/* INSERT QUERY */
INSERT INTO Stock(
TransCode, Volume, Season1, Season2,
Season3, Season4, DivYield, CompanyId, Type
)
VALUES
(
'WEN', 2639646, 8.73, 9.18, 8.53, 8.24,
0.22, 46, 4
);
/* INSERT QUERY */
INSERT INTO Stock(
TransCode, Volume, Season1, Season2,
Season3, Season4, DivYield, CompanyId, Type
)
VALUES
(
'XOXO', 127656, 14.87, 10.14, 12.22,
11.22, 0, 47, 4
);
/* INSERT QUERY */
INSERT INTO Stock(
TransCode, Volume, Season1, Season2,
Season3, Season4, DivYield, CompanyId, Type
)
VALUES
(
'XUE', 44369, 6.17, 5.45, 4.44, 2.95,
0.16, 48, 5
);
/* INSERT QUERY */
INSERT INTO Stock(
TransCode, Volume, Season1, Season2,
Season3, Season4, DivYield, CompanyId, Type
)
VALUES
(
'YELP', 1889504, 68.75, 77.53, 77.35,
68.21, 0, 49, 7
);
/* INSERT QUERY */
INSERT INTO Stock(
TransCode, Volume, Season1, Season2,
Season3, Season4, DivYield, CompanyId, Type
)
VALUES
(
'YHOO', 20563454, 40.37, 36.16, 35.5,
40.66, 0, 50, 7
);
/* INSERT QUERY */
INSERT INTO Stock(
TransCode, Volume, Season1, Season2,
Season3, Season4, DivYield, CompanyId, Type
)
VALUES
(
'ZBB', 95906, 0.27, 0.43, 0.26, 0.2,
0, 51, 6
);
/* INSERT QUERY */
INSERT INTO Stock(
TransCode, Volume, Season1, Season2,
Season3, Season4, DivYield, CompanyId, Type
)
VALUES
(
'ZTS', 2801671, 32.53, 28.97, 32.46,
36.87, 0.33, 52, 2
);
