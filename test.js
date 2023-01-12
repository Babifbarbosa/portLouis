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
  console.log(repositoriesNumber);

  const links = await page.$$(".wb-break-all > a");
  console.log(links.length);

  // const repositorioLink = await page.$eval(
  //   links[Math.floor(Math.random() * repositoriesNumber) ,
  //   (el) => el.innerHTML
  // );

  await links[Math.floor(Math.random() * repositoriesNumber)].click();
  console.log(x);
  // await page.click('[id="pull-requests-tab"]');

  // Navega até a aba "Pull Request"
  // const url = page.url();
  // console.log(url);

  // await page.$eval(
  //   "#repository-container-header > nav > ul > li:nth-child(3)",
  //   (el) => el.click()
  // );
});

// Deslogar
//   await page.click();
