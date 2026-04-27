import { Model } from '@nozbe/watermelondb';
import { field, readonly, date } from '@nozbe/watermelondb/decorators';

export class Child extends Model {
  static table = 'children';

  @field('family_id') familyId!: string;
  @field('name') name!: string;
  @field('birthdate') birthdate!: string;
  @field('avatar_url') avatarUrl!: string | null;
  @field('interests') interestsJson!: string;
  @readonly @date('created_at') createdAt!: Date;

  get interests(): string[] {
    return JSON.parse(this.interestsJson || '[]');
  }
}
