// 1. 找到我们要放卡片的地方（就是我们在 HTML 里写的 id="article-list" 的那个 div）
const articleListContainer = document.getElementById('article-list');

// 2. 准备一个空盒子，用来装我们即将生成的 HTML 代码
let htmlContent = '';

// 3. 让 JavaScript 把我们刚才在 data.js 里写的文章列表挨个看一遍
articles.forEach(function(article) {
    // 每次看到一篇文章，就按照这个模板生成一张卡片的 HTML 代码
    htmlContent += `
        <article class="card">
            <h2>${article.title}</h2>
            <p class="date">${article.date}</p>
            <p class="summary">${article.summary}</p>
            <a href="article.html?id=${article.id}" class="read-more">阅读全文 &rarr;</a>
        </article>
    `;
});

// 4. 把生成好的所有卡片代码，一次性塞进网页里！
articleListContainer.innerHTML = htmlContent;