module.exports = {
    entities: [process.env.NODE_ENV === 'production' ? 'dist/**/*.entity.js' : 'src/**/*.entity.ts'],
    url: process.env.DB_URL || 'postgres://pardjs:example@127.0.0.1:54320/pardjs-cms-service',
    synchronize: true,
    type: 'postgres',
    // migrations: ["db-migration/*.ts"],
    // migrationsTableName: "cms_migration_table",
    // cli: {
    //     migrationsDir: "db-migration"
    // },
    logging: true
}