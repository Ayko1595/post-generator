require("dotenv").config();
const request = require("supertest");
const jwt = require("jsonwebtoken");

const config = require("../config");
const AppHelper = require("../utils/AppHelper");
const app = new AppHelper(8080);

let server, agent;
let token;

const testImage = __dirname + "/test-files/airport.jpg";
const testAudio = __dirname + "/test-files/airport.m4a";

beforeAll((done) => {
  token = jwt.sign({ client: config["clientId"] }, config["secret"], {
    ...config["claims"],
  });

  done();
});

beforeEach((done) => {
  server = app.start((err) => {
    if (err) return done(err);

    agent = request.agent(server);
    done();
  });
});

afterEach((done) => {
  return server && server.close(done);
});

// describe("POST /auth", () => {
//   it("should get a 200 and a token when the correct credentials are sent", (done) => {
//     agent
//       .post("/auth")
//       .set("Authorization", config["clientId"])
//       .end((_, res) => {
//         expect(res.statusCode).toEqual(200);
//         expect(res.header["Authorization"]).not.toBeNull();
//         done();
//       });
//   });
// });

describe("POST /generateVideos", () => {
  it("should get a 200 when form data contains correct fields and files", (done) => {
    agent
      .post("/generateVideos")
      .set("authorization", `Bearer ${token}`)
      .field("images", JSON.stringify({}))
      .attach("imageFiles", testImage)
      .field("audio", JSON.stringify({}))
      .attach("audioFiles", testAudio)
      .end((_, res) => {
        expect(res.statusCode).toEqual(200);
        expect(res.header["content-type"]).toEqual("application/zip");
        done();
      });
  });

  // it("should get a 401 when form data contains correct fields and files but no token is sent", (done) => {
  //   agent
  //     .post("/generateVideos")
  //     .field("images", JSON.stringify({}))
  //     .attach("imageFiles", testImage)
  //     .field("audio", JSON.stringify({}))
  //     .attach("audioFiles", testAudio)
  //     .end((_, res) => {
  //       expect(res.statusCode).toEqual(401);
  //       done();
  //     });
  // });

  it("should get a 403 when body is NOT empty.", (done) => {
    agent
      .post("/generateVideos")
      .set("authorization", `Bearer ${token}`)
      .send({ test: "test" })
      .end((_, res) => {
        expect(res.statusCode).toEqual(403);
        done();
      });
  });

  it("should get a 403 when form data contains correct fields but no files", (done) => {
    agent
      .post("/generateVideos")
      .set("authorization", `Bearer ${token}`)
      .field("images", JSON.stringify({}))
      .attach("imageFiles", undefined)
      .field("audio", JSON.stringify({}))
      .attach("audioFiles", undefined)
      .end((_, res) => {
        expect(res.statusCode).toEqual(403);
        done();
      });
  });

  it("should get a 400 when form data contains incorrect fields", (done) => {
    agent
      .post("/generateVideos")
      .set("authorization", `Bearer ${token}`)
      .field("images", JSON.stringify({}))
      .attach("imageFilez", testImage)
      .field("audio", JSON.stringify({}))
      .attach("audioFilez", testAudio)
      .end((_, res) => {
        expect(res.statusCode).toEqual(400);
        done();
      });
  });

  it("should get a 415 when form data only contains images in both fields", (done) => {
    agent
      .post("/generateVideos")
      .set("authorization", `Bearer ${token}`)
      .field("images", JSON.stringify({}))
      .attach("imageFiles", testImage)
      .field("audio", JSON.stringify({}))
      .attach("audioFiles", testImage)
      .end((_, res) => {
        expect(res.statusCode).toEqual(415);
        done();
      });
  });

  it("should get a 415 when form data only contains audio files in both fields", (done) => {
    agent
      .post("/generateVideos")
      .set("authorization", `Bearer ${token}`)
      .field("images", JSON.stringify({}))
      .attach("imageFiles", testAudio)
      .field("audio", JSON.stringify({}))
      .attach("audioFiles", testAudio)
      .end((_, res) => {
        expect(res.statusCode).toEqual(415);
        done();
      });
  });
});
