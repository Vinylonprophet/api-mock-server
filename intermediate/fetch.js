const redirectTarget = "https://www.baidu.com/";

const apiUrl = `http://localhost:4500/api/example?redirect=${encodeURIComponent(redirectTarget)}`;

var headersInfo = {};

var getResponse = async function (testCase) {
    let apiUrl = 'http://localhost:4500/api/example';
    let redirectTarget = "https://www.baidu.com/";
    let fetchHeaders = {};
    let method = 'GET';

    if (testCase === 200) {
        fetchHeaders = {
            "Content-Type": "application/json",
        }
    } else if (testCase === 302) {
        apiUrl = `http://localhost:4500/api/example?redirect=${encodeURIComponent(redirectTarget)}`;
    } else if (testCase === 304) {
        fetchHeaders = {
            "Content-Type": "application/json",
            "If-None-Match": "da6abab4563a9682dca2b2312b878acb"
        }
    } else if (testCase === 'download') {
        fetchHeaders = {
            "Content-Type": "text/plain",
            "DownLoad": true
        }
    }

    try {
        const response = await fetch(apiUrl, {
            method: method,
            headers: fetchHeaders,
            credentials: 'include'
        })
        headersInfo.Server = response.headers.get('Server');
        if (response.status === 200) {
            // Please according to Content-Type get response
            const res = await response;
            console.log("status: 200", res);
        } else if (response.status === 302) {
            headersInfo.Location = response.headers.get('Location');
            console.log("status: 302", headersInfo.Location);
            // window.location.href = headersInfo.Location;
        } else if (response.status === 304) {
            console.log("status: 304")
        }

    } catch (error) {
        console.error('Fetch error:', error);
    }
}

getResponse(200);