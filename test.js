const puppeteer = require("puppeteer");
require("dotenv").config();

let browser, page;

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
  });
  page = await browser.newPage();
});

afterAll(async () => {
  //await browser.close();
});
// Acessar página www.github.com
test("Acessar pagina de login do github", async () => {
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
  }).toThrow("Nao conseguiu se logar");
  console.log("Autenticado");
});

// //Validar o nome do usuário
test("Verificacao de nome de usuario", async () => {
  const name = await page.$eval(
    '[class="css-truncate css-truncate-target ml-1"]',
    (el) => el.innerHTML
  );
  await expect(() => {
    name.toBe(process.env.GITHUBUSER);
  }).toThrow("Nao foi possivel verificar o nome de usuario");
});

// Navegar até a aba "Repositories" e pull requests
test("Navegar pelos repositorios", async () => {
  await page.goto(`https://www.github.com/Babifbarbosa/?tab=repositories`);
  const repositoriesNumber = await page.$eval(
    '[class="Counter"]',
    (el) => el.innerHTML
  );
  const repositorios = await page.$$eval(".wb-break-all > a", (el) =>
    el.map((element) => element.innerText)
  );
  const NumberRandom = Math.floor(Math.random() * repositoriesNumber);
  const repositorio = repositorios[NumberRandom];
  await page.goto(`https://www.github.com/Babifbarbosa/${repositorio}`);
  await page.click("#pull-requests-tab");
  const url = page.url();
  await expect(() => {
    url.toBe(`https://www.github.com/Babifbarbosa/${repositorio}`);
  }).toThrow("Nao foi possivel navegar ate as paginas de repositorios e pull ");
  console.log("Navegou ate a pagina de pull");
});

// Deslogar
test("Deslogar", async () => {
  await page.click(
    "body > div.logged-in.env-production.page-responsive > div.position-relative.js-header-wrapper > header > div.Header-item.position-relative.mr-0.d-none.d-md-flex > details"
  );
  await page.evaluate(() => {
    document.querySelector('[type="submit"]').click();
  });

  const url = page.url();
  await expect(() => {
    url.toBe("https://github.com");
  }).toThrow("Nao foi possivel deslogar");
  console.log("Deslogou");
});
