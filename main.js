const {crawlPage} = require("./crawl.js")
const { printReport } = require("./report.js")

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

    printReport(pages)
    
}   

//entry point of the program
main()