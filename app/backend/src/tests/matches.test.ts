import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";

import { Response } from "superagent";

import UserModel from "../database/models/20240110191218-login";
import LoginMock from "./mocks/LoginMock";
import { sign } from "../utils/token.utils";
import { tokenValido, tokenInvalido } from "./mocks/loginRole.mock";

chai.use(chaiHttp);

const { expect } = chai;

describe("/Matches", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should return matches when a valid token is provided", async () => {
    const getToken = sign(tokenValido);
    const response: Response = await chai
      .request(app)
      .get("/matches")
      .set("Authorization", `Bearer ${getToken}`);

    expect(response.status).to.equal(200);
  });
});
