const fetch = require('node-fetch');

// ========= 请替换为你自己的信息 ==========
const NETLIFY_TOKEN = "你的Netlify个人访问令牌";
const SITE_ID = "你的Netlify站点ID";
const FORM_ID = "你的表单ID";
// ======================================

exports.handler = async (event, context) => {
    const apiUrl = `https://api.netlify.com/api/v1/sites/${SITE_ID}/forms/${FORM_ID}/submissions`;

    try {
        const res = await fetch(apiUrl, {
            headers: {
                "Authorization": `Bearer ${NETLIFY_TOKEN}`
            }
        });
        const data = await res.json();

        const list = data.map(item => ({
            nick: item.data.nick || "匿名",
            content: item.data.content || ""
        })).filter(item => item.content);

        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(list)
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify([])
        };
    }
};

