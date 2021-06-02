/**
 * Types extracted from https://discord.com/developers/docs/resources/channel
 */

import type { Permissions, Snowflake } from '../../globals';
import type { APIPartialEmoji } from './emoji';
import type { APIGuildMember } from './guild';
import type { APIMessageInteraction } from './interactions';
import { APIApplication } from './oauth2';
import type { APIRole } from './permissions';
import type { APIUser } from './user';

/**
 * Not documented, but partial only includes id, name, and type
 */
export interface APIPartialChannel {
	/**
	 * The id of the channel
	 */
	id: Snowflake;
	/**
	 * The type of the channel
	 *
	 * See https://discord.com/developers/docs/resources/channel#channel-object-channel-types
	 */
	type: ChannelType;
	/**
	 * The name of the channel (2-100 characters)
	 */
	name?: string;
}

/**
 * https://discord.com/developers/docs/resources/channel#channel-object-channel-structure
 */
export interface APIChannel extends APIPartialChannel {
	/**
	 * The id of the guild (may be missing for some channel objects received over gateway guild dispatches)
	 */
	guild_id?: Snowflake;
	/**
	 * Sorting position of the channel
	 */
	position?: number;
	/**
	 * Explicit permission overwrites for members and roles
	 *
	 * See https://discord.com/developers/docs/resources/channel#overwrite-object
	 */
	permission_overwrites?: APIOverwrite[];
	/**
	 * The channel topic (0-1024 characters)
	 */
	topic?: string | null;
	/**
	 * Whether the channel is nsfw
	 */
	nsfw?: boolean;
	/**
	 * The id of the last message sent in this channel (may not point to an existing or valid message)
	 */
	last_message_id?: Snowflake | null;
	/**
	 * The bitrate (in bits) of the voice channel
	 */
	bitrate?: number;
	/**
	 * The user limit of the voice channel
	 */
	user_limit?: number;
	/**
	 * Amount of seconds a user has to wait before sending another message (0-21600);
	 * bots, as well as users with the permission `MANAGE_MESSAGES` or `MANAGE_CHANNELS`, are unaffected
	 */
	rate_limit_per_user?: number;
	/**
	 * The recipients of the DM
	 *
	 * See https://discord.com/developers/docs/resources/user#user-object
	 */
	recipients?: APIUser[];
	/**
	 * Icon hash
	 */
	icon?: string | null;
	/**
	 * ID of the DM creator or thread creator
	 */
	owner_id?: Snowflake;
	/**
	 * Application id of the group DM creator if it is bot-created
	 */
	application_id?: Snowflake;
	/**
	 * ID of the parent category for a channel (each parent category can contain up to 50 channels)
	 *
	 * OR
	 *
	 * ID of the parent channel for a thread
	 */
	parent_id?: Snowflake | null;
	/**
	 * When the last pinned message was pinned.
	 * This may be `null` in events such as `GUILD_CREATE` when a message is not pinned
	 */
	last_pin_timestamp?: string | null;
	/**
	 * Voice region id for the voice or stage channel, automatic when set to `null`
	 *
	 * See https://discord.com/developers/docs/resources/voice#voice-region-object
	 */
	rtc_region?: string | null;
	/**
	 * The camera video quality mode of the voice channel, `1` when not present
	 *
	 * See https://discord.com/developers/docs/resources/channel#channel-object-video-quality-modes
	 */
	video_quality_mode?: VideoQualityMode;
	/**
	 * The approximate message count of the thread, does not count above 50 even if there are more messages
	 */
	message_count?: number;
	/**
	 * The approximate member count of the thread, does not count above 50 even if there are more members
	 */
	member_count?: number;
	/**
	 * The metadata for a thread channel not shared by other channels
	 */
	thread_metadata?: APIThreadMetadata;
	/**
	 * The client users member for the thread, only included in select endpoints
	 */
	member?: APIThreadMember;
}

/**
 * https://discord.com/developers/docs/resources/channel#channel-object-channel-types
 */
