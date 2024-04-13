/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */


import puppeteer from "@cloudflare/puppeteer";


export interface Env {
	MYBROWSER: Fetcher;
}
export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const browser = await puppeteer.launch(env.MYBROWSER);
  	const page = await browser.newPage();
		await page.setContent('<h1>HELLO CLOUDFLARE</h1>', {
			waitUntil: 'networkidle0',
    });

		const pdf = await  page.pdf({ displayHeaderFooter: true })
    .then((buff) => {
			console.log('SUCCESS');
      return buff;
    })
    .finally(async () => {
      await browser.close();
    });

		return new Response(pdf, { headers: {
			'Content-Type': 'application/pdf',
			'Content-Length': String(pdf.length),
		}});
	},
};
