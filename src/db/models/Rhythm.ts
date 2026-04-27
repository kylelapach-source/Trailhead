import { Model } from '@nozbe/watermelondb';
import { field, readonly, date, children } from '@nozbe/watermelondb/decorators';
import type { Query } from '@nozbe/watermelondb';
import type { RhythmBlock } from './RhythmBlock';

export class Rhythm extends Model {
  static table = 'rhythms';
  static associations = {
    rhythm_blocks: { type: 'has_many' as const, foreignKey: 'rhythm_id' },
  };

  @field('family_id') familyId!: string | null;
  @field('name') name!: string;
  @field('description') description!: string | null;
  @field('day_type') dayType!: string;
  @field('is_active') isActive!: boolean;
  @field('is_template') isTemplate!: boolean;
  @field('sort_order') sortOrder!: number;
  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;

  @children('rhythm_blocks') blocks!: Query<RhythmBlock>;
}
