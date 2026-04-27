import { TULSA_OUTINGS } from '../src/lib/tulsaOutings';

describe('Tulsa Outings', () => {
  it('has exactly 8 outings', () => {
    expect(TULSA_OUTINGS).toHaveLength(8);
  });

  it('every outing has required fields', () => {
    for (const outing of TULSA_OUTINGS) {
      expect(outing.id).toBeTruthy();
      expect(outing.name).toBeTruthy();
      expect(outing.address).toBeTruthy();
      expect(outing.category).toBeTruthy();
      expect(outing.mapQuery).toBeTruthy();
      expect(typeof outing.isFree).toBe('boolean');
      expect(typeof outing.ageMin).toBe('number');
    }
  });

  it('has at least 3 free outings', () => {
    const free = TULSA_OUTINGS.filter((o) => o.isFree);
    expect(free.length).toBeGreaterThanOrEqual(3);
  });

  it('outing IDs are unique', () => {
    const ids = TULSA_OUTINGS.map((o) => o.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });
});
