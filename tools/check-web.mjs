import {chromium} from '../web/node_modules/playwright-chromium/index.mjs';
import fs from 'node:fs/promises';
const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
const page=await browser.newPage({viewport:{width:1280,height:720},deviceScaleFactor:1});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
const results=[];
try {
 for(let i=1;i<=3;i++) {
  await page.goto(`http://localhost:3031/${i}`,{waitUntil:'networkidle'});
  await page.locator('.sample-page:visible').waitFor();
  await page.screenshot({path:`output/previews/web-${i}.png`});
  results.push(await page.locator('.sample-page:visible').evaluate(el=>({text:el.innerText,images:[...el.querySelectorAll('img')].map(im=>({loaded:im.complete&&im.naturalWidth>0,source:im.getAttribute('src')})),overflow:[...el.querySelectorAll('div')].filter(n=>n.scrollHeight>n.clientHeight+2||n.scrollWidth>n.clientWidth+2).map(n=>n.innerText)})));
 }
 await page.goto('http://localhost:3031/1',{waitUntil:'networkidle'});
 await page.keyboard.press('ArrowRight');
 await page.waitForURL('**/2');
 results.push({keyboardNavigation:true});
 await page.setViewportSize({width:960,height:600});
 await page.screenshot({path:'output/previews/web-small.png'});
 await fs.writeFile('.build/web-validation.json',JSON.stringify({errors,results},null,2));
 console.log(JSON.stringify({errors,slides:results.slice(0,3).map((r,i)=>({slide:i+1,images:r.images,overflow:r.overflow})),keyboardNavigation:true},null,2));
} finally {await browser.close();}


