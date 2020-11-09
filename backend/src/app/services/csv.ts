import csvParser from 'csv-parser';
import path from 'path';
import fs from 'fs';

class Csv {
  results: any = [];

  parse() {
    const samplePath = path.join(__dirname, 'sample.csv');

    fs.createReadStream(samplePath)
      .pipe(csvParser(['latitude', 'longitude']))
      .on('data', (data) => this.results.push(data))
      .on('end', () => {
        console.log(this.results);
      });

    return this.results;
  }
}

export default new Csv();
