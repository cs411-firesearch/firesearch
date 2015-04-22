import urllib, urllib2

url0 = 'http://127.0.0.1:8080/recommend/3'
# values0 = dict(
# 		username='Haozhen Ding',
# 		password='password'
# 	)
# params0 = urllib.urlencode(values0)
req0 = urllib2.Request(url0
	# , params0
	)
rsp0 = urllib2.urlopen(req0)
# cookie = rsp0.headers.get('Set-Cookie')
content0 = rsp0.read()
print content0

# url = 'http://127.0.0.1:8080/api/balance/2'
# values = dict(
# 		UserId=2,
# 		StockId=28,
# 		Volume=1
# 	)
# params = urllib.urlencode(values)
# req = urllib2.Request(url)
# req.add_header('cookie', cookie)
# rsp = urllib2.urlopen(req)
# content = rsp.read()
# print content