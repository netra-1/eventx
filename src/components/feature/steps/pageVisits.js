const { Then, Given } = require("cucumber");
const { myglobal } = require("../support/world");

Then("I should be on the {string} page", async function (string) {
  const el = await this.page.$(`[data-test="${string}"]`);
  return !!el;
}); 

Given("I am on the {string} page", async function (string) {
  switch (string) {
    case "cake":
      const el = await this.page.goto("http://localhost:3000/cake", {
        waitUntil: "networkidle2",
      });
      return el;
    default:
      throw new Error(`${string} is not a supported page name`);
  }
});
