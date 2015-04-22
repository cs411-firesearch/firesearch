import urllib, urllib2

with open('name.txt', 'r') as f:
	for l in f:
		
		name = l.strip()
		
		url = 'http://nodejs-firesearch.rhcloud.com/auth/signup'
		values = dict(
				username=name,
				password='password',
				email='firesearchadm@gmail.com'
			)
		params = urllib.urlencode(values)
		req = urllib2.Request(url, params)
		rsp = urllib2.urlopen(req)
		content = rsp.read()

		l = next(f)


