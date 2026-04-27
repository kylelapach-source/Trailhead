import { Model } from '@nozbe/watermelondb';
import { field, readonly, date, relation } from '@nozbe/watermelondb/decorators';
import type { Relation } from '@nozbe/watermelondb';
import type { Rhythm } from './Rhythm';
import type { BlockType, Domain, Zone } from '@/types/database';

export class RhythmBlock extends Model {
  static table = 'rhythm_blocks';
  static associations = {
    rhythms: { type: 'belongs_to' as const, key: 'rhythm_id' },
  };

  @field('rhythm_id') rhythmId!: string;
  @field('activity_id') activityId!: string | null;
  @field('block_type') blockType!: BlockType;
  @field('label') label!: string;
  @field('duration_minutes') durationMinutes!: number;
  @field('position') position!: number;
  @field('color_hex') colorHex!: string;
  @field('domain') domain!: Domain;
  @field('zone') zone!: Zone;
  @field('is_optional') isOptional!: boolean;
  @readonly @date('created_at') createdAt!: Date;

  @relation('rhythms', 'rhythm_id') rhythm!: Relation<Rhythm>;
}
