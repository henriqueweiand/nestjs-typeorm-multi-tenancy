import { ConfigService, registerAs } from "@nestjs/config";

export const DataSourceConfig = registerAs('dataSourceConfig', () => {
    const configService = new ConfigService();

    return {
        type: configService.getOrThrow('DEFAULT_DB_TYPE'),
        host: configService.getOrThrow('DEFAULT_DB_HOST'),
        port: configService.getOrThrow('DEFAULT_DB_PORT'),
        username: configService.getOrThrow('DEFAULT_DB_USERNAME'),
        password: configService.getOrThrow('DEFAULT_DB_PASSWORD'),
        database: configService.getOrThrow('DEFAULT_DB_NAME'),
        logging: configService.getOrThrow('DEFAULT_DB_LOGGING', false),
    }
});