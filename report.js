function printReport(pages){
    console.log("=========")
    console.log("Begin Report")
    console.log("=========")
    
    const sortedPages = sortPages(pages)

    for(const sortedPage of sortedPages){
        console.log(`${sortedPage[0]} has ${sortedPage[1]} instances`)
    }    

    console.log("=========")
    console.log("End Report")
    console.log("=========")
    
} 

function sortPages(pages){
    const pagesArr = Object.entries(pages)
    pagesArr.sort((a,b)=> {
        aHits = a[1]
        bHits = b[1]
        return bHits - aHits
    })
    return pagesArr
}

module.exports = {
    sortPages, 
    printReport
}