//jest testing file 


const {normaliseURL} = require("./crawl.js")
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