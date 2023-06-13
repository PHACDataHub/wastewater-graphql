#Import ghql library
library("ghql")
library("jsonlite")

# Get API key from .Renviron file
# authheader <- Sys.getenv("WWAPIKey")
authheader <- "your_api_key"
endpoint <- "https://example.com/graphql" # replace me

# Create instance of GraphQL client and set connection settings
con <- GraphqlClient$new(
  url = endpoint,
  headers = list("Ocp-Apim-Subscription-Key" = authheader)
)

query1 <- Query$new()

# Queries the Infobase table
query1$query('Infobase', '{
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
             }')

result <- con$exec(query1$queries$Infobase)

results1 <- fromJSON(result, flatten = TRUE)
Infobase <- results1[["data"]][["Infobase"]]
