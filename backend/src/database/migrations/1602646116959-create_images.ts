import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createImages1602646116959 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.createTable(
      new Table({
        name: "orphanages_images",
        columns: [
          {
            name: "id",
            type: "integer",
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "path",
            type: "string",
          },
          {
            name: "orphanage_id",
            type: "integer",
          },
        ],
        foreignKeys: [
          {
            name: "ImageOrphanage",
            columnNames: ["orphanage_id"],
            referencedTableName: "orphanages",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.dropTable("orphanages_images");
  }
}
