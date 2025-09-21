// ==================================
// HTML -> plain text helper using html-to-text with safe defaults.
// ==================================


import { htmlToText } from 'html-to-text';


export function stripHtml(html) {
return htmlToText(html || '', {
wordwrap: false,
selectors: [
{ selector: 'a', options: { ignoreHref: true } },
{ selector: 'img', format: 'skip' },
{ selector: 'script', format: 'skip' },
{ selector: 'style', format: 'skip' }
]
});
}