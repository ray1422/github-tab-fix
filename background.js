function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        let url = new URL(details.url);
        let params = new URLSearchParams(url.search.slice(1))
        if (params.get('ts') == null) {
            params.append('ts', '4')
            url.search = '?' + params.toString()
        }

        console.log(url.toString())
        return {redirectUrl: url.toString()};
    },
    {
        urls: [
            "*://github.com/*",
            "*://www.github.com/*"
        ],
        types: ["main_frame", "sub_frame"]
    },
    ["blocking"]
);
