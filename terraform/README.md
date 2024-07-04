
# Terraform configuration

The following variables must be defined in order to deploy the API for this
function app:

- [subscription_id](#input_subscription_id)
- [resource_group](#input_resource_group)
- [apim](#input_apim)
- [function_app_url](#input_function_app_url)

<!-- BEGIN_TF_DOCS -->
## Requirements

| Name | Version |
|------|---------|
| <a name="requirement_azurerm"></a> [azurerm](#requirement\_azurerm) | >=3.40.0 |

## Providers

| Name | Version |
|------|---------|
| <a name="provider_azurerm"></a> [azurerm](#provider\_azurerm) | >=3.40.0 |

## Modules

No modules.

## Resources

| Name | Type |
|------|------|
| [azurerm_api_management_api.wastewater-graphql-api](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/api_management_api) | resource |
| [azurerm_api_management_product.ww-product](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/api_management_product) | resource |
| [azurerm_api_management_product_api.ww-product-api](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/api_management_product_api) | resource |
| [azurerm_api_management_product_policy.ww-product-policy](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/api_management_product_policy) | resource |
| [azurerm_api_management_subscription.ww-product-subscription](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/api_management_subscription) | resource |
| [azurerm_api_management.apim](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/data-sources/api_management) | data source |
| [azurerm_resource_group.api-resource-group](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/data-sources/resource_group) | data source |

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| <a name="input_api_display_name"></a> [api\_display\_name](#input\_api\_display\_name) | The display name of the API. | `string` | `"Wastewater GraphQL API"` | no |
| <a name="input_api_name"></a> [api\_name](#input\_api\_name) | The name of the API Management API. Changing this forces a new resource to be created. | `string` | `"wastewater-graphql-api"` | no |
| <a name="input_api_path"></a> [api\_path](#input\_api\_path) | The Path for this API Management API, which is a relative URL which uniquely identifies this API and all of its resource paths within the API Management Service. | `string` | `"wastewater"` | no |
| <a name="input_apim"></a> [apim](#input\_apim) | APIM to create API in | `string` | n/a | yes |
| <a name="input_auth_groups"></a> [auth\_groups](#input\_auth\_groups) | List of authorization groups, their display name, and their description. The value of `group` must match the groups defined in (auth.ts)(graphql/auth.ts) | <pre>list(object({<br>    group         = string<br>    name          = string<br>    description   = string<br>    subscriptions = number<br>    suspended     = list(number)<br>  }))</pre> | <pre>[<br>  {<br>    "description": "National Microbiology Laboratory",<br>    "group": "nml-lab",<br>    "name": "NML",<br>    "subscriptions": 15,<br>    "suspended": []<br>  },<br>  {<br>    "description": "Correctional Service Canada",<br>    "group": "csc",<br>    "name": "CSC",<br>    "subscriptions": 15,<br>    "suspended": []<br>  },<br>  {<br>    "description": "BC Centre for Disease Control",<br>    "group": "bccdc",<br>    "name": "BCCDC",<br>    "subscriptions": 15,<br>    "suspended": []<br>  },<br>  {<br>    "description": "Haines Junction (Yukon)",<br>    "group": "hnj",<br>    "name": "HNJ",<br>    "subscriptions": 15,<br>    "suspended": []<br>  },<br>  {<br>    "description": "Ontario Ministry of the Environment, Conservation and Parks",<br>    "group": "omecp",<br>    "name": "OMECP",<br>    "subscriptions": 15,<br>    "suspended": []<br>  },<br>  {<br>    "description": "Public Health Ontario",<br>    "group": "pho",<br>    "name": "PHO",<br>    "subscriptions": 15,<br>    "suspended": []<br>  }<br>]</pre> | no |
| <a name="input_function_app_url"></a> [function\_app\_url](#input\_function\_app\_url) | Absolute URL of the backend service implementing this API. | `string` | n/a | yes |
| <a name="input_resource_group"></a> [resource\_group](#input\_resource\_group) | Resource group to use | `string` | n/a | yes |
| <a name="input_subscription_id"></a> [subscription\_id](#input\_subscription\_id) | Azure subscription id | `string` | n/a | yes |

## Outputs

| Name | Description |
|------|-------------|
| <a name="output_subscription_keys"></a> [subscription\_keys](#output\_subscription\_keys) | Subscription primary and secondary keys |
<!-- END_TF_DOCS -->