export const enum ChannelType {
	/**
	 * A text channel within a guild
	 */
	GuildText,
	/**
	 * A direct message between users
	 */
	DM,
	/**
	 * A voice channel within a guild
	 */
	GuildVoice,
	/**
	 * A direct message between multiple users
	 */
	GroupDM,
	/**
	 * An organizational category that contains up to 50 channels
	 *
	 * See https://support.discord.com/hc/en-us/articles/115001580171-Channel-Categories-101
	 */
	GuildCategory,
	/**
	 * A channel that users can follow and crosspost into their own guild
	 *
	 * See https://support.discord.com/hc/en-us/articles/360032008192
	 */
	GuildNews,
	/**
	 * A channel in which game developers can sell their game on Discord
	 *
	 * See https://discord.com/developers/docs/game-and-server-management/special-channels
	 */
	GuildStore,
	/**
	 * A thread channel (public) within a Guild News channel
	 */
	GuildNewsThread = 10,
	/**
	 * A public thread channel within a Guild Text channel
	 */
	GuildPublicThread,
	/**
	 * A private thread channel within a Guild Text channel
	 */
	GuildPrivateThread,
	/**
	 * A voice channel for hosting events with an audience
	 *
	 * See https://support.discord.com/hc/en-us/articles/1500005513722
	 */
	GuildStageVoice,
}

export const enum VideoQualityMode {
	/**
	 * Discord chooses the quality for optimal performance
	 */
	Auto = 1,
	/**
	 * 720p
	 */
	Full,
}

/**
 * https://discord.com/developers/docs/resources/channel#message-object-message-structure
 */
export interface APIMessage {
	/**
	 * ID of the message
	 */
	id: Snowflake;
	/**
	 * ID of the channel the message was sent in
	 */
	channel_id: Snowflake;
	/**
	 * ID of the guild the message was sent in
	 */
	guild_id?: Snowflake;
	/**
	 * The author of this message (only a valid user in the case where the message is generated by a user or bot user)
	 *
	 * If the message is generated by a webhook, the author object corresponds to the webhook's id,
	 * username, and avatar. You can tell if a message is generated by a webhook by checking for the `webhook_id` property
	 *
	 * See https://discord.com/developers/docs/resources/user#user-object
	 */
	author: APIUser;
	/**
	 * Member properties for this message's author
	 *
	 * The member object exists in `MESSAGE_CREATE` and `MESSAGE_UPDATE` events
	 * from text-based guild channels
	 *
	 * See https://discord.com/developers/docs/resources/guild#guild-member-object
	 */
	member?: APIGuildMember;
	/**
	 * Contents of the message
	 */
	content: string;
	/**
	 * When this message was sent
	 */
	timestamp: string;
	/**
	 * When this message was edited (or null if never)
	 */
	edited_timestamp: string | null;
	/**
	 * Whether this was a TTS message
	 */
	tts: boolean;
	/**
	 * Whether this message mentions everyone
	 */
	mention_everyone: boolean;
	/**
	 * Users specifically mentioned in the message
	 *
	 * The `member` field is only present in `MESSAGE_CREATE` and `MESSAGE_UPDATE` events
	 * from text-based guild channels
	 *
	 * See https://discord.com/developers/docs/resources/user#user-object
	 * See https://discord.com/developers/docs/resources/guild#guild-member-object
	 */
	mentions: (APIUser & { member?: Omit<APIGuildMember, 'user'> })[];
	/**
	 * Roles specifically mentioned in this message
	 *
	 * See https://discord.com/developers/docs/topics/permissions#role-object
	 */
	mention_roles: APIRole['id'][];
	/**
	 * Channels specifically mentioned in this message
	 *
	 * Not all channel mentions in a message will appear in `mention_channels`.
	 * - Only textual channels that are visible to everyone in a lurkable guild will ever be included
	 * - Only crossposted messages (via Channel Following) currently include `mention_channels` at all
	 *
	 * If no mentions in the message meet these requirements, this field will not be sent
	 *
	 * See https://discord.com/developers/docs/resources/channel#channel-mention-object
	 */
	mention_channels?: APIChannelMention[];
	/**
	 * Any attached files
	 *
	 * See https://discord.com/developers/docs/resources/channel#attachment-object
	 */
	attachments: APIAttachment[];
	/**
	 * Any embedded content
	 *
	 * See https://discord.com/developers/docs/resources/channel#embed-object
	 */
	embeds: APIEmbed[];
	/**
	 * Reactions to the message
	 *
	 * See https://discord.com/developers/docs/resources/channel#reaction-object
	 */
	reactions?: APIReaction[];
	/**
	 * A nonce that can be used for optimistic message sending (up to 25 characters)
	 *
	 * **You will not receive this from further fetches. This is received only once from a `MESSAGE_CREATE`
	 * event to ensure it got sent**
	 */
	nonce?: string | number;
	/**
	 * Whether this message is pinned
	 */
	pinned: boolean;
	/**
	 * If the message is generated by a webhook, this is the webhook's id
	 */
	webhook_id?: Snowflake;
	/**
	 * Type of message
	 *
	 * See https://discord.com/developers/docs/resources/channel#message-object-message-types
	 */
	type: MessageType;
	/**
	 * Sent with Rich Presence-related chat embeds
	 *
	 * See https://discord.com/developers/docs/resources/channel#message-object-message-activity-structure
	 */
	activity?: APIMessageActivity;
	/**
	 * Sent with Rich Presence-related chat embeds
	 *
	 * See https://discord.com/developers/docs/resources/channel#message-object-message-application-structure
	 */
	application?: Partial<APIApplication>;
	/**
	 * Reference data sent with crossposted messages, replies, pins, and thread starter messages
	 *
	 * See https://discord.com/developers/docs/resources/channel#message-object-message-reference-structure
	 */
	message_reference?: APIMessageReference;
	/**
	 * Message flags combined as a bitfield
	 *
	 * See https://discord.com/developers/docs/resources/channel#message-object-message-flags
	 *
	 * See https://en.wikipedia.org/wiki/Bit_field
	 */
	flags?: MessageFlags;
	/**
	 * The stickers sent with the message (bots currently can only receive messages with stickers, not send)
	 *
	 * See https://discord.com/developers/docs/resources/channel#message-object-message-sticker-structure
	 */
	stickers?: APISticker[];
	/**
	 * The message associated with the `message_reference`
	 *
	 * This field is only returned for messages with a `type` of `19` (REPLY).
	 *
	 * If the message is a reply but the `referenced_message` field is not present,
	 * the backend did not attempt to fetch the message that was being replied to,
	 * so its state is unknown.
	 *
	 * If the field exists but is `null`, the referenced message was deleted
	 *
	 * See https://discord.com/developers/docs/resources/channel#message-object
	 */
	referenced_message?: APIMessage | null;
	/**
	 * Sent if the message is a response to an Interaction
	 */
	interaction?: APIMessageInteraction;
	/**
	 * Sent if a thread was started from this message
	 */
	thread?: APIChannel;
}

