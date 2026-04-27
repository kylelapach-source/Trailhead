import { Model } from '@nozbe/watermelondb';
import { field, readonly, date } from '@nozbe/watermelondb/decorators';

export class Reflection extends Model {
  static table = 'reflections';

  @field('family_id') familyId!: string;
  @field('child_id') childId!: string;
  @field('logged_by') loggedBy!: string;
  @field('reflection_date') reflectionDate!: string;
  @field('prompt_text') promptText!: string;
  @field('parent_note') parentNote!: string | null;
  @field('child_audio_url') childAudioUrl!: string | null;
  @field('child_transcript') childTranscript!: string | null;
  @readonly @date('created_at') createdAt!: Date;
}
