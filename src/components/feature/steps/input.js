const { Given } = require("cucumber");

Given("I enter {string} as my {string2}", async function (string, string2) {
  const el = await this.page.$(`[data-test="${string2}"]`);
  await el.type(string);
  return el;
});
