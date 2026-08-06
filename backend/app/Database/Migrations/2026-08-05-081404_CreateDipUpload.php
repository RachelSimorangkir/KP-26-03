<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateDipUpload extends Migration
{
    public function up()
    {
        $this->forge->addField([

            'id' => [
                'type'           => 'INT',
                'constraint'     => 11,
                'unsigned'       => true,
                'auto_increment' => true,
            ],

            'nomor_upload' => [
                'type'       => 'VARCHAR',
                'constraint' => 30,
            ],

            // Data Pengguna
            'nip_pengaju' => [
                'type'       => 'VARCHAR',
                'constraint' => 30,
            ],

            'nama_pengaju' => [
                'type'       => 'VARCHAR',
                'constraint' => 150,
            ],

            'unit_pengaju' => [
                'type'       => 'VARCHAR',
                'constraint' => 200,
            ],

            // Tahun DIP
            'tahun' => [
                'type'       => 'INT',
                'constraint' => 4,
            ],

            // Dokumen
            'nama_file' => [
                'type'       => 'VARCHAR',
                'constraint' => 255,
            ],

            'file_path' => [
                'type'       => 'VARCHAR',
                'constraint' => 255,
            ],

            // Catatan dari User
            'catatan_pengirim' => [
                'type' => 'TEXT',
                'null' => true,
            ],

            // Status
            'status' => [
                'type'       => 'VARCHAR',
                'constraint' => 30,
                'default'    => 'Menunggu Validasi',
            ],

            // Catatan Admin
            'catatan_admin' => [
                'type' => 'TEXT',
                'null' => true,
            ],

            // Validator
            'validated_by' => [
                'type'       => 'VARCHAR',
                'constraint' => 150,
                'null'       => true,
            ],

            'validated_at' => [
                'type' => 'DATETIME',
                'null' => true,
            ],

            'created_at' => [
            'type' => 'TIMESTAMP',
            'null' => true,
            ],

            'updated_at' => [
            'type' => 'TIMESTAMP',
             'null' => true,
           ],

        ]);

        $this->forge->addKey('id', true);

        $this->forge->createTable('dip_upload');
    }

    public function down()
    {
        $this->forge->dropTable('dip_upload');
    }
}