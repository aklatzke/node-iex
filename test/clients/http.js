import { expect } from 'chai'
import http from '../../src/clients/http';

describe("HTTP Client", function(){
    it("Should be an object", function(){
        expect(http).to.be.an('object');
    })

    it("Should have appropriate keys", function(){
        expect(http).to.have.keys([
            "batch",
            "market",
            "news",
            "reference",
            "stock",
            "stats",
            "hist"
        ])
    })
})