/**
 * https://discord.com/developers/docs/resources/channel#message-object-message-types
 */
export const enum MessageType {
	Default,
	RecipientAdd,
	RecipientRemove,
	Call,
	ChannelNameChange,
	ChannelIconChange,
	ChannelPinnedMessage,
	GuildMemberJoin,
	UserPremiumGuildSubscription,
	UserPremiumGuildSubscriptionTier1,
	UserPremiumGuildSubscriptionTier2,
	UserPremiumGuildSubscriptionTier3,
	ChannelFollowAdd,
	GuildDiscoveryDisqualified = 14,
	GuildDiscoveryRequalified,
	GuildDiscoveryGracePeriodInitialWarning,
	GuildDiscoveryGracePeriodFinalWarning,
	ThreadCreated,
	Reply,
	ApplicationCommand,
	ThreadStarterMessage,
	GuildInviteReminder,
}

/**
 * https://discord.com/developers/docs/resources/channel#message-object-message-activity-structure
 */
export interface APIMessageActivity {
	/**
	 * Type of message activity
	 *
	 * See https://discord.com/developers/docs/resources/channel#message-object-message-activity-types
	 */
	type: MessageActivityType;
	/**
	 * `party_id` from a Rich Presence event
	 *
	 * See https://discord.com/developers/docs/rich-presence/how-to#updating-presence-update-presence-payload-fields
	 */
	party_id?: string;
}

/**
 * https://discord.com/developers/docs/resources/channel#message-object-message-reference-structure
 */
export interface APIMessageReference {
	/**
	 * ID of the originating message
	 */
	message_id?: Snowflake;
	/**
	 * ID of the originating message's channel
	 */
	channel_id: Snowflake;
	/**
	 * ID of the originating message's guild
	 */
	guild_id?: Snowflake;
}

/**
 * https://discord.com/developers/docs/resources/channel#message-object-message-activity-types
 */
export const enum MessageActivityType {
	Join = 1,
	Spectate,
	Listen,
	JoinRequest = 5,
}

/**
 * https://discord.com/developers/docs/resources/channel#message-object-message-flags
 */
