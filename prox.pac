/*
Optimized proxy script by CqueJuan I. Leon Guerrero
Refer to:
    https://developer.mozilla.org/en-US/docs/Web/HTTP/Proxy_servers_and_tunneling/Proxy_Auto-Configuration_PAC_file

    Guide for proxy auto-configuration (PAC) file.

    Configure the following variables to match your needs:
    const bypassProxyHosts
    const bypassProxyTLDs

    When setting Proxy Hosts, ensure to include a '.' in the beginning. No wildcards needed.

    Example:
    const proxy = 'PROXY w3proxy.netscape.com:8080; SOCKS socks:1080; DIRECT;'

    attempts to use w3proxy with port 8080
    if proxy fails, use SOCKS over port 443.
    if both methods fail, use DIRECT connection (no proxy)

*/
const proxy = 'PROXY proxy2-1814417d1bc33df81c12bc1f70b3bde3.menlosecurity.com:443; PROXY proxy3-1814417d1bc33df81c12bc1f70b3bde3.menlosecurity.com:443; DIRECT';
//Add hosts to bypass proxy.
const bypassProxyHosts = [
    "menlosecurity.com",
    "microsoft.com",
    "apple.com",
    "citi.com",
    "comptia.org",
    "cloudflare.com",
    "github.com",
    "github.io",
    "google.com",
    "mfdonut.com",
    "microsoft.com",
    "microsoft.us",
    "microsoftonline.us",
    "spotify.com",
    "usaa.com",
    "wgu.edu",
];
//Add TLDs to bypass proxy
const bypassProxyTLDs = [
    "*.edu",
    "*.gov",
    "*.mil"
]
function FindProxyForURL(url, host){
    url = url.toLowerCase();
    host = host.toLowerCase();
    if(isPlainHostName(host)){
        return 'DIRECT';
    }
    if(isInNet(host, '[1-9]{1,3}.[1-9]{1,3}.[1-9]{1,3}.[1-9]{1,3}', '255.255.255.255')){
        return 'DIRECT'; 
    } 
    for(i = 0; i < bypassProxyTLDs.length; i++){
        if(shExpMatch(host, bypassProxyTLDs[i])){
            return 'DIRECT';
        }
    }
    for(i = 0; i < bypassProxyHosts.length; i++){
        if(dnsDomainIs(host, bypassProxyHosts[i])){
            return 'DIRECT';
        }
    }
    try{
        return proxy;
    }catch{
        alert(`${host} = ${dnsResolve(host)}`)
        alert("Error: Failed to use proxies.")
    }
}
