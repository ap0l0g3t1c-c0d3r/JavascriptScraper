console.log("Hello this is webScraper")

const {crawlPage} = require("./crawl.js")

async function main(){
    if(process.argv.length < 3){
        console.log("Please provide website to crawl")
        process.exit(1)
    }
    
    if(process.argv.length > 3){
        console.log("Too many arguments provided")
        process.exit(1)
    }
    
    const baseURL = process.argv[2]
    
    //passing baseURl twice since we want to recursively check all the URLs
    const pages  = await crawlPage(baseURL, baseURL, {})

    for(let page of Object.entries(pages)){
        console.log(page)
    }
    
}   

//entry point of the program
main()