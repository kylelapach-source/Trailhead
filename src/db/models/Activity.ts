import { Model } from '@nozbe/watermelondb';
import { field, readonly, date } from '@nozbe/watermelondb/decorators';
import type { Domain, Zone } from '@/types/database';

export class Activity extends Model {
  static table = 'activities';

  @field('family_id') familyId!: string | null;
  @field('title') title!: string;
  @field('description') description!: string;
  @field('domain') domain!: Domain;
  @field('age_tags') ageTagsJson!: string;
  @field('supply_list') supplyListJson!: string;
  @field('zone_suggestion') zoneSuggestion!: Zone;
  @field('is_seed_data') isSeedData!: boolean;
  @field('difficulty') difficulty!: 'easy' | 'medium' | 'hard';
  @field('tulsa_location') tulsaLocationJson!: string | null;
  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;

  get ageTags(): string[] {
    return JSON.parse(this.ageTagsJson || '[]');
  }

  get supplyList(): string[] {
    return JSON.parse(this.supplyListJson || '[]');
  }

  get tulsaLocation() {
    return this.tulsaLocationJson ? JSON.parse(this.tulsaLocationJson) : null;
  }
}
