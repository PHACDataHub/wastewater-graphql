
/**
Wastewater API terraform

*/

terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = ">=3.40.0"
    }
  }
}

provider "azurerm" {
  features {}
  subscription_id = var.subscription_id
}


data "azurerm_resource_group" "api-resource-group" {
  name = var.resource_group
}

data "azurerm_api_management" "apim" {
  name                = var.apim
  resource_group_name = var.resource_group
}

resource "azurerm_api_management_api" "wastewater-graphql-api" {
  resource_group_name = data.azurerm_resource_group.api-resource-group.name
  api_management_name = data.azurerm_api_management.apim.name

  name         = var.api_name
  display_name = var.api_display_name
  path         = var.api_path
  service_url  = var.function_app_url
  subscription_required = false

  revision  = "1"
  protocols = ["https"]
  api_type  = "graphql"

  subscription_key_parameter_names {
    header = "Ocp-Apim-Subscription-Key"
    query  = "subscription-key"
  }

}


resource "azurerm_api_management_product" "ww-product" {
  for_each = {
    for index, group in var.auth_groups :
    group.group => group
  }

  resource_group_name = data.azurerm_resource_group.api-resource-group.name
  api_management_name = data.azurerm_api_management.apim.name

  product_id   = each.value.group
  display_name = format("WastewaterAPI: %s", each.value.name)
  description = format(
    "This product controls Wastewater API access.\n\n%s",
    each.value.description
  )

  subscription_required = true
  approval_required     = false
  published             = false
}

resource "azurerm_api_management_product_policy" "ww-product-policy" {
  for_each = {
    for index, group in var.auth_groups :
    group.group => group
  }

  resource_group_name = data.azurerm_resource_group.api-resource-group.name
  api_management_name = data.azurerm_api_management.apim.name

  product_id = each.value.group

  xml_content = <<-XML
    <policies>
        <inbound>
            <base />
            <set-header name="X-Auth-Group" exists-action="override">
                <value>${each.value.group}</value>
            </set-header>
        </inbound>
        <backend>
            <base />
        </backend>
        <outbound>
            <base />
        </outbound>
        <on-error>
            <base />
        </on-error>
    </policies>
  XML

  depends_on = [azurerm_api_management_product.ww-product]
}

resource "azurerm_api_management_product_api" "ww-product-api" {
  for_each = {
    for index, group in var.auth_groups :
    group.group => group
  }

  api_name            = azurerm_api_management_api.wastewater-graphql-api.name
  resource_group_name = data.azurerm_resource_group.api-resource-group.name
  api_management_name = data.azurerm_api_management.apim.name

  product_id = each.value.group

  depends_on = [azurerm_api_management_product.ww-product]
}

resource "azurerm_api_management_subscription" "ww-product-subscription" {
  for_each = {
    for index, subscr in local.subscriptions :
      subscr.display_name => subscr
  }

  api_management_name = data.azurerm_api_management.apim.name
  resource_group_name = data.azurerm_resource_group.api-resource-group.name

  product_id = azurerm_api_management_product.ww-product[each.value.group.group].id
  display_name = each.value.display_name

  state = each.value.state

  depends_on = [azurerm_api_management_product.ww-product]
}
