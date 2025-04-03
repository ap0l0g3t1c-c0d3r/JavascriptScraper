console.log("Hello this is webScraper")

const {crawlPage} = require("./crawl.js")

function main(){
    if(process.argv.length < 3){
        console.log("Please provide website to crawl")
        process.exit(1)
    }
    
    if(process.argv.length > 3){
        console.log("Too many arguments provided")
        process.exit(1)
    }
    
    const baseURL = process.argv[2]
    
    crawlPage(baseURL)
    
}   

//entry point of the program
main()