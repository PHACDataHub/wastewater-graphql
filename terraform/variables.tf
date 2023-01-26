# List of authorization groups, their display name, and their description.
# The value of `group` must match the groups defined in
# (auth.ts)(graphql/auth.ts)
variable "auth_groups" {
  type = list(object({
    group       = string
    name        = string
    description = string
  }))
  default = [
    { group       = "nml-lab"
      name        = "NML"
      description = "National Microbiology Laboratory"
    },
    { group       = "csc"
      name        = "CSC"
      description = "Correctional Service Canada"
    },
    { group       = "bccdc"
      name        = "BCCDC"
      description = "BC Centre for Disease Control"
    },
    { group       = "hnj"
      name        = "HNJ"
      description = "Haines Junction (Yukon)"
  }]
}

# Azure subscription id 
variable "subscription_id" {
  type = string
}

# Resource group to use
variable "resource_group" {
  type = string
}

# APIM to create API in
variable "apim" {
  type = string
}

# The name of the API Management API. Changing this forces a new resource to be
# created.
variable "api_name" {
  type    = string
  default = "wastewater-graphql-api"
}

# The display name of the API.
variable "api_display_name" {
  type    = string
  default = "Wastewater GraphQL API"
}

# The Path for this API Management API, which is a relative URL which uniquely
# identifies this API and all of its resource paths within the API Management
# Service.
variable "api_path" {
  type    = string
  default = "wastewater"
}

# Absolute URL of the backend service implementing this API.
variable "function_app_url" {
  type    = string
}
