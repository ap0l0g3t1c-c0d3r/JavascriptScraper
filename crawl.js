const { JSDOM } = require("jsdom")


async function crawlPage(websiteLink){
    console.log(`fetching data from ${websiteLink}`)

    try {
        const res = await fetch(websiteLink)

        if( res.status > 399 ){
            console.log(`Error in fetch with status code: ${res.status}`)
            return
        }

        const contentType = res.headers.get("content-type")

        if(!contentType.includes("text/html")){
            console.log(`Non-HTML responce: content-Type ${contentType}`)
            return
        }

        console.log(await res.text())        
    } catch (error) {
        console.log(`Error in fetching data ${error} from ${websiteLink}`)
    }

}

function getURLsfromHTML(htmlBody, baseURL){
    let url = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll("a")
    for(let linkElement of linkElements){
        // console.log(linkElement.href)
        if(linkElement.href.slice(0,1) === "/"){
            try {
                //relative URl
                const urlObj = new URL(`${baseURL}${linkElement.href}`)
                url.push(urlObj.href)
           } catch (error) {
                console.log("Error with relative URL:", error.message)
           }
        }else{
            try {
                //absolute url
                const urlObj = new URL(`${linkElement.href}`)
                url.push(urlObj.href)
           } catch (error) {
                console.log("Error with absolute URL:", error.message)
           }
        }
    }
    return url
}

function normaliseURL(urlstring){
    const urlObj = new URL(urlstring)
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`
    if(hostPath.length > 0 && hostPath.slice(-1) === "/"){
        return hostPath.slice(0,-1)
    }
    return hostPath
}

module.exports = {
    normaliseURL,
    getURLsfromHTML,
    crawlPage
}