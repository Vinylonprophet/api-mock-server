var getResponse = {
    proxy: function () {
        fetch('http://localhost:4500/reverse-proxy', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include'
        })
    }
}

getResponse.proxy();