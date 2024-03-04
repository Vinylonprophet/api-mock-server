var getResponse = {
    proxy: function () {
        fetch('http://localhost:4500/proxy/complex', {
            method: 'POST',
            headers: {
                "Content-Type": "text/html"
            }
        })
    }
}

getResponse.proxy();