const token = process.env.SLACK_BOT_TOKEN;

if (!token) {
    throw new Error("SLACK_BOT_TOKEN ausente");
}

async function lookupUserId(email) {
    const res = await fetch(`https://slack.com/api/users.lookupByEmail?email=${email}`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` }
    });

    const json = await res.json();
    if (!json.ok) throw new Error("lookupByEmail falhou: " + JSON.stringify(json));
    return json.user.id;
}

async function openDM(userId) {
    const res = await fetch("https://slack.com/api/conversations.open", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ users: userId })
    });

    const json = await res.json();
    if (!json.ok) throw new Error("conversations.open falhou: " + JSON.stringify(json));
    return json.channel.id;
}

async function postMessage(channel, text) {
    const res = await fetch("https://slack.com/api/chat.postMessage", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ channel, text })
    });

    const json = await res.json();
    if (!json.ok) throw new Error("chat.postMessage falhou: " + JSON.stringify(json));
}

async function sendDirectMessage(email, message) {
    try {
        const userId = await lookupUserId(email);
        const channel = await openDM(userId);
        await postMessage(channel, message);
        console.log("Mensagem enviada com sucesso!");
    } catch (err) {
        console.error("Erro ao enviar mensagem:", err.message);
    }
}


module.exports = {
    sendDirectMessage,
    lookupUserId,
    openDM,
    postMessage
};
