import { Nango }  from '@nangohq/node'
import fs from 'fs/promises';

const start = async () => {
    const nango = new Nango({ secretKey: 'e8ee0b0d-47ed-4936-a33f-7d08579d6540' });

    let result = {}
    try {
      result = await nango.getRecords({
        providerConfigKey: 'demo-github-integration',
        connectionId: 'test-connection-id',
        model: 'GithubIssue'
      });
    } catch(err) {
      console.error(err)
    }
    
    const data = JSON.stringify(result);
    const filePath = 'response.json';
    fs.writeFile(filePath, data, 'utf8', err => {
        if (err) {
          console.error('Error writing JSON file:', err);
        } else {
          console.log('JSON data has been saved to', filePath);
        }
    });
}

start()
