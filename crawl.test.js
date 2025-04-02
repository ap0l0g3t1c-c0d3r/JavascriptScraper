//jest testing file 

const {normaliseURL, getURLsfromHTML } = require("./crawl.js")
const { test , expect} = require("@jest/globals")

test("Normalize URL by stripiing protocol", ()=> {
    const input = "https://blog.boot.dev/path"
    const actual = normaliseURL(input)
    const expected = "blog.boot.dev/path"
    expect(actual).toEqual(expected)
    // expect(normaliseURL("string q")).toBe("string q")
})

test("Normalize strip trailing slash", ()=> {
    const input = "https://blog.boot.dev/path/"
    const actual = normaliseURL(input)
    const expected = "blog.boot.dev/path"
    expect(actual).toEqual(expected)
})

test("Normalize capitals", ()=> {
    const input = "https://BLOG.boot.dev/path/"
    const actual = normaliseURL(input)
    const expected = "blog.boot.dev/path"
    expect(actual).toEqual(expected)
})

test("GetURLfromHTML absolute URL", ()=> {
    const inputHTMLBody = 
    `<html>
        <body>
        <a href="https://blog.boot.dev/path/">
            Boot.dev Blog
        </a>    
        </body>
    </html>`
    
    const baseURL = "https://blog.boot.dev/path/"
    const actual = getURLsfromHTML(inputHTMLBody, baseURL)
    const expected = ["https://blog.boot.dev/path/"]
    expect(actual).toEqual(expected)
})

test("GetURLfromHTML reference URL", ()=> {
    const inputHTMLBody = 
    `<html>
        <body>
        <a href="/path/">
            Boot.dev Blog
        </a>    s
        </body>
    </html>`
    
    const baseURL = "https://blog.boot.dev"
    const actual = getURLsfromHTML(inputHTMLBody, baseURL)
    const expected = ["https://blog.boot.dev/path/"]
    expect(actual).toEqual(expected)
})

test("GetURLfromHTML absolute and reference URL", ()=> {
    const inputHTMLBody = 
    `<html>
        <body>
        <a href="/path1/">
            Boot.dev Blog
        </a>
        <a href="https://blog.boot.dev/path2/">
            Boot.dev Blog
        </a>
        </body>
    </html>`
    
    const baseURL = "https://blog.boot.dev"
    const actual = getURLsfromHTML(inputHTMLBody, baseURL)
    const expected = ["https://blog.boot.dev/path1/","https://blog.boot.dev/path2/"]
    expect(actual).toEqual(expected)
})

test("GetURLfromHTML Invalid URL", ()=> {
    const inputHTMLBody = 
    `<html>
        <body>
        <a href="invalid">
            Boot.dev Blog
        </a>
        </body>
    </html>`
    
    const baseURL = "https://blog.boot.dev"
    const actual = getURLsfromHTML(inputHTMLBody, baseURL)
    const expected = []
    expect(actual).toEqual(expected)
})