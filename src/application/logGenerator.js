import fs from 'fs';
import path from 'path';

const logDir = 'public/files';
const jsonLogPath = path.join(logDir, 'log.json');
const htmlLogPath = path.join(logDir, 'log.html');

// Function to format current date
function getCurrentDateTime() {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const now = new Date();
    const dayName = days[now.getDay()];
    const date = now.getDate();
    const monthName = months[now.getMonth()];
    const year = now.getFullYear();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    
    return `${dayName} ${date} ${monthName} ${year}, ${hours}.${minutes}`;
}

const compactTerminalHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>alkareemAPI - Log Terminal</title>
    <link rel="icon" type="image/png" href="/images/asset/logo16.png">
    <style>
        :root {
            --primary: #0f0;
            --secondary: #0a0;
            --bg: #000;
            --query: #f0f;
            --params: #ff0;
            --duration: #0ff;
            --error: #f00;
            --warning: #ff0;
        }
        
        body {
            background-color: var(--bg);
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            font-family: 'Courier New', monospace;
        }
        
        .terminal-container {
            width: 90%;
            max-width: 800px;
            height: 60vh;
            border: 2px solid var(--primary);
            border-radius: 5px;
            padding: 15px;
            box-shadow: 0 0 15px var(--primary);
            display: flex;
            flex-direction: column;
        }
        
        .terminal-header {
            color: var(--primary);
            text-align: center;
            padding-bottom: 10px;
            border-bottom: 1px solid var(--primary);
            margin-bottom: 10px;
        }
        
        .terminal-title {
            text-shadow: 0 0 5px var(--primary);
            margin-bottom: 5px;
        }
        
        .terminal-date {
            color: var(--secondary);
            font-size: 0.9em;
        }
        
        .log-viewer {
            flex-grow: 1;
            overflow-y: auto;
            color: var(--primary);
        }
        
        .log-entry {
            margin-bottom: 10px;
            padding-left: 10px;
            border-left: 2px solid var(--primary);
            font-size: 0.9em;
        }
        
        .log-header {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 3px;
        }
        
        .timestamp {
            color: var(--secondary);
            font-size: 0.85em;
        }
        
        .level {
            font-weight: bold;
            text-transform: uppercase;
            font-size: 0.85em;
        }
        
        .level-info { color: var(--primary); }
        .level-warning { color: var(--warning); }
        .level-error { color: var(--error); }
        
        .target {
            color: var(--secondary);
            font-style: italic;
            font-size: 0.85em;
        }
        
        .query {
            color: var(--query);
            word-break: break-all;
        }
        
        .params {
            color: var(--params);
        }
        
        .duration {
            color: var(--duration);
        }
        
        /* Scrollbar styling */
        ::-webkit-scrollbar {
            width: 8px;
        }
        
        ::-webkit-scrollbar-track {
            background: transparent;
        }
        
        ::-webkit-scrollbar-thumb {
            background: var(--primary);
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <div class="terminal-container">
        <div class="terminal-header">
            <div class="terminal-title">alkareemAPI Log Terminal</div>
            <div class="terminal-date">{{CURRENT_DATE}}</div>
        </div>
        <div class="log-viewer" id="log-container">
            {{LOGS}}
        </div>
    </div>
    
    <script>
        // Auto-scroll to bottom
        const logContainer = document.getElementById('log-container');
        logContainer.scrollTop = logContainer.scrollHeight;
        
        // Auto-refresh every 3 seconds
        setTimeout(() => location.reload(), 3000);
    </script>
</body>
</html>`;

function parseLogs() {
    try {
        if (!fs.existsSync(jsonLogPath) || fs.statSync(jsonLogPath).size === 0) {
            return [];
        }

        const content = fs.readFileSync(jsonLogPath, 'utf8');
        return content.split('\n')
            .filter(line => line.trim() !== '')
            .map(line => {
                try {
                    return JSON.parse(line);
                } catch (e) {
                    return {
                        level: 'error',
                        message: `Invalid log format: ${line}`,
                        timestamp: new Date().toISOString()
                    };
                }
            });
    } catch (error) {
        return [{
            level: 'error',
            message: `Failed to read logs: ${error.message}`,
            timestamp: new Date().toISOString()
        }];
    }
}

function generateHTML() {
    const logs = parseLogs();
    let htmlContent = '';

    logs.forEach(log => {
        let messageContent = '';
        
        if (typeof log.message === 'string') {
            messageContent = `<div>${log.message}</div>`;
        } else if (log.message && typeof log.message === 'object') {
            messageContent = `
                <div><span class="duration">[${log.message.duration}ms]</span></div>
                <div class="query">${log.message.query}</div>
                <div class="params">${log.message.params}</div>
            `;
        }

        htmlContent += `
            <div class="log-entry">
                <div class="log-header">
                    <span class="timestamp">${log.timestamp || ''}</span>
                    <span class="level level-${log.level}">${log.level.toUpperCase()}</span>
                    ${log.target ? `<span class="target">@${log.target}</span>` : ''}
                </div>
                ${messageContent}
            </div>
        `;
    });

    const currentDate = getCurrentDateTime();
    const finalHTML = compactTerminalHTML
        .replace('{{LOGS}}', htmlContent)
        .replace('{{CURRENT_DATE}}', currentDate);

    fs.writeFileSync(htmlLogPath, finalHTML);
}

// Initial generation
generateHTML();

// Update every 3 seconds
setInterval(generateHTML, 3000);