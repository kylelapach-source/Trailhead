import { BLOCK_TYPE_CONFIG, MOCK_TODAY_BLOCKS, DOMAIN_COLORS } from '../src/lib/constants';

describe('App constants', () => {
  it('BLOCK_TYPE_CONFIG covers all 9 block types', () => {
    const types = Object.keys(BLOCK_TYPE_CONFIG);
    expect(types).toHaveLength(9);
  });

  it('every block config has label, colorHex, description, icon', () => {
    for (const [type, config] of Object.entries(BLOCK_TYPE_CONFIG)) {
      expect(config.label).toBeTruthy();
      expect(config.colorHex).toMatch(/^#[0-9A-Fa-f]{6}$/);
      expect(config.description).toBeTruthy();
      expect(config.icon).toBeTruthy();
    }
  });

  it('MOCK_TODAY_BLOCKS has 5 blocks', () => {
    expect(MOCK_TODAY_BLOCKS).toHaveLength(5);
  });

  it('all mock block statuses are valid', () => {
    const valid = ['pending', 'in_progress', 'completed', 'skipped'];
    for (const block of MOCK_TODAY_BLOCKS) {
      expect(valid).toContain(block.status);
    }
  });

  it('DOMAIN_COLORS covers all 6 domains', () => {
    const domains = Object.keys(DOMAIN_COLORS);
    expect(domains).toHaveLength(6);
  });
});
