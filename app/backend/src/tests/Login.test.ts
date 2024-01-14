import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";

import { Response } from "superagent";

import UserModel from "../database/models/20240110191218-login";
import LoginMock from "./mocks/LoginMock";
import { sign } from "../utils/token.utils";
import {tokenValido, tokenInvalido} from './mocks/loginRole.mock'

chai.use(chaiHttp);

const { expect } = chai;

describe("/login", () => {
  describe("post/ login", () => {
    let chaiHttpResponse: Response;
    let findAllStub: sinon.SinonStub;

    beforeEach(function () {
      sinon.restore();
    });

    it("verificando login com email e senha valido retorna o token", async () => {
      const userValid = LoginMock.loginValid;
      const mockUser = UserModel.build(LoginMock.user);

      sinon.stub(UserModel, "findOne").resolves(mockUser);

      const ServiceResponse = await chai
        .request(app)
        .post("/login")
        .send(userValid);
      console.log(ServiceResponse);
      expect(ServiceResponse.status).to.equal(200);
      expect(ServiceResponse.body).to.have.key("token");
    });

    it("verificando login com email invalido retorna erro", async () => {
      const emailIncorreto = LoginMock.emailInvalid;

      const ServiceResponse = await chai
        .request(app)
        .post("/login")
        .send(emailIncorreto);
      console.log(ServiceResponse);

      expect(ServiceResponse.status).to.equal(401);
      expect(ServiceResponse.body).to.deep.equal({
        message: "Invalid email or password",
      });
    });

    it("verificando login com email com formato invalido retorna erro", async () => {
      const emailIncorreto = LoginMock.emailIvalid2;

      const ServiceResponse = await chai
        .request(app)
        .post("/login")
        .send(emailIncorreto);
      console.log(ServiceResponse);

      expect(ServiceResponse.status).to.equal(401);
      expect(ServiceResponse.body).to.deep.equal({
        message: "Invalid email or password",
      });
    });

    it("verificando login com email vazio retorna erro", async () => {
      const emailIncorreto = LoginMock.emailVazio;

      const ServiceResponse = await chai
        .request(app)
        .post("/login")
        .send(emailIncorreto);
      console.log(ServiceResponse);

      expect(ServiceResponse.status).to.equal(400);
      expect(ServiceResponse.body).to.deep.equal({
        message: "All fields must be filled",
      });
    });

    it("verificando login com senha invalida retorna erro", async () => {
      const passwordInvalid = LoginMock.passwordInvalid;

      const ServiceResponse = await chai
        .request(app)
        .post("/login")
        .send(passwordInvalid);
      console.log(ServiceResponse);

      expect(ServiceResponse.status).to.equal(401);
      expect(ServiceResponse.body).to.deep.equal({
        message: "Invalid email or password",
      });
    });
  });
});

describe("get/post", () => {
  it("verificando se retorna a role", async () => {
    const getToken = sign(tokenValido);

    const response = await chai
      .request(app)
      .get("/login/role")
      .set("Authorization", `Bearer ${getToken}`);

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({role:'admin'})
  });
    it("verificando se retorna erro com token vazio ", async () => {

      const response = await chai
        .request(app)
        .get("/login/role")
        .set("Authorization", ``);

      expect(response.status).to.equal(401);
      expect(response.body).to.deep.equal({ message: "Token not found" });
    });
        it("verificando se retorna erro com token invalido ", async () => {
          const response = await chai
            .request(app)
            .get("/login/role")
            .set("Authorization", `Bearer ${tokenInvalido}`);

          expect(response.status).to.equal(401);
          expect(response.body).to.deep.equal({
            message: "Token must be a valid token",
          });
        });
});
