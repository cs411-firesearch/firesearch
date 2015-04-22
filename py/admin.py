import urllib, urllib2
import json

url0 = 'http://127.0.0.1:8080/refreshPrices'
values0 = dict( password='molotov' )
params0 = urllib.urlencode(values0)
req0 = urllib2.Request(url0, params0)
rsp0 = urllib2.urlopen(req0)
content0 = rsp0.read()


print content0