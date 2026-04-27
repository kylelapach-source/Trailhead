import { REFLECTION_PROMPTS, getTodayPrompt } from '../src/lib/reflectionPrompts';

describe('Reflection Prompts', () => {
  it('has exactly 30 prompts', () => {
    expect(REFLECTION_PROMPTS).toHaveLength(30);
  });

  it('every prompt has required fields', () => {
    for (const prompt of REFLECTION_PROMPTS) {
      expect(prompt.id).toBeTruthy();
      expect(prompt.text).toBeTruthy();
      expect(prompt.category).toBeTruthy();
      expect(prompt.followUpParent).toBeTruthy();
      expect(Array.isArray(prompt.domainTags)).toBe(true);
    }
  });

  it('getTodayPrompt returns a valid prompt', () => {
    const prompt = getTodayPrompt();
    expect(REFLECTION_PROMPTS).toContainEqual(prompt);
  });

  it('prompt IDs are unique', () => {
    const ids = REFLECTION_PROMPTS.map((p) => p.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });
});
