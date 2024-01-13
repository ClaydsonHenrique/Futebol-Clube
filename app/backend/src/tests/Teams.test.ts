import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";

import { Response } from "superagent";

chai.use(chaiHttp);

const { expect } = chai;

describe("/teams", () => {
  describe("GET/ teams", () => {
    let chaiHttpResponse: Response;
    let findAllStub: sinon.SinonStub;
    
    beforeEach(function () {
      sinon.restore();
    });

    it("listando todos os times", async () => {
      const httpResponse = await chai.request(app).get("/teams").send();
      expect(httpResponse.status).to.equal(200);
    });
    
    it("listando todos os times", async () => {
      const httpResponse = await chai.request(app).get("/teams/1").send();
      expect(httpResponse.status).to.equal(200);
    });
  });
});
