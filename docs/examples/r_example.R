#Import libraries
library(jsonlite)  # For JSON manipulation
library(ghql)  # For working with GraphQL queries

# Function to execute GraphQL query and parse result
execute_query <- function(endpoint, authheader, query) {
  # Create instance of GraphQL client and set connection settings
  con <- GraphqlClient$new(
    url = endpoint,
    headers = list("Ocp-Apim-Subscription-Key" = authheader)
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

# Query for filtering records from the 'measures' table where 'siteID' is "TAB"
query_measures_site <- Query$new()
query_measures_site$query('measures_site', '{
    measures(filter: { siteID: { is: "TAB" } }) {
        measureRepID
        protocolID
        sampleID
        purposeID
        polygonID
        siteID
        datasetID
        measureSetRepID
        compartment
        specimenID
        fraction
        group
        class
        measure
        value
        unit
        aggregation
        nomenclature
        index
        measureLic
        reportable
        organizationID
        contactID
        refLink
    }
}')

# Query for multi-filtering records from the 'measures' table
query_measures_multi_filter <- Query$new()
query_measures_multi_filter$query('measures_multi_filter', '{
  measures(filter: { siteID: { is: "TAB" }, measure: { contains: "flu" } }) {
        measureRepID
        protocolID
        sampleID
        purposeID
        polygonID
        siteID
        datasetID
        measureSetRepID
        compartment
        specimenID
        fraction
        group
        class
        measure
        value
        unit
        aggregation
        nomenclature
        index
        measureLic
        reportable
        organizationID
        contactID
        refLink
    }
}')

# Get API key from .Renviron file
# authheader <- Sys.getenv("WWAPIKey")
authheader <- "replace_me"
endpoint <- "replace_me"

# Call execute_query function to execute GraphQL queries and parse JSON results into data frames
Infobase_df <- execute_query(endpoint, authheader, query_infobase$queries$Infobase)
measures_site_df <- execute_query(endpoint, authheader, query_measures_site$queries$measures_site)
measures_multi_filter_df <- execute_query(endpoint, authheader, query_measures_multi_filter$queries$measures_multi_filter)
