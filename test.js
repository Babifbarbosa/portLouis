const puppeteer = require("puppeteer");
require("dotenv").config();

let browser, page;

beforeAll(async () => {
  browser = await puppeteer.launch({
    //headless: false,
  });
  page = await browser.newPage();
});

afterAll(async () => {
  // await browser.close();
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

// //Validar o nome do usuário
test("Verificacao de nome de usuario", async () => {
  const name = await page.$eval(
    '[class="css-truncate css-truncate-target ml-1"]',
    (el) => el.innerHTML
  );
  expect(name).toBe(process.env.GITHUBUSER);
});

// Navegar até a aba "Repositories"
test("Navegar pelos repositorios", async () => {
  await page.goto("https://www.github.com/Babifbarbosa/?tab=repositories");
  const repositoriesNumber = await page.$eval(
    '[class="Counter"]',
    (el) => el.innerHTML
  );
  const randomicNumber = (repositoriesNumber) => {
    return Math.floor(Math.random() * repositoriesNumber + 1);
  };
  const choice = await page.$eval(
    "#user-repositories-list > ul > li:nth-child(randominNumber)",
    (el) => el.innerHTML
  );
  await page.click(choice);
});

// Acessar um repositório aleatório do seu perfil

// Navega até a aba "Pull Request"
// await page.click('a[href="/pulls"]');
// Deslogar
//   await page.click("#user");
