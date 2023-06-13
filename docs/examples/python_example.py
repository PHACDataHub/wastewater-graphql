import requests

API_KEY = "YOUR_KEY_HERE"
ENDPOINT = "https://example.com/graphql" # replace me

# Queries the Infobase table
query = """
query Infobase {
  Infobase {
    Date
    Location
    region
    measureid
    fractionid
    viral_load
    seven_day_rolling_avg
    pruid
  }
}
"""

r = requests.post(
    url=ENDPOINT,
    headers={
        "Ocp-Apim-Subscription-Key": API_KEY,
    },
    json={"query": query},
)
r.json()
