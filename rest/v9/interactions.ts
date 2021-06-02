import type {
	APIApplicationCommand,
	APIApplicationCommandPermission,
	APIGuildApplicationCommandPermissions,
	APIInteractionResponse,
} from '../../payloads/v9/index';

/**
 * https://discord.com/developers/docs/interactions/slash-commands#get-global-application-commands
 */
export type RESTGetAPIApplicationCommandsResult = APIApplicationCommand[];

/**
 * https://discord.com/developers/docs/interactions/slash-commands#get-global-application-command
 */
export type RESTGetAPIApplicationCommandResult = APIApplicationCommand;

/**
 * https://discord.com/developers/docs/interactions/slash-commands#create-global-application-command
 */
export type RESTPostAPIApplicationCommandsJSONBody = Omit<APIApplicationCommand, 'id' | 'application_id'>;

/**
 * https://discord.com/developers/docs/interactions/slash-commands#create-global-application-command
 */
export type RESTPostAPIApplicationCommandsResult = APIApplicationCommand;

/**
 * https://discord.com/developers/docs/interactions/slash-commands#edit-global-application-command
 */
export type RESTPatchAPIApplicationCommandJSONBody = Partial<RESTPostAPIApplicationCommandsJSONBody>;

/**
 * https://discord.com/developers/docs/interactions/slash-commands#edit-global-application-command
 */
export type RESTPatchAPIApplicationCommandResult = APIApplicationCommand;

/**
 * https://discord.com/developers/docs/interactions/slash-commands#bulk-overwrite-global-application-commands
 */
export type RESTPutAPIApplicationCommandsJSONBody = RESTPostAPIApplicationCommandsJSONBody[];

/**
 * https://discord.com/developers/docs/interactions/slash-commands#bulk-overwrite-global-application-commands
 */
export type RESTPutAPIApplicationCommandsResult = APIApplicationCommand[];

/**
 * https://discord.com/developers/docs/interactions/slash-commands#get-guild-application-commands
 */
export type RESTGetAPIApplicationGuildCommandsResult = APIApplicationCommand[];

/**
 * https://discord.com/developers/docs/interactions/slash-commands#get-guild-application-command
 */
export type RESTGetAPIApplicationGuildCommandResult = APIApplicationCommand;

/**
 * https://discord.com/developers/docs/interactions/slash-commands#create-guild-application-command
 */
export type RESTPostAPIApplicationGuildCommandsJSONBody = RESTPostAPIApplicationCommandsJSONBody;

/**
 * https://discord.com/developers/docs/interactions/slash-commands#create-guild-application-command
 */
export type RESTPostAPIApplicationGuildCommandsResult = APIApplicationCommand;

/**
 * https://discord.com/developers/docs/interactions/slash-commands#edit-guild-application-command
 */
export type RESTPatchAPIApplicationGuildCommandJSONBody = Partial<RESTPostAPIApplicationCommandsJSONBody>;

/**
 * https://discord.com/developers/docs/interactions/slash-commands#edit-guild-application-command
 */
export type RESTPatchAPIApplicationGuildCommandResult = APIApplicationCommand;

/**
 * https://discord.com/developers/docs/interactions/slash-commands#bulk-overwrite-global-application-commands
 */
export type RESTPutAPIApplicationGuildCommandsJSONBody = RESTPostAPIApplicationCommandsJSONBody[];

/**
 * https://discord.com/developers/docs/interactions/slash-commands#bulk-overwrite-global-application-commands
 */
export type RESTPutAPIApplicationGuildCommandsResult = APIApplicationCommand[];

/**
 * https://discord.com/developers/docs/interactions/slash-commands#create-interaction-response
 */
export type RESTPostAPIInteractionCallbackJSONBody = APIInteractionResponse;

/**
 * https://discord.com/developers/docs/interactions/slash-commands#create-interaction-response
 */
export type RESTPostAPIInteractionCallbackFormDataBody =
	| {
			/**
			 * JSON stringified message body
			 */
			payload_json?: string;
			/**
			 * The file contents
			 */
			file: unknown;
	  }
	| (RESTPostAPIInteractionCallbackJSONBody & {
			/**
			 * The file contents
			 */
			file: unknown;
	  });

/**
 * https://discord.com/developers/docs/interactions/slash-commands#get-guild-application-command-permissions
 */
export type RESTGetAPIGuildApplicationCommandsPermissionsResult = APIGuildApplicationCommandPermissions[];

/**
 * https://discord.com/developers/docs/interactions/slash-commands#get-application-command-permissions
 */
export type RESTGetAPIApplicationCommandPermissionsResult = APIGuildApplicationCommandPermissions;

/**
 * https://discord.com/developers/docs/interactions/slash-commands#edit-application-command-permissions
 */
export interface RESTPutAPIApplicationCommandPermissionsJSONBody {
	permissions: APIApplicationCommandPermission[];
}

/**
 * https://discord.com/developers/docs/interactions/slash-commands#edit-application-command-permissions
 */
export type RESTPutAPIApplicationCommandPermissionsResult = APIGuildApplicationCommandPermissions;

/**
 * https://discord.com/developers/docs/interactions/slash-commands#batch-edit-application-command-permissions
 */
export type RESTPutAPIGuildApplicationCommandsPermissionsJSONBody = Pick<
	APIGuildApplicationCommandPermissions,
	'id' | 'permissions'
>[];

/**
 * https://discord.com/developers/docs/interactions/slash-commands#batch-edit-application-command-permissions
 */
export type RESTPutAPIGuildApplicationCommandsPermissionsResult = APIGuildApplicationCommandPermissions[];
