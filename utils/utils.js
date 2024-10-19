export const logRequest = (req, service) => {
    const ip = `Recieved request from ${req.ip}\n`;
    const http = `${req.method} ${req.path} ${req.httpVersion}\n`;
    const host = `Host: ${req.hostname}\n`;
    const userAgent = `User-Agent: ${req.headers['user-agent']}\n`;
    const accept = `Accept: ${req.headers['accept']}`;
    return `\n${service}\n` + ip + http + host + userAgent + accept;
}
