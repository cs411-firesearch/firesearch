import urllib, urllib2
from random import randint

USER_COUNT = 33
STOCK_COUNT = 52
VOLUME_RANGE_A = 20
VOLUME_RANGE_B = 100

def buy_stock(userId, stockId, volume):
	url = 'http://127.0.0.1:8080/api/buyStock'
	values = dict(
			UserId=userId,
			StockId=stockId,
			Volume=volume
		)
	params = urllib.urlencode(values)
	req = urllib2.Request(url, params)
	rsp = urllib2.urlopen(req)
	content = rsp.read()
	print content
	

for userId in range(1,USER_COUNT+1):
	listOfBuy = []
	buyhowmany = randint(5,15)
	while len(listOfBuy) < buyhowmany:
		s = randint(1, STOCK_COUNT)
		if s not in listOfBuy:
			listOfBuy.append(s)

	for stockId in listOfBuy:
		volume = randint(VOLUME_RANGE_A, VOLUME_RANGE_B)
		buy_stock(userId, stockId, volume)
