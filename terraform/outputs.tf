output "subscription_keys" {
  description = "Subscription primary and secondary keys"
  sensitive = true
  value = { for k, h in azurerm_api_management_subscription.ww-product-subscription : h.display_name => {
      primary_key   = h.primary_key
      secondary_key = h.secondary_key
    }
  }
}
