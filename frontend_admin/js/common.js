function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// base ajax get with auth
function ajaxAuthGet(url, success, error) {
    return $.ajax({
        url: url,
        type: 'get',
        headers: {
            Authorization: auth
        },
        dataType: 'json',
        success: success,
        error: error
    });
}

// base ajax post with auth
function ajaxAuthPosturl, data, success, error) {
    return $.ajax({
        url: url,
        type: 'post',
        headers: {
            Authorization: auth
        },
        data: data,
        dataType: 'json',
        success: success,
        error: error
    });
}