export const enum MessageFlags {
	/**
	 * This message has been published to subscribed channels (via Channel Following)
	 */
	Crossposted = 1 << 0,
	/**
	 * This message originated from a message in another channel (via Channel Following)
	 */
	IsCrosspost = 1 << 1,
	/**
	 * Do not include any embeds when serializing this message
	 */
	SuppressEmbeds = 1 << 2,
	/**
	 * The source message for this crosspost has been deleted (via Channel Following)
	 */
	SourceMessageDeleted = 1 << 3,
	/**
	 * This message came from the urgent message system
	 */
	Urgent = 1 << 4,
	/**
	 * This message has an associated thread, which shares its id
	 */
	HasThread = 1 << 5,
	/**
	 * This message is only visible to the user who invoked the Interaction
	 */
	Ephemeral = 1 << 6,
	/**
	 * This message is an Interaction Response and the bot is "thinking"
	 */
	Loading = 1 << 7,
}

/**
 * https://discord.com/developers/docs/resources/channel#message-object-message-sticker-structure
 */
export interface APISticker {
	/**
	 * ID of the sticker
	 */
	id: Snowflake;
	/**
	 * ID of the pack the sticker is from
	 */
	pack_id: Snowflake;
	/**
	 * Name of the sticker
	 */
	name: string;
	/**
	 * Description of the sticker
	 */
	description: string;
	/**
	 * A comma-separated list of tags for the sticker
	 */
	tags?: string;
	/**
	 * Sticker asset hash
	 */
	asset: string;
	/**
	 * Type of sticker format
	 *
	 * See https://discord.com/developers/docs/resources/channel#message-object-message-sticker-format-types
	 */
	format_type: StickerFormatType;
}

/**
 * https://discord.com/developers/docs/resources/channel#message-object-message-sticker-format-types
 */
export const enum StickerFormatType {
	PNG = 1,
	APNG,
	LOTTIE,
}

/**
 * https://discord.com/developers/docs/resources/channel#followed-channel-object
 */
export interface APIFollowedChannel {
	/**
	 * Source channel id
	 */
	channel_id: Snowflake;
	/**
	 * Created target webhook id
	 */
	webhook_id: Snowflake;
}

/**
 * https://discord.com/developers/docs/resources/channel#reaction-object-reaction-structure
 */
export interface APIReaction {
	/**
	 * Times this emoji has been used to react
	 */
	count: number;
	/**
	 * Whether the current user reacted using this emoji
	 */
	me: boolean;
	/**
	 * Emoji information
	 *
	 * See https://discord.com/developers/docs/resources/emoji#emoji-object
	 */
	emoji: APIPartialEmoji;
}

/**
 * https://discord.com/developers/docs/resources/channel#overwrite-object-overwrite-structure
 */
export interface APIOverwrite {
	/**
	 * Role or user id
	 */
	id: Snowflake;
	/**
	 * Either 0 (role) or 1 (member)
	 *
	 * {@link OverwriteType}
	 */
	type: OverwriteType;
	/**
	 * Permission bit set
	 *
	 * See https://discord.com/developers/docs/topics/permissions#permissions-bitwise-permission-flags
	 *
	 * See https://en.wikipedia.org/wiki/Bit_field
	 */
	allow: Permissions;
	/**
	 * Permission bit set
	 *
	 * See https://discord.com/developers/docs/topics/permissions#permissions-bitwise-permission-flags
	 *
	 * See https://en.wikipedia.org/wiki/Bit_field
	 */
	deny: Permissions;
}

export const enum OverwriteType {
	Role,
	Member,
}

/**
 * https://discord.com/developers/docs/resources/channel#thread-metadata-object-thread-metadata-structure
 */
export interface APIThreadMetadata {
	/**
	 * Whether the thread is archived
	 */
	archived: boolean;
	/**
	 * ID of the user that last archived or unarchived the thread
	 */
	archiver_id?: Snowflake;
	/**
	 * Duration in minutes to automatically archive the thread after recent activity, can be set to: 60, 1440, 4320, 10080
	 */
	auto_archive_duration: ThreadAutoArchiveDuration;
	/**
	 * An ISO8601 timestamp when the thread's archive status was last changed, used for calculating recent activity
	 */
	archive_timestamp: string;
	/**
	 * When a thread is locked, only users with MANAGE_THREADS can unarchive it
	 */
	locked?: boolean;
}

export const enum ThreadAutoArchiveDuration {
	OneHour = 60,
	OneDay = 1440,
	ThreeDays = 4320,
	OneWeek = 10080,
}

/**
 * https://discord.com/developers/docs/resources/channel#thread-member-object-thread-member-structure
 */
