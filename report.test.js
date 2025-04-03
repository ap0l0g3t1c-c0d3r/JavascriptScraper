const { sortPages } = require("./report.js")
const { test , expect} = require("@jest/globals")

test("Sorting Pages", ()=> {
    const input = 
    {
     "https://blog.boot.dev/path": 1,
     "https://blog.boot.dev" : 3 
    }
    const actual = sortPages(input)
    const expected = [
        ["https://blog.boot.dev", 3],
        ["https://blog.boot.dev/path", 1]
    ]
    expect(actual).toEqual(expected)
    // expect(normaliseURL("string q")).toBe("string q")
})


test("Sorting Multiple Pages", ()=> {
    const input = 
    {
     "https://blog.boot.dev/path": 1,
     "https://blog.boot.dev" : 3,
     "https://blog.boot.dev/admin" : 2,
     "https://blog.boot.dev/prank" : 8,
     "https://blog.boot.dev/test" : 4   
    }
    const actual = sortPages(input)
    const expected = [
        ["https://blog.boot.dev/prank", 8],
        ["https://blog.boot.dev/test", 4],
        ["https://blog.boot.dev", 3],
        ["https://blog.boot.dev/admin", 2],
        ["https://blog.boot.dev/path", 1]
    ]
    expect(actual).toEqual(expected)
    // expect(normaliseURL("string q")).toBe("string q")
})