'use strict'

const redirect_url = decodeURIComponent(location.search.slice(5)) // remove "?url=" from the start of the string and then decode the URI component

setTimeout(function() {
    // update the location without affecting the back button
    location.href = redirect_url
}, 9000)