export interface APIThreadMember {
	/**
	 * The id of the thread
	 */
	id: Snowflake;
	/**
	 * The id of the member
	 */
	user_id: Snowflake;
	/**
	 * An ISO8601 timestamp for when the member last joined
	 */
	join_timestamp: string;
	/**
	 * Member flags combined as a bitfield
	 *
	 * See https://en.wikipedia.org/wiki/Bit_field
	 */
	flags: ThreadMemberFlags;
}

export const enum ThreadMemberFlags {}

export interface APIThreadList {
	/**
	 * The threads that were fetched
	 */
	threads: APIChannel[];
	/**
	 * The members for the client user in each of the fetched threads
	 */
	members: APIThreadMember[];
	/**
	 * Whether there are potentially additional threads
	 */
	has_more?: boolean;
}

/**
 * https://discord.com/developers/docs/resources/channel#embed-object-embed-structure
 *
 * Length limit: 6000 characters
 */
export interface APIEmbed {
	/**
	 * Title of embed
	 *
	 * Length limit: 256 characters
	 */
	title?: string;
	/**
	 * Type of embed (always "rich" for webhook embeds)
	 *
	 * @deprecated *Embed types should be considered deprecated and might be removed in a future API version*
	 *
	 * See https://discord.com/developers/docs/resources/channel#embed-object-embed-types
	 */
	type?: EmbedType;
	/**
	 * Description of embed
	 *
	 * Length limit: 2048 characters
	 */
	description?: string;
	/**
	 * URL of embed
	 */
	url?: string;
	/**
	 * Timestamp of embed content
	 */
	timestamp?: string;
	/**
	 * Color code of the embed
	 */
	color?: number;
	/**
	 * Footer information
	 *
	 * See https://discord.com/developers/docs/resources/channel#embed-object-embed-footer-structure
	 */
	footer?: APIEmbedFooter;
	/**
	 * Image information
	 *
	 * See https://discord.com/developers/docs/resources/channel#embed-object-embed-image-structure
	 */
	image?: APIEmbedImage;
	/**
	 * Thumbnail information
	 *
	 * See https://discord.com/developers/docs/resources/channel#embed-object-embed-thumbnail-structure
	 */
	thumbnail?: APIEmbedThumbnail;
	/**
	 * Video information
	 *
	 * See https://discord.com/developers/docs/resources/channel#embed-object-embed-video-structure
	 */
	video?: APIEmbedVideo;
	/**
	 * Provider information
	 *
	 * See https://discord.com/developers/docs/resources/channel#embed-object-embed-provider-structure
	 */
	provider?: APIEmbedProvider;
	/**
	 * Author information
	 *
	 * See https://discord.com/developers/docs/resources/channel#embed-object-embed-author-structure
	 */
	author?: APIEmbedAuthor;
	/**
	 * Fields information
	 *
	 * Length limit: 25 field objects
	 *
	 * See https://discord.com/developers/docs/resources/channel#embed-object-embed-field-structure
	 */
	fields?: APIEmbedField[];
}

/**
 * https://discord.com/developers/docs/resources/channel#embed-object-embed-types
 * @deprecated *Embed types should be considered deprecated and might be removed in a future API version*
 */
export const enum EmbedType {
	/**
	 * Generic embed rendered from embed attributes
	 */
	Rich = 'rich',
	/**
	 * Image embed
	 */
	Image = 'image',
	/**
	 * Video embed
	 */
	Video = 'video',
	/**
	 * Animated gif image embed rendered as a video embed
	 */
	GIFV = 'gifv',
	/**
	 * Article embed
	 */
	Article = 'article',
	/**
	 * Link embed
	 */
	Link = 'link',
}

/**
 * https://discord.com/developers/docs/resources/channel#embed-object-embed-thumbnail-structure
 */
export interface APIEmbedThumbnail {
	/**
	 * Source url of thumbnail (only supports http(s) and attachments)
	 */
	url?: string;
	/**
	 * A proxied url of the thumbnail
	 */
	proxy_url?: string;
	/**
	 * Height of thumbnail
	 */
	height?: number;
	/**
	 * Width of thumbnail
	 */
	width?: number;
}

/**
 * https://discord.com/developers/docs/resources/channel#embed-object-embed-video-structure
 */
export interface APIEmbedVideo {
	/**
	 * Source url of video
	 */
	url?: string;
	/**
	 * Height of video
	 */
	height?: number;
	/**
	 * Width of video
	 */
	width?: number;
}

