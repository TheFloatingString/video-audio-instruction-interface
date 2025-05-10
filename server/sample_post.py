import requests


URL = "https://desktop-dtohfqr.taile61ba3.ts.net/api/point"
resp = requests.post(URL, json={"content":["pick", "pick"]})
print(resp.text)
