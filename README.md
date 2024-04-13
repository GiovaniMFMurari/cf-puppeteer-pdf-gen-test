
## Steps

- Created "Hello World" with "Typescript" worker with `npm create cloudflare@latest`;
- Set up wrangler config and env vars;
- Wrote a simple PDF generation fetch;
- Run `wrangler dev --remote`;
- Called the worker;

## The Problem
In the current implementation  of the Page.pdf method in the @cloudflare/puppeteer fork, the Readable stream returned by Page.createPDFStream is converted to a Buffer by the function getReadableAsBuffer in puppeteer/src/common
/util.ts, where the problem is at. The getReadableAsBuffer function tries to iterate over a non iterable object(node:stream/Readable), what causes an exception. 
```
✘ [ERROR] Uncaught (in response) TypeError: readable is not async iterable

      at getReadableAsBuffer
      at Page.pdf
      at async Object.fetch
      at async drainBody
```

It can be easily solved by using Page.createPDFStream directly, but is still an issue which is not present in the @puppeteer/puppeteer-core package.
