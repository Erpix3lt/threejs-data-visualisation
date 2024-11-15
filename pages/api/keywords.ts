import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const csvFilePath = path.join(process.cwd(), 'lib', 'keywords.csv');
  const csvData = fs.readFileSync(csvFilePath, 'utf8');

  const lines = csvData.trim().split('\n');
  const headers = lines[0].split(',');

  const keywords = lines.slice(1).map(line => {
    const values = line.split(',');
    return {
      Name: values[0],
      'Start Year': parseInt(values[1], 10),
      'End Year': parseInt(values[2], 10),
      'Usage Rating': parseInt(values[3], 10)
    };
  });

  res.status(200).json(keywords);
}