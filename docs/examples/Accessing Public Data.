#Import libraries
library(jsonlite)  # For JSON manipulation
library(ghql)  # For working with GraphQL queries

# Function to execute GraphQL query and parse result
execute_query <- function(endpoint,  query) {
  # Create instance of GraphQL client and set connection settings
  con <- GraphqlClient$new(
    url = "https://api-ipa.hc-sc.gc.ca/wastewater/"
  )
  
  # Execute the query
  result <- con$exec(query)
  
  # Parse the result from JSON to a list
  results <- fromJSON(result, flatten = TRUE)
  
  # Return the 'data' part of the results
  return(results[["data"]])
}

# Define GraphQL queries

# Query for retrieving data from the 'Infobase' table - this table is public
query_infobase <- Query$new()
query_infobase$query('Infobase', '{
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

# Call execute_query function to execute GraphQL queries and parse JSON results into data frames
Infobase_df <- execute_query(endpoint, query_infobase$queries$Infobase)[["Infobase"]]
