if(!self.define){let e,s={};const i=(i,d)=>(i=new URL(i+".js",d).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(d,a)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let r={};const f=e=>i(e,c),n={module:{uri:c},exports:r,require:f};s[c]=Promise.all(d.map((e=>n[e]||f(e)))).then((e=>(a(...e),r)))}}define(["./workbox-6c3e5c38"],(function(e){"use strict";e.setCacheNameDetails({prefix:"eleventy-plugin-pwa-v2"}),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"404.html",revision:"38672cda7694345f019c3285ffde1560"},{url:"about/index.html",revision:"eaa3564f85ac34891b967cf8ff913d7c"},{url:"blog/index.html",revision:"dbe92e5834bfe5287b830c4ee76ccc7e"},{url:"canopy/essay1/canop1/index.html",revision:"f134cfde6ffe29d7e89ce4bdfb07d150"},{url:"canopy/essay1/canopy2/index.html",revision:"bc9b0c6bcd068ae6008685f10cfc039e"},{url:"canopy/essay1/canopy3/index.html",revision:"b7fdc4644fdca666b15a8ca07dfdfcf7"},{url:"canopy/essay2/five/index.html",revision:"f22ca1d1b896d545414dd62ea2fdab84"},{url:"canopy/essay2/four/index.html",revision:"eaa1822cc412d4e1623d8dc672b259e8"},{url:"canopy/essay2/six/index.html",revision:"f5add48f228ef79760675c452dfa6296"},{url:"contact/index.html",revision:"0b89c8b1a2f25844dfc9bcdfe6fc4642"},{url:"crosscurrents/essay1/firstpost/index.html",revision:"c8a71952d907a082adc77130399c7c22"},{url:"crosscurrents/essay1/secondpost/index.html",revision:"62f2a90ce6065f1da675dd120b6d4536"},{url:"crosscurrents/essay1/thirdpost/index.html",revision:"8fd1a0b990c6f5ae8e91b00f998e600c"},{url:"crosscurrents/essay2/five/index.html",revision:"012ee5998a23d67894daa075b339f6f0"},{url:"crosscurrents/essay2/four/index.html",revision:"06f9b1f503dfdee844dccb7a56d5e969"},{url:"crosscurrents/essay2/six/index.html",revision:"f62529589d77ebc445861b5e2e54f6e6"},{url:"css/index.css",revision:"2ce6b20a84e74fbceff2563dee7c072b"},{url:"css/outcome.css",revision:"19bec7382dc45acedf33f7da766eefbe"},{url:"css/prism-diff.css",revision:"9eb6ba0ad1d217d8dd3625b6b3431b62"},{url:"dist/rJ3_G-2ArF.js",revision:"ac88ab69bb3da47bc2ca3372082b724b"},{url:"featured/essay1/feature1/index.html",revision:"cdd577af25f6a6cf5ee30ddec2bed3cf"},{url:"featured/essay1/feature2/index.html",revision:"ef3e2cfc2de79f8d11e1bb8575b07862"},{url:"featured/essay1/feature3/index.html",revision:"e83c88950e92f551d0eb87c29f8c5a69"},{url:"featured/essay2/five/index.html",revision:"2b0918b8478b0a36e6ffbd0356712cda"},{url:"featured/essay2/four/index.html",revision:"f4dd7df5bfeb90f5fe70bc5d761f33e2"},{url:"featured/essay2/six/index.html",revision:"2676c6d3593f69b4a7f4af2f23af74e5"},{url:"how-to-submit/index.html",revision:"513fcfec3a2165851e433529492451dd"},{url:"img/logo-ls.jpg",revision:"51dce1a7df0cd2bd31a06cd4fbbcd6e4"},{url:"img/logo-ls.png",revision:"f5e085c746ce1612659e8d66c2b8b58b"},{url:"img/logo.jpg",revision:"e3f9f7a5f51ac688270d25398467498c"},{url:"img/logo.png",revision:"7fbb58c5710f6b898875b76d42494e05"},{url:"img/logosmall.jpg",revision:"f263c7433909fb393e930c5456566d81"},{url:"img/logosmall.png",revision:"56e8402123cbcfa0bf30a1ca44b5fa78"},{url:"img/orchid.svg",revision:"9467c77e7a6426087722c0712ed02b17"},{url:"index.html",revision:"4e4b48f8639fe8f9d8489a0f7663bc20"},{url:"JCREOR/essay1/ones/index.html",revision:"f56d8fda040af53eba74d9b266d477bf"},{url:"JCREOR/essay1/treo/index.html",revision:"4de34cf6e8e77ffe29f5a1e620899a98"},{url:"JCREOR/essay1/twoes/index.html",revision:"0d878247b0c038baf1d28aeecc637d4d"},{url:"JCREOR/essay2/five/index.html",revision:"c43516ca18a35b7d47037642762e1a42"},{url:"JCREOR/essay2/four/index.html",revision:"2bdeab93d8f183fe74e4887eeeea55f5"},{url:"JCREOR/essay2/six/index.html",revision:"a83a297a8e8e959e4d4a1fbfe71e254f"},{url:"js/color.js",revision:"1ed61913c8cac8b9c7ec93261b4ee475"},{url:"js/index.js",revision:"ae2306eb36254193680e88b59579d0e9"},{url:"logo.png",revision:"7fbb58c5710f6b898875b76d42494e05"},{url:"manifest.json",revision:"9395af2ba69c7b157add771942aade6f"},{url:"pagefind/pagefind-entry.json",revision:"e7e52ab5dce08d9962f760a8e33cff57"},{url:"pagefind/pagefind-highlight.js",revision:"9884f0f1d546e073cc0aff4442619b05"},{url:"pagefind/pagefind-modular-ui.css",revision:"8ba82b0fc3b73d70717347223422b193"},{url:"pagefind/pagefind-modular-ui.js",revision:"b79d9423fdf7ec284d9d2e8aa22c2b3e"},{url:"pagefind/pagefind-ui.css",revision:"f3a0c2b7836ea429ca865b4807d76e60"},{url:"pagefind/pagefind-ui.js",revision:"a7d4f7d6c22e2d7f89268d9d5296cda9"},{url:"pagefind/pagefind.js",revision:"8c4fde1dd47f0e2e73b72c0b6691bdaa"},{url:"service-worker.js.map",revision:"66885fc5ca9413668d63425c6450d9c6"},{url:"tags/another-tag/index.html",revision:"d9ac9eb0541f27efc45339f1ec83c77a"},{url:"tags/canopys/index.html",revision:"22ac22e9dcd941b01522d769075624c1"},{url:"tags/cro-esaysones/index.html",revision:"ddeadc2d7ce697505102334ec7d253df"},{url:"tags/cro-esaystwos/index.html",revision:"59e55ebcfe978a31c9cca9ff5a7b084f"},{url:"tags/croesaysones/index.html",revision:"1bf6a8f36ffd33a95df65881dda2c9e1"},{url:"tags/croesaystwos/index.html",revision:"cb7cfacad58f516796981d3b5309e66c"},{url:"tags/crosscurrentss/index.html",revision:"fd55a37a1d708c83642812b9dc1c2846"},{url:"tags/esaysones/index.html",revision:"c0e8e30a8b44b18714d09fbb88b74e00"},{url:"tags/esaystwos/index.html",revision:"61d7ce59da49f0d2199d6720e61862c3"},{url:"tags/f-esaysones/index.html",revision:"2b604a78d163cc28c91c7e0ef98610c7"},{url:"tags/f-esaystwos/index.html",revision:"093ffe287f987402acdf43cb575c4e5e"},{url:"tags/features/index.html",revision:"eeeaf21131aa388fe5116f3a0b20faa3"},{url:"tags/fesaysones/index.html",revision:"7d628bbb9f912eb4c9a6c82c60ecb626"},{url:"tags/fesaystwos/index.html",revision:"66bddde66b47b83fb90da21a15d5f1c0"},{url:"tags/index.html",revision:"b63e82a756e58257ea1e166c0e942f79"},{url:"tags/jc-esaysones/index.html",revision:"499f4622ff97d3dba9683f4116337ec6"},{url:"tags/jc-esaystwos/index.html",revision:"6e3e40378d1533fc8c1fa4b408a299ad"},{url:"tags/jcesaysones/index.html",revision:"26e15bb9f405bd41d7a9672f2674cc76"},{url:"tags/jcesaystwos/index.html",revision:"c13f791d7b46de555ba1d4bbd129c01a"},{url:"tags/jcreors/index.html",revision:"f9a7b1c52bcc68585346035bd8b1bd96"},{url:"tags/number-2/index.html",revision:"00bda61c49ee57aeeb6518bda5d8760e"},{url:"tags/number-3/index.html",revision:"b9d9f7b4031d6016dbb13d25917e6dba"},{url:"tags/posts-with-two-tags/index.html",revision:"4dfcb3b02c481dc6b3d70fd4a80a7efa"},{url:"tags/second-tag/index.html",revision:"b8d979e97dcc925e6581ef44713aa7aa"},{url:"workbox-6c3e5c38.js.map",revision:"18e6c56f0ff7da962927393e57a41796"}],{}),e.registerRoute(/^.*\.(html|jpg|png|gif|webp|ico|svg|woff2|woff|eot|ttf|otf|ttc|json)$/,new e.StaleWhileRevalidate,"GET"),e.registerRoute(/^https?:\/\/fonts\.googleapis\.com\/css/,new e.StaleWhileRevalidate,"GET")}));
//# sourceMappingURL=service-worker.js.map
