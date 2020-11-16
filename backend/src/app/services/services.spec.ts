import Connection from '../databases';
import Services from './index';

jest.mock('./index');

describe('Services', () => {
  beforeAll(async () => {
    await Connection.create();
  });

  afterAll(async () => {
    await Connection.close();
  });
  beforeEach(async () => {
    jest.fn().mockClear();
  });

  it('should download csv', async () => {
    const url = 'test-url';
    const services = new Services('test');
    await services.downloadCsvFromUrl(url);

    expect(services.downloadCsvFromUrl).toHaveBeenCalledTimes(1);
  });

  it('should import csv and save into database', async () => {
    const services = new Services('test');
    const url = 'test-url';
    await services.saveCsvIntoDatabase({ url });

    expect(services.saveCsvIntoDatabase).toHaveBeenCalled();
  });

  it('should find positions passing by a url', async () => {
    const services = new Services('test');
    const url = 'url-test';
    services.findPositionsByUrl = jest.fn().mockResolvedValue([
      {
        path: 'test-path1',
        latitude: 57.14416516,
        longitude: -2.114847768,
      },
      {
        path: 'test-path2',
        latitude: 37.14416516,
        longitude: -32.114847768,
      },
    ]);
    const result = await services.findPositionsByUrl(url);
    expect(result.length).toBe(2);
  });

  it('should find all paths', async () => {
    const services = new Services('test');
    services.findAllCsvImported = jest.fn().mockResolvedValue([
      {
        path: 'test-url1',
      },
      {
        path: 'test-url2',
      },
    ]);

    const pathsFound = await services.findAllCsvImported();

    expect(pathsFound.length).toBe(2);
  });
});