/**
 * https://discord.com/developers/docs/resources/channel#embed-object-embed-image-structure
 */
export interface APIEmbedImage {
	/**
	 * Source url of image (only supports http(s) and attachments)
	 */
	url?: string;
	/**
	 * A proxied url of the image
	 */
	proxy_url?: string;
	/**
	 * Height of image
	 */
	height?: number;
	/**
	 * Width of image
	 */
	width?: number;
}

/**
 * https://discord.com/developers/docs/resources/channel#embed-object-embed-provider-structure
 */
export interface APIEmbedProvider {
	/**
	 * Name of provider
	 */
	name?: string;
	/**
	 * URL of provider
	 */
	url?: string;
}

/**
 * https://discord.com/developers/docs/resources/channel#embed-object-embed-author-structure
 */
export interface APIEmbedAuthor {
	/**
	 * Name of author
	 *
	 * Length limit: 256 characters
	 */
	name?: string;
	/**
	 * URL of author
	 */
	url?: string;
	/**
	 * URL of author icon (only supports http(s) and attachments)
	 */
	icon_url?: string;
	/**
	 * A proxied url of author icon
	 */
	proxy_icon_url?: string;
}

/**
 * https://discord.com/developers/docs/resources/channel#embed-object-embed-footer-structure
 */
export interface APIEmbedFooter {
	/**
	 * Footer text
	 *
	 * Length limit: 2048 characters
	 */
	text: string;
	/**
	 * URL of footer icon (only supports http(s) and attachments)
	 */
	icon_url?: string;
	/**
	 * A proxied url of footer icon
	 */
	proxy_icon_url?: string;
}

/**
 * https://discord.com/developers/docs/resources/channel#embed-object-embed-field-structure
 */
export interface APIEmbedField {
	/**
	 * Name of the field
	 *
	 * Length limit: 256 characters
	 */
	name: string;
	/**
	 * Value of the field
	 *
	 * Length limit: 1024 characters
	 */
	value: string;
	/**
	 * Whether or not this field should display inline
	 */
	inline?: boolean;
}

/**
 * https://discord.com/developers/docs/resources/channel#attachment-object-attachment-structure
 */
export interface APIAttachment {
	/**
	 * Attachment id
	 */
	id: Snowflake;
	/**
	 * Name of file attached
	 */
	filename: string;
	/**
	 * The attachment's media type
	 *
	 * See https://en.wikipedia.org/wiki/Media_type
	 */
	content_type?: string;
	/**
	 * Size of file in bytes
	 */
	size: number;
	/**
	 * Source url of file
	 */
	url: string;
	/**
	 * A proxied url of file
	 */
	proxy_url: string;
	/**
	 * Height of file (if image)
	 */
	height?: number | null;
	/**
	 * Width of file (if image)
	 */
	width?: number | null;
}

/**
 * https://discord.com/developers/docs/resources/channel#channel-mention-object-channel-mention-structure
 */
export interface APIChannelMention {
	/**
	 * ID of the channel
	 */
	id: Snowflake;
	/**
	 * ID of the guild containing the channel
	 */
	guild_id: Snowflake;
	/**
	 * The type of channel
	 *
	 * See https://discord.com/developers/docs/resources/channel#channel-object-channel-types
	 */
	type: ChannelType;
	/**
	 * The name of the channel
	 */
	name: string;
}

/**
 * https://discord.com/developers/docs/resources/channel#allowed-mentions-object-allowed-mention-types
 */
export const enum AllowedMentionsTypes {
	/**
	 * Controls @everyone and @here mentions
	 */
	Everyone = 'everyone',
	/**
	 * Controls role mentions
	 */
	Role = 'roles',
	/**
	 * Controls user mentions
	 */
	User = 'users',
}

/**
 * https://discord.com/developers/docs/resources/channel#allowed-mentions-object-allowed-mentions-structure
 */
export interface APIAllowedMentions {
	/**
	 * An array of allowed mention types to parse from the content
	 *
	 * See https://discord.com/developers/docs/resources/channel#allowed-mentions-object-allowed-mention-types
	 */
	parse?: AllowedMentionsTypes[];
	/**
	 * Array of role_ids to mention (Max size of 100)
	 */
	roles?: Snowflake[];
	/**
	 * Array of user_ids to mention (Max size of 100)
	 */
	users?: Snowflake[];
	/**
	 * 	For replies, whether to mention the author of the message being replied to (default false)
	 *
	 * @default false
	 */
	replied_user?: boolean;
}
