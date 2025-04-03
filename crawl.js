const { JSDOM } = require("jsdom")

//baseURl and websiteLink to be checked
//we would hold the url that we have crawled in pages
async function crawlPage(baseURL, websiteLink, pages){
    
    const baseURLObj = new URL(baseURL)
    const currentURLObj = new URL(websiteLink)
    if(baseURLObj.hostname !== currentURLObj.hostname){
        return pages //so we only crawl pages where we have same hostname
    }
    
    const normalisedURL = normaliseURL(websiteLink)  
    if(pages[normalisedURL] > 0){
        pages[normalisedURL]++
        return pages
    }
    
    pages[normalisedURL] = 1
    
    console.log(`fetching data from ${websiteLink}`)
    

    try {
        const res = await fetch(websiteLink)

        if( res.status > 399 ){
            console.log(`Error in fetch with status code: ${res.status}`)
            return pages
        }

        const contentType = res.headers.get("content-type")

        if(!contentType.includes("text/html")){
            console.log(`Non-HTML responce: content-Type ${contentType}`)
            return pages
        }

        const htmlBody = await res.text()        
        const nextURLs = getURLsfromHTML(htmlBody, baseURL)

        //we would iterate over all the links until we have scraped all the pages
        //or the only pages that are left are for external links
        for(const nextURL of nextURLs){
            pages = await crawlPage(baseURL, nextURL, pages)
        }

    } catch (error) {
        console.log(`Error in fetching data ${error} from ${websiteLink}`)
    }
    return pages
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