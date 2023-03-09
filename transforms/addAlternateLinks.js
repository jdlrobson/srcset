import { getLanguageLinks } from './utils.js';

const record = [];

const transform = ([ langLinks ]) => {
    const head = document.querySelector("head");
    langLinks.forEach((lang) => {
      const link = document.createElement('link');
      link.setAttribute('hreflang', lang.code);
      link.setAttribute('rel', 'alternate');
      link.setAttribute('href', lang.href);
      head.appendChild(link);
    });
};

const getArgs = async (context, slug) => {
  const langLinks = await getLanguageLinks(context, slug);
  record.push(langLinks.length);
  return Promise.resolve([ langLinks ]);
};

const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

const report = () => {
  const avg = record.reduce((a, b) => (a + b)) / record.length;
  const min = Math.min.apply(null, record);
  const max = Math.max.apply(null, record);
  return `Average language links per page=${avg}, Max = ${max}, Min = ${min}, Median = ${median(record)}`;
};

export default {
    name: 'AlternateLinks',
    getArgs,
    transform,
    report
};
