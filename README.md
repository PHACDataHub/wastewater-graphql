# GraphQL API for WasteWater

## Cloud policy

```
<!--
    IMPORTANT:
    - Policy elements can appear only within the <inbound>, <outbound>, <backend> section elements.
    - To apply a policy to the incoming request (before it is forwarded to the backend service), place a corresponding policy element within the <inbound> section element.
    - To apply a policy to the outgoing response (before it is sent back to the caller), place a corresponding policy element within the <outbound> section element.
    - To add a policy, place the cursor at the desired insertion point and select a policy from the sidebar.
    - To remove a policy, delete the corresponding policy statement from the policy document.
    - Position the <base> element within a section element to inherit all policies from the corresponding section element in the enclosing scope.
    - Remove the <base> element to prevent inheriting policies from the corresponding section element in the enclosing scope.
    - Policies are applied in the order of their appearance, from the top down.
    - Comments within policy elements are not supported and may disappear. Place your comments between policy elements or at a higher level scope.
-->
<policies>
    <inbound>
        <base />
        <set-variable name="internal" value="@{
            int HostToNetworkOrder(int host)
            {
                return (((int)HostToNetworkOrderShort((short)host) & 0xFFFF) << 16)
                    | ((int)HostToNetworkOrderShort((short)(host >> 16)) & 0xFFFF);
            }
            short HostToNetworkOrderShort(short host)
            {
                return (short)((((int)host & 0xFF) << 8) | (int)((host >> 8) & 0xFF));
            }
            
            string ipAddress = context.Request.Headers.GetValueOrDefault("x-forwarded-for","172.1.0.1"); 
            if (!string.IsNullOrEmpty(ipAddress))
            {
                string[] tokens = ipAddress.Split(':'); 
                if(tokens.Length == 2) 
                { ipAddress = tokens[0]; } 
                //Place IP Ranges into this list in CIDR notation (e.g. "0.0.0.0/0") and separate with commas
                List<string> cidrList = new List<string>(){
                    "10.0.0.0/8",
                    "172.0.0.0/24",
                    "192.168.0.0/24"
                };
                foreach (string cidrAddress in cidrList)
                {
                    string[] cidrParts = cidrAddress.Split('/');
                    string[] inputIPParts = ipAddress.Split('.');
                    string[] cidrIPArray = cidrParts[0].Split('.');

                    if (inputIPParts.Length == 4 && cidrIPArray.Length == 4)
                    {
                        byte[] inputIPBytes = new byte[] {Convert.ToByte(int.Parse(inputIPParts[0])), 
                            Convert.ToByte(int.Parse(inputIPParts[1])), 
                            Convert.ToByte(int.Parse(inputIPParts[2])),
                            Convert.ToByte(int.Parse(inputIPParts[3])), };
                        byte[] cidrIPBytes = new byte[] {Convert.ToByte(int.Parse(cidrIPArray[0])), 
                            Convert.ToByte(int.Parse(cidrIPArray[1])), 
                            Convert.ToByte(int.Parse(cidrIPArray[2])),
                            Convert.ToByte(int.Parse(cidrIPArray[3])), };
                
                        int cidrAddr = BitConverter.ToInt32(inputIPBytes,0);
                        int ipAddr = BitConverter.ToInt32(cidrIPBytes,0);
                        
                        var host = int.Parse(cidrParts[1]);
                        host = -1 << (32-host);
                        var mask = HostToNetworkOrder(host);
                        
                        if (((ipAddr & mask) == (cidrAddr & mask)))
                        {
                            return "muffins";
                        }
                    }
                }
            }
            string headers = String.Empty;
            foreach (KeyValuePair<string, string[]> kvp in context.Request.Headers) {
                headers += kvp.Key + "=" + kvp.Value + "\n";            
            }            
            return headers; }" />
        <validate-jwt header-name="Authorization" failed-validation-httpcode="401" failed-validation-error-message="@{return context.Variables.GetValueOrDefault<string>("internal");}">
            <issuer-signing-keys>
                <key>{{jwtkey}}</key>
            </issuer-signing-keys>
            <audiences>
                <audience>api-ipa-dt.hc-sc.gc.ca</audience>
            </audiences>
            <required-claims>
                <claim name="api" match="all" separator=",">
                    <value>ww</value>
                </claim>
            </required-claims>
        </validate-jwt>
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
```