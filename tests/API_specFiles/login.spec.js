const { test, expect } = require("@playwright/test");
const axios = require("axios");
const apiTestData = require("../../test_Data/apiTestData.json");
const paylodsFile = require("../../utilities/payloads");
const statuscodesFile = require("../../utilities/statusCodes");
const fs = require("fs");
require("dotenv").config();
const dotenv = require("dotenv");
const envConfig = dotenv.parse(fs.readFileSync(".env"));
const baseUrl = process.env.API_BASE_URL;
const email = process.env.USER_EMAILID;
const password = process.env.API_PASSWORD;
test("Creating auth token using valid user credentials", async () => {
  const endpoint = apiTestData.JoulezMetaData.login.endPoint;
  const payloadData = paylodsFile.loginPayload(email, password);
  const response = await axios.post(`${baseUrl}${endpoint}`, payloadData, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const responseBody = await response.data;
  expect(response.status).toBe(statuscodesFile.STATUS_CODES.OK);
  const accessToken = responseBody.data.jwt;
  envConfig.TOKEN = accessToken;
  const updatedEnv = Object.entries(envConfig)
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");
  fs.writeFileSync(".env", updatedEnv);
});
