const fetch = require('node-fetch');

// ========= 请替换为你自己的信息 ==========
const NETLIFY_TOKEN = "nfp_5DkLhLkRdSjaFX6xBD6YJLbcz8RHXYnb7ff5";
const SITE_ID = "c197f2e6-3496-42a5-8e10-636d84b0c79d";
const FORM_ID = "6a2cee5c5a3e5800080ceb58";
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

