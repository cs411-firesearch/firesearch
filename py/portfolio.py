import urllib, urllib2

url0 = 'http://127.0.0.1:8080/auth/login'
values0 = dict(
		username='Haozhen Ding',
		password='password'
	)
params0 = urllib.urlencode(values0)
req0 = urllib2.Request(url0, params0)
rsp0 = urllib2.urlopen(req0)
cookie = rsp0.headers.get('Set-Cookie')
content0 = rsp0.read()

url = 'http://127.0.0.1:8080/api/portfolio/2'
req = urllib2.Request(url)
req.add_header('cookie', cookie)
rsp = urllib2.urlopen(req)
content = rsp.read()
print content