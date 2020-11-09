import CSV from '../app/services/csv';

describe('CSV Parsing', () => {
  it('should parse value into array', () => {
    const parsed = CSV.parse();

    console.log(parsed);
  });
});
