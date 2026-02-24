// 1. 抓取网址里的线索。比如点击第一篇文章，网址会变成 article.html?id=1，我们要把“1”抓出来
const urlParams = new URLSearchParams(window.location.search);
const articleId = parseInt(urlParams.get('id'));

// 2. 拿着抓到的 ID，去我们的数据库 (data.js) 里找找看是哪篇文章
const articleInfo = articles.find(a => a.id === articleId);

// 3. 找到网页里用来放文章的那个白板
const contentDiv = document.getElementById('markdown-content');

if (articleInfo) {
    // 动态把网页标题改成文章的标题
    document.title = articleInfo.title + " - MyTechBlog";
    
    // 4. 去 posts 文件夹把纯文本文件“拿”过来
    fetch('posts/' + articleInfo.fileName)
        .then(response => {
            if (!response.ok) {
                throw new Error('找不到文件');
            }
            return response.text(); // 把文件变成纯文本
        })
        .then(markdownText => {
            // 5. 见证奇迹：让 marked.js 把纯文本翻译成 HTML，塞进白板里！
            contentDiv.innerHTML = marked.parse(markdownText);
        })
        .catch(error => {
            contentDiv.innerHTML = '<h2>哎呀，出错了！</h2><p>找不到这篇文章的 .md 文件，请检查 posts 文件夹。</p>';
        });
} else {
    // 如果在数据库里没找到这个 ID
    contentDiv.innerHTML = '<h2>找不到该文章</h2><p>请返回首页重新选择。</p>';
}