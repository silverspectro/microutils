import countModules from '../test-utils/countModules';
import microutils from './index';

describe('microutils', () => {
  const modules = countModules();
  for (let cat in microutils) {
    let count = 0;

    test(`microutils/${cat} should exists in folders`, () => {
      expect(modules[cat]).toBeTruthy();
    });

    for (let key in microutils[cat]) {
      test(`${cat}/${key} should contain functions`, () => {
        expect(microutils[cat][key]).toBeInstanceOf(Function);
        expect(modules[cat].files).toContain(key);
      });
      count++;
    }


    test(`microutils/${cat} sould have ${modules[cat].length} modules`, () => {
      expect(count).toEqual(modules[cat].length);
    });
  }
});