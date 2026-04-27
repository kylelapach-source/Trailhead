import { Model } from '@nozbe/watermelondb';
import { field, readonly, date } from '@nozbe/watermelondb/decorators';
import type { LogStatus } from '@/types/database';

export class Log extends Model {
  static table = 'logs';

  @field('family_id') familyId!: string;
  @field('child_id') childId!: string;
  @field('rhythm_block_id') rhythmBlockId!: string | null;
  @field('activity_id') activityId!: string | null;
  @field('logged_by') loggedBy!: string;
  @field('log_date') logDate!: string;
  @field('status') status!: LogStatus;
  @field('note_text') noteText!: string | null;
  @field('photo_urls') photoUrlsJson!: string;
  @field('audio_url') audioUrl!: string | null;
  @field('duration_actual_minutes') durationActualMinutes!: number | null;
  @field('mood_tags') moodTagsJson!: string;
  @readonly @date('created_at') createdAt!: Date;

  get photoUrls(): string[] {
    return JSON.parse(this.photoUrlsJson || '[]');
  }

  get moodTags() {
    return JSON.parse(this.moodTagsJson || '{}');
  }
}
