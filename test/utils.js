import { expect } from 'chai'
import { baseURL, runRequest, makeQueryString, buildBatchQuery  } from '../src/clients/utilities'

describe("baseURL", function(){
    it("Should be the HTTP based API URL", function(){
        expect(baseURL).to.equal("https://api.iextrading.com/1.0");
    })
})

describe('makeQueryString', function(){
    it("Should build a query string from an object with simple keys", function(){
        let queryString = makeQueryString({
            a: 5,
            b: "something",
            c: 10
        })

        expect(queryString).to.equal("?a=5&b=something&c=10")
    })
})

describe('buildBatchQuery', function () {
    it("Should transform arrays into comma separated lists", function(){
        let batchQuery = buildBatchQuery( 
            ["fb", "SNAP"], 
            [ "chart", "news" ],
            5,
            ["a", "b"]
        );

        expect(batchQuery).to.equal("?symbols=fb,SNAP&types=chart,news&range=5&filters=a,b");
    })

    it("Should drop parameters that aren't specified", function(){
        let batchQuery = buildBatchQuery( 
            ["fb", "SNAP"], 
            [ "chart", "news" ]
        );        

        expect(batchQuery).to.equal("?symbols=fb,SNAP&types=chart,news");
    })

    it("Should drop parameters specified as false", function(){
        let batchQuery = buildBatchQuery( 
            ["fb", "SNAP"], 
            [ "chart", "news" ],
            false,
            ["b"]
        );         

        expect(batchQuery).to.equal("?symbols=fb,SNAP&types=chart,news&filters=b");
    })

    it("Should allow non-array values", function(){
        let batchQuery = buildBatchQuery( 
            "fb", 
            "chart"
        );         

        expect(batchQuery).to.equal("?symbols=fb&types=chart");
    })    
})

describe("runRequest", function() {
    let response = null;

    beforeEach(() => {
        response = runRequest("/ref-data/symbols");
    })

    it("Should function as a promise", function(){
        return response.then(data => {
            expect(data).to.exist;
        })
    })

    it("Should return an array", function(){
        return response.then(data => expect(data).to.be.an('array'))
    })

    it("Should return an array of objects", function(){
        return response.then(data => expect(data[0]).to.be.an('object'))
    })
})