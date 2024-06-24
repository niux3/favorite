let xhr = async(url, options) => {
    let errorServer = null,
        loading = true,
        data = null,
        params = {
            "method": options['method'],
            "headers": new Headers({
                "X-Requested-With": "XMLHttpRequest",
                "Accept": "application/json",
                "Content-Type": 'application/json'
            }),
            "cache": "no-cache",
            "redirect": "follow",
            "referrerPolicy": "no-referrer",
            "mode": "cors"
        }
    if(options['body'] !== undefined && options['body'].length){
        params['body'] = options['body']
    }

    try {
        const response = await fetch(url, params)
        data = await response.json()
        loading = false
    } catch (err) {
        errorServer = err
        loading = false
    }
    return {data, errorServer, loading}
}
export default xhr
