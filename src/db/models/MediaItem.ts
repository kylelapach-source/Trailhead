import { Model } from '@nozbe/watermelondb';
import { field, readonly, date } from '@nozbe/watermelondb/decorators';

export class MediaItem extends Model {
  static table = 'media_items';

  @field('title') title!: string;
  @field('youtube_id') youtubeId!: string;
  @field('category') category!: string;
  @field('duration_seconds') durationSeconds!: number;
  @field('age_tags') ageTagsJson!: string;
  @field('is_curated') isCurated!: boolean;
  @field('play_count') playCount!: number;
  @readonly @date('created_at') createdAt!: Date;

  get ageTags(): string[] {
    return JSON.parse(this.ageTagsJson || '[]');
  }
}
