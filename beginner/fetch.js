var getResponse = {
    simple: function () {
        fetch('http://localhost:4500/beginner/simple', {
            method: 'POST',
            headers: {
                "Content-Type": "text/html"
            }
        })
    },
    complex: function () {
        fetch('http://localhost:4500/beginner/complex', {
            method: 'POST',
            headers: {
                "Content-Type": "text/html"
            }
        });
    },
    json: function () {
        fetch('http://localhost:4500/beginner/beginnerJSON', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
}

getResponse.simple();
getResponse.complex();
getResponse.json();