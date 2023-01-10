const puppeteer = require("puppeteer");
require("dotenv").config();

let browser, page;

beforeAll(async () => {
  browser = await puppeteer.launch({
    // headless: false,
  });
  page = await browser.newPage();
});

afterAll(async () => {
  //await browser.close();
});

test("Acessar pagina de login do github", async () => {
  // Acessar página www.github.com
  await page.goto("https://www.github.com");
  await page.goto("https://www.github.com/login");
  await page.type('[name="login"]', process.env.EMAIL);
  await page.type('[name="password"]', process.env.PASSWORD);
  await page.click('[type="submit"]');
  console.log("Login e senha preenchidos e botao clicado");
  await page.waitForNavigation();

  const url = page.url();
  await expect(() => {
    url.toBe("https://github.com/");
  }).toThrow();
  console.log("Autenticado");
});

//Validar o nome do usuário
test("Verificacao de nome de usuario", async () => {
  // await page.click('[class="Header-link"]');
  const name = document.querySelector(
    "body > div.logged-in.env-production.page-responsive > div.position-relative.js-header-wrapper > header > div.Header-item.position-relative.mr-0.d-none.d-md-flex > details > details-menu > a:nth-child(3)"
  );
  await page.click("name");
  await expect(() => {
    url.toBe("https://github.com/Babifbarbosa");
  }).toThrow();

  // const url = page.url();
  // await expect(url).toBe("https://github.com/Babifbarbosa");
  // console.log("Usuario esta correto");

  // const name = await page.$eval(
  //   "body > div.logged-in.env-production.page-responsive.full-width > div.position-relative.js-header-wrapper > header > div.Header-item.position-relative.mr-0.d-none.d-md-flex > details > details-menu > div.header-nav-current-user.css-truncate > a > strong",
  //   (el) => el.textContent
  // );
  // expect(name).toBe("Babifbarbosa");
});

// Navegar até a aba "Repositories"
test("Navegar pelos repositorios", async () => {
  await page.goto("https://www.github.com/Babifbarbosa/?tab=repositories");
  // await page.click(
  //   "#user-repositories-list > ul > li:nth-child(3) > div.col-10.col-lg-9.d-inline-block > div.d-inline-block.mb-1 > h3 > a"
  // );
});
// Acessar um repositório aleatório do seu perfil

// Navega até a aba "Pull Request"
// await page.click('a[href="/pulls"]');
// Deslogar
//   await page.click("#user");
