## Create Resource group
/* resource "azurerm_resource_group" "rg" {
  name     = "rg_${var.project}_${var.environment}"
  location = var.location
  tags     = var.tags
} */

data "azurerm_resourcegroup" "rg_name" {
  name     = "rg_HPOC_NSP_Dev"
  location = var.location
}


## Create Storage account
resource "azurerm_storage_account" "storage_account" {
  name                             = "stor${var.storage}dev"
  resource_group_name              = data.azurerm_resourcegroup.rg_name.name
  location                         = var.location
  account_kind                     = "StorageV2"
  account_tier                     = "Standard"
  account_replication_type         = "GRS"
  cross_tenant_replication_enabled = false
  access_tier                      = "Hot"
  enable_https_traffic_only        = true
  min_tls_version                  = "TLS1_2"
  allow_nested_items_to_be_public  = false

  network_rules {
    default_action = "Deny"
    bypass = [
      "AzureServices"
    ]
    ip_rules = [
      "205.193.94.40",
    ]
  }

  #tags = data.azurerm_resource_group.rg_main.tags
}
## Create Application insights for function app monitoring
resource "azurerm_application_insights" "application_insights" {
  name                = "${var.project}-application-insights"
  location            = var.location
  resource_group_name = data.azurerm_resourcegroup.rg_name.name
  application_type    = "Node.JS"
}

## Create App Service Plan
resource "azurerm_app_service_plan" "app_service_plan" {
  name                = "${var.project}-app-service-plan"
  resource_group_name = data.azurerm_resourcegroup.rg_name.name
  location            = var.location
  kind                = "Linux"
  reserved            = true
  #kind                = "FunctionApp"
  #reserved            = "false"
  sku {
    tier = "Dynamic"
    size = "Y1"
  }

}

## Create Function App
resource "azurerm_function_app" "function_app" {
  name                = "${var.project}-api-dev"
  resource_group_name = data.azurerm_resourcegroup.rg_name.name
  location            = var.location
  app_service_plan_id = azurerm_app_service_plan.app_service_plan.id
  app_settings = {
    "WEBSITE_RUN_FROM_PACKAGE"       = "",
    "Function_WORKER_RUNTIME"        = "node",
    "APPINSIGHTS_INSTRUMENTATIONKEY" = azurerm_application_insights.application_insights.instrumentation_key,
    "WEBSITE_NODE_DEFAULT_VERSION" : "~14"
  }
  site_config {
    use_32_bit_worker_process = false
  }
  storage_account_name       = azurerm_storage_account.storage_account.name
  storage_account_access_key = azurerm_storage_account.storage_account.primary_access_key
  os_type                    = "linux"
  version                    = "~3"

  lifecycle {
    ignore_changes = [
      app_settings["WEBSITE_RUN_FROM_PACKAGE"],
    ]
  }
}

## Add module output for app and host name

output "function_app_name" {
  value       = azurerm_function_app.function_app.name
  description = "Deployed function app name"
}

output "function_app_default_hostname" {
  value       = azurerm_function_app.function_app.default_hostname
  description = "Deployed function app hostname"
}
